package com.hotelbooking.mapper;

import com.hotelbooking.entity.User;
import com.hotelbooking.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class UserMapper implements Function<User, UserDto> {

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto apply(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullname(user.getFullname())
                .phone(user.getPhone()==null ?"":user.getPhone())
                .email(user.getEmail())
                .password(user.getPassword())
                .active(user.isActive())
                .role(user.getRole()).build();

        
    }

    public User applyToUser(UserDto userDto){
        return User.builder()
                .fullname(userDto.getFullname())
                .phone(userDto.getPhone())
                .role(userDto.getRole())
                .id(userDto.getId())
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .active(userDto.isActive())
                .isDelete(false)
                .build();
    }
}
