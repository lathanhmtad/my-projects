package com.app.ecommerce.dto.brand;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BrandRequestDto extends BrandDto {
    private List<String> categoryNames;
}
