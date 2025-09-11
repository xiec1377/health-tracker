package com.example.health_tracker_backend.services;

import org.springframework.stereotype.Service;
import com.example.health_tracker_backend.repositories.LogRepository;
import com.example.health_tracker_backend.models.HealthLog;

import java.util.List;
import java.time.LocalDate;


@Service
public class LogService {
    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public HealthLog addLog(HealthLog log) {
        return logRepository.save(log);
    }

    public List<HealthLog> getWeeklyLogs(LocalDate today) {
        LocalDate weekAgo = today.minusDays(7);
        return logRepository.findLogsFromDate(weekAgo);
    }
}