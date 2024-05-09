package com.hotelbooking.web;

import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.BookingDto;
import com.hotelbooking.service.AuthenticationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.*;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.AmenitiesDto;
import com.hotelbooking.model.dto.RoomAmenitiesDto;
import com.hotelbooking.model.dto.RoomDto;
import com.hotelbooking.repository.RoomAmenitiesRepository;
import com.hotelbooking.service.*;
import com.hotelbooking.service.impl.BookingFacilityServiceImpl;
import com.hotelbooking.service.impl.RoomAmenitiesServiceImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.User;
import com.hotelbooking.service.BookingService;
import com.hotelbooking.service.RoomService;
import com.hotelbooking.service.UserService;
import com.hotelbooking.utils.AuthenticationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
@RequiredArgsConstructor
public class ClientWebController {

    private final AuthenticationService authenticationService;

    private final HttpSession session;

    private final RoomService roomService;
    private final RoomAmenitiesService roomAmenitiesService;
    private final AmenitiesService amenitiesService;
    private final FacilityService facilityService;
    private final TokenService tokenService;
    private final BookingService bookingService;
    private final UserService userService;



    @GetMapping
    public String home() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();;
        System.err.println(authentication.getAuthorities() +" đayt là quyền");
        return "client/home";
    }

    @GetMapping("login")
    public String login() {
        return "client/login";
    }

    @GetMapping("register")
    public String register() {
        return "client/register";
    }


    @GetMapping("room/{id}")
    public String room(@PathVariable Long id, ModelMap modelMap) {
        Room room = roomService.getById(id);

        if (room == null) {
            return "redirect:/errors";
        }

        modelMap.addAttribute("room", room);
        return "client/roomdetails";
    }

    @GetMapping("search")
    public String search() {
        return "client/search";
    }

    @GetMapping("forget-password")
    public String forgetPassword() {
        return "client/forget-password";
    }

    @GetMapping("introduce")
    public String introduce() {
        return "client/introduce";
    }

    @GetMapping("booking-room")
    public String booking(
            @RequestParam("CheckIn") String checkIn,
            @RequestParam("CheckOut") String checkOut,
            @RequestParam("ID") Long id,
            Model model
    ) throws EntityNotFoundException, ParamInvalidException {
        Room room = roomService.getById(id);
        model.addAttribute("checkInDate", checkIn);
        model.addAttribute("checkOutDate", checkOut);
        model.addAttribute("room", room);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate startDate = LocalDate.parse(checkIn, formatter);
        LocalDate endDate = LocalDate.parse(checkOut, formatter);

        long numberOfDays = ChronoUnit.DAYS.between(startDate, endDate);

        long total = (long) (room.getDiscountedPrice() * numberOfDays);
        model.addAttribute("numberOfDays", numberOfDays);
        model.addAttribute("total", total);

        List<RoomAmenities> amenitiesList = roomAmenitiesService.findAllByRoomId(id);
        List<Amenities> displayAmenities = new ArrayList<>();

        int count = 0;
        for (RoomAmenities item : amenitiesList) {
            displayAmenities.add(item.getAmenities());
            count++;
            if (count >= 4) {
                break;
            }
        }
        model.addAttribute("amenities", displayAmenities);

        List<Facility> facilityList = facilityService.getAll();
        model.addAttribute("facilityList", facilityList);


        return "client/booking";
    }


    @GetMapping("changePassword")
    public String changePassword() {
        return "client/changePassword";
    }

    @GetMapping("confirmAccount")
    public String activeAccount(@RequestParam String token, ModelMap modelMap) throws EntityNotFoundException {
        User user = tokenService.getUserByToken(token);

        modelMap.addAttribute("fullname", user.getFullname());

        authenticationService.activeAccount(token);

        return "client/activeAccount";
    }

    @GetMapping("booking-history")
    public String bookingHistory(ModelMap modelMap) {

        User user = AuthenticationUtils.getLoggedInUser(userService, session);

        System.err.println(user.getId());

        List<Booking> list = bookingService.findByUser(user.getId());

        if(list.size() >0){
            Collections.sort(list, Comparator.comparing(Booking::getCreateAt).reversed());
        }


        modelMap.addAttribute("list", list);

        return "client/booking-history";
    }

    @GetMapping("bill-details/{id}")
    public String billDetails(@PathVariable("id") Long id, ModelMap modelMap) {

        Booking booking = bookingService.getById(id);

        System.err.println(booking.getId());

        if (booking.getId() == null) {
            return "redirect:/errors";
        }
        User user = AuthenticationUtils.getLoggedInUser(userService, session);

        if (user.getId() != booking.getUser().getId()) {
            return "redirect:/errors";
        }

        long daysBetween = ChronoUnit.DAYS.between(booking.getCheckInAt(), booking.getCheckOutAt());

        modelMap.addAttribute("daysBetween", daysBetween);
        modelMap.addAttribute("booking", booking);

        return "client/bill-details";
    }

    @GetMapping("message/{id}")
    public String message(@PathVariable("id") Long id, ModelMap modelMap) {
        Booking booking = bookingService.getById(id);

        if (booking == null) {
            return "redirect:/errors";
        }

        modelMap.addAttribute("booking", booking);

        return "client/message";
    }


    @GetMapping("payment-notification")
    public String paymentNotification(@RequestParam("vnp_ResponseCode") Long status, @RequestParam("vnp_Amount") Double amount) throws ApplicationException, IOException {

        if (status == 00) {
            BookingDto bookingDto = (BookingDto) session.getAttribute("booking");

            Booking booking = bookingService.save(bookingDto);

            return "redirect:/message/" + booking.getId();
        }

        return "redirect:/booking-error";
    }


    @GetMapping("contact")
    public String contact() {
        return "client/contact";
    }

    @GetMapping("profile")
    public String profile(ModelMap modelMap){
        User user = AuthenticationUtils.getLoggedInUser(userService,session);

        modelMap.addAttribute("user",user);

        return "client/editProfile";
    }

    @GetMapping("errors")
    public String error() {
        return "client/404Error";
    }

    @GetMapping("booking-error")
    public String bookingError(){
        return "client/booking-error";
    }

    @GetMapping("order-email-success")
    public String orderSuccess(){
        return "client/emailOrderSuccess";
    }
}
