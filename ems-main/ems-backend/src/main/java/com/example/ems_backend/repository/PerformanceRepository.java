package com.example.ems_backend.repository;

import com.example.ems_backend.model.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    List<Performance> findByEmployeeId(Long employeeId);
    List<Performance> findByReviewDateBetween(LocalDate startDate, LocalDate endDate);
    List<Performance> findByEmployeeIdAndReviewDateBetween(Long employeeId, LocalDate startDate, LocalDate endDate);
    List<Performance> findByRatingGreaterThanEqual(Integer rating);
} 