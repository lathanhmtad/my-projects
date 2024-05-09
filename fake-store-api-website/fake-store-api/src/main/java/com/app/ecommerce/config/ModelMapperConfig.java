package com.app.ecommerce.config;

import com.app.ecommerce.dto.brand.BrandRequestDto;
import com.app.ecommerce.dto.category.CategoryRequestDto;
import com.app.ecommerce.entity.product.Brand;
import com.app.ecommerce.entity.product.Category;
import com.app.ecommerce.entity.User;
import com.app.ecommerce.dto.user.UserRequestDto;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

        // set up map user request dto to user entity
        TypeMap<UserRequestDto, User> userTypeMap = modelMapper.createTypeMap(UserRequestDto.class, User.class);
        userTypeMap.addMappings(
                mapper -> {
                    mapper.skip(User::setAvatar);
                    mapper.skip(User::setRoles);
                    mapper.skip(User::setPassword);
                }
        );

        // set up map category request dto to category entity
        TypeMap<CategoryRequestDto, Category> categoryTypeMap = modelMapper.createTypeMap(CategoryRequestDto.class, Category.class);
        categoryTypeMap.addMappings(
                mapper -> mapper.skip(Category::setParent)
        );

        // set up map brand request dto to brand entity
        TypeMap<BrandRequestDto, Brand> brandTypeMap = modelMapper.createTypeMap(BrandRequestDto.class, Brand.class);
        brandTypeMap.addMappings(
                mapper -> mapper.skip(Brand::setCategories)
        );
        return modelMapper;
    }
}
