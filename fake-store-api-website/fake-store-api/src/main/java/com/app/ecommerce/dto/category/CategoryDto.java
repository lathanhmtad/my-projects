package com.app.ecommerce.dto.category;

import com.app.ecommerce.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto extends BaseDto {
    private String name;
    private String alias;
    private String image;
    private Boolean enabled;
    private Boolean hasChildren;
}
