package com.quiz.app.service;

import com.quiz.app.dto.category.CategoryTreeResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryTreeResponse> getTrees();

    CategoryTreeResponse getTree(Long categoryId);
}
