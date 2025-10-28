package com.tasteaura.server.service.menuItemService;

import com.tasteaura.server.dto.MenuItemDTO;
import com.tasteaura.server.requests.MenuItemRequest;

import java.util.List;

public interface MenuItemService {
    MenuItemDTO createMenuItem(MenuItemRequest menuItemRequest);
    List<MenuItemDTO> getAllMenuItems();
    MenuItemDTO getMenuItemById(Long id);
    MenuItemDTO updateMenuItem(Long id, MenuItemRequest menuItemRequest);
    void deleteMenuItem(Long id);
    List<MenuItemDTO> getMenuItemsByCategory(Long categoryId);
    List<MenuItemDTO> getMenuItemsByCategoryName(String categoryName);
}
