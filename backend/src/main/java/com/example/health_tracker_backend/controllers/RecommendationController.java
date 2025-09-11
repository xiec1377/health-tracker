package com.example.health_tracker_backend.controllers;

import com.example.health_tracker_backend.services.LogService;
import com.example.health_tracker_backend.services.RecommendationService;
import com.example.health_tracker_backend.models.HealthLog;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class RecommendationController {

    private final LogService logService;
    private final RecommendationService openAIService;

    public RecommendationController(LogService logService, RecommendationService openAIService) {
        this.logService = logService;
        this.openAIService = openAIService;
    }

    @GetMapping("/api/health/recommendations")
    public String getWeeklyRecommendation() throws IOException, InterruptedException {
        List<HealthLog> weeklyLogs = logService.getWeeklyLogs(); 
        System.out.println("Weekly recommendation...");
        return openAIService.generateRecommendation(weeklyLogs);
    }
}
