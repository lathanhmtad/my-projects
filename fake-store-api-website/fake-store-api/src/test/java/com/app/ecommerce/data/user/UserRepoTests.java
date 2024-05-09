package com.app.ecommerce.data.user;

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
public class UserRepoTests {
    @Autowired
    private CloudinaryUtil cloudinaryUtil;

    @Test
    public void testUploadUserImagesToCloudinary_returnTrue() {
        String pathName = "D:\\my-projects\\fake-store-api-website\\sample-data\\users\\user-images";
        File userFolderImages = new File(pathName);
        boolean isSuccess = cloudinaryUtil.uploadImagesFromFolder(userFolderImages, AppConstantUtil.USER_IMG_FOLDER);
        Assertions.assertThat(isSuccess).isTrue();
    }

    @Test
    public void testGetUserImagesFromCloudinary_returnListOfImageUrls() {
        List<Map<String, String>> result = cloudinaryUtil.listResources(AppConstantUtil.USER_IMG_FOLDER, null);
        result.forEach(System.out::println);
    }
}
