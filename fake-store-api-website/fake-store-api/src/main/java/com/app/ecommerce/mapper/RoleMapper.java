package com.app.ecommerce.mapper;

import com.app.ecommerce.entity.Role;
import com.app.ecommerce.dto.role.RoleDto;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper extends Mapper<Role, RoleDto> {
    public RoleMapper() {
        super(Role.class, RoleDto.class);
    }
}
