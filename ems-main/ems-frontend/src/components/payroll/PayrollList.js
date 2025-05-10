import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Box,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    InputAdornment,
    useTheme,
    alpha,
    Collapse,
    IconButton,
    Avatar
} from '@mui/material';
import {
    Search as SearchIcon,
    AttachMoney as MoneyIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
    Error as ErrorIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { payrollService } from '../../services/api';

const PayrollList = () => {
    const theme = useTheme();
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('employeeLastName');
    const [order, setOrder] = useState('asc');
    const [expandedRows, setExpandedRows] = useState(new Set());

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const response = await payrollService.getAll();
            setPayrolls(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch payroll data. Please try again later.');
            setLoading(false);
        }
    };

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'success';
            case 'pending':
                return 'warning';
            case 'failed':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return <CheckCircleIcon />;
            case 'pending':
                return <PendingIcon />;
            case 'failed':
                return <ErrorIcon />;
            default:
                return null;
        }
    };

    const toggleRow = (employeeId) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(employeeId)) {
            newExpandedRows.delete(employeeId);
        } else {
            newExpandedRows.add(employeeId);
        }
        setExpandedRows(newExpandedRows);
    };

    // Group payrolls by employee
    const groupedPayrolls = payrolls.reduce((acc, payroll) => {
        const key = payroll.employeeId;
        if (!acc[key]) {
            acc[key] = {
                employeeId: payroll.employeeId,
                firstName: payroll.employeeFirstName,
                lastName: payroll.employeeLastName,
                records: []
            };
        }
        acc[key].records.push(payroll);
        return acc;
    }, {});

    const filteredPayrolls = Object.values(groupedPayrolls)
        .filter((group) =>
            `${group.firstName} ${group.lastName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];

            if (order === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

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

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 4
            }}>
                Payroll Details
            </Typography>

            <Box mb={3}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                            }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary" />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            <TableContainer 
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: theme.shadows[3],
                    '&:hover': {
                        boxShadow: theme.shadows[6]
                    }
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                            <TableCell padding="checkbox" />
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'lastName'}
                                    direction={orderBy === 'lastName' ? order : 'asc'}
                                    onClick={() => handleSort('lastName')}
                                >
                                    Employee
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'records'}
                                    direction={orderBy === 'records' ? order : 'asc'}
                                    onClick={() => handleSort('records')}
                                >
                                    Records
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'totalSalary'}
                                    direction={orderBy === 'totalSalary' ? order : 'asc'}
                                    onClick={() => handleSort('totalSalary')}
                                >
                                    Total Salary
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPayrolls.map((group) => {
                            const totalSalary = group.records.reduce((sum, record) => sum + record.netSalary, 0);
                            const isExpanded = expandedRows.has(group.employeeId);
                            
                            return (
                                <React.Fragment key={group.employeeId}>
                                    <TableRow 
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.05)
                                            }
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <IconButton
                                                size="small"
                                                onClick={() => toggleRow(group.employeeId)}
                                            >
                                                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{ 
                                                    bgcolor: theme.palette.primary.main,
                                                    mr: 2
                                                }}>
                                                    {group.firstName[0]}{group.lastName[0]}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        {group.firstName} {group.lastName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            {group.records.length} months
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {formatCurrency(totalSalary)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2 }}>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Month</TableCell>
                                                                <TableCell align="right">Base Salary</TableCell>
                                                                <TableCell align="right">Bonus</TableCell>
                                                                <TableCell align="right">Deductions</TableCell>
                                                                <TableCell align="right">Net Salary</TableCell>
                                                                <TableCell align="center">Status</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {group.records.map((record) => (
                                                                <TableRow key={record.id}>
                                                                    <TableCell>{formatDate(record.payDate)}</TableCell>
                                                                    <TableCell align="right">
                                                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                                            <MoneyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                                                            {formatCurrency(record.baseSalary)}
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                                            <TrendingUpIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                                                                            {formatCurrency(record.bonus)}
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                                            <TrendingDownIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                                                                            {formatCurrency(record.deductions)}
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                            {formatCurrency(record.netSalary)}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Chip
                                                                            icon={getStatusIcon(record.paymentStatus)}
                                                                            label={record.paymentStatus}
                                                                            color={getStatusColor(record.paymentStatus)}
                                                                            size="small"
                                                                            sx={{
                                                                                fontWeight: 'bold',
                                                                                '& .MuiChip-icon': {
                                                                                    color: 'inherit'
                                                                                }
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default PayrollList; 