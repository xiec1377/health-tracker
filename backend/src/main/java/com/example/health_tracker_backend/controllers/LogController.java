package com.example.health_tracker_backend.controllers;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.health_tracker_backend.services.LogService;
import com.example.health_tracker_backend.models.HealthLog;

import java.util.List;
import java.time.LocalDate;

@RestController
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @PostMapping("/api/health/log")
    public HealthLog saveLog(@RequestBody HealthLog log) {
        return logService.addLog(log);
    }

    @GetMapping("/api/health/logs/week")
    public List<HealthLog> getWeeklyLogs(@RequestParam String date) {
        LocalDate today = LocalDate.parse(date);
        System.out.println("getting weekly logs for" + date);
        return logService.getWeeklyLogs();
    }
}
