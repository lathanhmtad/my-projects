package com.quiz.app.exception;

public class AccountBlockedException extends RuntimeException{
    public AccountBlockedException(String message) {
        super(message);
    }
}

