package com.quiz.app.dto.question;

import com.quiz.app.dto.answer.ClientAnswerResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClientQuestionResponse {
    private Long id;
    private String description;
    private String image;
    private String type;
    private List<ClientAnswerResponse > options;
}
