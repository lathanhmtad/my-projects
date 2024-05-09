package com.quiz.app.mapper;

import com.quiz.app.dto.category.CategoryRequest;
import com.quiz.app.dto.category.CategoryResponse;
import com.quiz.app.entity.quiz.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper extends GenericMapper<Category, CategoryRequest, CategoryResponse> {
}
