package com.tasteaura.server.repository;

import com.tasteaura.server.enums.OrderStatus;
import com.tasteaura.server.model.Order;
import com.tasteaura.server.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(Users currentUser);

    List<Order> findByStatusNotIn(List<OrderStatus> completed);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status <> :status1 AND o.status <> :status2")
    Long countByStatusNotIn(@Param("status1") OrderStatus status1, @Param("status2") OrderStatus status2);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE DATE(o.orderDate) = :date")
    Optional<Double> sumTotalByDate(@Param("date") LocalDate date);

    @Query(
            value = "SELECT TO_CHAR(order_date, 'YYYY-MM') AS month, SUM(total_amount) AS total_revenue " +
                    "FROM orders " +
                    "WHERE EXTRACT(YEAR FROM order_date) = :year " +
                    "GROUP BY TO_CHAR(order_date, 'YYYY-MM') " +
                    "ORDER BY month",
            nativeQuery = true
    )
    List<Object[]> findRevenueByYear(@Param("year") int year);

    // 🔹 Filter by Year + Month (Group by Day)
    @Query(
            value = "SELECT TO_CHAR(order_date, 'YYYY-MM-DD') AS date, SUM(total_amount) AS total_revenue " +
                    "FROM orders " +
                    "WHERE EXTRACT(YEAR FROM order_date) = :year " +
                    "AND EXTRACT(MONTH FROM order_date) = :month " +
                    "GROUP BY TO_CHAR(order_date, 'YYYY-MM-DD') " +
                    "ORDER BY date",
            nativeQuery = true
    )
    List<Object[]> findRevenueByMonth(@Param("year") int year, @Param("month") int month);

    // 🔹 Filter by Exact Date
    @Query(
            value = "SELECT TO_CHAR(order_date, 'YYYY-MM-DD') AS date, SUM(total_amount) AS total_revenue " +
                    "FROM orders " +
                    "WHERE DATE(order_date) = :date " +
                    "GROUP BY TO_CHAR(order_date, 'YYYY-MM-DD')",
            nativeQuery = true
    )
    List<Object[]> findRevenueByDate(@Param("date") String date);
    Long countByStatus(OrderStatus orderStatus);


    Long countByUserId(Long userId);

    Long countByUserIdAndStatus(Long userId, OrderStatus status);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId AND o.status NOT IN (:status1, :status2)")
    Long countByUserIdAndStatusNotIn(@Param("userId") Long userId,
                                     @Param("status1") OrderStatus status1,
                                     @Param("status2") OrderStatus status2);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.user.id = :userId")
    Optional<Double> sumTotalByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.user.id = :userId AND DATE(o.orderDate) = :date")
    Optional<Double> sumTotalByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("""
    SELECT oi.menuItem.name
    FROM OrderItem oi
    WHERE oi.order.user.id = :userId
    GROUP BY oi.menuItem.name
    ORDER BY COUNT(oi.id) DESC
""")
    Optional<String> findMostOrderedItemNameByUserId(@Param("userId") Long userId);
}
