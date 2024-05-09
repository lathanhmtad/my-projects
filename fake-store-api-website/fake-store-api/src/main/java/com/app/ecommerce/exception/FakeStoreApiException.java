package com.app.ecommerce.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class FakeStoreApiException extends RuntimeException {
    private HttpStatus status;
    private String message;

    public FakeStoreApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
