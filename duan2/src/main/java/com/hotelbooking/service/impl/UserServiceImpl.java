package com.hotelbooking.service.impl;

import com.hotelbooking.entity.User;
import com.hotelbooking.enums.Role;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.mapper.UserMapper;
import com.hotelbooking.model.dto.UserDto;
import com.hotelbooking.repository.UserRepository;
import com.hotelbooking.service.UserService;
import com.hotelbooking.utils.AuthenticationUtils;
import com.hotelbooking.utils.ValidatorUtils;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;


    // Create a new User
    @Override
    public User save(UserDto userDto) throws ParamInvalidException, EntityNotFoundException {
        ValidatorUtils.checkNullParam(
                userDto.getFullname()
                ,userDto.getUsername()
                ,userDto.getEmail()
                ,userDto.getPhone()
                ,userDto.getRole()
        );

        checkValidate(userDto);

        if (userDto.getId() != null){
            User userExist = userRepository.findById(userDto.getId()).orElse(null);

            if (userExist != null) {
                if ( userDto.getPassword().equals("")){
                    userDto.setPassword(userExist.getPassword());
                }
            }
        }
        User user =  userMapper.applyToUser(userDto);

        if(userDto.getId() == null){
            user.setActive(true);
        }

        return userRepository.save(user);
    }

    // update
    @Override
    public void update(Long id, UserDto userDto) throws ParamInvalidException, EntityNotFoundException {
        ValidatorUtils.checkNullParam(id);
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng này!"));


        user.setPassword(userDto.getPassword().isEmpty() ? user.getPassword() : passwordEncoder.encode(userDto.getPassword()));
        user.setFullname(userDto.getFullname());
        user.setPhone(userDto.getPhone());
        user.setRole(Role.ROLE_USER);
        user.setActive(true);

        userRepository.save(user);
    }

    // Delete
    @Override
    public void delete(Long id, HttpSession session) throws EntityNotFoundException, ParamInvalidException {
        User user = userRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Không tìm thấy người dùng này!")
                );

        String userLogged = (String) session.getAttribute("username");


        if (userLogged.equals(user.getUsername())){
            throw new ParamInvalidException("Tài khoản này đang đăng nhập không thể xóa!");
        }
        user.setDelete(true);
        userRepository.save(user);
    }

    // findAll user
    @Override
    public Page<UserDto> finAllUser(Integer page, Integer size) throws EntityNotFoundException {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> user = userRepository.findAll(pageable);
        if (user == null) throw new EntityNotFoundException("User not found");
        return user.map(userMapper::apply);
    }

    // findById
    @Override
    public UserDto findByUserId(Long id) throws EntityNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) throw new EntityNotFoundException("User not found for Database");
        return userMapper.apply(user.get());
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Page<UserDto> getAll(Pageable pageable) {
        return userRepository
                .findAllUser(pageable)
                .map(userMapper);
    }

    @Override
    public void saveAndUpdate(UserDto userDto) {
        User user = User.builder()
                .id(userDto.getId())
                .username(userDto.getUsername())
                .fullname(userDto.getFullname())
                .phone(userDto.getPhone())
                .email(userDto.getEmail())
                .role(Role.ROLE_USER)
                .build();

        userRepository.save(user);
    }

    public void checkValidate(UserDto userDto) throws ParamInvalidException, EntityNotFoundException {

        if (userDto.getId() == null){
            //Thêm mới
            User user = userRepository.findByUsername(userDto.getUsername()).orElse(null);
            if (user == null){
                if (userDto.getPassword().equals("")){
                    throw new ParamInvalidException("Vui lòng nhập mật khẩu!!");
                }
                if (userDto.getConfirmPassword().equals("")){
                    throw new ParamInvalidException("Vui lòng xác nhận mật khẩu!!");
                }

                if (!userDto.getConfirmPassword().equals(userDto.getPassword())){
                    throw new ParamInvalidException("Mật khẩu nhập không khớp!");
                }
                if (userDto.getPassword().length()<6) {
                    throw new ParamInvalidException("Mật khẩu nhiều hơn 6 ký tự!");
                }
            }else {
                if (user.getUsername().equals(userDto.getUsername())){
                    throw new EntityNotFoundException("Tài khoản đã tồn tại!!");
                }
            }

        }else {
            //Cập nhật
            if (userDto.getPassword() != null && !(userDto.getPassword().isEmpty()) ) {

                if(!userDto.getConfirmPassword().equals(userDto.getPassword())){
                    throw new ParamInvalidException("Mật khẩu không trùng khớp!");
                }
                if(userDto.getPassword().length()<6){
                    throw new ParamInvalidException("Mật khẩu nhiều hơn 6 ký tự!");
                }
            }

        }


        if (userDto.getPhone().length() != 10){
            throw new ParamInvalidException("Số điện thoại phải đủ 10 số!!");
        }


        if (userDto.getUsername().length() < 5) throw new ParamInvalidException("Tài khoản phải nhiều hơn 5 ký tự!");


    }

    @Override
    public void createUserAdmin(){
        User user = new User();
        user.setUsername("admin001");
        user.setPhone("0987654321");
        user.setEmail("vandu1409@gmail.com");
        user.setFullname("admin 001");
        user.setPassword(new BCryptPasswordEncoder().encode("123456"));
        user.setRole(Role.ROLE_ADMIN);
        user.setActive(true);
        user.setDelete(false);

        User dbUser = userRepository.findByUsername("admin001").orElse(null);

       if(dbUser == null){
           userRepository.save(user);
       }

    }
}
