package com.hotelbooking.service;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.enums.BookingStatus;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.BookingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BookingService {
    Page<BookingDto> getAll(Pageable pageable);

    BookingDto findById(Long id) throws EntityNotFoundException;

    Booking save(BookingDto bookingDto) throws ApplicationException, IOException;

    BookingDto update(Long id, BookingDto bookingDto) throws EntityNotFoundException;

    void delete(Long id) throws EntityNotFoundException;

    List<BookingDto> search(LocalDate checkInAt, LocalDate checkOutAt) throws EntityNotFoundException;

    Page<BookingDto> search(LocalDate checkInAt, LocalDate checkOutAt, Pageable pageable) throws EntityNotFoundException;

    Page<BookingDto> getBooking(LocalDate check_in, LocalDate check_out, BookingStatus status, Pageable pageable) throws ParamInvalidException;

    void updateBookingStatus(String newStatus, Long id)  throws ParamInvalidException;

    Booking getById(Long id);

    Booking saveOrUpdate(Booking booking);

    List<Booking> findByUser(Long id);
}
