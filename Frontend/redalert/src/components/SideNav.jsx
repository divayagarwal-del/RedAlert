import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import ListAltIcon from '@mui/icons-material/ListAlt'; // Icon for Logs
import BookOnlineIcon from '@mui/icons-material/BookOnline'; // Icon for Bookings

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Data Table', icon: <TableChartIcon />, path: '/datatable' },
  { text: 'Bookings', icon: <BookOnlineIcon />, path: '/bookings' }, // ✅ New menu item
  { text: 'Logs', icon: <ListAltIcon />, path: '/logs' }, // ✅ New menu item
];

const SideNavbar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom right, #E5CDFB, #AF8FE9)',
          color: '#fff',
        },
      }}
    >
      <Box
        onClick={() => navigate('/')}
        sx={{
          p: 2,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Box
          component="img"
          src="/violet.png"
          alt="RedAlert Logo"
          sx={{
            height: '5.2em',
            width: 'auto',
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} className='font-lobster '>
          Wisteria
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
              backgroundColor: isActive ? '#AF8FE9' : 'transparent',
              color: '#fff',
            })}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavbar;
