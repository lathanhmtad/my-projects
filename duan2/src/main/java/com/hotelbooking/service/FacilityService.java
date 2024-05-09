package com.hotelbooking.service;

import com.hotelbooking.entity.Facility;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.FacilityDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FacilityService {
    Page<FacilityDto> finAll(Integer page, Integer size);


//    findById
    FacilityDto findById(Long id) throws EntityNotFoundException;

    Facility create(FacilityDto facilityDto) throws ParamInvalidException;

    Facility update(FacilityDto facilityDto, Long id) throws ParamInvalidException, EntityNotFoundException;

    void delete(Long id) throws EntityNotFoundException;
    List<Facility> getAll();
}
