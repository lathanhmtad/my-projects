package com.hotelbooking.utils;

import com.hotelbooking.entity.User;
import com.hotelbooking.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;



public class AuthenticationUtils {

    public static User getLoggedInUser(UserService userService, HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {

          String username = (String) session.getAttribute("username");

            return userService.findByUsername(username).orElse(null);
        }

        return null;
    }
}
