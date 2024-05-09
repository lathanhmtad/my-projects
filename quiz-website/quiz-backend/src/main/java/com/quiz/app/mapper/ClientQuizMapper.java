package com.quiz.app.mapper;

import com.quiz.app.dto.quiz.ClientQuizResponse;
import com.quiz.app.entity.quiz.Quiz;
import org.apache.commons.lang3.ObjectUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientQuizMapper extends GenericMapper<Quiz, ObjectUtils.Null, ClientQuizResponse> {
    @Mapping(source = "category.name", target = "category")
    ClientQuizResponse entityToResponse(Quiz entity);
}
