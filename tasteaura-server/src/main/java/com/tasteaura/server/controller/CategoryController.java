package com.tasteaura.server.controller;

import com.tasteaura.server.dto.CategoryDTO;
import com.tasteaura.server.enums.ResponseStatus;
import com.tasteaura.server.exception.AlreadyExistsException;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.requests.CategoryRequest;
import com.tasteaura.server.response.ApiResponse;
import com.tasteaura.server.service.categoryService.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/categories")

public class CategoryController {

    private final CategoryService categoryService;

    /**
     * Create a new category with image upload.
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createCategory(@ModelAttribute CategoryRequest categoryRequest) {
        try {
            CategoryDTO createdCategory = categoryService.createCategory(categoryRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(ResponseStatus.SUCCESS, "Category created successfully", createdCategory));

        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Duplicate category name", e.getMessage()));

        } catch (MultipartException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Invalid file upload", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }


    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(
                new ApiResponse(ResponseStatus.SUCCESS, "Fetched all categories", categories)
        );
    }

    /**
     * Get a single category by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCategoryById(@PathVariable Long id) {
        try {
            CategoryDTO category = categoryService.getCategoryById(id);
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Category fetched successfully", category)
            );

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Category not found", e.getMessage()));
        }
    }

    /**
     * Update an existing category (optionally with new image).
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCategory(
            @PathVariable Long id,
            @ModelAttribute  CategoryRequest categoryRequest) {
        try {
            CategoryDTO updatedCategory = categoryService.updateCategory(id, categoryRequest);
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Category updated successfully", updatedCategory)
            );

        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Duplicate category name", e.getMessage()));

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Category not found", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }

    /**
     * Delete a category by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Category deleted successfully", null)
            );

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Category not found", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }
}