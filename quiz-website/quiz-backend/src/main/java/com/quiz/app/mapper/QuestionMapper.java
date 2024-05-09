package com.quiz.app.mapper;

import com.quiz.app.dto.question.QuestionResponse;
import com.quiz.app.entity.quiz.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AnswerMapper.class})
public interface QuestionMapper extends GenericMapper<Question, QuestionResponse, QuestionResponse> {
    @Override
    @Mapping(source = "quiz.name", target = "quizName")
    QuestionResponse entityToResponse(Question entity);
}
