package com.app.ecommerce.dto.category;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CategoryRequestDto extends CategoryDto {
    private MultipartFile imageFile;
    private Long parentId;
    private String parentName;
}
