package com.hotelbooking.service;

import com.hotelbooking.entity.User;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.UserDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public interface UserService {
  
    void saveAndUpdate(UserDto userDto);

  
    // Create a new User
    User save(UserDto userDto) throws ParamInvalidException, EntityNotFoundException;

    void update(Long id, UserDto userDto) throws ParamInvalidException, EntityNotFoundException;

    void delete(Long id, HttpSession session) throws EntityNotFoundException, ParamInvalidException;
// find all
    Page<UserDto> finAllUser(Integer page, Integer size) throws EntityNotFoundException;

    UserDto findByUserId(Long id) throws EntityNotFoundException;

    Optional<User> findByUsername(String username);

    Page<UserDto> getAll(Pageable pageable);


    void createUserAdmin();
}
