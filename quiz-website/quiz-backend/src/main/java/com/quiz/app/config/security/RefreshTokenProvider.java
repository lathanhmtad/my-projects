package com.quiz.app.config.security;

import com.quiz.app.entity.auth.RefreshToken;
import com.quiz.app.exception.RefreshTokenException;
import com.quiz.app.exception.ResourceNotFoundException;
import com.quiz.app.repository.ParticipantRepo;
import com.quiz.app.repository.RefreshTokenRepo;
import com.quiz.app.utils.TimeConverterUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
public class RefreshTokenProvider {
    @Value("${jwt.jwtRefreshExpiration}")
    private String refreshTokenDuration;
    private final RefreshTokenRepo refreshTokenRepository;
    private final ParticipantRepo participantRepo;

    public RefreshTokenProvider(RefreshTokenRepo refreshTokenRepository, ParticipantRepo participantRepo) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.participantRepo = participantRepo;
    }

    public String generateRefreshToken(Authentication authentication) {
        RefreshToken refreshToken = this.createRefreshToken(authentication);
        return refreshToken.getToken();
    }

    public RefreshToken verifyExpiration(RefreshToken refreshToken) {
        Date currentDate = new Date();
        if(refreshToken.getExpiryDate().compareTo(currentDate) < 0) {
            throw new RefreshTokenException("Refresh token was expired. Please make a new login request!");
        }
        return refreshToken;
    }

    private RefreshToken createRefreshToken(Authentication authentication) {
        String username = authentication.getName();

        RefreshToken refreshToken;
        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findRefreshTokenByParticipant_Username(username);
        if(optionalRefreshToken.isPresent()) {
            refreshToken = optionalRefreshToken.get();
        }
        else {
            refreshToken = new RefreshToken();
            refreshToken.setParticipant(
                    participantRepo.findByUsername(username)
                            .orElseThrow(() -> new ResourceNotFoundException("User", "username", username))
            );
        }
        long currentDate = new Date().getTime();
        long refreshTokenDurationMs = TimeConverterUtils.getMilliseconds(refreshTokenDuration);
        Date expiryDate = new Date(currentDate + refreshTokenDurationMs);
        refreshToken.setExpiryDate(expiryDate);
        refreshToken.setToken(UUID.randomUUID().toString());

        return refreshTokenRepository.save(refreshToken);
    }
}