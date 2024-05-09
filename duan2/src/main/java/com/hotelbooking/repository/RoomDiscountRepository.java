package com.hotelbooking.repository;

import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.RoomDiscount;
import com.hotelbooking.enums.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomDiscountRepository extends JpaRepository<RoomDiscount,Long> {

    @Query("SELECT b FROM Room a " +
            "JOIN RoomDiscount b ON b.room.id = a.id " +
            "JOIN Discount c ON b.discount.id = c.id " +
            "WHERE a.type = ?1 " +
            "AND c.startAt < CURRENT_DATE " +
            "AND c.endAt > CURRENT_DATE")
    RoomDiscount findByRoomId(RoomType typeRoom);

//    @Query("SELECT a FROM Room a " +
//            "JOIN RoomDiscount b ON b.room.id = a.id " +
//            "JOIN Discount c ON b.discount.id = c.id " +
//            "WHERE c.startAt < CURRENT_DATE " +
//            "AND c.endAt > CURRENT_DATE")
//    List<Room> findRoomByDiscount();

    @Query("SELECT a FROM Room a " +
            "WHERE a NOT IN (" +
            "    SELECT r FROM Room r " +
            "    JOIN RoomDiscount rd ON rd.room.id = r.id " +
            "    JOIN Discount d ON rd.discount.id = d.id " +
            "    WHERE d.startAt < CURRENT_DATE " +
            "    AND d.endAt > CURRENT_DATE" +
            ")")
    List<Room> findRoomNotDiscount();

    List<RoomDiscount> findByDiscountId(Long id);
}
