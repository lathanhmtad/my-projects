package com.quiz.app.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BaseResponse {
    private Long id;
    private Date createdDate;
    private Date updatedDate;
}
