package com.quiz.app.repository;

import com.quiz.app.entity.quiz.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface QuestionRepo extends JpaRepository<Question, Long>, JpaSpecificationExecutor<Question> {
}
