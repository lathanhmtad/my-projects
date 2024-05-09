package com.app.ecommerce.config;

import com.app.ecommerce.dto.brand.BrandRequestDto;
import com.app.ecommerce.dto.category.CategoryRequestDto;
import com.app.ecommerce.dto.user.UserRequestDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
public class ExcelImportConfig {
    private String sheetName;
    private Integer headerIndex;
    private Integer startRow;
    private Class dataClazz;
    private List<ExcelCellConfig> cellImportConfigs;

    public static ExcelImportConfig userImportConfig;
    public static ExcelImportConfig categoryImportConfig;
    public static ExcelImportConfig brandImportConfig;

    static {
        userImportConfig = ExcelImportConfig.builder()
                .sheetName("Users")
                .headerIndex(0)
                .startRow(1)
                .dataClazz(UserRequestDto.class)
                .build();

        List<ExcelCellConfig> userCellConfigs = List.of(
                new ExcelCellConfig(0, "email"),
                new ExcelCellConfig(1, "fullName"),
                new ExcelCellConfig(2, "password"),
                new ExcelCellConfig(3, "avatar"),
                new ExcelCellConfig(4, "roleNames"),
                new ExcelCellConfig(5, "enabled")
        );

        userImportConfig.setCellImportConfigs(userCellConfigs);
    }

    static {
        categoryImportConfig = ExcelImportConfig.builder()
                .sheetName("Categories")
                .headerIndex(0)
                .startRow(1)
                .dataClazz(CategoryRequestDto.class)
                .build();
        List<ExcelCellConfig> categoryCellConfigs = List.of(
                new ExcelCellConfig(0, "name"),
                new ExcelCellConfig(1, "parentName"),
                new ExcelCellConfig(2, "alias"),
                new ExcelCellConfig(3, "image"),
                new ExcelCellConfig(4, "enabled")
        );
        categoryImportConfig.setCellImportConfigs(categoryCellConfigs);
    }

    static {
        brandImportConfig = ExcelImportConfig.builder()
                .sheetName("Brands")
                .headerIndex(0)
                .startRow(1)
                .dataClazz(BrandRequestDto.class)
                .build();
        List<ExcelCellConfig> brandCellConfigs = List.of(
                new ExcelCellConfig(0, "name"),
                new ExcelCellConfig(1, "categoryNames"),
                new ExcelCellConfig(2, "logo")
        );
        brandImportConfig.setCellImportConfigs(brandCellConfigs);
    }

    public static ExcelImportConfig getImportConfig(String entityName) {
        return switch (entityName) {
            case "User" -> userImportConfig;
            case "Category" -> categoryImportConfig;
            case "Brand" -> brandImportConfig;
            default -> throw new IllegalArgumentException("Invalid entity name: " + entityName + "!");
        };
    }
}