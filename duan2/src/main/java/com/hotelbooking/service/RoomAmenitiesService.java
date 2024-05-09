package com.hotelbooking.service;

import com.hotelbooking.entity.RoomAmenities;
import com.hotelbooking.model.dto.RoomAmenitiesDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomAmenitiesService {

    List<RoomAmenities> findAllByRoomId(Long id);
}
