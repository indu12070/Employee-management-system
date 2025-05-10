import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Divider,
    useTheme,
    alpha
} from '@mui/material';
import {
    AttachMoney as MoneyIcon,
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    AccountBalance as AccountBalanceIcon,
    PieChart as PieChartIcon
} from '@mui/icons-material';
import { payrollService } from '../../services/api';

const PayrollDashboard = () => {
    const theme = useTheme();
    const [payrollData, setPayrollData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState({
        totalPayroll: 0,
        averageSalary: 0,
        highestSalary: 0,
        lowestSalary: 0,
        departmentDistribution: {}
    });

    useEffect(() => {
        fetchPayrollData();
    }, []);

    const fetchPayrollData = async () => {
        try {
            const response = await payrollService.getAll();
            setPayrollData(response.data);
            calculateSummary(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch payroll data. Please try again later.');
            setLoading(false);
        }
    };

    const calculateSummary = (data) => {
        if (!data.length) return;

        const totalPayroll = data.reduce((sum, payroll) => sum + payroll.netSalary, 0);
        const averageSalary = totalPayroll / data.length;
        const highestSalary = Math.max(...data.map(p => p.netSalary));
        const lowestSalary = Math.min(...data.map(p => p.netSalary));

        const departmentDistribution = data.reduce((acc, payroll) => {
            const dept = payroll.employee?.department?.name || 'Unassigned';
            acc[dept] = (acc[dept] || 0) + payroll.netSalary;
            return acc;
        }, {});

        setSummary({
            totalPayroll,
            averageSalary,
            highestSalary,
            lowestSalary,
            departmentDistribution
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ fontSize: '1.1rem' }}>{error}</Alert>
            </Container>
        );
    }

    const cardStyle = {
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8]
        }
    };

    const iconStyle = {
        fontSize: 40,
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        padding: 1,
        borderRadius: 2
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 4
            }}>
                Payroll Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Summary Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Box sx={iconStyle}>
                                    <MoneyIcon />
                                </Box>
                                <Typography variant="h6" sx={{ ml: 2 }}>
                                    Total Payroll
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold',
                                color: theme.palette.primary.main
                            }}>
                                {formatCurrency(summary.totalPayroll)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Box sx={iconStyle}>
                                    <TrendingUpIcon />
                                </Box>
                                <Typography variant="h6" sx={{ ml: 2 }}>
                                    Average Salary
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold',
                                color: theme.palette.success.main
                            }}>
                                {formatCurrency(summary.averageSalary)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Box sx={iconStyle}>
                                    <AccountBalanceIcon />
                                </Box>
                                <Typography variant="h6" sx={{ ml: 2 }}>
                                    Highest Salary
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold',
                                color: theme.palette.info.main
                            }}>
                                {formatCurrency(summary.highestSalary)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Box sx={iconStyle}>
                                    <PeopleIcon />
                                </Box>
                                <Typography variant="h6" sx={{ ml: 2 }}>
                                    Lowest Salary
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold',
                                color: theme.palette.warning.main
                            }}>
                                {formatCurrency(summary.lowestSalary)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Department Distribution */}
                <Grid item xs={12}>
                    <Paper sx={{ 
                        p: 3,
                        borderRadius: 2,
                        boxShadow: theme.shadows[3],
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                            boxShadow: theme.shadows[6]
                        }
                    }}>
                        <Box display="flex" alignItems="center" mb={3}>
                            <Box sx={iconStyle}>
                                <PieChartIcon />
                            </Box>
                            <Typography variant="h6" sx={{ ml: 2 }}>
                                Department-wise Salary Distribution
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={2}>
                            {Object.entries(summary.departmentDistribution).map(([dept, amount]) => (
                                <Grid item xs={12} sm={6} md={4} key={dept}>
                                    <Box sx={{ 
                                        p: 2,
                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        borderRadius: 2,
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                                        }
                                    }}>
                                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                            {dept}
                                        </Typography>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 'bold',
                                            color: theme.palette.primary.main
                                        }}>
                                            {formatCurrency(amount)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PayrollDashboard; 