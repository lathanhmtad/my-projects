package com.quiz.app.dto.question;

import com.quiz.app.dto.BaseResponse;
import com.quiz.app.dto.answer.AnswerResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionResponse extends BaseResponse {
    private String description;
    private String image;
    private String quizName;
    public List<AnswerResponse> answers;
}
