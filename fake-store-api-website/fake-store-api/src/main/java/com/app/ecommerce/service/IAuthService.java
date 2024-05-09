package com.app.ecommerce.service;

import com.app.ecommerce.dto.auth.LoginRequestDto;
import com.app.ecommerce.dto.auth.LoginResponseDto;

public interface IAuthService {
    LoginResponseDto authenticateAndGenerateToken(LoginRequestDto loginRequestDto);
}
