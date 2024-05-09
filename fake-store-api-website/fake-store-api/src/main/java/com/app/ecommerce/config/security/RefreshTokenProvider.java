package com.app.ecommerce.config.security;

import com.app.ecommerce.entity.RefreshToken;
import com.app.ecommerce.exception.TokenRefreshException;
import com.app.ecommerce.repository.RefreshTokenRepo;
import com.app.ecommerce.repository.UserRepo;
import com.app.ecommerce.utils.TimeConverterUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Component
public class RefreshTokenProvider {
    @Value("${com.app.ecommerce.jwt.jwtRefreshExpiration}")
    private String refreshTokenDuration;
    private final RefreshTokenRepo refreshTokenRepository;
    private final UserRepo userRepo;

    private Logger logger = Logger.getLogger(RefreshTokenProvider.class.getName());

    public RefreshTokenProvider(RefreshTokenRepo refreshTokenRepository, UserRepo userRepo) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepo = userRepo;
    }

    public String generateRefreshToken(Long userId) {
        RefreshToken refreshToken = this.saveRefreshToken(userId);
        return refreshToken.getToken();
    }

    public RefreshToken verifyExpiration(RefreshToken refreshToken) {
        Date currentDate = new Date();
        if(refreshToken.getExpiryDate().compareTo(currentDate) < 0) {
            refreshTokenRepository.delete(refreshToken);
            throw new TokenRefreshException(refreshToken.getToken(), "Refresh token was expired. Please make a new login request!");
        }
        return refreshToken;
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        try {
            refreshTokenRepository.deleteByUser_id(userId);
        }
        catch (Exception e) {
            logger.severe(e.getMessage());
        }
    }

    private RefreshToken saveRefreshToken(Long userId) {
        long refreshTokenDurationMs = TimeConverterUtil.getMilliseconds(refreshTokenDuration);

        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByUser_id(userId);

        if(optionalRefreshToken.isPresent()) {
            RefreshToken refreshTokenInDb = optionalRefreshToken.get();

            // update the expiration date field
            refreshTokenInDb.setExpiryDate(calculateExpiryDate(new Date(), refreshTokenDurationMs));
            return refreshTokenRepository.save(refreshTokenInDb);
        }
        // if refresh token does not exist yet => create new
        RefreshToken newRefreshToken = RefreshToken.builder()
                .user(userRepo.findById(userId).get())
                .expiryDate(calculateExpiryDate(new Date(), refreshTokenDurationMs))
                .token(UUID.randomUUID().toString())
                .build();

        RefreshToken savedRefreshToken = refreshTokenRepository.save(newRefreshToken);
        return savedRefreshToken;
    }

    private Date calculateExpiryDate(Date currentDate, long durationMs) {
        return new Date(currentDate.getTime() + durationMs);
    }
}
