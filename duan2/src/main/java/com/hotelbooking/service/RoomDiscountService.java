package com.hotelbooking.service;

import com.hotelbooking.enums.RoomType;
import com.hotelbooking.exception.common.EntityNotFoundException;
import com.hotelbooking.exception.common.ParamInvalidException;
import com.hotelbooking.model.dto.RoomDto;

public interface RoomDiscountService {
    void addDiscountForAllRoom(Long discountId) throws EntityNotFoundException;

    void addDiscountForRoom(RoomType roomType, Long discountId) throws ParamInvalidException, EntityNotFoundException;

    void removeDiscountForRoom(Long id) throws EntityNotFoundException;

}
