import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Avatar
} from '@mui/material';
import {
    People as PeopleIcon,
    Business as BusinessIcon,
    Payment as PaymentIcon,
    AccountCircle
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
        { text: 'Departments', icon: <BusinessIcon />, path: '/departments' },
        { text: 'Payroll', icon: <PaymentIcon />, path: '/payroll' }
    ];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        EMS Portal
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                startIcon={item.icon}
                                component={RouterLink}
                                to={item.path}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem disabled>
                                {user?.email || 'User'}
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar; 