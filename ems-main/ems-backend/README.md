# EMS Backend

## Quick Start

### Prerequisites
- Java JDK 17 or higher
- Maven 3.6 or higher

### Installation
```cmd
cd ems-backend
mvn clean install
mvn spring-boot:run
```

### Access Points
- Application: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console
- Swagger UI: http://localhost:8080/swagger-ui.html

### Database
- H2 in-memory database
- Automatically initialized with sample data
- No manual setup required

### API Documentation
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI Spec: http://localhost:8080/api-docs

### Project Structure
- `src/main/java/com/example/ems_backend/`
  - `controller/` - REST endpoints
  - `service/` - Business logic
  - `repository/` - Data access
  - `model/` - Entity classes
  - `dto/` - Data transfer objects
  - `config/` - Configuration classes

### Key Features
- Employee Management
- Department Management
- Payroll Processing
- RESTful APIs
- Swagger Documentation
- H2 Database Integration

### Troubleshooting
1. Port 8080 already in use:
   - Change port in application.properties
   - Or stop the process using port 8080

2. Build fails:
   - Check Java version
   - Verify Maven installation
   - Check console for errors

## Setup Instructions

1. **Prerequisites**
   - Java JDK 17 or higher
   - Maven 3.6 or higher

2. **Database Configuration**
   - The application uses H2 in-memory database for development
   - H2 Console is available at: `http://localhost:8080/h2-console`
   - Database credentials (from application.properties):
     ```
     JDBC URL: jdbc:h2:mem:emsdb
     Username: sa
     Password: password
     ```
   - Note: The database is automatically created and initialized with sample data on application startup

3. **Configuration**
   - The application uses default configuration from `application.properties`
   - Key configurations:
     ```properties
     # H2 Database Configuration
     spring.datasource.url=jdbc:h2:mem:emsdb
     spring.datasource.driverClassName=org.h2.Driver
     spring.datasource.username=sa
     spring.datasource.password=password
     
     # Enable H2 Console
     spring.h2.console.enabled=true
     spring.h2.console.path=/h2-console
     ```

4. **Project Structure**

### Core Components

1. **Models**
   - **Employee.java**
     - Employee entity with JPA annotations
     - Fields: id, firstName, lastName, email, phoneNumber, etc.
     - Relationships with Department

   - **Department.java**
     - Department entity
     - Fields: id, name, description
     - One-to-many relationship with Employee

   - **Payroll.java**
     - Payroll entity
     - Fields: id, employee, payDate, baseSalary, etc.
     - Many-to-one relationship with Employee

2. **DTOs (Data Transfer Objects)**
   - **EmployeeDTO.java**
     - Data transfer object for Employee
     - Includes department information
     - Used for API requests/responses

   - **DepartmentDTO.java**
     - Data transfer object for Department
     - Includes employee count
     - Used for API requests/responses

   - **PayrollDTO.java**
     - Data transfer object for Payroll
     - Includes employee information
     - Used for API requests/responses

3. **Controllers**
   - **EmployeeController.java**
     - REST endpoints for employee operations
     - CRUD operations
     - Search and filter functionality

   - **DepartmentController.java**
     - REST endpoints for department operations
     - CRUD operations
     - Employee count tracking

   - **PayrollController.java**
     - REST endpoints for payroll operations
     - CRUD operations
     - Payment status management

4. **Services**
   - **EmployeeService.java & EmployeeServiceImpl.java**
     - Business logic for employee operations
     - Data validation
     - Transaction management

   - **DepartmentService.java & DepartmentServiceImpl.java**
     - Business logic for department operations
     - Employee count management
     - Data validation

   - **PayrollService.java & PayrollServiceImpl.java**
     - Business logic for payroll operations
     - Salary calculations
     - Payment processing

5. **Repositories**
   - **EmployeeRepository.java**
     - JPA repository for Employee entity
     - Custom query methods
     - Data access layer

   - **DepartmentRepository.java**
     - JPA repository for Department entity
     - Custom query methods
     - Data access layer

   - **PayrollRepository.java**
     - JPA repository for Payroll entity
     - Custom query methods
     - Data access layer

6. **Configuration**
   - **DataInitializer.java**
     - Initializes sample data
     - Creates departments and employees
     - Sets up payroll records

## API Endpoints

### Employee Endpoints
```
GET    /api/employees          - Get all employees
GET    /api/employees/{id}     - Get employee by ID
POST   /api/employees          - Create new employee
PUT    /api/employees/{id}     - Update employee
DELETE /api/employees/{id}     - Delete employee
```

### Department Endpoints
```
GET    /api/departments        - Get all departments
GET    /api/departments/{id}   - Get department by ID
POST   /api/departments        - Create new department
PUT    /api/departments/{id}   - Update department
DELETE /api/departments/{id}   - Delete department
```

### Payroll Endpoints
```
GET    /api/payrolls          - Get all payroll records
GET    /api/payrolls/{id}     - Get payroll by ID
POST   /api/payrolls          - Create new payroll record
PUT    /api/payrolls/{id}     - Update payroll record
DELETE /api/payrolls/{id}     - Delete payroll record
```

## Data Flow

1. **Request Processing**
   - Client sends HTTP request
   - Controller receives request
   - Request is validated
   - Service layer processes request
   - Repository layer accesses database
   - Response is returned to client

2. **Data Validation**
   - Input validation in controllers
   - Business rule validation in services
   - Database constraints
   - Error handling and response

3. **Transaction Management**
   - Service layer manages transactions
   - Rollback on errors
   - Data consistency maintenance

## Security

1. **CORS Configuration**
   - Cross-origin resource sharing setup
   - Allowed origins configuration
   - Security headers

2. **Input Validation**
   - Request data validation
   - SQL injection prevention
   - XSS protection

## Error Handling

1. **Global Exception Handler**
   - Centralized error handling
   - Custom error responses
   - Logging and monitoring

2. **Validation Errors**
   - Input validation errors
   - Business rule violations
   - Database constraint violations

## Database

1. **Schema**
   - Employee table
   - Department table
   - Payroll table
   - Relationships and constraints

2. **Indexes**
   - Primary keys
   - Foreign keys
   - Performance optimization

## Testing

1. **Unit Tests**
   - Service layer tests
   - Repository layer tests
   - Controller tests

2. **Integration Tests**
   - API endpoint tests
   - Database integration tests
   - End-to-end tests

## Performance Optimization

1. **Database**
   - Proper indexing
   - Query optimization
   - Connection pooling

2. **Application**
   - Caching strategies
   - Lazy loading
   - Pagination

## Monitoring

1. **Logging**
   - Application logs
   - Error logs
   - Access logs

2. **Metrics**
   - Response times
   - Error rates
   - Resource usage

## Deployment

1. **Build Process**
   ```cmd
   mvn clean package
   ```

2. **Production Considerations**
   - Environment variables
   - Database configuration
   - Security settings

## Contributing

1. Follow the established code style
2. Write clear commit messages
3. Test changes thoroughly
4. Update documentation as needed

## API Documentation

1. **Swagger UI**
   - Access the interactive API documentation at `http://localhost:8080/swagger-ui.html`
   - Features:
     - Browse all available endpoints
     - View request/response schemas
     - Test API endpoints directly from the browser
     - View authentication requirements
     - Download OpenAPI specification

2. **OpenAPI Specification**
   - Raw OpenAPI specification available at `http://localhost:8080/v3/api-docs`
   - Can be imported into tools like Postman
   - Supports code generation for client libraries

3. **Documentation Features**
   - Detailed endpoint descriptions
   - Request/response examples
   - Data models and schemas
   - Authentication requirements
   - Error responses
   - Query parameters and path variables 