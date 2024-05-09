package com.quiz.app.dto.answer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientAnswerResponse {
    private Long id;
    private String description;
    @JsonProperty("isSelected")
    private Boolean isSelected = false;
}
