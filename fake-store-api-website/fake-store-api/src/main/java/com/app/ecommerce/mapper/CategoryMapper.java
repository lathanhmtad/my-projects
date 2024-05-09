package com.app.ecommerce.mapper;

import com.app.ecommerce.dto.category.CategoryRequestDto;
import com.app.ecommerce.entity.product.Category;
import com.app.ecommerce.dto.category.CategoryDto;
import com.app.ecommerce.exception.ResourceNotFoundException;
import com.app.ecommerce.repository.CategoryRepo;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper extends Mapper<Category, CategoryDto> {
    private final CategoryRepo categoryRepo;
    public CategoryMapper(CategoryRepo categoryRepo) {
        super(Category.class, CategoryDto.class);
        this.categoryRepo = categoryRepo;
    }

    @Override
    public Category toEntity(CategoryDto dto) {
        CategoryRequestDto categoryRequestDto = (CategoryRequestDto) dto;
        Long categoryId = categoryRequestDto.getId();

        if(categoryId == null) {
            return this.mapCreateCategory(categoryRequestDto);
        }
        return null;
    }

    @Override
    public CategoryDto toDto(Category category) {
        CategoryDto categoryDto = super.toDto(category);
        categoryDto.setHasChildren(category.getChildren().size() > 0);
        return categoryDto;
    }

    private Category mapCreateCategory(CategoryRequestDto categoryRequestDto) {
        Category category = this.modelMapper.map(categoryRequestDto, Category.class);
        this.mapCategoryParentToCategory(category, categoryRequestDto);
        return category;
    }

    private void mapCategoryParentToCategory(Category category, CategoryRequestDto categoryRequestDto) {
        Long parentId = categoryRequestDto.getParentId();
        String parentName = categoryRequestDto.getParentName();
        if(parentId != null) {
            category.setParent(categoryRepo.findById(parentId).orElseThrow(
                    () -> new ResourceNotFoundException("Category", "id", String.valueOf(parentId))
            ));
        }
        if(parentName != null) {
            category.setParent(categoryRepo.findByName(parentName).orElseThrow(
                    () -> new ResourceNotFoundException("Category", "name", parentName)
            ));
        }
    }
}
