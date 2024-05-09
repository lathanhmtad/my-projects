package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.User;
import com.hotelbooking.enums.Role;
import com.hotelbooking.mapper.RoomMapper;
import com.hotelbooking.model.dto.RoomDto;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.repository.UserRepository;
import com.hotelbooking.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import static com.hotelbooking.enums.BookingStatus.*;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final UserRepository userRepository;

    @Override
    public long countByStatusReceived(){
        return bookingRepository.countByStatus(RECEIVED);
    }

    @Override
    public long countByStatusWaiting(){
        return bookingRepository.countByStatus(WAITING);
    }

    @Override
    public long countByStatusCheckedOut(){
        return bookingRepository.countByStatus(CHECKED_OUT);
    }

    @Override
    public List<RoomDto> top10Room(){
        Pageable topTen = PageRequest.of(0, 10);

        Page<Room> topRooms = roomRepository.findTop10ByTotalRevenue(topTen);

        List<Room> rooms = topRooms.getContent();

        return rooms.stream().map(roomMapper::apply).toList();
    }

    @Override
    public Double getDailyRevenue(){
        LocalDate today = LocalDate.now();
        Date datesql = Date.valueOf(today);
        System.out.println(datesql);
        return  bookingRepository.findDailyRevenue(datesql, CHECKED_OUT);
    }

    @Override
    public Double getMonthlyRevenue(int year, int month){
        return bookingRepository.findMonthlyRevenue(year, month,CHECKED_OUT);
    }

    @Override
    public Double getYearlyRevenue(int year){
        return bookingRepository.findAnnualRevenue(year,CHECKED_OUT);
    }
    
    @Override
	public int getTotalOrders() {
        List<Booking> orders = bookingRepository.findAll();
        return orders.size();
    }
    @Override
	public int getTotalCustomer() {
        List<User> users = userRepository.findAllByRole(Role.ROLE_USER);
        return users.size();
    }
    
    
}
