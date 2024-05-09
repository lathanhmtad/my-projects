package com.hotelbooking.utils;


import com.hotelbooking.entity.Discount;
import com.hotelbooking.entity.RoomDiscount;
import com.hotelbooking.repository.RoomDiscountRepository;
import com.hotelbooking.service.DiscountService;
import com.hotelbooking.service.RoomDiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class ScheduledTask {

    private final DiscountService discountService;
    private final RoomDiscountRepository roomDiscountRepository;

    @Scheduled(fixedRate = 604800000)
    public void runTask() {
        List<RoomDiscount> list = roomDiscountRepository.findAll();

        System.err.println("Đã chạy");

        List<Long> ids = new ArrayList<>();

        LocalDate now = LocalDate.now();

        for (RoomDiscount roomDiscount : list) {
            Discount discount = new Discount();

            if (discount.getEndAt().isBefore(now)) {
                ids.add(roomDiscount.getId());
            }

        }

        roomDiscountRepository.deleteAllById(ids);

    }
}
