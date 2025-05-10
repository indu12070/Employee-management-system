# Employee Management System (EMS)

A full-stack application for managing employees, departments, and payroll information.

## Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- Java JDK 17 or higher
- Maven 3.6 or higher

### Installation Steps

1. **Clone the repository**
   ```cmd
   git clone https://github.com/sasidhardev02/ems.git
   cd ems
   ```

2. **Backend Setup**
   ```cmd
   cd ems-backend
   mvn clean install
   mvn spring-boot:run
   ```
   - Backend will run on: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console
   - API Documentation: http://localhost:8080/swagger-ui.html

3. **Frontend Setup**
   ```cmd
   cd ems-frontend
   npm install
   npm start
   ```
   - Frontend will run on: http://localhost:3000

### Features
- Employee Management
- Department Management
- Payroll Processing
- Interactive Dashboard
- API Documentation with Swagger

### Database
- Uses H2 in-memory database
- Automatically initialized with sample data
- No manual database setup required

### API Documentation
- Access Swagger UI at: http://localhost:8080/swagger-ui.html
- View all available endpoints
- Test APIs directly from the browser

### Troubleshooting
1. If backend fails to start:
   - Check if port 8080 is available
   - Verify Java and Maven installation
   - Check console for error messages

2. If frontend fails to start:
   - Check if port 3000 is available
   - Verify Node.js installation
   - Check console for error messages

### Support
For any issues or questions, please create an issue in the GitHub repository. 