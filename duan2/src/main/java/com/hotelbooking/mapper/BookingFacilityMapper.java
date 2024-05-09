package com.hotelbooking.mapper;

import com.hotelbooking.entity.BookingFacility;
import com.hotelbooking.model.dto.BookingFacilityDto;

import java.util.function.Function;

public class BookingFacilityMapper implements Function<BookingFacility, BookingFacilityDto> {

    @Override
    public BookingFacilityDto apply(BookingFacility bookingFacility) {
        return BookingFacilityDto.builder()
                .id(bookingFacility.getId())
                .createAt(bookingFacility.getCreateAt())
                .totalPrice(bookingFacility.getTotalPrice())
                .bookingId(bookingFacility.getId())
                .facilityId(bookingFacility.getId())
                .build();
    }
}
