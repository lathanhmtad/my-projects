package com.app.ecommerce.dto.user;

import com.app.ecommerce.dto.BaseDto;
import com.app.ecommerce.dto.role.RoleDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@JsonPropertyOrder(value =
        {"id", "fullName", "email", "avatar", "enabled", "roles", "createdDate", "createdBy", "modifiedDate", "modifiedBy"}
)
public class UserDto extends BaseDto  {
    private String email;
    private String fullName;
    private String avatar;
    private Boolean enabled;
    private List<RoleDto> roles;
}
