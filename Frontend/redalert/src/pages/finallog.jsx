import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Table, Tag, Input, Button, Space, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Rating } from 'primereact/rating';
import SideNavbar from '../components/SideNav';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const ReviewLogs = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Try API first
        const apiResponse = await fetch('/api/review-logs'); // Change to your API endpoint later
        if (!apiResponse.ok) throw new Error('API not available');
        const apiData = await apiResponse.json();
        setData(apiData);
      } catch (error) {
        console.warn('API unavailable, using local JSON...', error);
        try {
          // 2️⃣ Fallback to local JSON
          const localResponse = await fetch('/reviewLogs.json');
          if (!localResponse.ok) throw new Error('Local JSON not found');
          const localData = await localResponse.json();
          setData(localData);
        } catch (localError) {
          console.error('Failed to load local review logs:', localError);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const dateRangeFilterProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          value={selectedKeys[0]}
          onChange={(dates) => {
            setSelectedKeys(dates ? [dates] : []);
          }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" onClick={() => confirm()} size="small">Filter</Button>
          <Button onClick={() => clearFilters()} size="small">Reset</Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) => {
      if (!value || value.length === 0) return true;
      const recordTime = dayjs(record[dataIndex]);
      return recordTime.isAfter(value[0]) && recordTime.isBefore(value[1]);
    },
  });

  const columns = useMemo(() => [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      ...getColumnSearchProps('customer'),
    },
    {
      title: 'Phone No',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      filters: [
        { text: 'Electrical', value: 'electrical' },
        { text: 'Technical', value: 'technical' },
        { text: 'Food', value: 'food' },
      ],
      onFilter: (value, record) => record.service?.toLowerCase() === value.toLowerCase(),
      render: (service) => {
        let color = 'blue';
        if (service?.toLowerCase() === 'electrical') color = 'orange';
        else if (service?.toLowerCase() === 'technical') color = 'purple';
        else if (service?.toLowerCase() === 'food') color = 'green';
        return <Tag color={color}>{service?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            placeholder="Select rating"
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            style={{ width: '100%', marginBottom: 8 }}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <Select.Option key={r} value={r}>
                {r} Stars
              </Select.Option>
            ))}
          </Select>
          <Space>
            <Button type="primary" onClick={() => confirm()} size="small">Filter</Button>
            <Button onClick={() => clearFilters()} size="small">Reset</Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.rating === value,
      render: (rating) => (
        <Rating value={rating} readOnly cancel={false} style={{ color: '#AF8FE9' }} />
      ),
    },
    {
      title: 'Reported Timestamp',
      dataIndex: 'reportedAt',
      key: 'reportedAt',
      ...dateRangeFilterProps('reportedAt'),
    },
    {
      title: 'Closing Timestamp',
      dataIndex: 'closedAt',
      key: 'closedAt',
      ...dateRangeFilterProps('closedAt'),
    },
  ], [searchText, searchedColumn]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'white',
            boxShadow: 0,
            borderBottom: '4px solid #AF8FE9'
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: '#AF8FE9', fontWeight: 'bold' }}>
              Review Logs
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 3 }}>
          <Table
            loading={loading}
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
