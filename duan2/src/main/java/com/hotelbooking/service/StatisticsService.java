package com.hotelbooking.service;

import com.hotelbooking.model.dto.RoomDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface StatisticsService {
    long countByStatusReceived();

    long countByStatusWaiting();

    long countByStatusCheckedOut();

    List<RoomDto> top10Room();

    Double getDailyRevenue();

    Double getMonthlyRevenue(int year, int month);

    Double getYearlyRevenue(int year);

	int getTotalCustomer();

	int getTotalOrders();
}
