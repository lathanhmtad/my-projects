package com.quiz.app.controller;

import com.quiz.app.dto.auth.LoginRequest;
import com.quiz.app.dto.auth.LoginResponse;
import com.quiz.app.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.authenticateAndGenerateToken(loginRequest);
        return ResponseEntity.ok(loginResponse);
    }
}
