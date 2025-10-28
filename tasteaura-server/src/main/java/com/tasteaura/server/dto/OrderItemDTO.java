package com.tasteaura.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemDTO {
    private Long id;
    private Long menuItemId;
    private String menuItemName;
    private Double price;
    private Integer quantity;
    private Double subtotal;


}