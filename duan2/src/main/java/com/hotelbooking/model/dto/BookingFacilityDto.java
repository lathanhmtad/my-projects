package com.hotelbooking.model.dto;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Facility;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
@Data
@Builder
public class BookingFacilityDto {

    private Long id;

    private LocalDate createAt;

    private Long totalPrice;
    private Long bookingId;

    private Long facilityId;
}
