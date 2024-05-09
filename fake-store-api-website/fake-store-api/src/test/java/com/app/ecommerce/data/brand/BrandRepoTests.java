package com.app.ecommerce.data.brand;

import com.app.ecommerce.utils.AppConstantUtil;
import com.app.ecommerce.utils.CloudinaryUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class BrandRepoTests {

    @Autowired
    private CloudinaryUtil cloudinaryUtil;

    @Test
    public void testUploadBrandImagesToCloudinary_returnTrue() {
        String pathName = "D:\\my-projects\\fake-store-api-website\\sample-data\\brands\\brand-logos";
        File brandFolderImages = new File(pathName);
        boolean isSuccess = cloudinaryUtil.uploadImagesFromFolder(brandFolderImages, AppConstantUtil.BRAND_IMG_FOLDER);
        Assertions.assertThat(isSuccess).isTrue();
    }

    @Test
    public void testGetBrandImagesFromCloudinary_returnListOfImageUrls() {
        List<Map<String, String>> result = cloudinaryUtil.listResources(AppConstantUtil.BRAND_IMG_FOLDER, null);
        result.forEach(System.out::println);
    }
}
