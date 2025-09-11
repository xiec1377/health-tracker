package com.example.health_tracker_backend.services;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.health_tracker_backend.models.HealthLog;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RecommendationService {

    @Value("${openai.api.key}")
    private String openAIApiKey;

    public String generateRecommendation(List<HealthLog> weeklyLogs) throws IOException, InterruptedException {
        // Build prompt
        System.out.println("IN REC SERVICE...");
        System.out.println("API KEY: " + openAIApiKey);

        StringBuilder prompt = new StringBuilder("Hey there! You're a friendly health coach\n"
                + "- Check out the user's weekly stats: steps, calories, sleep, and mood.\n"
                + "- Give 2–3 quick, easy-to-follow tips or recommendations just a few words each.\n"
                + "- Keep it light and motivating! Don't be afraid to use some slang and gen-z keywords ");
        for (HealthLog log : weeklyLogs) {
            prompt.append(String.format("Date: %s, Steps: %d, Calories: %d, Sleep: %.1f, Mood: %s\n",
                    log.getDate(), log.getSteps(), log.getCalories(), log.getSleep(), log.getMood()));
        }

        System.out.println("Prompt to OpenAI: " + prompt.toString());
        // Prepare request JSON
        ObjectMapper mapper = new ObjectMapper();
        String requestBody = mapper.writeValueAsString(
                new Object() {
            public final String model = "gpt-4"; // or "gpt-3.5-turbo"
            public final Object[] messages = new Object[]{
                new Object() {
                    public final String role = "user";
                    public final String content = prompt.toString();
                }
            };
        }
        );

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + openAIApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("OpenAI response----: " + response.body());

        // Parse response safely
        JsonNode rootNode = mapper.readTree(response.body());
        JsonNode choicesNode = rootNode.path("choices");
        if (choicesNode.isArray() && choicesNode.size() > 0) {
            JsonNode messageNode = choicesNode.get(0).path("message");
            System.out.println("messageNode: " + messageNode.toString());
            if (!messageNode.isMissingNode()) {
                return messageNode.path("content").asText("");
            }
        }
        System.out.println("HERE...");
        return "RECOMMEND...";
        // return recommendation;
    }
}
