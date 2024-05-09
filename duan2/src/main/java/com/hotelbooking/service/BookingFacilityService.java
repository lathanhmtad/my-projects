package com.hotelbooking.service;

import com.hotelbooking.entity.BookingFacility;
import com.hotelbooking.exception.common.ParamInvalidException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface BookingFacilityService {
    List<BookingFacility> findByBookingId(Long id) throws ParamInvalidException;


}
