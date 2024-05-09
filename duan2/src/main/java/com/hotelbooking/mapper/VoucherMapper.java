package com.hotelbooking.mapper;


import com.hotelbooking.entity.Voucher;
import com.hotelbooking.enums.VoucherType;
import com.hotelbooking.model.dto.VoucherDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class VoucherMapper implements Function<Voucher, VoucherDto> {

    @Override
    public VoucherDto apply(Voucher voucher) {
        return VoucherDto.builder()
                .id(voucher.getId())
                .voucherName(voucher.getVoucherName())
                .voucherCode(voucher.getVoucherCode())
                .voucherType(voucher.getVoucherType().equals(VoucherType.PERCENT)?1:2)
                .discount(voucher.getDiscount())
                .quantity(voucher.getQuantity())
                .endAt(voucher.getEndAt())
                .startAt(voucher.getStartAt())
                .minApply(voucher.getMinApply())
                .maxApply(voucher.getMaxApply())
                .notes(voucher.getNotes())
                .build();
    }
}
