package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Token;
import com.hotelbooking.entity.User;
import com.hotelbooking.enums.TokenType;
import com.hotelbooking.repository.TokenRepository;
import com.hotelbooking.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    @Override
    public Token generateToken(User user, TokenType tokenType) {

        LocalDateTime now = LocalDateTime.now();

        Token token = Token.builder()
                .expiredAt(now.plusMinutes(15))
                .type(tokenType)
                .user(user)
                .token(generateRandomToken())
                .build();

        return tokenRepository.save(token);
    }

    @Override
    public User getUserByToken(String token) {
        return tokenRepository.findUserByToken(token).orElse(null);
    }

    public String generateRandomToken() {
        return UUID.randomUUID().toString();
    }
}
