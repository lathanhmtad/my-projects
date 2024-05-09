package com.app.ecommerce.controller;

import com.app.ecommerce.entity.product.Category;
import com.app.ecommerce.dto.category.CategoryDto;
import com.app.ecommerce.dto.category.CategoryRequestDto;
import com.app.ecommerce.service.impl.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
public class CateApi extends GenericApi<Category, CategoryDto, CategoryRequestDto> {
    public CateApi(CategoryService categoryService) {
        super(categoryService);
    }
}
