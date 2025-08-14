import React, { useEffect, useState, useMemo } from 'react';
import { Table, Tag } from 'antd';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Rating } from 'primereact/rating';
import SideNavbar from '../components/SideNav';

const ReviewLogs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch your review data from JSON or API
      const response = await fetch('/reviewLogs.json');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Phone No',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service) => {
        let color = 'blue';
        if (service.toLowerCase() === 'electrical') color = 'orange';
        else if (service.toLowerCase() === 'technical') color = 'purple';
        else if (service.toLowerCase() === 'food') color = 'green';
        return <Tag color={color}>{service.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Rating
          value={rating}
          readOnly
          cancel={false}
          className="red" // Tailwind if you use it
            style={{ color: 'red' }} 
        />
      ),
    },
    {
      title: 'Reported Timestamp',
      dataIndex: 'reportedAt',
      key: 'reportedAt',
    },
    {
      title: 'Closing Timestamp',
      dataIndex: 'closedAt',
      key: 'closedAt',
    },
  ], []);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'white',
            boxShadow: 0,
            borderBottom: '4px solid red'
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
              Review Logs
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 3 }}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewLogs;
