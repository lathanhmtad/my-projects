package com.quiz.app.repository;

import com.quiz.app.entity.quiz.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CategoryRepo extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
}
