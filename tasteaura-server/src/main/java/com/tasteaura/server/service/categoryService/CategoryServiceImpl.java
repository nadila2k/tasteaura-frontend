package com.tasteaura.server.service.categoryService;

import com.tasteaura.server.dto.CategoryDTO;
import com.tasteaura.server.exception.AlreadyExistsException;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.model.Category;
import com.tasteaura.server.repository.CategoryRepository;
import com.tasteaura.server.requests.CategoryRequest;
import com.tasteaura.server.response.ImageResponse;
import com.tasteaura.server.service.imageService.ImageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ImageService imageService;
    private final ModelMapper modelMapper;

    @Override
    public CategoryDTO createCategory(CategoryRequest categoryRequest) {
        if (categoryRepository.existsByNameIgnoreCase(categoryRequest.getName())) {
            throw new AlreadyExistsException("Category with name '" + categoryRequest.getName() + "' already exists.");
        }

        MultipartFile image = categoryRequest.getImage();
        ImageResponse imageResponse = imageService.uploadImage(image);

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .imageUrl(imageResponse.getImageUrl())
                .imageId(imageResponse.getImageId())
                .build();

        Category savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }


    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        boolean updated = false;

        // 1. Update name if provided and different
        String newName = categoryRequest.getName();
        if (newName != null && !newName.isBlank() && !category.getName().equalsIgnoreCase(newName)) {
            if (categoryRepository.existsByNameIgnoreCase(newName)) {
                throw new AlreadyExistsException("Category with name '" + newName + "' already exists.");
            }
            category.setName(newName);
            updated = true;
        }

        // 2. Update image if provided
        MultipartFile newImage = categoryRequest.getImage();
        if (newImage != null && !newImage.isEmpty()) {
            if (category.getImageId() != null && !category.getImageId().isBlank()) {
                imageService.deleteImage(category.getImageId());
            }
            ImageResponse uploadedImage = imageService.uploadImage(newImage);
            category.setImageUrl(uploadedImage.getImageUrl());
            category.setImageId(uploadedImage.getImageId());
            updated = true;
        }

        // Only save if something changed
        if (updated) {
            category = categoryRepository.save(category);
        }

        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        imageService.deleteImage(category.getImageId());
        categoryRepository.delete(category);
    }
}
