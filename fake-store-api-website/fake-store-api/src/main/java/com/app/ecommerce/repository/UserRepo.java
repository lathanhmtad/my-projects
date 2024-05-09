package com.app.ecommerce.repository;

import com.app.ecommerce.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends IAbstractBaseRepo<User> {
    Optional<User> findByEmail(String email);
}
