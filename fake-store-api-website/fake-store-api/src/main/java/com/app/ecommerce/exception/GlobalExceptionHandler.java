package com.app.ecommerce.exception;

import com.app.ecommerce.dto.ExceptionResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private ResponseEntity<ExceptionResponse> handleException(Exception exception, WebRequest webRequest, HttpStatus status) {
        ExceptionResponse errorDetails = ExceptionResponse.builder()
                .time(new Date())
                .message(exception.getMessage())
                .path(webRequest.getDescription(true))
                .errorCode(String.valueOf(status.value()))
                .build();
        return new ResponseEntity<>(errorDetails, status);
    }

    @ExceptionHandler(FakeStoreApiException.class)
    public ResponseEntity<ExceptionResponse> handleBookStoreApiException(FakeStoreApiException exception, WebRequest webRequest) {
        return handleException(exception, webRequest, exception.getStatus());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleResourceNotFoundException(ResourceNotFoundException exception, WebRequest webRequest) {
        return handleException(exception, webRequest, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ExceptionResponse> handleJwtException(RuntimeException exception, WebRequest webRequest) {
        return handleException(exception, webRequest, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleBadCredentialsException(BadCredentialsException exception, WebRequest webRequest) {
        return handleException(exception, webRequest, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({TokenRefreshException.class, AccountBlockedException.class})
    public ResponseEntity<ExceptionResponse> handleTokenRefreshException(RuntimeException exception, WebRequest webRequest) {
        return handleException(exception, webRequest, HttpStatus.FORBIDDEN);
    }

}
