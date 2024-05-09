package com.quiz.app.dto.category;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryTreeResponse {
    private String title;
    private Long value;
    private Long key;

//    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CategoryTreeResponse> children = new ArrayList<>();

    public CategoryTreeResponse(String title, Long value) {
        this.title = title;
        this.value = value;
        this.key = value;
    }
}
