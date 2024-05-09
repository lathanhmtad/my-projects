package com.hotelbooking.service;

import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.UserDto;
import com.hotelbooking.model.request.AuthenticationRequest;

public interface AuthenticationService {

    void register(UserDto userDto) throws ApplicationException;

    void activeAccount(String token) throws EntityNotFoundException;

    void requestForgotPassword(String username) throws ApplicationException;

    void resetPassword(AuthenticationRequest authenticationRequest) throws EntityNotFoundException, ParamInvalidException;
}
