package com.example.ems_backend.service;

import com.example.ems_backend.dto.DepartmentDTO;
import java.util.List;

public interface DepartmentService {
    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);
    DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO);
    void deleteDepartment(Long id);
    DepartmentDTO getDepartmentById(Long id);
    DepartmentDTO getDepartmentByName(String name);
    List<DepartmentDTO> getAllDepartments();
} 