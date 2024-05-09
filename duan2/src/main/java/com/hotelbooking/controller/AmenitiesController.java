package com.hotelbooking.controller;


import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.AmenitiesDto;
import com.hotelbooking.service.AmenitiesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/amenities")
@RequiredArgsConstructor
public class AmenitiesController {

    private final AmenitiesService amenitiesService;
    @PostMapping("saveOrUpdate")
    public ResponseEntity<?> saveOrUpdate(@Valid @RequestBody AmenitiesDto amenitiesDto) {

        System.err.println(amenitiesDto.getName());

        amenitiesService.saveOrUpdate(amenitiesDto);

        return ResponseEntity.ok("Lưu tiện ích thành công!");
    }

    @GetMapping("findAll")
    public ResponseEntity<?> findAll(@RequestParam(value = "page",defaultValue = "0") int page,
                                     @RequestParam(value = "size",defaultValue = "3") int size){
        Pageable pageable = PageRequest.of(page-1,size);

        return ResponseEntity.ok(amenitiesService.getAll(pageable));
    }

    @GetMapping("edit/{id}")
    public ResponseEntity<?> edit(@PathVariable("id") Long id) throws ParamInvalidException {
        return ResponseEntity.ok(amenitiesService.findById(id));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws ParamInvalidException {
        amenitiesService.delete(id);
        return ResponseEntity.ok("Xóa tiện ích thành công!");
    }

    @GetMapping("getAll")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(amenitiesService.getAll());
    }
}
