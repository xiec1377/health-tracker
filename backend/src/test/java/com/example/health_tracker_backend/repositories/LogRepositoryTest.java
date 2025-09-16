package com.example.health_tracker_backend.repositories;

import com.example.health_tracker_backend.models.HealthLog;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LogRepositoryTest {

    private LogRepository logRepository;

    @BeforeEach
    void setUp() {
        logRepository = mock(LogRepository.class); // create a stub/mock
    }

    @Test
    void testFindByDate() {
        HealthLog log = new HealthLog();
        log.setDate(LocalDate.of(2025, 9, 12));
        log.setSteps(10000);
        log.setCalories(2000);
        log.setSleep(7.5f);
        log.setMood(2); 

        when(logRepository.findByDate(LocalDate.of(2025, 9, 12))).thenReturn(log);

        HealthLog found = logRepository.findByDate(LocalDate.of(2025, 9, 12));

        assertNotNull(found);
        assertEquals(10000, found.getSteps());
        assertEquals(2, found.getMood());

        verify(logRepository, times(1)).findByDate(LocalDate.of(2025, 9, 12));
    }
}
