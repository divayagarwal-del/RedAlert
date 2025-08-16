import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Table, Tag, Input, Button, Space, DatePicker, Select, Tooltip } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import SideNavbar from '../components/SideNav';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Bookings = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);
  const navigate = useNavigate();

  // Change this to true when API is ready
  const USE_API = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;

        if (USE_API) {
          // Backend API endpoint
          url = 'http://localhost:8000/api/admin/listBookings';
        } else {
          // Local JSON file (place it inside public/bookings.json)
          url = '/bookings.json';
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        console.log(result);
        setData(
          result.bookings.map((item, index) => ({
            key: item._id || `booking-${index}`, // for unique row key
            userId: item.user,                    // user ID
            rooms: item.rooms,                   // array of room IDs
            checkInDate: item.checkInDate,       // check-in date
            checkOutDate: item.checkOutDate,     // check-out date
            guests: item.guests,                 // number of guests
            status: item.status,                 // booking status
            totalPrice: item.totalPrice,         // total price
            index: index + 1
          }))
        );
      } catch (error) {
        console.error(error);
        // fallback to empty
      }
    };

    fetchData();
  }, [USE_API]);

  // Get unique values for dropdown filters
  const getUniqueValues = (dataIndex) => {
    const values = data.map(item => item[dataIndex]).flat();
    return [...new Set(values)].filter(Boolean).sort();
  };

  // Get unique status values
  const getUniqueStatuses = () => {
    const statuses = data.map(item => item.status);
    return [...new Set(statuses)].filter(Boolean).sort();
  };

  // Text search filter props
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
        : false,
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

  // Date range filter props for check-in date
  const getCheckInDateFilterProps = () => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <RangePicker
          format="YYYY-MM-DD"
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
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (!value || value.length === 0) return true;
      const recordDate = dayjs(record.checkInDate, 'YYYY-MM-DD');
      return recordDate.isAfter(value[0]) && recordDate.isBefore(value[1]);
    },
  });

  // Dropdown filter props for status
  const getStatusFilterProps = () => ({
    filters: getUniqueStatuses().map(status => ({
      text: status,
      value: status,
    })),
    onFilter: (value, record) => record.status === value,
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
  });

  // Dropdown filter props for guests
  const getGuestsFilterProps = () => ({
    filters: getUniqueValues('guests').map(guest => ({
      text: guest.toString(),
      value: guest,
    })),
    onFilter: (value, record) => record.guests === value,
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 150,
      ...getColumnSearchProps('userId'),
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ 
            maxWidth: '130px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Rooms',
      key: 'rooms',
      dataIndex: 'rooms',
      width: 150,
      render: rooms => (
        <div style={{ maxWidth: '140px' }}>
          {rooms.map(room => (
            <Tag color="green" key={room} style={{ marginBottom: '4px' }}>
              {room}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Check-in Date',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
      width: 120,
      ...getCheckInDateFilterProps(),
      sorter: (a, b) => dayjs(a.checkInDate, 'YYYY-MM-DD').unix() - dayjs(b.checkInDate, 'YYYY-MM-DD').unix(),
    },
    {
      title: 'Check-out Date',
      dataIndex: 'checkOutDate',
      key: 'checkOutDate',
      width: 120,
      sorter: (a, b) => dayjs(a.checkOutDate, 'YYYY-MM-DD').unix() - dayjs(b.checkOutDate, 'YYYY-MM-DD').unix(),
    },
    {
      title: 'Guests',
      dataIndex: 'guests',
      key: 'guests',
      width: 80,
      ...getGuestsFilterProps(),
      render: guests => <Tag color="blue">{guests}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      ...getStatusFilterProps(),
      render: status => {
        let color =
          status === 'confirmed'
            ? 'green'
            : status === 'pending'
            ? 'orange'
            : status === 'completed'
            ? 'blue'
            : status === 'cancelled'
            ? 'red'
            : 'default';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 100,
      render: price => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
          ₹{price.toLocaleString()}
        </span>
      ),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
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
            borderBottom: '4px solid #AF8FE9',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography
              variant="h6"
              sx={{ color: '#AF8FE9', fontWeight: 'bold' }}
            >
              Bookings
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 3 }}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="key"
            style={{ cursor: 'pointer' }}
            scroll={{ x: 1000 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Bookings;
