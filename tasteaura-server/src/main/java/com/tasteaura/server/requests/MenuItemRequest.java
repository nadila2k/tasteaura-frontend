package com.tasteaura.server.requests;

import com.tasteaura.server.enums.Availability;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemRequest {
    private String name;
    private String description;
    private Double price;
    private Availability availability;
    private Long categoryId;
    private MultipartFile image;
}
