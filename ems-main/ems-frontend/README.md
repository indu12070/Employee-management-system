# EMS Frontend

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
```cmd
cd ems-frontend
npm install
npm start
```

### Access
- Application: http://localhost:3000

### Project Structure
- `src/`
  - `components/` - React components
  - `services/` - API services
  - `App.js` - Main application
  - `index.js` - Entry point

### Key Features
- Employee Management
- Department Management
- Payroll Processing
- Interactive Dashboard
- Material-UI Components
- Responsive Design

### Available Scripts
- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Build for production

### Troubleshooting
1. Port 3000 already in use:
   - Change port in package.json
   - Or stop the process using port 3000

2. Build fails:
   - Check Node.js version
   - Clear node_modules and reinstall
   - Check console for errors

## Project Structure

### Core Components

1. **App.js**
   - Main application component
   - Sets up routing using React Router
   - Configures Material-UI theme
   - Defines main routes: Home, Employees, Departments, Payroll

2. **Components/Navbar.js**
   - Main navigation component
   - Provides navigation links to different sections
   - Uses Material-UI AppBar and Toolbar
   - Responsive design with mobile considerations

3. **Components/Home.js**
   - Dashboard overview component
   - Displays key statistics:
     - Total Employees
     - Total Departments
     - Total Payroll
     - Average Salary
   - Shows department overview
   - Lists recent employees
   - Displays payroll status

### Feature Modules

#### Employees Module
1. **Components/employees/EmployeeList.js**
   - Displays list of all employees
   - Features:
     - Search functionality
     - Sorting capabilities
     - Add/Edit/Delete operations
     - Department filtering

2. **Components/employees/EmployeeForm.js**
   - Form for adding/editing employees
   - Validates input data
   - Handles department selection
   - Manages employee details

#### Departments Module
1. **Components/departments/DepartmentList.js**
   - Shows all departments
   - Features:
     - Employee count per department
     - Department details
     - Add/Edit/Delete operations

2. **Components/departments/DepartmentForm.js**
   - Form for department management
   - Handles department creation and updates
   - Validates department information

#### Payroll Module
1. **Components/payroll/Payroll.js**
   - Main payroll component with tabs
   - Integrates PayrollDashboard and PayrollList

2. **Components/payroll/PayrollDashboard.js**
   - Displays payroll statistics
   - Shows salary distribution
   - Provides payment status overview

3. **Components/payroll/PayrollList.js**
   - Lists all payroll records
   - Features:
     - Filtering by date
     - Search functionality
     - Payment status tracking

### Services

1. **Services/api.js**
   - Central API service configuration
   - Defines endpoints for:
     - Employee management
     - Department management
     - Payroll operations
   - Uses Axios for HTTP requests

## Data Flow

1. **Component Initialization**
   - Components mount and initialize state
   - API calls are made to fetch initial data
   - Data is stored in component state

2. **User Interactions**
   - User actions trigger state updates
   - API calls are made to persist changes
   - UI updates reflect new data

3. **Error Handling**
   - API errors are caught and displayed
   - Loading states are managed
   - User feedback is provided

## Styling

- Uses Material-UI for consistent design
- Custom theme configuration in App.js
- Responsive design for all screen sizes
- Custom styling for specific components

## State Management

- Uses React's useState and useEffect hooks
- Component-level state management
- API service for data fetching and updates

## Error Handling

- API error handling in service layer
- User-friendly error messages
- Loading states for better UX

## Performance Considerations

- Lazy loading of components
- Efficient data fetching
- Optimized re-renders
- Proper cleanup in useEffect hooks

## Security

- API calls include proper headers
- Input validation on forms
- Error handling for failed requests

## Browser Support

- Supports modern browsers
- Responsive design for mobile devices
- Cross-browser compatibility

## Development Guidelines

1. **Code Style**
   - Follow ESLint configuration
   - Use functional components
   - Implement proper error handling

2. **Component Structure**
   - Keep components focused and small
   - Use proper prop types
   - Implement proper documentation

3. **Testing**
   - Write unit tests for components
   - Test API integration
   - Verify error handling

## Deployment

1. **Build Process**
   ```cmd
   npm run build
   ```

2. **Production Considerations**
   - Environment variables
   - API endpoint configuration
   - Error tracking setup

## Contributing

1. Follow the established code style
2. Write clear commit messages
3. Test changes thoroughly
4. Update documentation as needed
