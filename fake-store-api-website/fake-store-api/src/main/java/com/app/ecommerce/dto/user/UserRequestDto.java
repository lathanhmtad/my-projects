package com.app.ecommerce.dto.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class UserRequestDto extends UserDto {
    private String password;
    private MultipartFile avatarFile;
    private List<Long> roleIds;
    private List<String> roleNames;
}
