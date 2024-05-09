package com.app.ecommerce.mapper;

import com.app.ecommerce.entity.User;
import com.app.ecommerce.exception.ResourceExistsException;
import com.app.ecommerce.dto.user.UserDto;
import com.app.ecommerce.dto.user.UserRequestDto;
import com.app.ecommerce.repository.RoleRepo;
import com.app.ecommerce.repository.UserRepo;
import com.app.ecommerce.utils.AppConstantUtil;
import com.app.ecommerce.utils.CloudinaryUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class UserMapper extends Mapper<User, UserDto> {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final CloudinaryUtil cloudinaryUtil;

    public UserMapper(
            PasswordEncoder passwordEncoder,
            UserRepo userRepo,
            RoleRepo roleRepo,
            CloudinaryUtil cloudinaryUtil
            ) {
        super(User.class, UserDto.class);
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.cloudinaryUtil = cloudinaryUtil;
    }

    @Override
    public User toEntity(UserDto dto) {
        UserRequestDto userRequestDto = (UserRequestDto) dto;
        Long userId = userRequestDto.getId();
        if(userId == null) {
            return this.mapCreateUser(userRequestDto);
        }
        return this.mapUpdateUser(userRequestDto);
    }

    private User mapCreateUser(UserRequestDto userRequestDto) {
        User user = this.modelMapper.map(userRequestDto, User.class);
        this.mapRolesToUser(user, userRequestDto);

        if(userRequestDto.getAvatar() == null) {
            MultipartFile avatarFile = userRequestDto.getAvatarFile();
            user.setAvatar(
                    avatarFile == null ? AppConstantUtil.USER_DEFAULT_IMAGE
                            : this.cloudinaryUtil.upload(avatarFile, AppConstantUtil.USER_IMG_FOLDER)
            );
        }
        String rawPassword = userRequestDto.getPassword();
        user.setPassword(passwordEncoder.encode(rawPassword));
        return user;
    }

    private User mapUpdateUser(UserRequestDto userRequestDto) {
        User userInDb = userRepo.findById(userRequestDto.getId()).orElseThrow(() ->
                new ResourceExistsException("User", "id", String.valueOf(userRequestDto.getId())));
        this.modelMapper.map(userRequestDto, userInDb);
        this.mapRolesToUser(userInDb, userRequestDto);
        String rawPassword = userRequestDto.getPassword();
        if(rawPassword != null && !ObjectUtils.isEmpty(rawPassword)) {
            userInDb.setPassword(passwordEncoder.encode(rawPassword));
        }
        return userInDb;
    }

    private void mapRolesToUser(User user, UserRequestDto userRequestDto) {
        if(userRequestDto.getRoleIds() != null) {
            user.setRoles(roleRepo.findAllById(userRequestDto.getRoleIds()));
        }
        if(userRequestDto.getRoleNames() != null) {
            user.setRoles(roleRepo.findAllByName(userRequestDto.getRoleNames()));
        }
    }
}
