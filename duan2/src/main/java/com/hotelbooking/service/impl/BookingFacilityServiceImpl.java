package com.hotelbooking.service.impl;

import com.hotelbooking.entity.BookingFacility;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.mapper.BookingMapper;
import com.hotelbooking.repository.BookingFacilityRepository;
import com.hotelbooking.service.BookingFacilityService;
import com.hotelbooking.utils.ValidatorUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingFacilityServiceImpl implements BookingFacilityService {
    private final BookingFacilityRepository bookingFacilityRepository;
    private final BookingMapper bookingMapper;

    @Override
    public List<BookingFacility> findByBookingId(Long id) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(id);
        List<BookingFacility> bookingFacilityList = bookingFacilityRepository.findByBookingId(id);
        return bookingFacilityList;
    }



}
