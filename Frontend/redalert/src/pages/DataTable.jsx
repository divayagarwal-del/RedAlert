import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import SideNavbar from '../components/SideNav';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/liveData.json');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
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
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'urgent') color = 'red';
            if (tag === 'high-priority') color = 'orange';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Report Time',
      dataIndex: 'reportTime',
      key: 'reportTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color;
        if (status === 'new') color = 'red';
        else if (status === 'accepted') color = 'green';
        else if (status === 'paused') color = 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
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
        <Box sx={{ padding: 3 }}>
          <Table columns={columns} dataSource={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
