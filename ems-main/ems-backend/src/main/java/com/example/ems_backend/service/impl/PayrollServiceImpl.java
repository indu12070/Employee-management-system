package com.example.ems_backend.service.impl;

import com.example.ems_backend.dto.PayrollDTO;
import com.example.ems_backend.model.Employee;
import com.example.ems_backend.model.Payroll;
import com.example.ems_backend.repository.EmployeeRepository;
import com.example.ems_backend.repository.PayrollRepository;
import com.example.ems_backend.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PayrollServiceImpl implements PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PayrollDTO> getAllPayrolls() {
        return payrollRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PayrollDTO createPayroll(PayrollDTO payrollDTO) {
        Employee employee = employeeRepository.findById(payrollDTO.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Payroll payroll = new Payroll();
        updatePayrollFromDTO(payroll, payrollDTO, employee);
        calculateNetSalary(payroll);
        Payroll savedPayroll = payrollRepository.save(payroll);
        return convertToDTO(savedPayroll);
    }

    @Override
    public PayrollDTO updatePayroll(Long id, PayrollDTO payrollDTO) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));

        Employee employee = employeeRepository.findById(payrollDTO.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        updatePayrollFromDTO(payroll, payrollDTO, employee);
        calculateNetSalary(payroll);
        Payroll updatedPayroll = payrollRepository.save(payroll);
        return convertToDTO(updatedPayroll);
    }

    @Override
    public void deletePayroll(Long id) {
        if (!payrollRepository.existsById(id)) {
            throw new RuntimeException("Payroll not found");
        }
        payrollRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PayrollDTO getPayrollById(Long id) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));
        return convertToDTO(payroll);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PayrollDTO> getPayrollsByEmployeeId(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PayrollDTO> getPayrollsByDateRange(LocalDate startDate, LocalDate endDate) {
        return payrollRepository.findByPayDateBetween(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PayrollDTO> getPayrollsByEmployeeAndDateRange(Long employeeId, LocalDate startDate, LocalDate endDate) {
        return payrollRepository.findByEmployeeIdAndPayDateBetween(employeeId, startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PayrollDTO> getPayrollsByStatus(String status) {
        return payrollRepository.findByPaymentStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private void updatePayrollFromDTO(Payroll payroll, PayrollDTO dto, Employee employee) {
        payroll.setEmployee(employee);
        payroll.setPayDate(dto.getPayDate());
        payroll.setBaseSalary(dto.getBaseSalary());
        payroll.setBonus(dto.getBonus());
        payroll.setDeductions(dto.getDeductions());
        payroll.setPaymentStatus(dto.getPaymentStatus());
    }

    private void calculateNetSalary(Payroll payroll) {
        double netSalary = payroll.getBaseSalary();
        if (payroll.getBonus() != null) {
            netSalary += payroll.getBonus();
        }
        if (payroll.getDeductions() != null) {
            netSalary -= payroll.getDeductions();
        }
        payroll.setNetSalary(netSalary);
    }

    private PayrollDTO convertToDTO(Payroll payroll) {
        PayrollDTO dto = new PayrollDTO();
        dto.setId(payroll.getId());
        dto.setEmployeeId(payroll.getEmployee().getId());
        dto.setEmployeeFirstName(payroll.getEmployee().getFirstName());
        dto.setEmployeeLastName(payroll.getEmployee().getLastName());
        dto.setPayDate(payroll.getPayDate());
        dto.setBaseSalary(payroll.getBaseSalary());
        dto.setBonus(payroll.getBonus());
        dto.setDeductions(payroll.getDeductions());
        dto.setNetSalary(payroll.getNetSalary());
        dto.setPaymentStatus(payroll.getPaymentStatus());
        return dto;
    }
} 