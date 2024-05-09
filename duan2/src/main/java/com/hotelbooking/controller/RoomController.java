package com.hotelbooking.controller;

import com.hotelbooking.enums.RoomType;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.exception.core.ApplicationException;
import com.hotelbooking.model.dto.RoomDto;
import com.hotelbooking.service.RoomService;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@MultipartConfig
@RequestMapping("/admin/room")
@RequiredArgsConstructor
public class RoomController{
    private final RoomService roomService;

    @GetMapping()
    public ResponseEntity<Page<RoomDto>> getBooking(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer size) throws ParamInvalidException {
        Pageable pageable = PageRequest.of(page-1, size);
        Page<RoomDto> roomDtos = roomService.findAllByDelete(false,pageable);
        return ResponseEntity.ok(roomDtos);
    }

    @PostMapping()
    ResponseEntity<String> createOrUpdate(@Valid @ModelAttribute RoomDto roomDto) throws ParamInvalidException {
        roomService.createOrUpdate(roomDto);

        return ResponseEntity.ok().body("Lưu phòng thành công!");
    }

    @GetMapping("/{id}")
    ResponseEntity<RoomDto> findById(@PathVariable("id") Long id) throws ApplicationException {
        RoomDto roomDto = roomService.findById(id);
        return ResponseEntity.ok(roomDto);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> delete(@PathVariable("id") Long id) throws ApplicationException {
        roomService.delete(id);
        return ResponseEntity.ok().body("Xóa Thành Công");
    }

    @GetMapping("getAllRoomType")
    public ResponseEntity<?> getAllRoomType(){
        return  ResponseEntity.ok(RoomType.values());
    }


}