package com.app.ecommerce.controller;

import com.app.ecommerce.mapper.RoleMapper;
import com.app.ecommerce.dto.role.RoleDto;
import com.app.ecommerce.repository.RoleRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/roles")
@AllArgsConstructor
public class RoleApi {
    private final RoleRepo roleRepo;
    private final RoleMapper roleMapper;

    @GetMapping
    public ResponseEntity<List<RoleDto>> getRoles() {
        List<RoleDto> roles = roleRepo.findAll().stream().map(roleMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }
}
