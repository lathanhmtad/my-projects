package com.hotelbooking.service.impl;


import com.hotelbooking.entity.Amenities;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.mapper.AmenitiesMapper;
import com.hotelbooking.model.dto.AmenitiesDto;
import com.hotelbooking.repository.AmenitiesRepository;
import com.hotelbooking.service.AmenitiesService;
import com.hotelbooking.utils.ValidatorUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AmenitiesServiceImpl implements AmenitiesService {

    private final AmenitiesRepository amenitiesRepository;

    private final AmenitiesMapper amenitiesMapper;

    @Override
    public Amenities saveOrUpdate(AmenitiesDto amenitiesDto) {

        Amenities amenities = new Amenities();

        BeanUtils.copyProperties(amenitiesDto, amenities);

        return amenitiesRepository.save(amenities);
    }


    @Override
    public AmenitiesDto findById(Long id) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(id);
         return amenitiesRepository.findById(id).map(amenitiesMapper).orElse(null);
    }

    @Override
    public Page<AmenitiesDto> getAll(Pageable pageable){
        return amenitiesRepository.findAll(pageable).map(amenitiesMapper);
    }

    @Override
    public void delete(Long id) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(id);
         amenitiesRepository.deleteById(id);
    }



    @Override
    public List<AmenitiesDto> getAll(){
       return amenitiesRepository.findAll().stream().map(amenitiesMapper).toList();
    }

}
