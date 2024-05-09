package com.hotelbooking.model.dto;

import com.hotelbooking.enums.DiscountType;
import com.hotelbooking.enums.RoomType;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiscountDto {

    private Long id;

    private LocalDate startAt;

    private LocalDate endAt;

    private double percentChange;

    private int type;

    private double maxApply;

    private long roomId;

    private List<RoomType> discountsApply;

}
