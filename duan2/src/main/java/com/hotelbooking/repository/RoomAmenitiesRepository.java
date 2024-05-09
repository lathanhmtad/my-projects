package com.hotelbooking.repository;

import com.hotelbooking.entity.RoomAmenities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomAmenitiesRepository extends JpaRepository<RoomAmenities , Long> {
    @Query(value = "SELECT * FROM room_amenities WHERE room_id = ?1", nativeQuery = true)
    List<RoomAmenities> findAllByRoomId(Long roomId);
}