package com.example.ems_backend.repository;

import com.example.ems_backend.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployeeId(Long employeeId);
    List<Payroll> findByPayDateBetween(LocalDate startDate, LocalDate endDate);
    List<Payroll> findByEmployeeIdAndPayDateBetween(Long employeeId, LocalDate startDate, LocalDate endDate);
    List<Payroll> findByPaymentStatus(String status);
} 