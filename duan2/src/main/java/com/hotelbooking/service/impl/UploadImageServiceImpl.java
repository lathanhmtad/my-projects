package com.hotelbooking.service.impl;

import com.hotelbooking.service.UploadImageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class UploadImageServiceImpl implements UploadImageService {
    private final Path path = Paths.get("src/main/resources/static/images/");

    @Override
    public void uploadImage(MultipartFile image) throws IOException {
        init();

        Path filePath = path.resolve(image.getOriginalFilename());
        try (InputStream inStream = image.getInputStream()) {
            Files.copy(inStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void uploadImages(List<MultipartFile> images) throws IOException {

        init();
        for (MultipartFile file : images) {
            String fileName = file.getOriginalFilename();
            Path filePaths = path.resolve(fileName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, filePaths, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    public void init() {
        try {
            // Tạo thư mục nếu nó không tồn tại
            Files.createDirectories(path);
            System.out.println("Thư mục đã được tạo thành công.");
        } catch (IOException e) {
            // Xử lý nếu có lỗi
            e.printStackTrace();
        }
    }
}