package com.hotelbooking.service.impl;

import com.hotelbooking.entity.RoomAmenities;
import com.hotelbooking.mapper.RoomAmenitiesMapper;
import com.hotelbooking.model.dto.RoomAmenitiesDto;
import com.hotelbooking.repository.RoomAmenitiesRepository;
import com.hotelbooking.service.RoomAmenitiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomAmenitiesServiceImpl implements RoomAmenitiesService {
    private final RoomAmenitiesRepository roomAmenitiesRepository;
    private final RoomAmenitiesMapper roomAmenitiesMapper;

    @Override
    public List<RoomAmenities> findAllByRoomId(Long id) {
        return roomAmenitiesRepository.findAllByRoomId(id);
    }
}
