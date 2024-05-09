package com.hotelbooking.service;

import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.DiscountDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DiscountService {

    public Page<DiscountDto> getAll(Pageable pageable);

    void createAndUpdate(DiscountDto discountDto) throws ParamInvalidException;

    public void delete(Long id) throws ParamInvalidException;

    public DiscountDto findById(Long id) throws EntityNotFoundException;
}
