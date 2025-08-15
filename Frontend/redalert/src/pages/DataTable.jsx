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

const DataTable = () => {
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
          url = 'http://localhost:8000/api/admin/getComplaints';
        } else {
          // Local JSON file (place it inside public/liveData.json)
          url = '/liveData.json';
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        console.log(result)
        setData(
  result.complaints.map((item, index) => ({
    key: item._id,                     // for unique row key
    title: item.title,                 // complaint title
    tags: item.tags,                   // complaint tags
    description: item.description,     // complaint description
    reportTime: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm'), // formatted date
    status: item.status,               // complaint status
    images: item.images,               // array of image URLs
    userId: item.user,                  // user ID
    index: index + 1
  })) );
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

  // Date range filter props
  const getDateRangeFilterProps = (dataIndex) => ({
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
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (!value || value.length === 0) return true;
      const recordTime = dayjs(record.reportTime, 'YYYY-MM-DD HH:mm');
      return recordTime.isAfter(value[0]) && recordTime.isBefore(value[1]);
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

  // Dropdown filter props for tags
  const getTagsFilterProps = () => ({
    filters: getUniqueValues('tags').map(tag => ({
      text: tag,
      value: tag,
    })),
    onFilter: (value, record) => record.tags.includes(value),
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ...getColumnSearchProps('title'),
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ 
            maxWidth: '180px', 
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 150,
      ...getTagsFilterProps(),
      render: tags => (
        <div style={{ maxWidth: '140px' }}>
          {tags.map(tag => (
            <Tag color="blue" key={tag} style={{ marginBottom: '4px' }}>
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ...getColumnSearchProps('description'),
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ 
            maxWidth: '230px', 
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
      title: 'Report Time',
      dataIndex: 'reportTime',
      key: 'reportTime',
      width: 150,
      ...getDateRangeFilterProps('reportTime'),
      sorter: (a, b) => dayjs(a.reportTime, 'YYYY-MM-DD HH:mm').unix() - dayjs(b.reportTime, 'YYYY-MM-DD HH:mm').unix(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      ...getStatusFilterProps(),
      render: status => {
        let color =
          status === 'New'
            ? 'red'
            : status === 'Accepted'
            ? 'green'
            : status === 'Waiting'
            ? 'orange'
            : 'default';
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

export default DataTable;
