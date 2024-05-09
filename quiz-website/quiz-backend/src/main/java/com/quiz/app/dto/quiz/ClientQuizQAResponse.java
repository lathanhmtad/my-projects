package com.quiz.app.dto.quiz;

import com.quiz.app.dto.question.ClientQuestionResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClientQuizQAResponse extends ClientQuizResponse {
    private List<ClientQuestionResponse> questions;
}
