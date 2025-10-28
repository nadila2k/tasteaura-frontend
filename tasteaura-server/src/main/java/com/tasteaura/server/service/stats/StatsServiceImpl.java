package com.tasteaura.server.service.stats;

import com.tasteaura.server.dto.CustomerStatCardDTO;
import com.tasteaura.server.dto.StatCardDTO;
import com.tasteaura.server.enums.OrderStatus;
import com.tasteaura.server.enums.Roles;
import com.tasteaura.server.model.Users;
import com.tasteaura.server.repository.CategoryRepository;
import com.tasteaura.server.repository.MenuItemRepository;
import com.tasteaura.server.repository.OrderRepository;
import com.tasteaura.server.repository.UserRepository;
import com.tasteaura.server.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;

    @Override
    public StatCardDTO getStatsCards() {

        Long totalOrders = orderRepository.count();
        Long ongoingOrders = orderRepository.countByStatusNotIn(OrderStatus.COMPLETED, OrderStatus.CANCELLED);
        Long completedOrders = orderRepository.countByStatus(OrderStatus.COMPLETED);
        Long cancelledOrders = orderRepository.countByStatus(OrderStatus.CANCELLED);
        Long totalUsers = userRepository.countByRole(Roles.CUSTOMER);
        Long totalCategories = categoryRepository.count();
        Long totalMenuItems = menuItemRepository.count();

        Double revenueToday = orderRepository.sumTotalByDate(LocalDate.now()).orElse(0.0);

        return StatCardDTO.builder()
                .totalOrders(totalOrders)
                .ongoingOrders(ongoingOrders)
                .completedOrders(completedOrders)
                .cancelledOrders(cancelledOrders)
                .totalUsers(totalUsers)
                .totalCategories(totalCategories)
                .totalMenuItems(totalMenuItems)
                .revenueToday(revenueToday)
                .build();
    }

    @Override
    public List<Object[]> getRevenueOverTime(Integer year, Integer month, String date) {
        if (date != null) {
            return orderRepository.findRevenueByDate(date);
        } else if (year != null && month != null) {
            return orderRepository.findRevenueByMonth(year, month);
        } else if (year != null) {
            return orderRepository.findRevenueByYear(year);
        } else {
            throw new IllegalArgumentException("At least year, month, or date must be provided");
        }
    }

    @Override
    public CustomerStatCardDTO getCustomerStatsCards() {
        // 1️⃣ Validate current user
        Users currentUser = SecurityUtils.getCurrentUser();
        if (currentUser == null) {
            throw new IllegalStateException("Unauthorized access: user not found or not logged in");
        }

        Long userId = currentUser.getId();
        if (userId == null) {
            throw new IllegalStateException("Invalid user ID: cannot fetch stats");
        }

        try {
            // 2️⃣ Basic counts
            Long totalOrders = orderRepository.countByUserId(userId);
            Long completedOrders = orderRepository.countByUserIdAndStatus(userId, OrderStatus.COMPLETED);
            Long ongoingOrders = orderRepository.countByUserIdAndStatusNotIn(userId, OrderStatus.COMPLETED, OrderStatus.CANCELLED);
            Long cancelledOrders = orderRepository.countByUserIdAndStatus(userId, OrderStatus.CANCELLED);

            // 3️⃣ Spending
            Double totalSpent = orderRepository.sumTotalByUserId(userId).orElse(0.0);
            Double todaySpent = orderRepository.sumTotalByUserIdAndDate(userId, LocalDate.now()).orElse(0.0);



            // 5️⃣ Build and return DTO
            return CustomerStatCardDTO.builder()
                    .totalOrders(totalOrders)
                    .completedOrders(completedOrders)
                    .ongoingOrders(ongoingOrders)
                    .cancelledOrders(cancelledOrders)
                    .totalSpent(totalSpent)
                    .todaySpent(todaySpent)
                    .build();

        } catch (Exception e) {
            // 6️⃣ Log the error and throw a meaningful exception

            throw new IllegalStateException("Failed to fetch customer stats. Please try again later.");
        }
    }
}
