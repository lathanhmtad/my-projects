package com.hotelbooking.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public interface UploadImageService {
    public void uploadImage(MultipartFile image) throws IOException;

    public void uploadImages(List<MultipartFile> images) throws IOException;

}