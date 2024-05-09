package com.app.ecommerce.repository;

import com.app.ecommerce.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByUser_id(Long userId);
    void deleteByUser_id(Long userId);
}
