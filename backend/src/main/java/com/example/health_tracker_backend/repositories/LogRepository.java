package com.example.health_tracker_backend.repositories;

import com.example.health_tracker_backend.models.HealthLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<HealthLog, Long> {
}