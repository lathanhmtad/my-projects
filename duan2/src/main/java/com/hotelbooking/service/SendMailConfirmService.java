package com.hotelbooking.service;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.exception.core.ApplicationException;

import java.io.IOException;
import java.util.List;

public interface SendMailConfirmService {
    void sendMailConfirmAccount(String link, String email,String fullname) throws ApplicationException;

    void sendMailRequestResetPass(String link, String email, String username) throws ApplicationException;

    void sendMailBooking(Long bookingId, Long roomId, List<Long> facilityIds, String email) throws ApplicationException, IOException;
}
