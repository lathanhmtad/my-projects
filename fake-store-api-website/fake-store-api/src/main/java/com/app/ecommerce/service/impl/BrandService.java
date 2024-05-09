package com.app.ecommerce.service.impl;

import com.app.ecommerce.dto.brand.BrandDto;
import com.app.ecommerce.entity.product.Brand;
import com.app.ecommerce.mapper.BrandMapper;
import com.app.ecommerce.repository.BrandRepo;
import com.app.ecommerce.service.IBrandService;
import org.springframework.stereotype.Service;

@Service
public class BrandService extends AbstractBaseService<Brand, BrandDto> implements IBrandService {
    public BrandService(BrandRepo brandRepo, BrandMapper brandMapper) {
        super(brandRepo, brandMapper, Brand.class);
    }
}
