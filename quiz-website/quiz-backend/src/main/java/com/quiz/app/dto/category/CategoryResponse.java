package com.quiz.app.dto.category;

import com.quiz.app.dto.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse extends BaseResponse  {
    private String name;
    private String image;
    private Boolean enabled;
}
