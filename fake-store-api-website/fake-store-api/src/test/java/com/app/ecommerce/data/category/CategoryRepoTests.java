package com.app.ecommerce.data.category;

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
public class CategoryRepoTests {

    @Autowired
    private CloudinaryUtil cloudinaryUtil;

    @Test
    public void testUploadCategoryImagesToCloudinary_returnTrue() {
        String pathName = "D:\\my-projects\\fake-store-api-website\\sample-data\\categories\\categories-images";
        File categoryFolderImages = new File(pathName);
        boolean isSuccess = cloudinaryUtil.uploadImagesFromFolder(categoryFolderImages, AppConstantUtil.CATEGORY_IMG_FOLDER);
        Assertions.assertThat(isSuccess).isTrue();
    }

    @Test
    public void testGetCategoryImagesFromCloudinary_returnListOfImageUrls() {
        List<Map<String, String>> result = cloudinaryUtil.listResources(AppConstantUtil.CATEGORY_IMG_FOLDER, null);
        result.forEach(System.out::println);
    }
}
