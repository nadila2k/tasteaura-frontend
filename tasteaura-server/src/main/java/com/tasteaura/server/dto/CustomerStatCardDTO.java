package com.tasteaura.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerStatCardDTO {
    private Long totalOrders;
    private Long completedOrders;
    private Long ongoingOrders;
    private Long cancelledOrders;
    private Double totalSpent;
    private Double todaySpent;
}