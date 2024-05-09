package com.hotelbooking.repository;

import com.hotelbooking.entity.BookingFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingFacilityRepository extends JpaRepository<BookingFacility, Long> {
    @Query(value= "select * from booking_facility where booking_id =  ?1" , nativeQuery = true)
    List<BookingFacility> findByBookingId(Long bookingId);


}
