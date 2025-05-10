package com.example.ems_backend.controller;

import com.example.ems_backend.dto.PayrollDTO;
import com.example.ems_backend.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/payrolls")
@CrossOrigin(origins = "*")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @GetMapping
    public ResponseEntity<List<PayrollDTO>> getAllPayrolls() {
        List<PayrollDTO> payrolls = payrollService.getAllPayrolls();
        return ResponseEntity.ok(payrolls);
    }

    @PostMapping
    public ResponseEntity<PayrollDTO> createPayroll(@RequestBody PayrollDTO payrollDTO) {
        PayrollDTO createdPayroll = payrollService.createPayroll(payrollDTO);
        return new ResponseEntity<>(createdPayroll, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PayrollDTO> updatePayroll(@PathVariable Long id, @RequestBody PayrollDTO payrollDTO) {
        PayrollDTO updatedPayroll = payrollService.updatePayroll(id, payrollDTO);
        return ResponseEntity.ok(updatedPayroll);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable Long id) {
        payrollService.deletePayroll(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PayrollDTO> getPayrollById(@PathVariable Long id) {
        PayrollDTO payroll = payrollService.getPayrollById(id);
        return ResponseEntity.ok(payroll);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PayrollDTO>> getPayrollsByEmployeeId(@PathVariable Long employeeId) {
        List<PayrollDTO> payrolls = payrollService.getPayrollsByEmployeeId(employeeId);
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<PayrollDTO>> getPayrollsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<PayrollDTO> payrolls = payrollService.getPayrollsByDateRange(startDate, endDate);
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/employee/{employeeId}/date-range")
    public ResponseEntity<List<PayrollDTO>> getPayrollsByEmployeeAndDateRange(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<PayrollDTO> payrolls = payrollService.getPayrollsByEmployeeAndDateRange(employeeId, startDate, endDate);
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PayrollDTO>> getPayrollsByStatus(@PathVariable String status) {
        List<PayrollDTO> payrolls = payrollService.getPayrollsByStatus(status);
        return ResponseEntity.ok(payrolls);
    }
} 