package com.hotelbooking.mapper;

import com.hotelbooking.entity.Discount;
import com.hotelbooking.enums.DiscountType;
import com.hotelbooking.model.dto.DiscountDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DiscountMapper implements Function<Discount, DiscountDto> {

    @Override
    public DiscountDto apply(Discount discount) {
        return DiscountDto.builder()
                .id(discount.getId())
                .startAt(discount.getStartAt())
                .endAt(discount.getEndAt())
                .percentChange(discount.getPercentChange())
                .type(discount.getType().equals(DiscountType.INCREASE)? 1: 2)
                .maxApply(discount.getMaxApply())
                .discountsApply(discount.getAllDiscountApply())
                .build();
    }
}
