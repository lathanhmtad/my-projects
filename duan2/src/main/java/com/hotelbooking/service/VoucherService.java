package com.hotelbooking.service;

import com.hotelbooking.entity.Voucher;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.VoucherDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface VoucherService {
    Voucher saveOrUpdate(VoucherDto voucherDto) throws ParamInvalidException;

    VoucherDto findById(Long id) throws ParamInvalidException;

    Page<VoucherDto> findAll(Pageable pageable);

    void delete(Long id) throws ParamInvalidException;

    List<VoucherDto> getCouponsValidUntil();

    void updateQuantityVoucher(Long id);

    Voucher getById(Long id);
}
