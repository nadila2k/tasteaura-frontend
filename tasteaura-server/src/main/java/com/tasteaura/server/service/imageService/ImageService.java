package com.tasteaura.server.service.imageService;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tasteaura.server.exception.ImageUploadException;
import com.tasteaura.server.response.ImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final Cloudinary cloudinary;

    public ImageResponse uploadImage(MultipartFile file) {
        validateFile(file);

        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            return ImageResponse.builder()
                    .imageUrl(uploadResult.get("secure_url").toString())
                    .imageId(uploadResult.get("public_id").toString())
                    .build();

        } catch (IOException e) {
            throw new ImageUploadException("Failed to upload image", e);
        }
    }

    public void deleteImage(String imageId) {
        try {
            cloudinary.uploader().destroy(imageId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new ImageUploadException("Failed to delete image with id: " + imageId, e);
        }
    }

    private void validateFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();

        if (fileName == null || !fileName.matches("(?i).*\\.(jpg|jpeg|png)$")) {
            throw new IllegalArgumentException("Invalid file format. Only JPG, JPEG, and PNG are allowed.");
        }
    }
}
