package com.example.health_tracker_backend.controllers;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.health_tracker_backend.services.LogService;
import com.example.health_tracker_backend.models.HealthLog;

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
}
