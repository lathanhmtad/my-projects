package com.hotelbooking.controller;


import com.hotelbooking.entity.Booking;
import com.hotelbooking.enums.BookingStatus;
import com.hotelbooking.enums.PaymentMethod;
import com.hotelbooking.enums.PaymentStatus;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.BookingDto;
import com.hotelbooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
@RequestMapping("/admin/booking")
@RequiredArgsConstructor
public class BookingAdminController {

    private final BookingService bookingService;

    @GetMapping("search")
    public ResponseEntity<Page<BookingDto>> getBooking(@RequestParam(value = "checkInAt", required = false) String checkInAt,
                                                       @RequestParam(value = "checkOutAt", required = false) String checkOutAt,
                                                       @RequestParam(value = "status", required = false) BookingStatus status,
                                                       @RequestParam(defaultValue = "1") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size) throws ParamInvalidException, ParseException {
        LocalDate checkInDate = null;

        LocalDate checkOutDate = null;
        if (checkInAt != null && checkOutAt != null) {

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            checkInDate = LocalDate.parse(checkInAt, formatter);
            checkOutDate = LocalDate.parse(checkOutAt, formatter);
        }

        Pageable pageable = PageRequest.of(page - 1, size);
        Page<BookingDto> booking = bookingService.getBooking(checkInDate, checkOutDate, status, pageable);

        return ResponseEntity.ok(booking);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> billUpdate(@PathVariable("id") Long id) {
        Booking booking = bookingService.getById(id);

        if (booking != null) {

            if (booking.getStatus() == BookingStatus.CHECKED_OUT) {
                return ResponseEntity.ok("Đơn đặt phòng này đã trả phòng không thể chuyển trạng thái!");
            }

            if(booking.getStatus() == BookingStatus.CANCELLED){
                return ResponseEntity.ok("Đơn đặt phòng này đã hủy thể chuyển trạng thái!");
            }

            BookingStatus status =
                    booking.getStatus() == BookingStatus.WAITING ? BookingStatus.RECEIVED : BookingStatus.CHECKED_OUT;


            if(booking.getPaymentMethod() == PaymentMethod.CASH && status == BookingStatus.CHECKED_OUT){
                booking.setPaymentStatus(PaymentStatus.PAID);
            }


            booking.setStatus(status);
            bookingService.saveOrUpdate(booking);

        }

        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("cancel/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable("id") Long id) {
        Booking booking = bookingService.getById(id);

        if (booking != null) {

            if (booking.getStatus() == BookingStatus.CHECKED_OUT) {
                return ResponseEntity.ok("Đơn đặt phòng này đã trả phòng không thể huỷ!");
            }

            booking.setStatus(BookingStatus.CANCELLED);

            bookingService.saveOrUpdate(booking);

        }else{
            return ResponseEntity.ok("Hủy đơn đặt hàng không thành công!");
        }

        return ResponseEntity.ok("Hủy đơn đặt phòng thành công!");
    }

}
