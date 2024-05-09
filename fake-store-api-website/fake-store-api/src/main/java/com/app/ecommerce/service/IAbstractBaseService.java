package com.app.ecommerce.service;

import com.app.ecommerce.entity.BaseEntity;
import com.app.ecommerce.exception.ResourceExistsException;
import com.app.ecommerce.dto.BaseDto;
import com.app.ecommerce.dto.PaginationResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IAbstractBaseService<TModel extends BaseEntity, TDto extends BaseDto> {
    PaginationResponse<TDto> findAll(Integer pageNumber, Integer size, String sortField, String sortDir);
    List<TDto> importExcelData(MultipartFile excelFile);
    boolean isExists(TDto dto) throws ResourceExistsException;
}
