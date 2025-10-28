package com.tasteaura.server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tasteaura.server.enums.OrderStatus;
import com.tasteaura.server.enums.OrderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMMM dd, yyyy HH:mm")
    private LocalDateTime orderDate;
    private Double totalAmount;
    private OrderType orderType;
    private OrderStatus status;
    private List<OrderItemDTO> orderItems;
}