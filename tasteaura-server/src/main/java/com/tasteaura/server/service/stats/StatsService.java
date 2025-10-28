package com.tasteaura.server.service.stats;

import com.tasteaura.server.dto.CustomerStatCardDTO;
import com.tasteaura.server.dto.StatCardDTO;

import java.util.List;

public interface StatsService {
    StatCardDTO getStatsCards();
    List<Object[]> getRevenueOverTime(Integer year, Integer month, String date);
    CustomerStatCardDTO getCustomerStatsCards();

}
