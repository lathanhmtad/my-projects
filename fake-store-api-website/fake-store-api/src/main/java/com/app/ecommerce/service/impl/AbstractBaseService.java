package com.app.ecommerce.service.impl;

import com.app.ecommerce.config.ExcelImportConfig;
import com.app.ecommerce.entity.BaseEntity;
import com.app.ecommerce.exception.FakeStoreApiException;
import com.app.ecommerce.exception.ResourceExistsException;
import com.app.ecommerce.exception.ResourceNotFoundException;
import com.app.ecommerce.mapper.Mapper;
import com.app.ecommerce.dto.BaseDto;
import com.app.ecommerce.dto.PaginationMetadata;
import com.app.ecommerce.dto.PaginationResponse;
import com.app.ecommerce.repository.IAbstractBaseRepo;
import com.app.ecommerce.service.IAbstractBaseService;
import com.app.ecommerce.utils.ExcelUtil;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public abstract class AbstractBaseService<TModel extends BaseEntity, TDto extends BaseDto> implements IAbstractBaseService<TModel, TDto> {
    private final IAbstractBaseRepo<TModel> abstractBaseRepo;
    private final Mapper<TModel, TDto> mapper;
    private final Class<TModel> entityClass;

    public AbstractBaseService(
            IAbstractBaseRepo<TModel> abstractBaseRepo,
            Mapper<TModel, TDto> mapper,
            Class<TModel> entityClass
    ) {
        this.abstractBaseRepo = abstractBaseRepo;
        this.mapper = mapper;
        this.entityClass = entityClass;
    }

    @Override
    public PaginationResponse<TDto> findAll(Integer pageNumber, Integer size, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNumber - 1, size, sort);
        Page<TModel> page = abstractBaseRepo.findAll(pageable) ;

        List<TModel> tModels = page.getContent();

        return PaginationResponse.<TDto>builder()
                .data(tModels.stream().map(mapper::toDto).collect(Collectors.toList()))
                .metadata(PaginationMetadata.builder()
                        .pageNumber(page.getNumber() + 1)
                        .pageSize(page.getSize())
                        .sortField(sortField)
                        .sortDir(sortDir)
                        .totalElements((int) page.getTotalElements())
                        .totalPages(page.getTotalPages())
                        .last(page.isLast())
                        .build())
                .build();
    }

    public TDto saveOrUpdate(TDto dto) {
        try {
            if(isExists(dto)) return null;

            TModel entity = this.mapper.toEntity(dto);
            TModel tModelSaved = this.abstractBaseRepo.save(entity);
            return this.mapper.toDto(tModelSaved);
        }
        catch (ResourceExistsException | ResourceNotFoundException e) {
            throw e;
        }
        catch (RuntimeException e) {
            throw new FakeStoreApiException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public List<TDto> importExcelData(MultipartFile excelFile) {
        try {
            boolean isValid = ExcelUtil.isValidExcelFile(excelFile);
            if(isValid) {
                Workbook workbook = ExcelUtil.getWorkbookStream(excelFile);
                List<TDto> tDtos = ExcelUtil.getImportData(workbook, ExcelImportConfig.getImportConfig(entityClass.getSimpleName()));
                return tDtos.stream().map(this::saveOrUpdate).collect(Collectors.toList());
            }
            throw new RuntimeException("File excel not valid!");
        } catch (RuntimeException e) {
            throw new FakeStoreApiException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public boolean isExists(BaseDto dto) throws ResourceExistsException {
        return false;
    }
}
