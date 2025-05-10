import React, { useState } from 'react';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    List as ListIcon
} from '@mui/icons-material';
import PayrollDashboard from './PayrollDashboard';
import PayrollList from './PayrollList';

const Payroll = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '8px 8px 0 0',
                boxShadow: theme.shadows[2]
            }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="payroll tabs"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            minHeight: 64,
                            '&.Mui-selected': {
                                color: theme.palette.primary.main
                            }
                        },
                        '& .MuiTabs-indicator': {
                            height: 3
                        }
                    }}
                >
                    <Tab 
                        icon={<DashboardIcon />} 
                        label="Dashboard" 
                        iconPosition="start"
                    />
                    <Tab 
                        icon={<ListIcon />} 
                        label="Payroll Details" 
                        iconPosition="start"
                    />
                </Tabs>
            </Box>
            <Box sx={{ 
                mt: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: '0 0 8px 8px',
                boxShadow: theme.shadows[2]
            }}>
                {value === 0 && <PayrollDashboard />}
                {value === 1 && <PayrollList />}
            </Box>
        </Box>
    );
};

export default Payroll; 