package com.quiz.app.service;

import com.quiz.app.dto.auth.LoginRequest;
import com.quiz.app.dto.auth.LoginResponse;

public interface AuthService {
    LoginResponse authenticateAndGenerateToken(LoginRequest loginRequest);
}
