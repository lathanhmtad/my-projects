package com.hotelbooking.repository;

import com.hotelbooking.entity.RoomImage;
import com.hotelbooking.model.dto.RoomImageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomImageRepository extends JpaRepository<RoomImage, RoomImageDto> {

    @Query("select r from RoomImage r where r.room.id = :id")
    List<RoomImage> getAllByRoom(Long id);

}