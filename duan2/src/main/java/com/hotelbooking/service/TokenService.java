package com.hotelbooking.service;

import com.hotelbooking.entity.Token;
import com.hotelbooking.entity.User;
import com.hotelbooking.enums.TokenType;

public interface TokenService {
    Token generateToken(User user, TokenType tokenType);

    User getUserByToken(String token);
}
