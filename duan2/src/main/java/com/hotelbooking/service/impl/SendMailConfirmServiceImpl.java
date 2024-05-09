package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Facility;
import com.hotelbooking.entity.Room;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.FacilityRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.service.BookingService;
import com.hotelbooking.service.EmailService;
import com.hotelbooking.service.SendMailConfirmService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SendMailConfirmServiceImpl implements SendMailConfirmService {

    private final EmailService emailService;

    private final TemplateEngine templateEngine;

    private final BookingRepository bookingRepository;

    private final RoomRepository roomRepository;

    private final FacilityRepository facilityRepository;


    @Override
    public void sendMailConfirmAccount(String link, String email,String fullname) throws ApplicationException {

        Context context = new Context();

        context.setVariable("link", link);
        context.setVariable("fullname",fullname);

        //Tạo html gửi mail
        String contextHtml = templateEngine.process("client/emailConfirmAccount.html",context);

        emailService.sendSimpleMail("XÁC NHẬN TÀI KHOẢN",contextHtml,email);
    }

    @Override
    public void sendMailRequestResetPass(String link, String email, String fullname) throws ApplicationException {
        Context context = new Context();
        context.setVariable("link", link);
        context.setVariable("username",fullname);

        String contextHtml = templateEngine.process("client/emailResetPassword.html",context);

        emailService.sendSimpleMail("YÊU CẦU THAY ĐỔI MẬT KHẨU", contextHtml,email);
    }

    @Override
    public void sendMailBooking(Long bookingId,Long roomId, List<Long> facilityIds, String email) throws ApplicationException, IOException {

        Booking booking = bookingRepository.findById(bookingId).orElse(null);

        Room room = roomRepository.findById(roomId).orElse(null);

        List<Facility> list = facilityRepository.findAllById(facilityIds);

        System.err.println(email);

        Context context = new Context();
        context.setVariable("booking",booking);
        context.setVariable("room",room);
        context.setVariable("facility",list);

        String imagePath = room.getImages().get(0);
        context.setVariable("imagePath","http://localhost:8080/images"+ imagePath);




        String contextHtml = templateEngine.process("client/emailOrderSuccess.html",context);

        emailService.sendSimpleMail("ĐẶT PHÒNG THÀNH CÔNG!", contextHtml,email);
    }
}
