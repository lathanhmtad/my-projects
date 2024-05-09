package com.app.ecommerce.mapper;

import com.app.ecommerce.dto.brand.BrandDto;
import com.app.ecommerce.dto.brand.BrandRequestDto;
import com.app.ecommerce.entity.product.Brand;
import com.app.ecommerce.entity.product.Category;
import com.app.ecommerce.exception.ResourceNotFoundException;
import com.app.ecommerce.repository.CategoryRepo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BrandMapper extends Mapper<Brand, BrandDto> {
    private final CategoryRepo categoryRepo;
    public BrandMapper(CategoryRepo categoryRepo) {
        super(Brand.class, BrandDto.class);
        this.categoryRepo = categoryRepo;
    }

    @Override
    public Brand toEntity(BrandDto dto) {
        BrandRequestDto brandRequestDto = (BrandRequestDto) dto;
        Brand brand = super.toEntity(dto);
        this.mapCategoriesToBrand(brand, brandRequestDto);
        return brand;
    }

    private void mapCategoriesToBrand(Brand brand, BrandRequestDto brandRequestDto) {
        List<String> categories = brandRequestDto.getCategoryNames();
        List<Category> categoryEntities = categories.stream().map(item -> categoryRepo.findByName(item).orElseThrow(
                () -> new ResourceNotFoundException("Category", "name", item)
        )).collect(Collectors.toList());
        brand.setCategories(categoryEntities);
    }
}
