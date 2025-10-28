package com.tasteaura.server.requests;

import com.tasteaura.server.enums.OrderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderRequest {
    private List<OrderItemRequest> items;
    private OrderType orderType;
}