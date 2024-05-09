package com.hotelbooking.controller;

import com.hotelbooking.entity.Discount;
import com.hotelbooking.enums.RoomType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.DiscountDto;
import com.hotelbooking.model.dto.RoomDiscountDto;
import com.hotelbooking.service.DiscountService;
import com.hotelbooking.service.RoomDiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;
    private final RoomDiscountService roomDiscountService;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size);


        return ResponseEntity.ok(discountService.getAll(pageable));
    }


    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody DiscountDto discountDto) throws ParamInvalidException {
        System.out.println("abcd");
        discountService.createAndUpdate(discountDto);

        return ResponseEntity.ok("Lưu thành công");
    }


    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ParamInvalidException {

        discountService.delete(id);

        return ResponseEntity.ok("Xóa thành công");
    }

    @GetMapping("edit/{id}")
    public ResponseEntity<?> edit(@PathVariable("id") Long id) throws ParamInvalidException, EntityNotFoundException {
        return ResponseEntity.ok(discountService.findById(id));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws EntityNotFoundException {
        return ResponseEntity.ok(discountService.findById(id));
    }


    @PostMapping("/addDiscountForAllRoom")
    public ResponseEntity<?> addDiscountForAllRoom(@RequestBody RoomDiscountDto roomDiscountDto) throws EntityNotFoundException {

        roomDiscountService.addDiscountForAllRoom(roomDiscountDto.getDiscountId());

        return ResponseEntity.ok("Đã thêm thành công mã giảm giá cho tất cả các phòng");
    }


@PostMapping("/addDiscountForRoom")
    public ResponseEntity<?> addDiscountForRoom(@RequestBody RoomDiscountDto roomDiscountDto) throws ParamInvalidException, EntityNotFoundException {

        roomDiscountService.addDiscountForRoom(roomDiscountDto.getRoomType(), roomDiscountDto.getDiscountId());

        return ResponseEntity.ok("Đã thêm thành công mã giảm giá cho loại phòng");
    }
  
    @DeleteMapping("removeDiscountForRoom/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) throws EntityNotFoundException {

        roomDiscountService.removeDiscountForRoom(id);

        return ResponseEntity.ok("Hủy bỏ áp dụng thành công");
    }
  
    @GetMapping("/roomTypes")
    public ResponseEntity<?> getRoomTypes() {
        return ResponseEntity.ok(RoomType.values());
    }
}

