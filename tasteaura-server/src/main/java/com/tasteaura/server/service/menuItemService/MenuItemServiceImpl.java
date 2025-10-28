package com.tasteaura.server.service.menuItemService;

import com.tasteaura.server.dto.CategoryDTO;
import com.tasteaura.server.dto.MenuItemDTO;
import com.tasteaura.server.enums.Availability;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.model.Category;
import com.tasteaura.server.model.MenuItem;
import com.tasteaura.server.repository.CategoryRepository;
import com.tasteaura.server.repository.MenuItemRepository;
import com.tasteaura.server.requests.MenuItemRequest;
import com.tasteaura.server.response.ImageResponse;
import com.tasteaura.server.service.imageService.ImageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MenuItemServiceImpl  implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;
    private final ModelMapper modelMapper;

    @Override
    public MenuItemDTO createMenuItem(MenuItemRequest menuItemRequest) {
        Category category = categoryRepository.findById(menuItemRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + menuItemRequest.getCategoryId()));

        ImageResponse imageResponse = null;
        if (menuItemRequest.getImage() != null && !menuItemRequest.getImage().isEmpty()) {
            imageResponse = imageService.uploadImage(menuItemRequest.getImage());
        }

        MenuItem menuItem = MenuItem.builder()
                .name(menuItemRequest.getName())
                .description(menuItemRequest.getDescription())
                .price(menuItemRequest.getPrice())
                .availability(menuItemRequest.getAvailability())
                .category(category)
                .imageUrl(imageResponse != null ? imageResponse.getImageUrl() : null)
                .imageId(imageResponse != null ? imageResponse.getImageId() : null)
                .build();

        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return mapToDTO(savedMenuItem);

    }

    @Override
    public List<MenuItemDTO> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemDTO getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem not found with id: " + id));
        return mapToDTO(menuItem);
    }

    @Override
    public MenuItemDTO updateMenuItem(Long id, MenuItemRequest menuItemRequest) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem not found with id: " + id));

        // Update category if changed
        if (menuItemRequest.getCategoryId() != null) {
            Category category = categoryRepository.findById(menuItemRequest.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + menuItemRequest.getCategoryId()));
            menuItem.setCategory(category);
        }

        menuItem.setName(menuItemRequest.getName());
        menuItem.setDescription(menuItemRequest.getDescription());
        menuItem.setPrice(menuItemRequest.getPrice());
        menuItem.setAvailability(menuItemRequest.getAvailability());

        // Update image if provided
        if (menuItemRequest.getImage() != null && !menuItemRequest.getImage().isEmpty()) {
            if (menuItem.getImageId() != null) {
                imageService.deleteImage(menuItem.getImageId());
            }
            ImageResponse imageResponse = imageService.uploadImage(menuItemRequest.getImage());
            menuItem.setImageUrl(imageResponse.getImageUrl());
            menuItem.setImageId(imageResponse.getImageId());
        }

        MenuItem updated = menuItemRepository.save(menuItem);
        return mapToDTO(updated);
    }

    @Override
    public void deleteMenuItem(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem not found with id: " + id));

        if (menuItem.getImageId() != null) {
            imageService.deleteImage(menuItem.getImageId());
        }

        menuItemRepository.delete(menuItem);
    }

    @Override
    public List<MenuItemDTO> getMenuItemsByCategory(Long categoryId) {
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        List<MenuItem> menuItems = menuItemRepository.findByCategoryId(categoryId);
        return menuItems.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MenuItemDTO> getMenuItemsByCategoryName(String categoryName) {
        List<MenuItem> menuItems;

        System.out.println("Category: " + categoryName);
        if ("All".equalsIgnoreCase(categoryName)) {
            // Fetch all available menu items
            menuItems = menuItemRepository.findByAvailability(Availability.AVAILABLE);
        } else {
            // Fetch available items for the specific category
            menuItems = menuItemRepository.findByCategory_NameAndAvailability(categoryName, Availability.AVAILABLE);
        }

        if (menuItems.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No available menu items found for category: " + categoryName
            );
        }

        return menuItems.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    private MenuItemDTO mapToDTO(MenuItem menuItem) {
        Category category = menuItem.getCategory();

        return MenuItemDTO.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .imageId(menuItem.getImageId())
                .availability(menuItem.getAvailability())
                .category(category != null ? CategoryDTO.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .imageUrl(category.getImageUrl())
                        .imageId(category.getImageId())
                        .build() : null)
                .build();
    }


}
