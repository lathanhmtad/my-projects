package com.quiz.app.mapper;

import com.quiz.app.dto.answer.AnswerRequest;
import com.quiz.app.dto.answer.AnswerResponse;
import com.quiz.app.entity.quiz.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper extends GenericMapper<Answer, AnswerRequest, AnswerResponse> {
}
