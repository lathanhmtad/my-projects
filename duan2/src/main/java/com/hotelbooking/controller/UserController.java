package com.hotelbooking.controller;

import com.hotelbooking.enums.Role;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.UserDto;
import com.hotelbooking.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/user")
@RequiredArgsConstructor
public class UserController {


    private  final UserService userService;
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UserDto userDto) throws ParamInvalidException, EntityNotFoundException {
        userService.save(userDto);

        return ResponseEntity.ok("Lưu tài khoản thành công");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody UserDto userDto) throws ParamInvalidException, EntityNotFoundException {
        userService.update(id,userDto);
        return ResponseEntity.ok("Lưu thành công");

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpSession session) throws EntityNotFoundException, ParamInvalidException {
        userService.delete(id,session);
        return ResponseEntity.ok("Xóa thành công tài khoản");
    }

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) throws EntityNotFoundException {

        Pageable pageable = PageRequest.of(page-1,size);

        return ResponseEntity.ok(userService.getAll(pageable));


    }

    @GetMapping("edit/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) throws EntityNotFoundException {
        return ResponseEntity.ok(userService.findByUserId(id));
    }

    @GetMapping("getRoles")
    public ResponseEntity<?> getRole(){
        return ResponseEntity.ok(Role.values());
    }

}
