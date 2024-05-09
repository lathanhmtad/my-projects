package com.hotelbooking.repository;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByCheckInAtGreaterThanEqualAndCheckOutAtLessThanEqual(LocalDate checkInAt, LocalDate checkOutAt);

    Page<Booking> findAllByCheckInAtGreaterThanEqualAndCheckOutAtLessThanEqual(LocalDate checkInAt, LocalDate checkOutAt, Pageable pageable);

//    @Query(value = "SELECT * FROM booking " +
//            "WHERE check_in_at >= ?1 AND check_out_at <= ?2 AND status = ?3",
//            nativeQuery = true)
    Page<Booking> findByCheckInAtGreaterThanEqualAndCheckOutAtLessThanEqualAndStatus(LocalDate check_in, LocalDate check_out, BookingStatus status, Pageable pageable);



//     @Query(value = "SELECT * \n" +
//             "FROM booking \n" +
//             "WHERE check_in_at >= ?1 AND check_out_at <= ?2  \n" +
//             "AND status = ?3", nativeQuery = true)
//     Page<Booking> findByCheckInAndCheckOutAndStatus(Date check_in, Date check_out, String status, Pageable pageable);


    @Transactional
    @Modifying
    @Query(value = "UPDATE booking SET status = ?1 WHERE id = ?2", nativeQuery = true)
    void updateBookingStatus(String newStatus, Long bookingId);

    long countByStatus(BookingStatus bookingStatus);

    @Query("SELECT SUM(b.total) FROM Booking b WHERE CAST(b.checkOutAt AS date) = :date AND b.status = :status")
    Double findDailyRevenue(@Param("date") java.sql.Date date, @Param("status") BookingStatus status);

    // Truy vấn doanh thu theo tháng
    @Query("SELECT SUM(b.total) FROM Booking b WHERE FUNCTION('MONTH', b.checkOutAt) = :month AND FUNCTION('YEAR', b.checkOutAt) = :year AND b.status = :status")
    Double findMonthlyRevenue(int month, int year, BookingStatus status);
    // Truy vấn doanh thu theo năm
    @Query("SELECT SUM(b.total) FROM Booking b WHERE FUNCTION('YEAR', b.checkOutAt) = :year AND b.status = :status")
    Double findAnnualRevenue(int year, BookingStatus status);

    Page<Booking> findByStatus(BookingStatus status, Pageable pageable);

    @Query("select b from Booking b where b.user.id = :id")
    List<Booking> findByUser(Long id);



}