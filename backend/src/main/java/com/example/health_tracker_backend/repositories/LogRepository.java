package com.example.health_tracker_backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.health_tracker_backend.models.HealthLog;

@Repository
public interface LogRepository extends JpaRepository<HealthLog, Long> {
    @Query("SELECT h FROM HealthLog h WHERE h.date = :date")
    HealthLog findByDate(LocalDate date);

    @Query("SELECT h FROM HealthLog h WHERE h.date >= :date ORDER BY h.date ASC")
    List<HealthLog> findLogsFromDate(LocalDate date);
}
