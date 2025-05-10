package com.example.ems_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Welcome to Employee Management System API");
        response.put("endpoints", Map.of(
            "employees", "/api/employees",
            "departments", "/api/departments",
            "payrolls", "/api/payrolls",
            "performances", "/api/performances"
        ));
        return ResponseEntity.ok(response);
    }
} 