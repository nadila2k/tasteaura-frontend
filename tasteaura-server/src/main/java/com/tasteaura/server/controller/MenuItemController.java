package com.tasteaura.server.controller;

import com.tasteaura.server.dto.MenuItemDTO;
import com.tasteaura.server.enums.ResponseStatus;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.requests.MenuItemRequest;
import com.tasteaura.server.response.ApiResponse;
import com.tasteaura.server.service.menuItemService.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/menu-items")
@Validated
public class MenuItemController {

    private final MenuItemService menuItemService;

    @PostMapping
    public ResponseEntity<ApiResponse> createMenuItem(@ModelAttribute MenuItemRequest request) {
        try {
            MenuItemDTO created = menuItemService.createMenuItem(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(ResponseStatus.SUCCESS, "Menu item created successfully", created));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Category not found", e.getMessage()));
        } catch (MultipartException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Invalid file upload", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllMenuItems() {
        List<MenuItemDTO> items = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Fetched all menu items", items));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMenuItemById(@PathVariable Long id) {
        try {
            MenuItemDTO item = menuItemService.getMenuItemById(id);
            return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Menu item fetched successfully", item));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Menu item not found", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateMenuItem(
            @PathVariable Long id,
            @ModelAttribute @Validated MenuItemRequest request) {
        try {
            MenuItemDTO updated = menuItemService.updateMenuItem(id, request);
            return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Menu item updated successfully", updated));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Resource not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteMenuItem(@PathVariable Long id) {
        try {
            menuItemService.deleteMenuItem(id);
            return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Menu item deleted successfully", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Menu item not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }

    @GetMapping("/category/id/{categoryId}")
    public ResponseEntity<ApiResponse> getMenuItemsByCategory(@PathVariable Long categoryId) {
        try {
            List<MenuItemDTO> items = menuItemService.getMenuItemsByCategory(categoryId);
            return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Menu items fetched by category", items));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Category not found", e.getMessage()));
        }
    }

    @GetMapping("/category/name/{categoryName}")
    public ResponseEntity<ApiResponse> getMenuItemsByCategoryName(@PathVariable String categoryName) {
        try {
            List<MenuItemDTO> items = menuItemService.getMenuItemsByCategoryName(categoryName);
            return ResponseEntity.ok(new ApiResponse(ResponseStatus.SUCCESS, "Fetched available menu items by category", items));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Category or available items not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }


}