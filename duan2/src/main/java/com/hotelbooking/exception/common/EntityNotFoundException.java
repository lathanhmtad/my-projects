package com.hotelbooking.exception.common;

import com.hotelbooking.exception.core.ApplicationException;
import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends ApplicationException {

	public EntityNotFoundException(String message) {
		super(message);
		this.status = HttpStatus.NOT_FOUND;
	}

}
