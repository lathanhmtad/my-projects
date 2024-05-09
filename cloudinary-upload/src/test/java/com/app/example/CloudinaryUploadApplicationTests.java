package com.app.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.util.List;
import java.util.Map;

@SpringBootTest
class CloudinaryUploadApplicationTests {
    @Autowired
    private CloudinaryUtil cloudinaryUtil;
    @Test
    void testUploads() {
        final File folder = new File("D:\\my-projects\\product-portal-website\\product-portal-backend\\src\\main\\resources\\static\\images\\products");
        cloudinaryUtil.uploadImagesFromFolder(folder, AppConstant.PRODUCT_IMAGE_FOLDER);
    }

    @Test
    void testGet() {
        List<Map<String, String>> urls = cloudinaryUtil.listResources(AppConstant.PRODUCT_IMAGE_FOLDER, null);

        urls.forEach(System.out::println);
    }

    @Test
    void testUpload() {
        final File file = new File("D:\\my-projects\\product-portal-website\\product-portal-backend\\src\\main\\resources\\static\\nguyenthoquangvinh.jpeg");
        cloudinaryUtil.uploadWithFileNamePublicId(file, AppConstant.PRODUCT_IMAGE_FOLDER);
    }

}
