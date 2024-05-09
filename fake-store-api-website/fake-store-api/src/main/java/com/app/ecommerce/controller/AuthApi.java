package com.app.ecommerce.controller;

import com.app.ecommerce.dto.auth.LoginRequestDto;
import com.app.ecommerce.dto.auth.LoginResponseDto;
import com.app.ecommerce.service.IAuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthApi {
    private final IAuthService authService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {
        LoginResponseDto loginResponseDto = authService.authenticateAndGenerateToken(loginRequestDto);
        return ResponseEntity.ok(loginResponseDto);
    }
}
