package com.hotelbooking.web;


import com.hotelbooking.entity.Booking;
import com.hotelbooking.enums.BookingStatus;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminHomeWebController {

    private final BookingService bookingService;

    @GetMapping
    public String home() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();;
        System.err.println(authentication.getAuthorities());

        return "admin/pages-index";
    }

    @GetMapping("discount")
    public String discount() {
        return "admin/discount";
    }

    @GetMapping("amenities")
    public String amenities() {
        return "admin/pages-amenities";
    }

    @GetMapping("account")
    public String user() {
        return "admin/pages-customer";
    }

    @GetMapping("page-room")
    public String room() {
        return "admin/pages-room";
    }

    @GetMapping("service")
    public String service() {
        return "admin/room-service";
    }

    @GetMapping("voucher")
    public String voucher() {
        return "admin/voucher";
    }

    @GetMapping("bill/{id}")
    public String bill(@PathVariable("id") Long id, ModelMap modelMap) throws EntityNotFoundException {
        Booking booking = bookingService.getById(id);
        modelMap.addAttribute("booking", booking);

        return "admin/bill-details";
    }

    @GetMapping("booking")
    public String booking() {
        return "admin/booking";
    }


}
