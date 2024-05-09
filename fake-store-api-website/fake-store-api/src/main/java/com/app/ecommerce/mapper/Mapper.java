package com.app.ecommerce.mapper;

import com.app.ecommerce.entity.BaseEntity;
import com.app.ecommerce.dto.BaseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public abstract class Mapper<TModel extends BaseEntity, TDto extends BaseDto> {
    @Autowired
    protected ModelMapper modelMapper;
    private final Class<TModel> entityClass;
    private final Class<TDto> dtoClass;

    public Mapper(Class<TModel> entityClass, Class<TDto> dtoClass) {
        this.entityClass = entityClass;
        this.dtoClass = dtoClass;
    }

    public TModel toEntity(TDto dto) {
        return modelMapper.map(dto, entityClass);
    }

    public TDto toDto(TModel model) {
        return modelMapper.map(model, dtoClass);
    }
}
