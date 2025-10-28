package com.tasteaura.server.service.order;

import com.tasteaura.server.dto.OrderDTO;
import com.tasteaura.server.dto.OrderItemDTO;
import com.tasteaura.server.enums.OrderStatus;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.model.MenuItem;
import com.tasteaura.server.model.Order;
import com.tasteaura.server.model.OrderItem;
import com.tasteaura.server.model.Users;
import com.tasteaura.server.repository.MenuItemRepository;
import com.tasteaura.server.repository.OrderItemRepository;
import com.tasteaura.server.repository.OrderRepository;
import com.tasteaura.server.requests.CreateOrderRequest;
import com.tasteaura.server.security.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderItemRepository orderItemRepository;
    private final ModelMapper modelMapper;

    /**
     * Creates a new order for the currently authenticated user.
     */
    @Override
    public void createOrder(CreateOrderRequest request) {
        Users currentUser = SecurityUtils.getCurrentUser();

        // Create order shell
        Order order = Order.builder()
                .user(currentUser)
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .orderType(request.getOrderType())
                .totalAmount(0.0)
                .build();

        // Save base order
        Order savedOrder = orderRepository.save(order);

        // Create and save order items
        List<OrderItem> orderItems = request.getItems().stream().map(itemReq -> {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Menu item not found: " + itemReq.getMenuItemId()));

            double subtotal = menuItem.getPrice() * itemReq.getQuantity();

            OrderItem orderItem = OrderItem.builder()
                    .menuItem(menuItem)
                    .order(savedOrder)
                    .quantity(itemReq.getQuantity())
                    .subtotal(subtotal)
                    .build();

            return orderItemRepository.save(orderItem);
        }).collect(Collectors.toList());

        // Compute total and update order
        double total = orderItems.stream()
                .mapToDouble(OrderItem::getSubtotal)
                .sum();

        savedOrder.setOrderItems(orderItems);
        savedOrder.setTotalAmount(total);
        orderRepository.save(savedOrder);
    }

    /**
     * Retrieves all orders for the currently authenticated user.
     */
    @Override
    public List<OrderDTO> getOrdersForCurrentUser() {
        Users currentUser = SecurityUtils.getCurrentUser();

        List<Order> orders = orderRepository.findByUser(currentUser);

        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a specific order by ID.
     */
    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        return convertToDTO(order);

    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getAllActiveOrders() {
        List<Order> orders = orderRepository.findByStatusNotIn(List.of(OrderStatus.COMPLETED, OrderStatus.CANCELLED));
        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));


        if (order.getStatus() == OrderStatus.COMPLETED || order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalArgumentException("Cannot update a completed or cancelled order");
        }

        order.setStatus(newStatus);
        orderRepository.save(order);

        return convertToDTO(order);
    }
    /**
     * Converts an Order entity into a DTO using ModelMapper.
     * Handles nested mapping for order items and menu item info.
     */
    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = modelMapper.map(order, OrderDTO.class);

        Users user = order.getUser();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());

        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = modelMapper.map(item, OrderItemDTO.class);
                    itemDTO.setMenuItemId(item.getMenuItem().getId());
                    itemDTO.setMenuItemName(item.getMenuItem().getName());
                    itemDTO.setPrice(item.getMenuItem().getPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        dto.setOrderItems(itemDTOs);
        return dto;
    }
}
