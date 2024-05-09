package com.quiz.app.dto.quiz;

import com.quiz.app.dto.BaseResponse;
import com.quiz.app.dto.category.CategoryResponse;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class QuizResponse extends BaseResponse {
    private String name;
    private String description;
    private String image;
    private String difficulty;
    private CategoryResponse category;
}
