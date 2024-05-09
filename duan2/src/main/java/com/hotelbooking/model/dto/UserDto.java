package com.hotelbooking.model.dto;

import com.hotelbooking.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long id;

    private String username;

    private String fullname;

    private String phone;

    private String email;

    private String password;

    private boolean isDelete;

    private boolean active;

    private String confirmPassword;

    private Role role;

}
