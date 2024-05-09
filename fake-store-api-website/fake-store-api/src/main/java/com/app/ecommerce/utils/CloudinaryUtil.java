package com.app.ecommerce.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class CloudinaryUtil {
    @Value("${com.app.ecommerce.cloudinary.rootFolder}")
    private String rootFolder;

    private final Cloudinary cloudinary;

    public CloudinaryUtil(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public List<Map<String, String>> listResources(String folder, String nextCursor) {
        try {
            List<Map<String, String>> urls = new ArrayList<>();
            Map<String, Object> options = ObjectUtils.asMap(
                    "resource_type", "image",
                    "type", "upload",
                    "prefix", rootFolder + "/" + folder);

            if(nextCursor != null) {
                options.put("next_cursor", nextCursor);
            }

            ApiResponse apiResponse = cloudinary.api().resources(options);

            List<Map<String, String>> resources = (List<Map<String, String>>) apiResponse.get("resources");

            for (Map<String, String> resMap : resources) {
                String fileName = getFileNameFromPublicId(resMap.get("public_id"));
                String url = resMap.get("secure_url");
                urls.add(Map.of(fileName, url));
            }

            String more = (String) apiResponse.get("next_cursor");
            if (more != null) {
                urls.addAll(listResources(folder, more));
            }

            return urls;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String upload(MultipartFile file, String folder) {
        try {
            Map params = ObjectUtils.asMap(
                    "use_filename", true,
                    "unique_filename", true,
                    "folder", rootFolder + "/" + folder
            );
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
            return uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public String uploadWithFileNamePublicId(File file, String folder) {
        try {
            Map params = ObjectUtils.asMap(
                    "use_filename", true,
                    "public_id", this.getFileNameWithoutExtension(file),
                    "folder", rootFolder + "/" + folder
            );
            byte[] fileContent = FileUtils.readFileToByteArray(file);
            Map uploadResult = cloudinary.uploader().upload(fileContent, params);
            return uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Boolean delete(String imgUrl) {
        try {
            int rootFolderIndex = imgUrl.indexOf(rootFolder);
            int lastDotIndex = imgUrl.lastIndexOf(".");
            String publicId = imgUrl.substring(rootFolderIndex, lastDotIndex);
            Map options = Map.of("invalidate", true);
            Map result = cloudinary.uploader().destroy(publicId, options);
            return result.get("result").toString().equals("ok");
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public boolean uploadImagesFromFolder(File sourceFolder, String destinationFolder) {
        try {
            if(sourceFolder.exists()) {
                this.uploadFilesFromFolder(sourceFolder, destinationFolder);
                return true;
            }
            throw new RuntimeException("Folder not found!");
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    private void uploadFilesFromFolder(File sourceFolder, String destinationFolder) {
        for(File fileEntry : sourceFolder.listFiles()) {
            if(fileEntry.isDirectory()) {
                uploadFilesFromFolder(fileEntry, destinationFolder);
            }
            else {
                this.uploadWithFileNamePublicId(fileEntry, destinationFolder);
            }
        }
    }

    private String getFileNameWithoutExtension(File file) {
        String originalFileName = file.getName();
        int dotIndex = originalFileName.lastIndexOf('.');
        return (dotIndex == -1) ? originalFileName : originalFileName.substring(0, dotIndex);
    }

    private String getFileNameFromPublicId(String publicId) {
        int lastSlashIndex = publicId.lastIndexOf("/");
        return publicId.substring(lastSlashIndex + 1);
    }
}