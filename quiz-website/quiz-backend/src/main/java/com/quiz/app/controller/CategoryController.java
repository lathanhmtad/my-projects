package com.quiz.app.controller;

import com.quiz.app.dto.category.CategoryTreeResponse;
import com.quiz.app.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/trees")
    public ResponseEntity<List<CategoryTreeResponse>> getTrees() {
        return ResponseEntity.ok(
                categoryService.getTrees()
        );
    }

    @GetMapping("/tree/{id}")
    public ResponseEntity<CategoryTreeResponse> getTree(@PathVariable("id") Long categoryId) {
        return ResponseEntity.ok(
                categoryService.getTree(categoryId)
        );
    }
}
