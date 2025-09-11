package com.example.health_tracker_backend.repositories;

import com.example.health_tracker_backend.models.HealthLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<HealthLog, Long> {
    @Query("SELECT h FROM HealthLog h WHERE h.date >= :date ORDER BY h.date DESC")
    List<HealthLog> findLogsFromDate(LocalDate date);
}