package com.quiz.app.dto.answer;

import com.quiz.app.dto.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerResponse extends BaseResponse {
    private String description;
    private Boolean correctAnswer;
}
