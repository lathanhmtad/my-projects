package com.app.ecommerce.controller;

import com.app.ecommerce.entity.BaseEntity;
import com.app.ecommerce.dto.BaseDto;
import com.app.ecommerce.dto.PaginationResponse;
import com.app.ecommerce.service.IAbstractBaseService;
import com.app.ecommerce.utils.AppConstantUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public class GenericApi<TModel extends BaseEntity, TDto extends BaseDto, TRequestDto extends TDto> {
    private final IAbstractBaseService<TModel, TDto> abstractBaseService;

    public GenericApi(IAbstractBaseService<TModel, TDto> abstractBaseService) {
        this.abstractBaseService = abstractBaseService;
    }

    @GetMapping
    public ResponseEntity<PaginationResponse<TDto>> findAll(
            @RequestParam(value = "page", defaultValue = AppConstantUtil.DEFAULT_PAGE_NUMBER, required = false) Integer page,
            @RequestParam(value = "limit", defaultValue = AppConstantUtil.DEFAULT_PAGE_SIZE, required = false) Integer limit,
            @RequestParam(value = "sortField", defaultValue = AppConstantUtil.DEFAULT_SORT_FIELD, required = false) String sortField,
            @RequestParam(value = "sortDir", defaultValue = AppConstantUtil.DEFAULT_SORT_DIR, required = false) String sortDir
    ) {
        PaginationResponse<TDto> response = abstractBaseService.findAll(page, limit, sortField, sortDir);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/excel")
    public ResponseEntity<?> importExcelData(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(
                abstractBaseService.importExcelData(file)
        );
    }

}
