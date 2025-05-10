package com.example.ems_backend.config;

import com.example.ems_backend.dto.DepartmentDTO;
import com.example.ems_backend.dto.EmployeeDTO;
import com.example.ems_backend.dto.PayrollDTO;
import com.example.ems_backend.service.DepartmentService;
import com.example.ems_backend.service.EmployeeService;
import com.example.ems_backend.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PayrollService payrollService;

    @Override
    public void run(String... args) {
        // Check if departments exist before creating them
        if (departmentService.getAllDepartments().isEmpty()) {
            // Create Departments
            List<DepartmentDTO> departments = Arrays.asList(
                createDepartment("Engineering", "Software Engineering and Development Department"),
                createDepartment("Human Resources", "Human Resources and Employee Relations"),
                createDepartment("Finance", "Finance, Accounting, and Budget Management"),
                createDepartment("Marketing", "Marketing, Sales, and Business Development"),
                createDepartment("Operations", "Operations and Supply Chain Management"),
                createDepartment("IT Support", "IT Infrastructure and Technical Support"),
                createDepartment("Research & Development", "Product Research and Innovation"),
                createDepartment("Customer Success", "Customer Support and Success Management")
            );

            // Create Employees
            List<EmployeeDTO> employees = Arrays.asList(
                // Engineering Department
                createEmployee("John", "Doe", "john.doe@example.com", "1234567890", 
                    LocalDate.of(1990, 1, 1), LocalDate.of(2020, 1, 1), 
                    "Senior Software Engineer", 120000.00, 1L),
                createEmployee("Alice", "Johnson", "alice.johnson@example.com", "2345678901", 
                    LocalDate.of(1992, 5, 15), LocalDate.of(2021, 3, 15), 
                    "Software Engineer", 95000.00, 1L),
                createEmployee("Michael", "Chen", "michael.chen@example.com", "3456789012", 
                    LocalDate.of(1988, 8, 20), LocalDate.of(2019, 6, 1), 
                    "Tech Lead", 140000.00, 1L),

                // HR Department
                createEmployee("Sarah", "Williams", "sarah.williams@example.com", "4567890123", 
                    LocalDate.of(1991, 3, 10), LocalDate.of(2020, 2, 1), 
                    "HR Manager", 110000.00, 2L),
                createEmployee("David", "Brown", "david.brown@example.com", "5678901234", 
                    LocalDate.of(1993, 7, 25), LocalDate.of(2022, 1, 15), 
                    "HR Specialist", 75000.00, 2L),

                // Finance Department
                createEmployee("Emily", "Davis", "emily.davis@example.com", "6789012345", 
                    LocalDate.of(1989, 11, 5), LocalDate.of(2019, 8, 1), 
                    "Finance Manager", 130000.00, 3L),
                createEmployee("Robert", "Wilson", "robert.wilson@example.com", "7890123456", 
                    LocalDate.of(1994, 4, 20), LocalDate.of(2021, 9, 1), 
                    "Financial Analyst", 85000.00, 3L),

                // Marketing Department
                createEmployee("Jessica", "Taylor", "jessica.taylor@example.com", "8901234567", 
                    LocalDate.of(1992, 9, 15), LocalDate.of(2020, 4, 1), 
                    "Marketing Director", 125000.00, 4L),
                createEmployee("Daniel", "Martinez", "daniel.martinez@example.com", "9012345678", 
                    LocalDate.of(1995, 6, 30), LocalDate.of(2022, 3, 1), 
                    "Marketing Specialist", 78000.00, 4L),

                // Operations Department
                createEmployee("Lisa", "Anderson", "lisa.anderson@example.com", "0123456789", 
                    LocalDate.of(1990, 12, 10), LocalDate.of(2019, 11, 1), 
                    "Operations Manager", 115000.00, 5L),
                createEmployee("James", "Thomas", "james.thomas@example.com", "1234509876", 
                    LocalDate.of(1993, 2, 25), LocalDate.of(2021, 7, 1), 
                    "Operations Analyst", 82000.00, 5L),

                // IT Support Department
                createEmployee("Rachel", "Garcia", "rachel.garcia@example.com", "2345098765", 
                    LocalDate.of(1991, 8, 5), LocalDate.of(2020, 5, 1), 
                    "IT Support Manager", 105000.00, 6L),
                createEmployee("Kevin", "Lee", "kevin.lee@example.com", "3450987654", 
                    LocalDate.of(1994, 10, 20), LocalDate.of(2022, 2, 1), 
                    "IT Support Specialist", 72000.00, 6L),

                // R&D Department
                createEmployee("Amanda", "White", "amanda.white@example.com", "4509876543", 
                    LocalDate.of(1989, 4, 15), LocalDate.of(2019, 9, 1), 
                    "R&D Director", 145000.00, 7L),
                createEmployee("Christopher", "Harris", "christopher.harris@example.com", "5098765432", 
                    LocalDate.of(1992, 7, 30), LocalDate.of(2021, 4, 1), 
                    "Research Scientist", 95000.00, 7L),

                // Customer Success Department
                createEmployee("Michelle", "Clark", "michelle.clark@example.com", "0987654321", 
                    LocalDate.of(1991, 6, 20), LocalDate.of(2020, 7, 1), 
                    "Customer Success Manager", 100000.00, 8L),
                createEmployee("Andrew", "Lewis", "andrew.lewis@example.com", "9876543210", 
                    LocalDate.of(1993, 12, 5), LocalDate.of(2022, 5, 1), 
                    "Customer Success Specialist", 75000.00, 8L)
            );

            // Create Payroll Records
            for (EmployeeDTO employee : employees) {
                // Create monthly payroll records for the last 3 months
                for (int month = 1; month <= 3; month++) {
                    createPayroll(
                        employee.getId(),
                        2024,
                        month
                    );
                }
            }
        }
    }

    private DepartmentDTO createDepartment(String name, String description) {
        DepartmentDTO department = new DepartmentDTO();
        department.setName(name);
        department.setDescription(description);
        return departmentService.createDepartment(department);
    }

    private EmployeeDTO createEmployee(String firstName, String lastName, String email, 
            String phoneNumber, LocalDate dateOfBirth, LocalDate hireDate, 
            String position, Double salary, Long departmentId) {
        EmployeeDTO employee = new EmployeeDTO();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        employee.setPhoneNumber(phoneNumber);
        employee.setDateOfBirth(dateOfBirth);
        employee.setHireDate(hireDate);
        employee.setPosition(position);
        employee.setSalary(salary);
        employee.setDepartmentId(departmentId);
        return employeeService.createEmployee(employee);
    }

    private PayrollDTO createPayroll(Long employeeId, int year, int month) {
        PayrollDTO payroll = new PayrollDTO();
        payroll.setEmployeeId(employeeId);
        payroll.setPayDate(LocalDate.of(year, month, 1));
        payroll.setBaseSalary(employeeService.getEmployeeById(employeeId).getSalary());
        payroll.setBonus(getRandomBonus());
        payroll.setDeductions(getRandomDeductions());
        payroll.setPaymentStatus("PAID");
        return payrollService.createPayroll(payroll);
    }

    private Double getRandomBonus() {
        return Math.round(Math.random() * 5000 * 100.0) / 100.0;
    }

    private Double getRandomDeductions() {
        return Math.round(Math.random() * 2000 * 100.0) / 100.0;
    }
} 