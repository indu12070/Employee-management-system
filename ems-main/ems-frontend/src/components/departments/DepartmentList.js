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
    Alert
} from '@mui/material';
import { departmentService } from '../../services/api';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('id');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await departmentService.getAll();
            setDepartments(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch departments. Please try again later.');
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

    const filteredDepartments = departments
        .filter((department) =>
            Object.values(department)
                .join(' ')
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
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Departments
            </Typography>

            <Box mb={3}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ mb: 2 }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'}
                                    onClick={() => handleSort('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'description'}
                                    direction={orderBy === 'description' ? order : 'asc'}
                                    onClick={() => handleSort('description')}
                                >
                                    Description
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'employeeCount'}
                                    direction={orderBy === 'employeeCount' ? order : 'asc'}
                                    onClick={() => handleSort('employeeCount')}
                                >
                                    Employee Count
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDepartments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell>{department.id}</TableCell>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>{department.description || 'N/A'}</TableCell>
                                <TableCell>{department.employeeCount || 0}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DepartmentList; 