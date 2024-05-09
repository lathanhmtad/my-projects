package com.quiz.app.mapper;

import com.quiz.app.dto.quiz.ClientQuizQAResponse;
import com.quiz.app.entity.quiz.Quiz;
import org.apache.commons.lang3.ObjectUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientQuizQAMapper extends GenericMapper<Quiz, ObjectUtils.Null, ClientQuizQAResponse> {
    @Override
    @Mapping(source = "category.name", target = "category")
    ClientQuizQAResponse entityToResponse(Quiz entity);
}
