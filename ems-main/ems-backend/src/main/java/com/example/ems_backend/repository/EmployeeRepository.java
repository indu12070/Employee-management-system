package com.example.ems_backend.repository;

import com.example.ems_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    List<Employee> findByDepartmentId(Long departmentId);
    List<Employee> findByPosition(String position);
    boolean existsByEmail(String email);
} 