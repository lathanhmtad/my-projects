package com.hotelbooking.mapper;

import com.hotelbooking.entity.Amenities;
import com.hotelbooking.entity.Room;
import com.hotelbooking.enums.RoomStatus;
import com.hotelbooking.enums.RoomType;
import com.hotelbooking.model.dto.RoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class RoomMapper implements Function<Room, RoomDto> {

    private final AmenitiesMapper amenitiesMapper;

    @Override
        public RoomDto apply(Room room) {
            return RoomDto.builder()
                    .id(room.getId())
                    .name(room.getName())
                    .description(room.getDescription())
                    .type(RoomType.valueOf(String.valueOf(room.getType())))
                    .status(RoomStatus.valueOf(String.valueOf(room.getStatus())))
                    .price(room.getPrice())
                    .floor(room.getFloor())
                    .capacity(room.getCapacity())
                    .acreage(room.getAcreage())
                    .quantityBed(room.getQuantityBed())
                    .image((room.getImages() != null && !room.getImages().isEmpty()) ? room.getImages().get(0) : null)
                    .amenities(room.getAllAmenities().stream().map(amenitiesMapper).toList())
    //                .isDelete(room.isDelete())
                    .discountedPrice(room.getDiscountedPrice())
                    .build();

    }
}
