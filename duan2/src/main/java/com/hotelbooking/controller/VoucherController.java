package com.hotelbooking.controller;

import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.VoucherDto;
import com.hotelbooking.service.VoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin/voucher")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    @PostMapping("saveOrUpdate")
    public ResponseEntity<?> saveOrUpdate(@Valid @RequestBody VoucherDto voucherDto) throws ParamInvalidException {

        voucherService.saveOrUpdate(voucherDto);

        return ResponseEntity.ok("Lưu mã giảm giá thành công! ");
    }

    @GetMapping("findAll")
    public ResponseEntity<?> findAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page - 1, size);

        return ResponseEntity.ok(voucherService.findAll(pageable));

    }

    @GetMapping("edit/{id}")
    public ResponseEntity<?> edit(@PathVariable("id") Long id) throws ParamInvalidException {
        return ResponseEntity.ok(voucherService.findById(id));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws ParamInvalidException {
        voucherService.delete(id);
        return ResponseEntity.ok("Xóa mã giám giá thành công!");
    }

    @GetMapping("getCoupons")
    public ResponseEntity<List<VoucherDto>> findAll() {
        List<VoucherDto> voucherDtoList = voucherService.getCouponsValidUntil();
        return new ResponseEntity<>(voucherDtoList, HttpStatus.OK);
    }

    @GetMapping("findById")
    public ResponseEntity<VoucherDto> findById(@RequestParam("idVch") Long id ) throws ParamInvalidException{
        VoucherDto voucherDto = voucherService.findById(id);
        return new ResponseEntity<>(voucherDto, HttpStatus.OK);
    }

}
