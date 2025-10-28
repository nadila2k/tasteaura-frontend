package com.tasteaura.server.dto;

import com.tasteaura.server.enums.Availability;
import com.tasteaura.server.model.Category;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String imageId;
    private Availability availability;
    private CategoryDTO category;
}
