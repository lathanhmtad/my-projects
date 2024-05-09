package com.quiz.app.mapper;

import com.quiz.app.dto.quiz.QuizRequest;
import com.quiz.app.dto.quiz.QuizResponse;
import com.quiz.app.entity.quiz.Quiz;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuizMapper extends GenericMapper<Quiz, QuizRequest, QuizResponse> {
}
