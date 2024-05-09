package com.app.ecommerce.dto.brand;

import com.app.ecommerce.dto.BaseDto;
import com.app.ecommerce.dto.category.CategoryDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BrandDto extends BaseDto {
    private String name;
    private String logo;
    private List<CategoryDto> categories;
}
