package com.tasteaura.server.service.order;


import com.tasteaura.server.dto.OrderDTO;
import com.tasteaura.server.enums.OrderStatus;
import com.tasteaura.server.requests.CreateOrderRequest;

import java.util.List;

public interface OrderService {
    void createOrder(CreateOrderRequest request);

    List<OrderDTO> getOrdersForCurrentUser();
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getAllOrders();

    List<OrderDTO> getAllActiveOrders();
    OrderDTO updateOrderStatus(Long orderId, OrderStatus newStatus);


}