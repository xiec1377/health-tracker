package com.example.health_tracker_backend.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.health_tracker_backend.models.HealthLog;
import com.example.health_tracker_backend.repositories.LogRepository;

@Service
public class LogService {

    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public HealthLog getLog(String date) {
        return logRepository.findByDate(LocalDate.parse(date));
    }

    public HealthLog addLog(HealthLog log) {
        HealthLog existingLog = logRepository.findByDate(log.getDate());
        if (existingLog != null) {
            existingLog.setSteps(log.getSteps());
            existingLog.setCalories(log.getCalories());
            existingLog.setSleep(log.getSleep());
            existingLog.setMood(log.getMood());
            return logRepository.save(existingLog);
        } else {
            return logRepository.save(log);
        }
    }

    public List<HealthLog> getWeeklyLogs() {
        LocalDate today = LocalDate.now();
        LocalDate weekAgo = today.minusDays(7);
        System.out.println("weekago" + weekAgo);
        return logRepository.findLogsFromDate(weekAgo);
    }
}
