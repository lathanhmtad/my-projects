package com.hotelbooking.service.impl;

import com.hotelbooking.entity.Discount;
import com.hotelbooking.enums.DiscountType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.mapper.DiscountMapper;
import com.hotelbooking.model.dto.DiscountDto;
import com.hotelbooking.repository.DiscountRepository;
import com.hotelbooking.service.DiscountService;
import com.hotelbooking.utils.ValidatorUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private final DiscountRepository discountRepository;

    private final DiscountMapper discountMapper;
    @Override
    public Page<DiscountDto> getAll(Pageable pageable) {
        return discountRepository
                .findAll(pageable)
                .map(discountMapper);
    }

    @Override
    public void createAndUpdate(DiscountDto discountDto) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(
                discountDto.getStartAt(),
                discountDto.getPercentChange(),
                discountDto.getType(),
                discountDto.getEndAt(),
                discountDto.getMaxApply()
        );

        Discount discount = Discount.builder()
                .id(discountDto.getId())
                .startAt(discountDto.getStartAt())
                .endAt(discountDto.getEndAt())
                .percentChange(discountDto.getPercentChange())
                .maxApply(discountDto.getMaxApply())
                .build();
        DiscountType discountType = discountDto.getType() == 1 ? DiscountType.INCREASE : DiscountType.REDUCE;
        discount.setType(discountType);

        discountRepository.save(discount);
    }

    @Override
    public void delete(Long id) throws ParamInvalidException {
        ValidatorUtils.checkNullParam(id);

        discountRepository.deleteById(id);
    }

    @Override
    public DiscountDto findById(Long id) throws EntityNotFoundException {
        return discountRepository.findById(id)
                .map(discountMapper)
                .orElseThrow(
                        () -> new EntityNotFoundException("Không tìm thấy mãn giảm giá này!!")
                );
    }


}
