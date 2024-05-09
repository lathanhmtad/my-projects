package com.app.ecommerce.controller;

import com.app.ecommerce.entity.User;
import com.app.ecommerce.dto.user.UserDto;
import com.app.ecommerce.dto.user.UserRequestDto;
import com.app.ecommerce.service.IUserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserApi extends GenericApi<User, UserDto, UserRequestDto> {
    public UserApi(IUserService userService) {
        super(userService);
    }
}
