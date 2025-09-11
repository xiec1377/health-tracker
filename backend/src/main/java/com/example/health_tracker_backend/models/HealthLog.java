package com.example.health_tracker_backend.models;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name="health_logs")
public class HealthLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private Integer steps;
    private Integer calories;
    private Float sleep;
    private String mood;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Integer getSteps() { return steps; }
    public void setSteps(Integer steps) { this.steps = steps; }
    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }
    public Float getSleep() { return sleep; }
    public void setSleep(Float sleep) { this.sleep = sleep; }
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
}