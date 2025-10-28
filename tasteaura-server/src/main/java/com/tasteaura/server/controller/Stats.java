package com.tasteaura.server.controller;

import com.tasteaura.server.dto.CustomerStatCardDTO;
import com.tasteaura.server.dto.StatCardDTO;
import com.tasteaura.server.enums.ResponseStatus;
import com.tasteaura.server.response.ApiResponse;
import com.tasteaura.server.service.stats.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/dashboard")
public class Stats {
    private final StatsService statsService;

    @GetMapping("/cards/admin")
    public ResponseEntity<ApiResponse> getStatsCards() {
        try {
            StatCardDTO stats = statsService.getStatsCards();

            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Stats fetched successfully", stats)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to fetch stats", e.getMessage()));
        }
    }

    @GetMapping("/revenue/admin")
    public ResponseEntity<ApiResponse> getRevenueOverTime(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) String date
    ) {
        try {
            List<Object[]> revenueData = statsService.getRevenueOverTime(year, month, date);

            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Revenue fetched successfully", revenueData)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to fetch revenue", e.getMessage()));
        }
    }

    @GetMapping("/cards/customer")
    public ResponseEntity<ApiResponse> getCustomerStatsCards() {
        try {
            CustomerStatCardDTO stats = statsService.getCustomerStatsCards();

            return ResponseEntity.ok(
                    new ApiResponse(ResponseStatus.SUCCESS, "Customer stats fetched successfully", stats)
            );

        } catch (IllegalStateException e) {
            // Known validation or unauthorized error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(ResponseStatus.FAILED, e.getMessage(), null));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(ResponseStatus.FAILED, "Failed to fetch customer stats", null));
        }
    }


}
