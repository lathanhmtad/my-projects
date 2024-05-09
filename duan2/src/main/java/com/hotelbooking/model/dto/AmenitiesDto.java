package com.hotelbooking.model.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.WithBy;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmenitiesDto {
    private Long id;
    @NotBlank(message = "Vui lòng nhập tên tiện ích!")
    private String name;
}
