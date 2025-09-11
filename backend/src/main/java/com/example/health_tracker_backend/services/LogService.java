package com.example.health_tracker_backend.services;

import org.springframework.stereotype.Service;
import com.example.health_tracker_backend.repositories.LogRepository;
import com.example.health_tracker_backend.models.HealthLog;


@Service
public class LogService {
    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public HealthLog addLog(HealthLog log) {
        return logRepository.save(log);
    }
}