package com.hotelbooking.service;

import com.hotelbooking.exception.core.ApplicationException;

public interface EmailService {
    void sendSimpleMail(String subject, String body, String recipient) throws ApplicationException;
}
