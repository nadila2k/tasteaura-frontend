package com.tasteaura.server.controller;

import com.tasteaura.server.dto.OrderDTO;
import com.tasteaura.server.enums.OrderStatus;
import com.tasteaura.server.enums.ResponseStatus;
import com.tasteaura.server.exception.ResourceNotFoundException;
import com.tasteaura.server.requests.CreateOrderRequest;
import com.tasteaura.server.response.ApiResponse;
import com.tasteaura.server.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/orders")
public class OrderController {

    private final OrderService orderService;


    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            orderService.createOrder(request); 

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(ResponseStatus.SUCCESS, "Order created successfully", null));

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Menu item not found", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }
    /**
     * Get all orders for the currently authenticated user.
     */
    @GetMapping("/my")
    public ResponseEntity<ApiResponse> getOrdersForCurrentUser() {
        try {
            List<OrderDTO> orders = orderService.getOrdersForCurrentUser();
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Fetched all orders for current user", orders)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to fetch user orders", e.getMessage()));
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long id) {
        try {
            OrderDTO order = orderService.getOrderById(id);
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Order fetched successfully", order)
            );

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Order not found", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "An unexpected error occurred", e.getMessage()));
        }
    }

    /**
     * Get all orders (admin or for internal use)
     */
    @GetMapping()
    public ResponseEntity<ApiResponse> getAllOrders() {
        try {
            List<OrderDTO> orders = orderService.getAllOrders();
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Fetched all orders", orders)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to fetch orders", e.getMessage()));
        }
    }

    /**
     * Get all active orders (excluding COMPLETED and CANCELLED)
     */
    @GetMapping("/active")
    public ResponseEntity<ApiResponse> getActiveOrders() {
        try {
            List<OrderDTO> orders = orderService.getAllActiveOrders();
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Fetched active orders", orders)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to fetch active orders", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status
    ) {
        try {
            OrderDTO updatedOrder = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Order status updated successfully", updatedOrder)
            );
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Order not found", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(ResponseStatus.ERROR, "Invalid status update", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to update order status", e.getMessage()));
        }
    }
}
