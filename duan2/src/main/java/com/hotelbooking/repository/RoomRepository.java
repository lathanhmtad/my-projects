package com.hotelbooking.repository;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Room;
import com.hotelbooking.enums.RoomStatus;
import com.hotelbooking.enums.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r " +
            "WHERE r.status = :status " +
            "AND r.type = :type " +
            "AND r.capacity = :capacity " +
            "AND r.isDelete = :isDelete")
    Page<Room> findAllByStatusAndTypeAndCapacityAndIsDelete(
            @Param("status") RoomStatus status,
            @Param("type") RoomType type,
            @Param("capacity") int capacity,
            @Param("isDelete") boolean isDelete,
            Pageable pageable
    );
//    Page<Room> findAllByStatusAndTypeAndCapacityAndIsDelete(RoomStatus status, RoomType type, int capacity, boolean delete, Pageable pageable);

    Page<Room> findAllByStatusAndTypeAndCapacityAndIsDeleteAndIdNotIn(RoomStatus status, RoomType type, int capacity, boolean delete, List<Long> ids, Pageable pageable);

    @Query("SELECT r FROM Room r WHERE r.type = ?1")
    List<Room> findByType(RoomType type);

    @Query("select r from Room r where r.isDelete = :isDelete")
    Page<Room> findAllByDelete(Boolean isDelete, Pageable pageable);


    @Query("SELECT r FROM Room r INNER JOIN Booking b on r.id = b.room.id GROUP BY r ORDER BY SUM(b.total) DESC")
    Page<Room> findTop10ByTotalRevenue(Pageable pageable);


    Page<Room> findAllByStatus(RoomStatus status, Pageable pageable);

    Page<Room> findAllByStatusAndTypeAndCapacityAndIdNotIn(RoomStatus status, RoomType type, int capacity, List<Long> ids, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN FALSE ELSE TRUE END FROM Booking b WHERE b.status != 'CANCELLED' AND b.room.id = ?1 AND b.checkInAt <= ?2 AND b.checkOutAt >= ?3")
    Boolean checkRoomAvailable(Long roomId, LocalDate from, LocalDate to);


    @Query("select b from Booking b where b.status !='CANCELLED' and b.checkOutAt > :date and b.room.id =:roomId")
    List<Booking> findByDateAndRoom(LocalDate date,Long roomId);


}