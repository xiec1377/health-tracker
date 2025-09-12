package com.example.health_tracker_backend.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_tracker_backend.models.HealthLog;
import com.example.health_tracker_backend.services.LogService;

@RestController
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping("/api/health/log")
    public ResponseEntity<HealthLog> getLog(@RequestParam String date) {
    HealthLog log = logService.getLog(date);
    if (log != null) {
        return ResponseEntity.ok(log); // return 200 with log
    } else {
        return ResponseEntity.notFound().build(); // return 404
    }
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
