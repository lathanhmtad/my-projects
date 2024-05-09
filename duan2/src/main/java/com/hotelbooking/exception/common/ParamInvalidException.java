package com.hotelbooking.exception.common;

import com.hotelbooking.exception.core.ApplicationException;
import org.springframework.http.HttpStatus;

public class ParamInvalidException extends ApplicationException {

    public ParamInvalidException(String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }
}
