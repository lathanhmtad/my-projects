package com.hotelbooking.mapper;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.model.dto.BookingDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class BookingMapper implements Function<Booking, BookingDto> {
    @Override
    public BookingDto apply(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .checkInAt(booking.getCheckInAt())
                .checkOutAt(booking.getCheckOutAt())
                .status(booking.getStatus())
                .discount(booking.getDiscount())
                .paymentMethod(booking.getPaymentMethod())
                .paymentStatus(booking.getPaymentStatus())
                .userId(booking.getUser() != null && booking.getUser().getId() != null ? booking.getUser().getId() : null)
                .voucherId(booking.getVoucher() != null ? booking.getVoucher().getId() : null)
                .roomId(booking.getRoom() != null ? booking.getRoom().getId() : null)
                .createAt(booking.getCreateAt())
                .fullname(booking.getUser().getFullname())
                .roomName(booking.getRoom().getName())
                .roomImage((booking.getRoom().getImages() != null
                        && !booking.getRoom().getImages().isEmpty())
                        ? booking.getRoom().getImages().get(0) : "Bedroom-Apartment-3.jpg")
                .build();
    }
}
