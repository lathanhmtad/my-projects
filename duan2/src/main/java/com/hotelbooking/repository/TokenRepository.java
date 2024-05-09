package com.hotelbooking.repository;

import com.hotelbooking.entity.Token;
import com.hotelbooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token,Long> {

    @Query("SELECT u FROM users u INNER JOIN u.tokens t WHERE t.token = ?1")
    Optional<User> findUserByToken(String token);

    Token findByToken(String token);
}
