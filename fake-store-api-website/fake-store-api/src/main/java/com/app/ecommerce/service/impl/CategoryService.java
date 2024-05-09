package com.app.ecommerce.service.impl;

import com.app.ecommerce.entity.product.Category;
import com.app.ecommerce.mapper.CategoryMapper;
import com.app.ecommerce.dto.category.CategoryDto;
import com.app.ecommerce.repository.CategoryRepo;
import com.app.ecommerce.service.ICategoryService;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends AbstractBaseService<Category, CategoryDto> implements ICategoryService {
    public CategoryService(CategoryRepo categoryRepo, CategoryMapper categoryMapper) {
        super(categoryRepo, categoryMapper, Category.class);
    }
}
