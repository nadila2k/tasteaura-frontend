package com.tasteaura.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatCardDTO {
    private Long totalOrders;
    private Long ongoingOrders;
    private Long completedOrders;
    private Long cancelledOrders;
    private Long totalUsers;
    private Long totalCategories;
    private Long totalMenuItems;
    private Double revenueToday;
}
