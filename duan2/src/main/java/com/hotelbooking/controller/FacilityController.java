package com.hotelbooking.controller;

import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.FacilityDto;
import com.hotelbooking.service.FacilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/facility")
@RequiredArgsConstructor
public class FacilityController {

    private final FacilityService facilityService;
    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size){
        return ResponseEntity.ok(facilityService.finAll(page-1,size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws EntityNotFoundException {

        return ResponseEntity.ok(facilityService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> saveOrUpdate(@Valid @RequestBody FacilityDto facilityDto) throws ParamInvalidException {
        facilityService.create(facilityDto);
        return ResponseEntity.ok("Lưu dịch vụ thành công!");
    }

//    @PutMapping("update/{id}")
//    public ResponseEntity<?> update(@RequestBody FacilityDto facilityDto,@PathVariable Long id) throws EntityNotFoundException, ParamInvalidException {
//        facilityService.update(facilityDto,id);
//        return ResponseEntity.ok("Update facility Successfully!");
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws EntityNotFoundException {
        facilityService.delete(id);
        return ResponseEntity.ok("Delete Facility Successfully!");
    }
}
