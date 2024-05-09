package com.app.ecommerce.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaginationMetadata {
    private Integer pageNumber;
    private Integer pageSize;
    private String sortField;
    private String sortDir;
    private Integer totalElements;
    private Integer totalPages;
    private Boolean last;
}
