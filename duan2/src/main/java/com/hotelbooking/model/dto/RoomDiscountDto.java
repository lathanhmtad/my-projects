package com.hotelbooking.model.dto;

import com.hotelbooking.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDiscountDto {

    Long discountId;

    RoomType roomType;


}
