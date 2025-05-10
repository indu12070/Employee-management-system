import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Chip,
    LinearProgress,
    useTheme,
    alpha,
    IconButton,
    Tooltip,
    Button
} from '@mui/material';
import {
    People as PeopleIcon,
    Business as BusinessIcon,
    AttachMoney as MoneyIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
    Error as ErrorIcon,
    ArrowForward as ArrowForwardIcon,
    Person as PersonIcon,
    Group as GroupIcon,
    AccountBalance as AccountBalanceIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';
import { employeeService, departmentService, payrollService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        totalPayroll: 0,
        averageSalary: 0,
        recentEmployees: [],
        departmentStats: [],
        payrollStats: {
            total: 0,
            pending: 0,
            paid: 0,
            failed: 0
        }
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [employees, departments, payrolls] = await Promise.all([
                employeeService.getAll(),
                departmentService.getAll(),
                payrollService.getAll()
            ]);

            const totalPayroll = payrolls.data.reduce((sum, payroll) => sum + payroll.netSalary, 0);
            const averageSalary = employees.data.length > 0 
                ? totalPayroll / employees.data.length 
                : 0;

            const departmentStats = departments.data.map(dept => ({
                ...dept,
                employeeCount: employees.data.filter(emp => emp.departmentId === dept.id).length
            }));

            const payrollStats = {
                total: payrolls.data.length,
                pending: payrolls.data.filter(p => p.paymentStatus === 'PENDING').length,
                paid: payrolls.data.filter(p => p.paymentStatus === 'PAID').length,
                failed: payrolls.data.filter(p => p.paymentStatus === 'FAILED').length
            };

            setStats({
                totalEmployees: employees.data.length,
                totalDepartments: departments.data.length,
                totalPayroll,
                averageSalary,
                recentEmployees: employees.data.slice(-5).reverse(),
                departmentStats,
                payrollStats
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const StatCard = ({ title, value, icon, color, onClick }) => (
        <Card 
            sx={{ 
                height: '100%',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: onClick ? 'translateY(-4px)' : 'none',
                    boxShadow: onClick ? theme.shadows[8] : theme.shadows[2]
                }
            }}
            onClick={onClick}
        >
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                        sx={{ 
                            bgcolor: alpha(color, 0.1),
                            color: color,
                            mr: 2
                        }}
                    >
                        {icon}
                    </Avatar>
                    <Typography variant="h6" color="textSecondary">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {value}
                </Typography>
                {onClick && (
                    <Box display="flex" alignItems="center" color="primary.main">
                        <Typography variant="body2" sx={{ mr: 1 }}>View Details</Typography>
                        <ArrowForwardIcon fontSize="small" />
                    </Box>
                )}
            </CardContent>
        </Card>
    );

    const DepartmentCard = ({ department }) => (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                        sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            mr: 2
                        }}
                    >
                        <BusinessIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" component="div">
                            {department.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {department.description}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Chip 
                        icon={<GroupIcon />}
                        label={`${department.employeeCount} Employees`}
                        color="primary"
                        variant="outlined"
                    />
                    <Button 
                        size="small" 
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/departments')}
                    >
                        View
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    const RecentEmployeeCard = ({ employee }) => (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Avatar 
                        sx={{ 
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                            mr: 2
                        }}
                    >
                        <PersonIcon />
                    </Avatar>
                    <Box flex={1}>
                        <Typography variant="subtitle1" component="div">
                            {employee.firstName} {employee.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {employee.position}
                        </Typography>
                    </Box>
                    <Button 
                        size="small" 
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/employees')}
                    >
                        View
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    const PayrollStatusCard = () => (
        <Card sx={{ height: '100%' }}>
            <CardHeader 
                title="Payroll Status" 
                avatar={
                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main }}>
                        <AccountBalanceIcon />
                    </Avatar>
                }
            />
            <Divider />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Paid" 
                            secondary={`${stats.payrollStats.paid} records`}
                        />
                        <Typography variant="body2" color="success.main">
                            {((stats.payrollStats.paid / stats.payrollStats.total) * 100).toFixed(1)}%
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PendingIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Pending" 
                            secondary={`${stats.payrollStats.pending} records`}
                        />
                        <Typography variant="body2" color="warning.main">
                            {((stats.payrollStats.pending / stats.payrollStats.total) * 100).toFixed(1)}%
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ErrorIcon color="error" />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Failed" 
                            secondary={`${stats.payrollStats.failed} records`}
                        />
                        <Typography variant="body2" color="error.main">
                            {((stats.payrollStats.failed / stats.payrollStats.total) * 100).toFixed(1)}%
                        </Typography>
                    </ListItem>
                </List>
                <Box mt={2}>
                    <Button 
                        fullWidth 
                        variant="outlined" 
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/payroll')}
                    >
                        View Payroll Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 4
            }}>
                Dashboard Overview
            </Typography>

            <Grid container spacing={3}>
                {/* Key Statistics */}
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Total Employees"
                        value={stats.totalEmployees}
                        icon={<PeopleIcon />}
                        color={theme.palette.primary.main}
                        onClick={() => navigate('/employees')}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Total Departments"
                        value={stats.totalDepartments}
                        icon={<BusinessIcon />}
                        color={theme.palette.secondary.main}
                        onClick={() => navigate('/departments')}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Total Payroll"
                        value={`$${stats.totalPayroll.toLocaleString()}`}
                        icon={<MoneyIcon />}
                        color={theme.palette.success.main}
                        onClick={() => navigate('/payroll')}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Average Salary"
                        value={`$${stats.averageSalary.toLocaleString()}`}
                        icon={<TrendingUpIcon />}
                        color={theme.palette.info.main}
                    />
                </Grid>

                {/* Departments Overview */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardHeader 
                            title="Departments Overview" 
                            avatar={
                                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                                    <BusinessIcon />
                                </Avatar>
                            }
                            action={
                                <Button 
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate('/departments')}
                                >
                                    View All
                                </Button>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                {stats.departmentStats.slice(0, 4).map((dept) => (
                                    <Grid item xs={12} sm={6} key={dept.id}>
                                        <DepartmentCard department={dept} />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Payroll Status */}
                <Grid item xs={12} md={4}>
                    <PayrollStatusCard />
                </Grid>

                {/* Recent Employees */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader 
                            title="Recent Employees" 
                            avatar={
                                <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}>
                                    <PeopleIcon />
                                </Avatar>
                            }
                            action={
                                <Button 
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate('/employees')}
                                >
                                    View All
                                </Button>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                {stats.recentEmployees.map((employee) => (
                                    <Grid item xs={12} sm={6} md={4} key={employee.id}>
                                        <RecentEmployeeCard employee={employee} />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home; 