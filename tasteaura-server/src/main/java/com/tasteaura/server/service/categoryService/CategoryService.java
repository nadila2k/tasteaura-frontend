package com.tasteaura.server.service.categoryService;

import com.tasteaura.server.dto.CategoryDTO;
import com.tasteaura.server.requests.CategoryRequest;

import java.util.List;

public interface CategoryService {
    CategoryDTO createCategory(CategoryRequest categoryRequest);
    List<CategoryDTO> getAllCategories();
    CategoryDTO getCategoryById(Long id);
    CategoryDTO updateCategory(Long id, CategoryRequest categoryRequest);
    void deleteCategory(Long id);
}
