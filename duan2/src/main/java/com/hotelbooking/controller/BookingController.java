package com.hotelbooking.controller;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.enums.BookingStatus;
import com.hotelbooking.entity.Voucher;
import com.hotelbooking.enums.PaymentMethod;

import com.hotelbooking.enums.RoomStatus;
import com.hotelbooking.enums.RoomType;
import com.hotelbooking.enums.VoucherType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.BookingDto;
import com.hotelbooking.model.dto.RoomDto;
import com.hotelbooking.model.dto.VoucherDto;
import com.hotelbooking.service.BookingService;
import com.hotelbooking.service.RoomService;
import com.hotelbooking.service.VNPayService;
import com.hotelbooking.service.VoucherService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final RoomService roomService;
    private final VoucherService voucherService;

    private final HttpSession session;

    private final HttpServletRequest request;

    private final VNPayService vnPayService;

//     @GetMapping("search")
//     public ResponseEntity<Page<BookingDto>> getBooking(@RequestParam("checkInAt") String checkInAt,
//                                                        @RequestParam("checkOutAt") String checkOutAt,
//                                                        @RequestParam("status") String status,
//                                                        @RequestParam(defaultValue = "0") Integer page,
//                                                        @RequestParam(defaultValue = "10") Integer size) throws ParamInvalidException, ParseException {

//         SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//         Date checkInDate = formatter.parse(checkInAt);
//         Date checkOutDate = formatter.parse(checkOutAt);

//         Pageable pageable = PageRequest.of(page, size);
//         Page<BookingDto> booking = bookingService.getBooking(checkInDate, checkOutDate, status, pageable);

//         return ResponseEntity.ok(booking);
//     }


    @PutMapping()
    public ResponseEntity<String> updateBookingStatus(@RequestParam("newStatus") String newStatus,
                                                      @RequestParam("id") Long id) throws ParamInvalidException {
        bookingService.updateBookingStatus(newStatus, id);
        return ResponseEntity.ok("Update Thành Công");
    }

    @GetMapping
    public ResponseEntity<?> search(@RequestParam(value = "checkInAt") LocalDate checkInAt,
                                    @RequestParam(value = "checkOutAt") LocalDate checkOutAt,
                                    @RequestParam(value = "capacity", defaultValue = "1") int capacity,
                                    @RequestParam(value = "type", defaultValue = "SINGLE_ROOM") RoomType type,

                                    @RequestParam(value = "size", defaultValue = "3") int size,
                                    @RequestParam(value = "sort", defaultValue = "id") String sort) throws EntityNotFoundException {
        Pageable pageable = PageRequest.of(0, size * 3, Sort.by(sort));
        List<BookingDto> bookings = bookingService.search(checkInAt, checkOutAt);


        List<Long> excludedIds = bookings.stream().map(BookingDto::getRoomId).toList();


        Page<RoomDto> rooms = roomService.findAllRoomAvailable(type, capacity, excludedIds, pageable);
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public String save(@RequestBody BookingDto bookingDto,
                       Model model
    ) throws ApplicationException, IOException {
        Booking savedBooking = new Booking();
        String redirectUrl = "";

        if(bookingDto.getPaymentMethod().equals(PaymentMethod.CASH)){
            savedBooking = bookingService.save(bookingDto);
            redirectUrl = "/message/" + savedBooking.getId();

        }else if(bookingDto.getPaymentMethod().equals(PaymentMethod.VNPAY)){
            session.setAttribute("booking",bookingDto);

            redirectUrl = vnPayService.createPayment(bookingDto.getTotal(),request);
        }

//        Booking findById = bookingService.getById(savedBooking.getId());
//
//
//        session.setAttribute("infoBooking", findById);


        return redirectUrl;
    }


    @GetMapping("getAllRoomType")
    public ResponseEntity<?> getAllRoomType() {
        return ResponseEntity.ok(RoomType.values());
    }



    @GetMapping("checkRoomAvailable")
    public ResponseEntity<?> checkRoomAvailable(@RequestParam("roomId") Long roomId,@RequestParam("checkInAt")String checkInAt,
                                                @RequestParam("checkOutAt") String checkOutAt) throws ApplicationException {
        LocalDate checkInDate = null;

        LocalDate checkOutDate = null;
        if (checkInAt != null && checkOutAt != null) {

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            checkInDate = LocalDate.parse(checkInAt, formatter);
            checkOutDate = LocalDate.parse(checkOutAt, formatter);
        }


        roomService.checkRoomAvailable(roomId,checkInDate,checkOutDate);

        return ResponseEntity.ok("Phòng còn trống!");
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


    @GetMapping("calculateTotal")
    public ResponseEntity<?> calculateTotal(
            @RequestParam("originalPriceInput") Double originalPriceInput,
            @RequestParam(value = "voucherId",required = false) Long voucherId,
            @RequestParam("priceCheckbox") Double priceCheckbox
    ) throws ParamInvalidException {

        Double total = originalPriceInput;

        if (priceCheckbox != 0) {
                total += priceCheckbox;
        }

        Double discountedPrice = 0d;

       if(voucherId != null){
           Voucher voucher = voucherService.getById(voucherId);

           System.err.println("ạduiehfiydsghfuys"+voucher.getDiscount()+" type "+voucher.getVoucherType());

           if (voucher.getVoucherType().equals(VoucherType.PERCENT)) {

               Double discountPercent = (double) (voucher.getDiscount() / 100);

               discountedPrice = (total * discountPercent);

               System.err.println(discountedPrice + " total "+total);
           } else {
               discountedPrice = voucher.getDiscount();
           }
           if (discountedPrice > voucher.getMaxApply()) {
               discountedPrice = voucher.getMaxApply();

           }
           System.err.println(discountedPrice);
       }
        Double sumTotal = total - discountedPrice;

        return ResponseEntity.ok(sumTotal);
    }


    @GetMapping("getCoupons")
    public ResponseEntity<List<VoucherDto>> findAll() {
        List<VoucherDto> voucherDtoList = voucherService.getCouponsValidUntil();
        return new ResponseEntity<>(voucherDtoList, HttpStatus.OK);
    }

    @GetMapping("findById")
    public ResponseEntity<VoucherDto> findById(@RequestParam("idVch") Long id ) throws ParamInvalidException{
        VoucherDto voucherDto = voucherService.findById(id);
        return new ResponseEntity<>(voucherDto, HttpStatus.OK);
    }
}

