package com.hotelbooking.service.impl;


import com.hotelbooking.entity.*;
import com.hotelbooking.enums.BookingStatus;
import com.hotelbooking.enums.PaymentMethod;
import com.hotelbooking.enums.PaymentStatus;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.mapper.BookingMapper;
import com.hotelbooking.mapper.VoucherMapper;
import com.hotelbooking.model.dto.BookingDto;
import com.hotelbooking.model.dto.VoucherDto;
import com.hotelbooking.repository.BookingFacilityRepository;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.FacilityRepository;
import com.hotelbooking.repository.VoucherRepository;
import com.hotelbooking.service.*;
import com.hotelbooking.utils.AuthenticationUtils;
import com.hotelbooking.utils.ValidatorUtils;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;

import java.time.format.DateTimeFormatter;
import java.util.Date;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final VoucherRepository voucherRepository;
    private final VoucherMapper voucherMapper;
    private final BookingFacilityRepository bookingFacilityRepository;
    private final FacilityRepository facilityRepository;

    private final RoomService roomService;

    private final UserService userService;

    private final HttpSession httpSession;

    private final SendMailConfirmService sendMailConfirmService;

    @Override
    public Page<BookingDto> getAll(Pageable pageable) {
        return bookingRepository.findAll(pageable).map(bookingMapper);
    }

    @Override
    public BookingDto findById(Long id) throws EntityNotFoundException {
        return bookingRepository.findById(id).map(bookingMapper).orElseThrow(() -> new EntityNotFoundException("Booking not found"));
    }


    @Transactional
    @Override
    public Booking save(BookingDto bookingDto) throws ApplicationException, IOException {
        validatorBooking(bookingDto);
        Booking booking = new Booking();

        roomService.checkRoomAvailable(bookingDto.getRoomId(),bookingDto.getCheckInAt(),bookingDto.getCheckOutAt());



//        Optional.ofNullable(bookingDto.getUserId())
//                .ifPresent(userId -> {
//                    User user = new User();
//                    user.setId(userId);
//                    booking.setUser(user);
//                });

        Optional.ofNullable(bookingDto.getRoomId())
                .ifPresent(roomId -> {
                    Room room = new Room();
                    room.setId(roomId);
                    booking.setRoom(room);
                });

        if (bookingDto.getVoucherId() != null) {
            Optional.ofNullable(bookingDto.getVoucherId())
                    .ifPresent(voucherId -> {
                        Voucher voucher = new Voucher();
                        voucher.setId(voucherId);
                        booking.setVoucher(voucher);
                        Optional<VoucherDto> voucherDto = voucherRepository.findById(voucherId).map(voucherMapper);
                        if (voucherDto.isPresent()) {
                            Long foundVoucherId = voucherDto.get().getId();
                            voucherRepository.updateQuantityVoucher(foundVoucherId);
                        }

                    });

//                    Long totalPrice = bo
        }


        BeanUtils.copyProperties(bookingDto, booking);
        booking.setStatus(BookingStatus.WAITING);


        booking.setPaymentStatus(bookingDto.getPaymentMethod().equals(PaymentMethod.CASH) ? PaymentStatus.UNPAID : PaymentStatus.PAID);

        User user = AuthenticationUtils.getLoggedInUser(userService,httpSession);

        booking.setUser(user);

        Booking savedBooking = bookingRepository.save(booking);

        List<Long> facilityIds = bookingDto.getFacilityId();
        if (facilityIds != null && !facilityIds.isEmpty()) {
            for (Long id : facilityIds) {
                BookingFacility bookingFacility = new BookingFacility();
                bookingFacility.setBooking(savedBooking);

                LocalDate currentDate = LocalDate.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                String formattedDate = currentDate.format(formatter);

                bookingFacility.setCreateAt(LocalDate.parse(formattedDate));

                Facility facility = facilityRepository.findById(id).orElse(null);
                if (facility != null) {
                    bookingFacility.setFacility(facility);
                    bookingFacility.setTotalPrice(facility.getPrice());
                    bookingFacilityRepository.save(bookingFacility);
                }
            }
        }


//        sendMailConfirmService.sendMailBooking(savedBooking.getId(),bookingDto.getRoomId(),facilityIds,user.getEmail());

        return savedBooking;
    }


    @Override
    public BookingDto update(Long id, BookingDto bookingDto) throws EntityNotFoundException {
        bookingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        Booking booking = new Booking();
        bookingDto.setId(id);
        BeanUtils.copyProperties(bookingDto, booking);

        return bookingMapper.apply(bookingRepository.save(booking));
    }

    @Override
    public void delete(Long id) throws EntityNotFoundException {
        bookingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        bookingRepository.deleteById(id);
    }

    @Override
    public List<BookingDto> search(LocalDate checkInAt, LocalDate checkOutAt) {
        return bookingRepository.findAllByCheckInAtGreaterThanEqualAndCheckOutAtLessThanEqual(checkInAt, checkOutAt).stream().map(bookingMapper).toList();
    }

    @Override
    public Page<BookingDto> search(LocalDate checkInAt, LocalDate checkOutAt, Pageable pageable) {
        return bookingRepository.findAllByCheckInAtGreaterThanEqualAndCheckOutAtLessThanEqual(checkInAt, checkOutAt, pageable).map(bookingMapper);
    }

    @Override
    public Page<BookingDto> getBooking(LocalDate check_in, LocalDate check_out, BookingStatus status, Pageable pageable) throws ParamInvalidException {
//        ValidatorUtils.checkNullParam(check_in, check_out, status);

        System.err.println("status : " + status);

        if (check_in == null || check_out == null) {

            if (status != null) {

                return bookingRepository.findByStatus(status, pageable).map(bookingMapper);
            }

            return bookingRepository.findAll(pageable).map(bookingMapper);

        }

        if (status == null || status.equals("")) {
            System.err.println("check in : " + check_in + " checkout " + check_out);
            return search(check_in, check_out, pageable);
        }

        System.err.println("status : " + status);

        return bookingRepository.findByCheckInAtGreaterThanEqualAndCheckOutAtLessThanEqualAndStatus(check_in, check_out, status, pageable).map(bookingMapper);
    }

    @Override
    public void updateBookingStatus(String newStatus, Long id) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(newStatus, id);
        bookingRepository.updateBookingStatus(newStatus, id);
    }

    @Override
    public Booking getById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public Booking saveOrUpdate(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> findByUser(Long id) {
        return bookingRepository.findByUser(id);
    }


    public void validatorBooking(BookingDto bookingDto) throws ParamInvalidException {
        LocalDate now = LocalDate.now();

        if(bookingDto.getCheckInAt().isAfter(bookingDto.getCheckOutAt())){
            throw new ParamInvalidException("Vui lòng chọn ngày nhận phòng và trả phòng hợp lệ!");
        }

        if(bookingDto.getCheckInAt().isBefore(now)){
            throw new ParamInvalidException("Vui lòng chọn ngày nhận phòng hợp lệ!");
        }
    }



}
