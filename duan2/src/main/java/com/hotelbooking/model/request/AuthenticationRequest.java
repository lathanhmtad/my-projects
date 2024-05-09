package com.hotelbooking.model.request;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String token;

    private String password;

    private String confirmPassword;
}
