package com.tasteaura.server.repository;

import com.tasteaura.server.enums.Availability;
import com.tasteaura.server.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategoryId(Long categoryId);

    List<MenuItem> findByCategory_NameAndAvailability(String categoryName, Availability availability);

    List<MenuItem> findByAvailability(Availability availability);
}
