package com.hotelbooking.mapper;

import com.hotelbooking.entity.Amenities;
import com.hotelbooking.model.dto.AmenitiesDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AmenitiesMapper implements Function<Amenities, AmenitiesDto> {
    @Override
    public AmenitiesDto apply(Amenities amenities) {
        return  AmenitiesDto.builder()
                .id(amenities.getId())
                .name(amenities.getName())
                .build();
    }
}
