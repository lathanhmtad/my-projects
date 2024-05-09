package com.hotelbooking.exception.common;

import com.hotelbooking.exception.core.ApplicationException;
import org.springframework.http.HttpStatus;

public class AuthenticateException extends ApplicationException {

	public AuthenticateException(String message) {
		super(message);
		this.status = HttpStatus.UNAUTHORIZED;
	}


}
