package com.hotelbooking.service;

import com.hotelbooking.entity.Amenities;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.AmenitiesDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AmenitiesService {
    Amenities saveOrUpdate(AmenitiesDto amenitiesDto);

    AmenitiesDto findById(Long id) throws ParamInvalidException;

    Page<AmenitiesDto> getAll(Pageable pageable);

    void delete(Long id) throws ParamInvalidException;


    List<AmenitiesDto> getAll();
}
