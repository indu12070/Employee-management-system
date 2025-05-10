package com.example.ems_backend.service;

import com.example.ems_backend.dto.PayrollDTO;
import java.time.LocalDate;
import java.util.List;

public interface PayrollService {
    List<PayrollDTO> getAllPayrolls();
    PayrollDTO createPayroll(PayrollDTO payrollDTO);
    PayrollDTO updatePayroll(Long id, PayrollDTO payrollDTO);
    void deletePayroll(Long id);
    PayrollDTO getPayrollById(Long id);
    List<PayrollDTO> getPayrollsByEmployeeId(Long employeeId);
    List<PayrollDTO> getPayrollsByDateRange(LocalDate startDate, LocalDate endDate);
    List<PayrollDTO> getPayrollsByEmployeeAndDateRange(Long employeeId, LocalDate startDate, LocalDate endDate);
    List<PayrollDTO> getPayrollsByStatus(String status);
} 