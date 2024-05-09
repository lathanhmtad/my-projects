package com.hotelbooking.exception;


import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.exception.core.ErrorDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorDetails> handlerApplicationException(ApplicationException ex, HttpServletRequest request) {

        ErrorDetails errorDetails = ErrorDetails
                .builder()
                .statusCode(ex.getStatus().value())
                .status(ex.getStatus().getReasonPhrase())
                .message(ex.getMessage())
                .timestamp(new Date())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(ex.getStatus())
                .body(errorDetails);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ErrorDetails> handlerBindException(BindException ex, HttpServletRequest request) {
        String errorMessage = "Request không hợp lệ";
        if (ex.getBindingResult().hasErrors()) {
            errorMessage = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        }

        ErrorDetails errorDetails = ErrorDetails
                .builder()
                .message(errorMessage)
                .timestamp(new Date())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorDetails);
    }


}
