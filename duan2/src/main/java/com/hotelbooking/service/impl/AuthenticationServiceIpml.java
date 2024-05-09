package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Token;
import com.hotelbooking.entity.User;
import com.hotelbooking.enums.Role;
import com.hotelbooking.enums.TokenType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.UserDto;
import com.hotelbooking.model.request.AuthenticationRequest;
import com.hotelbooking.repository.TokenRepository;
import com.hotelbooking.repository.UserRepository;
import com.hotelbooking.service.AuthenticationService;
import com.hotelbooking.service.EmailService;
import com.hotelbooking.service.SendMailConfirmService;
import com.hotelbooking.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceIpml implements AuthenticationService {

    private final UserRepository userRepository;

    private final TokenService tokenService;

    private final TokenRepository tokenRepository;

    private final SendMailConfirmService sendMailConfirmService;

    private final PasswordEncoder passwordEncoder;

    @Value("${app.auth.resetPasswordLink}")
    private String resetPasswordLink;

    @Value("${app.auth.confirmAccountLink}")
    private String confirmAccountLink;


    @Override
    public void register(UserDto userDto) throws ApplicationException {
        User userExits = userRepository.findByUsername(userDto.getUsername()).orElse(null);

        System.err.println(userExits);

        if (!userDto.getConfirmPassword().equals(userDto.getPassword())){
            throw new ParamInvalidException("Mật khẩu không trùng khớp");
        }
//        if (userExits != null){
//            if (userExits.getId() == userDto.getId()){
//                throw new EntityNotFoundException("Tài khoản đã tồn tại!!");
//            }
//        }

        User user = User.builder()
                .id(userDto.getId())
                .username(userDto.getUsername())
                .fullname(userDto.getFullname())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .phone(userDto.getPhone())
                .email(userDto.getEmail())
                .role(Role.ROLE_USER)
                .build();

        user.setActive(false);
        User saveUser = userRepository.save(user);

        Token token = tokenService.generateToken(saveUser, TokenType.REGISTER);

        String link = confirmAccountLink + token.getToken();

        // Gửi mail token về cho clent để xác nhận tài khoản ở đây nha
        sendMailConfirmService.sendMailConfirmAccount(link, user.getEmail(),user.getFullname());

    }

    @Override
    public void activeAccount(String token) throws EntityNotFoundException {
        User user = tokenRepository.findUserByToken(token).orElseThrow(
                () -> new EntityNotFoundException("Mã token có vẻ đã bị thay đổi hoặc không có!")
        );

        user.setActive(true);

        Token tokenCurrent = tokenRepository.findByToken(token);

        tokenRepository.delete(tokenCurrent);
    }

    @Override
    public void requestForgotPassword(String username) throws ApplicationException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng có username: " + username));

//        String token = tokenRepository.getTokenByUser(username);

        Token token = tokenService.generateToken(user,TokenType.FORGET_PASSWORD);

        String link = resetPasswordLink + token.getToken();

        // thực hiện gửi mail reset password tai day
        // Du lieu truyen di gom link va user
        sendMailConfirmService.sendMailRequestResetPass(link, user.getEmail(), user.getFullname());
    }

    @Override
    public void resetPassword(AuthenticationRequest authenticationRequest) throws EntityNotFoundException, ParamInvalidException {
        User user = tokenRepository.findUserByToken(authenticationRequest.getToken()).orElseThrow(
                () -> new EntityNotFoundException("Không tìm thấy người dùng này!")
        );
        Token token = tokenRepository.findByToken(authenticationRequest.getToken());

        if (LocalDateTime.now().isAfter(token.getExpiredAt())){
            throw new ParamInvalidException("Đoạn mã bảo mật đã quá thời hạn. Vui lòng thử lại!");
        }
        user.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));

        userRepository.save(user);

        tokenRepository.delete(token);
    }

}
