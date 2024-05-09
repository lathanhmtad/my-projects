package com.app.ecommerce.service.impl;

import com.app.ecommerce.entity.User;
import com.app.ecommerce.mapper.UserMapper;
import com.app.ecommerce.dto.user.UserDto;
import com.app.ecommerce.repository.UserRepo;
import com.app.ecommerce.service.IUserService;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractBaseService<User, UserDto> implements IUserService {
    private final UserRepo userRepo;
    private final UserMapper userMapper;
    public UserService(UserRepo userRepo, UserMapper userMapper) {
        super(userRepo, userMapper, User.class);
        this.userRepo = userRepo;
        this.userMapper = userMapper;
    }
}
