package com.quiz.app.service.impl;

import com.quiz.app.config.security.JwtTokenProvider;
import com.quiz.app.config.security.RefreshTokenProvider;
import com.quiz.app.dto.auth.LoginRequest;
import com.quiz.app.dto.auth.LoginResponse;
import com.quiz.app.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private RefreshTokenProvider refreshTokenProvider;
    @Override
    public LoginResponse authenticateAndGenerateToken(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenProvider.generateJwtToken(authentication);
        String refreshToken = refreshTokenProvider.generateRefreshToken(authentication);

        return new LoginResponse("Login success!", accessToken, refreshToken, new Date());
    }
}
