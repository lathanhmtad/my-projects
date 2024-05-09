package com.hotelbooking.model.dto;

import com.hotelbooking.entity.Room;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomAmenitiesDto {
    Long id;
    Long amenities;
    Room room;
}
