package com.app.payload.category;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CategoryRequest extends CategoryDto {
    private MultipartFile imageFile;
    private Long parentId;
    private String parentName;
}
