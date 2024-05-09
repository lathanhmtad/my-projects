package com.quiz.app.dto.quiz;

import com.quiz.app.dto.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientQuizResponse extends BaseResponse {
    private String name;
    private String description;
    private String image;
    private String difficulty;
    private String category;
}
