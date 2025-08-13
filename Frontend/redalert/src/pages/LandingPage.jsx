import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import landing from '../assets/landingg.webp';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      {/* Top Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
        <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          RedAlert
        </Typography>
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
          👤
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Section (40%) */}
        <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Welcome to RedAlert Hotel
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button variant="contained" color="primary" fullWidth sx={{ padding: '1rem' }} onClick={() => navigate('/dashboard')}>
              Enter Dashboard
            </Button>
            <Button variant="outlined" color="secondary" fullWidth sx={{ padding: '1rem' }} onClick={() => navigate('/datatable')}>
              View Data Table
            </Button>
          </Box>
        </Box>

        {/* Right Section (60%) */}
        <Box sx={{ width: '60%', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={landing} alt="Hotel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
