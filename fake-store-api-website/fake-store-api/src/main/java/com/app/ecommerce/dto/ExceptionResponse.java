package com.app.ecommerce.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class ExceptionResponse {
    private Date time;
    private String message;
    private String path;
    private String errorCode;
}