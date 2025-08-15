import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Table, Tag, Input, Button, Space, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import SideNavbar from '../components/SideNav';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DataTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const navigate = useNavigate();

  // Change this to true when API is ready
  const USE_API = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;

        if (USE_API) {
          // Backend API endpoint
          url = '/api/issues';
        } else {
          // Local JSON file (place it inside public/liveData.json)
          url = '/liveData.json';
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        setData([]); // fallback to empty
      }
    };

    fetchData();
  }, [USE_API]);

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
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
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
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = useMemo(() => [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps('customerName'),
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
      ...getColumnSearchProps('service'),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      filters: [
        { text: 'Urgent', value: 'urgent' },
        { text: 'High Priority', value: 'high-priority' },
        { text: 'Normal', value: 'normal' },
      ],
      onFilter: (value, record) => record.tags.includes(value),
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
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Filter
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        if (!value || value.length === 0) return true;
        const recordTime = dayjs(record.reportTime);
        return recordTime.isAfter(value[0]) && recordTime.isBefore(value[1]);
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'New', value: 'new' },
        { text: 'Accepted', value: 'accepted' },
        { text: 'Paused', value: 'paused' },
      ],
      onFilter: (value, record) => record.status === value,
      render: status => {
        let color =
          status === 'new'
            ? 'red'
            : status === 'accepted'
            ? 'green'
            : status === 'paused'
            ? 'gold'
            : 'default';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
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
            borderBottom: '4px solid #AF8FE9',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography
              variant="h6"
              sx={{ color: '#AF8FE9', fontWeight: 'bold' }}
            >
              Data Table
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 3 }}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="key"
            onRow={(record) => ({
              onClick: () => {
                navigate(`/issue/${record.key}`);
              },
            })}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
