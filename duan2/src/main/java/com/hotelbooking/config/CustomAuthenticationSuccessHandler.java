package com.hotelbooking.config;

import com.hotelbooking.entity.User;
import com.hotelbooking.enums.Role;
import com.hotelbooking.repository.UserRepository;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;


@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

//    private final PasswordEncoder passwordEncoder;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request
            , HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        HttpSession session = request.getSession();

        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User auth2User = (DefaultOAuth2User) authentication.getPrincipal();

            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            String clientName = oauthToken.getAuthorizedClientRegistrationId();
            String email = getEmailFromAuth2User(auth2User);

            User checkUser = userRepository.findByUsername(email+clientName).orElse(null);
            User user = convertUser(auth2User,clientName);

            if(checkUser !=null){
                user.setId(checkUser.getId());
            }

            session.setAttribute("username",user.getUsername());
            session.setAttribute("fullname",user.getFullname());

            userRepository.save(user);


        }else{
            session.setAttribute("username",authentication.getName());

            User dbUser = userRepository.findByUsername(authentication.getName()).orElse(null);

            session.setAttribute("fullname",dbUser.getFullname());

            for (GrantedAuthority authority : authentication.getAuthorities()) {
                System.err.println(authority.getAuthority());
                if (authority.getAuthority() == Role.ROLE_ADMIN.toString()) {
                    System.err.println(authority.getAuthority());
                    response.sendRedirect("/admin");
                    return;
                }
            }


            System.err.println(session.getAttribute("username"));

            request.getSession().removeAttribute("errorMessage");

        }



        response.sendRedirect("/");
    }


    private String getEmailFromAuth2User(DefaultOAuth2User auth2User) {
        String email = auth2User.getAttribute("email") != null ? auth2User.getAttribute("email")
                : auth2User.getAttribute("id") + "@gmail.com";

        return email;
    }



    private User convertUser(DefaultOAuth2User oAuth2User,String clientName){
        String email = getEmailFromAuth2User(oAuth2User);
        String name = oAuth2User.getAttribute("name");


        UUID uuid = UUID.randomUUID();
        String password = new BCryptPasswordEncoder().encode(uuid.toString());

        User user = new User();
        user.setFullname(name);
        user.setActive(true);
        user.setRole(Role.ROLE_USER);
        user.setUsername(email+clientName);
        user.setPassword(password);
        user.setEmail(email);
//        user.setPhone("phone");
        user.setDelete(false);

        return user;

    }



}
