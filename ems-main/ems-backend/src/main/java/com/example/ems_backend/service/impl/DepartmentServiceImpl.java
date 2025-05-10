package com.example.ems_backend.service.impl;

import com.example.ems_backend.dto.DepartmentDTO;
import com.example.ems_backend.model.Department;
import com.example.ems_backend.repository.DepartmentRepository;
import com.example.ems_backend.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
        if (departmentRepository.existsByName(departmentDTO.getName())) {
            throw new RuntimeException("Department name already exists");
        }

        Department department = new Department();
        updateDepartmentFromDTO(department, departmentDTO);
        Department savedDepartment = departmentRepository.save(department);
        return convertToDTO(savedDepartment);
    }

    @Override
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        if (!department.getName().equals(departmentDTO.getName()) &&
                departmentRepository.existsByName(departmentDTO.getName())) {
            throw new RuntimeException("Department name already exists");
        }

        updateDepartmentFromDTO(department, departmentDTO);
        Department updatedDepartment = departmentRepository.save(department);
        return convertToDTO(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found");
        }
        departmentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        return convertToDTO(department);
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentDTO getDepartmentByName(String name) {
        Department department = departmentRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        return convertToDTO(department);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private void updateDepartmentFromDTO(Department department, DepartmentDTO dto) {
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
    }

    private DepartmentDTO convertToDTO(Department department) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setDescription(department.getDescription());
        if (department.getEmployees() != null) {
            dto.setEmployeeIds(department.getEmployees().stream()
                    .map(employee -> employee.getId())
                    .collect(Collectors.toList()));
            dto.setEmployeeCount(department.getEmployees().size());
        } else {
            dto.setEmployeeCount(0);
        }
        return dto;
    }
} 