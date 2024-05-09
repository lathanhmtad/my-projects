package com.hotelbooking.mapper;

import com.hotelbooking.entity.RoomAmenities;
import com.hotelbooking.model.dto.RoomAmenitiesDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class RoomAmenitiesMapper implements Function<RoomAmenities, RoomAmenitiesDto> {
    @Override
    public RoomAmenitiesDto apply(RoomAmenities roomAmenities) {
        return RoomAmenitiesDto.builder()
                .id(roomAmenities.getId())
                .amenities(roomAmenities.getAmenities().getId())
                .room(roomAmenities.getRoom())
                .build();
    }
}