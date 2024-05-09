package com.hotelbooking.mapper;

import com.hotelbooking.entity.RoomImage;
import com.hotelbooking.model.dto.RoomImageDto;

import java.util.function.Function;

public class RoomImageMapper implements Function<RoomImage, RoomImageDto> {
    @Override
    public RoomImageDto apply(RoomImage roomImage) {
        return RoomImageDto.builder()
                .id(roomImage.getId())
                .imageUrl(roomImage.getImageUrl())
                .room(roomImage.getRoom().getId())
                .build();
    }
}