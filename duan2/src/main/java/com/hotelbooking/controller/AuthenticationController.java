package com.hotelbooking.controller;

import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.UserDto;
import com.hotelbooking.model.request.AuthenticationRequest;
import com.hotelbooking.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) throws ApplicationException {
        authenticationService.register(userDto);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/requestResetPassword")
    public ResponseEntity<?> requestResetPassword(@RequestParam String username) throws ApplicationException {
        authenticationService.requestForgotPassword(username);

        return ResponseEntity.ok("Vui lòng kiểm tra email");
    }

    @PutMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody AuthenticationRequest authenticationRequest) throws EntityNotFoundException, ParamInvalidException {

        authenticationService.resetPassword(authenticationRequest);

        return ResponseEntity.ok("Đổi mật khẩu thành công");
    }

//    @PutMapping("confirmAccount")
//    public ResponseEntity<?> confirmAccount(@RequestParam String token) throws EntityNotFoundException {
//
//        authenticationService.activeAccount(token);
//
//        return ResponseEntity.ok("Tài khoản của bạn đã được kích hoạt");
//    }
}
