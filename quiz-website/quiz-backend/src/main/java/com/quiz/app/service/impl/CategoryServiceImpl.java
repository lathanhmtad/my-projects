package com.quiz.app.service.impl;

import com.quiz.app.constants.ResourceName;
import com.quiz.app.dto.category.CategoryTreeResponse;
import com.quiz.app.entity.quiz.Category;
import com.quiz.app.exception.ResourceNotFoundException;
import com.quiz.app.repository.CategoryRepo;
import com.quiz.app.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepo categoryRepo;
    @Override
    public List<CategoryTreeResponse> getTrees() {
        List<Category> categoriesInDb = categoryRepo.findAll();

        List<CategoryTreeResponse> response = new ArrayList<>();

        categoriesInDb.forEach(category -> {
            if(category.getParent() == null) {
                response.add(
                        new CategoryTreeResponse(
                                category.getName(),
                                category.getId()
                        )
                );
                addChildren(response.get(response.size() - 1).getChildren(), category, 1);
            }
        });
        response.add(0, new CategoryTreeResponse("No parent", -1L));
        return response;
    }

    @Override
    public CategoryTreeResponse getTree(Long categoryId) {
        Category categoryInDb = categoryRepo.findById(categoryId).
                orElseThrow(() -> new ResourceNotFoundException(ResourceName.CATEGORY, "id", categoryId));
        CategoryTreeResponse categoryTreeResponse = new CategoryTreeResponse(categoryInDb.getName(), categoryInDb.getId());
        this.addChildren(categoryTreeResponse.getChildren(), categoryInDb, 1);
        return categoryTreeResponse;
    }


    private void addChildren(List<CategoryTreeResponse> list, Category category, int depth) {
        for(Category child : category.getChildren()) {
            CategoryTreeResponse childResponse = new CategoryTreeResponse(
                    child.getName(),
                    child.getId()
            );
            list.add(childResponse);
            addChildren(childResponse.getChildren(), child, depth + 1);
        }
    }
}
