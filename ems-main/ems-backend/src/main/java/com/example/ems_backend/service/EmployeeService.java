package com.example.ems_backend.service;

import com.example.ems_backend.dto.EmployeeDTO;
import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    void deleteEmployee(Long id);
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO getEmployeeByEmail(String email);
    List<EmployeeDTO> getAllEmployees();
    List<EmployeeDTO> getEmployeesByDepartment(Long departmentId);
    List<EmployeeDTO> getEmployeesByPosition(String position);
} 