import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Data Table', icon: <TableChartIcon />, path: '/datatable' },
];

const SideNavbar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        background: 'linear-gradient(to bottom right, #991b1b, #dc2626)', // from-red-800 to-red-600
        color: '#fff',
      },
    }}
  >
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        RedAlert
      </Typography>
    </Box>
    <Divider sx={{ borderColor: '#fff' }} />
    <List>
      {navItems.map(({ text, icon, path }) => (
        <ListItem
          button
          key={text}
          component={NavLink}
          to={path}
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#d32f2f' : 'transparent',
            color: isActive ? '#fff' : '#fff',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default SideNavbar;
