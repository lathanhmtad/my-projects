package com.app.ecommerce.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ExcelCellConfig {
    private Integer columnIndex;
    private String fieldName;
}
