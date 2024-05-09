package com.app.ecommerce.exception;

public class AccountBlockedException extends RuntimeException{
    public AccountBlockedException(String message) {
        super(message);
    }
}
