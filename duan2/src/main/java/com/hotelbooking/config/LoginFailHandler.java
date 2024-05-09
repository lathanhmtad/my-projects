package com.hotelbooking.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LoginFailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        try {
            String errorMessage = "";

            if (exception instanceof BadCredentialsException) {
                errorMessage = "Mật khẩu hoặc tên đăng nhập không đúng!";

            } else if (exception instanceof LockedException) {
                errorMessage = "Tài khoản của bạn đã bị khóa ! Vui lòng thử lại!";
            } else if (exception instanceof DisabledException) {
                errorMessage = "Your account has been disabled. Please contact support.";
            } else {
                errorMessage = "Không tìm thấy tài khoản!";
            }

            System.err.println(errorMessage);

            request.getSession().setAttribute("errorMessage", errorMessage);

            response.sendRedirect(request.getContextPath() + "/login?error");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
