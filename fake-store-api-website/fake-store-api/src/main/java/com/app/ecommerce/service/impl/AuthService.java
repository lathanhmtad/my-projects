package com.app.ecommerce.service.impl;

import com.app.ecommerce.exception.AccountBlockedException;
import com.app.ecommerce.dto.auth.LoginRequestDto;
import com.app.ecommerce.dto.auth.LoginResponseDto;
import com.app.ecommerce.config.security.JwtTokenProvider;
import com.app.ecommerce.config.security.MyUserDetails;
import com.app.ecommerce.config.security.RefreshTokenProvider;
import com.app.ecommerce.service.IAuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService implements IAuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenProvider refreshTokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    public LoginResponseDto authenticateAndGenerateToken(LoginRequestDto loginRequestDto) {
        MyUserDetails myUserDetails = this.authenticated(loginRequestDto);

        String accessToken = jwtTokenProvider.generateTokenFromUsername(myUserDetails.getUsername());
        String refreshToken = refreshTokenProvider.generateRefreshToken(myUserDetails.getId());

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setAccessToken(accessToken);
        loginResponseDto.setRefreshToken(refreshToken);

        return loginResponseDto;
    }

    private MyUserDetails authenticated(LoginRequestDto loginRequestDto) {
        MyUserDetails myUserDetails = (MyUserDetails) userDetailsService.loadUserByUsername(loginRequestDto.getEmail());

        String rawPassword = loginRequestDto.getPassword();
        String encodedPassword = myUserDetails.getPassword();
        if(!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new BadCredentialsException("Login information is incorrect!");
        }

        if(!myUserDetails.isEnabled()) {
            throw new AccountBlockedException("Your account has been locked!");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                myUserDetails,
                null,
                myUserDetails.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        return myUserDetails;
    }
}
