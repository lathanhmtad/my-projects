package com.hotelbooking.controller;


import com.hotelbooking.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;
    @GetMapping("/received")
    public ResponseEntity<?> getPageBookingByStatusReceived(){
        return ResponseEntity.ok(statisticsService.countByStatusReceived());
    }

    @GetMapping("/waiting")
    public ResponseEntity<?> getPageBookingByStatusWaiting(){
        return ResponseEntity.ok(statisticsService.countByStatusWaiting());
    }

    @GetMapping("/checkout")
    public ResponseEntity<?> getPageBookingByStatusCheckedOut(){
        return ResponseEntity.ok(statisticsService.countByStatusCheckedOut());
    }

    @GetMapping("/top10room")
    public ResponseEntity<?> getTop10(){
        return ResponseEntity.ok(statisticsService.top10Room());
    }

    @GetMapping("/daiLyRevenue")
    public ResponseEntity<?> getDailyRevenue(){
        return ResponseEntity.ok(statisticsService.getDailyRevenue());
    }

    @GetMapping("/monthlyRevenue/{month}:{year}")
    public ResponseEntity<?> getMonthlyRevenue(@PathVariable int month, @PathVariable int year){
        return ResponseEntity.ok(statisticsService.getMonthlyRevenue(month, year));
    }

    @GetMapping("/yearlyRevenue/{year}")
    public ResponseEntity<?> getYearlyRevenue(@PathVariable int year){
        return ResponseEntity.ok(statisticsService.getYearlyRevenue(year));
    }
    @GetMapping("orders/total")
    public int getTotalOrders() {
        return statisticsService.getTotalOrders();
    }
    @GetMapping("customer/total")
    public int getTotalCustomer() {
        return statisticsService.getTotalCustomer();
    }
}
