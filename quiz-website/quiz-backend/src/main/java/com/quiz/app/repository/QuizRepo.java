package com.quiz.app.repository;

import com.quiz.app.entity.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface QuizRepo extends JpaRepository<Quiz, Long>, JpaSpecificationExecutor<Quiz> {
}
