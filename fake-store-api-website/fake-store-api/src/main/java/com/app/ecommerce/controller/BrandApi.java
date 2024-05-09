package com.app.ecommerce.controller;

import com.app.ecommerce.dto.brand.BrandDto;
import com.app.ecommerce.dto.brand.BrandRequestDto;
import com.app.ecommerce.entity.product.Brand;
import com.app.ecommerce.service.impl.BrandService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandApi extends GenericApi<Brand, BrandDto, BrandRequestDto> {
    public BrandApi(BrandService brandService) {
        super(brandService);
    }
}
