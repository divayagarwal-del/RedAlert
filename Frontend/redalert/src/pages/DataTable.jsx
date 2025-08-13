import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import SideNavbar from '../components/SideNav';

const DataTable = () => (
  <Box sx={{ display: 'flex' }}>
    {/* Sidebar */}
    <SideNavbar />

    {/* Main Content */}
    <Box component="main" sx={{ flexGrow: 1 }}>
      {/* Top Title Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: 0,
          borderBottom: '4px solid red',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
            Data Table
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Data Table
        </Typography>
        <Typography>This is the Data Table page content.</Typography>
      </Box>
    </Box>
  </Box>
);

export default DataTable;
