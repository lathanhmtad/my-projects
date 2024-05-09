package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Voucher;
import com.hotelbooking.enums.VoucherType;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.mapper.VoucherMapper;
import com.hotelbooking.model.dto.VoucherDto;
import com.hotelbooking.repository.VoucherRepository;
import com.hotelbooking.service.VoucherService;
import com.hotelbooking.utils.ValidatorUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository voucherRepository;

    private final VoucherMapper voucherMapper;


    @Override
    public Voucher saveOrUpdate(VoucherDto voucherDto) throws ParamInvalidException {

        validatorVoucher(voucherDto);

        Voucher voucher = new Voucher();

        BeanUtils.copyProperties(voucherDto, voucher);

        VoucherType voucherType = voucherDto.getVoucherType() == 1 ? VoucherType.PERCENT : VoucherType.PRICE;

        voucher.setVoucherType(voucherType);

        return voucherRepository.save(voucher);
    }

    @Override
    public VoucherDto findById(Long id) throws ParamInvalidException {

        ValidatorUtils.checkNullParam(id);

        return voucherRepository.findById(id).map(voucherMapper).orElse(null);
    }

    @Override
    public Page<VoucherDto> findAll(Pageable pageable) {
        return voucherRepository.findAll(pageable).map(voucherMapper);
    }


    @Override
    public void delete(Long id) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(id);

        voucherRepository.deleteById(id);
    }

    @Override
    public List<VoucherDto> getCouponsValidUntil() {
        return voucherRepository.getCouponsValidUntil().stream().map(voucherMapper).toList();
    }

    @Override
    public void updateQuantityVoucher(Long id) {
        voucherRepository.updateQuantityVoucher(id);
    }


    @Override
    public Voucher getById(Long id){
        return voucherRepository.findById(id).orElse(null);
    }


    public void validatorVoucher(VoucherDto voucherDto) throws ParamInvalidException {

        ValidatorUtils.checkNullParam(
                voucherDto.getVoucherCode(),
                voucherDto.getVoucherName(),
                voucherDto.getVoucherType(),
                voucherDto.getQuantity(),
                voucherDto.getStartAt(),
                voucherDto.getEndAt()
        );

        if (voucherDto.getStartAt().isAfter(voucherDto.getEndAt())) {
            throw new ParamInvalidException("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
        }

    }

}
