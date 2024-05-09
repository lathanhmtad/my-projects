package com.quiz.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnswerRepo extends JpaRepository<com.quiz.app.entity.quiz.Answer, Long>, JpaSpecificationExecutor<com.quiz.app.entity.quiz.Answer> {
}
