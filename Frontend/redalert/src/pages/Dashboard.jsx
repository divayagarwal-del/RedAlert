import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { AccessTime, AttachMoney, Star, Build, Refresh } from '@mui/icons-material';
import SideNavbar from '../components/SideNav';

const Dashboard = () => {
  const [tagsData, setTagsData] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [monthlyComplaintsData, setMonthlyComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch complaint tags statistics
  const fetchTagsStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/getComplaintTagsStats');
      const data = await response.json();
      
      if (data.success !== false) {
        setTagsData(data.tagsData || []);
        setTotalComplaints(data.totalComplaints || 0);
      }
    } catch (error) {
      console.error('Error fetching tags statistics:', error);
      // Set some sample data if API fails
      setTagsData([
        { id: 0, value: 5, label: 'Maintenance' },
        { id: 1, value: 3, label: 'Cleanliness' },
        { id: 2, value: 2, label: 'Food' },
        { id: 3, value: 4, label: 'Staff' },
        { id: 4, value: 1, label: 'Other' }
      ]);
      setTotalComplaints(15);
    }
  };

  // Function to fetch monthly complaint statistics
  const fetchMonthlyStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/getMonthlyComplaintStats');
      const data = await response.json();
      
      if (data.success !== false) {
        setMonthlyComplaintsData(data.monthlyComplaintsData || []);
      }
    } catch (error) {
      console.error('Error fetching monthly statistics:', error);
      // Set some sample data if API fails
      setMonthlyComplaintsData([
        { month: 'Jan', complaints: 8 },
        { month: 'Feb', complaints: 12 },
        { month: 'Mar', complaints: 15 },
        { month: 'Apr', complaints: 10 },
        { month: 'May', complaints: 18 },
        { month: 'Jun', complaints: 22 },
        { month: 'Jul', complaints: 25 },
        { month: 'Aug', complaints: 20 },
        { month: 'Sep', complaints: 16 },
        { month: 'Oct', complaints: 14 },
        { month: 'Nov', complaints: 19 },
        { month: 'Dec', complaints: 23 }
      ]);
    }
  };

  // Function to fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchTagsStats(), fetchMonthlyStats()]);
    setLastUpdated(new Date());
    setLoading(false);
  };

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchAllData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
    
    // Set up interval to fetch data every 30 seconds for real-time updates
    const interval = setInterval(fetchAllData, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Card data - update maintenance requests to show real count
  const cardData = [
    { icon: <AccessTime />, number: '95%', title: 'Occupancy Rate' },
    { icon: <AttachMoney />, number: '$500K', title: 'Revenue' },
    { icon: <Star />, number: '4.5/5', title: 'Guest Satisfaction' },
    { icon: <Build />, number: totalComplaints.toString(), title: 'Maintenance Requests' },
  ];

  // Color palette for pie chart
  const pieColors = [
    '#E5CDFB', // Pale Lavender
    '#CC8DE9', // Bright Lilac
    '#AF8FE9', // Bright Lavender (base)
    '#B496EA', // Slightly darker tint
    '#9B74E3'  // Even darker shade
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
       <Typography
  variant="h4"
  gutterBottom
  sx={{ color: 'transparent' }} // prevent MUI from overriding
  className="font-bold bg-gradient-to-r from-black to-[#3b0d0c] bg-clip-text text-transparent"
>
  Dashboard
</Typography>


        {/* Key Metrics Tiles */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full mx-auto">
  {cardData.map((metric, index) => (
    <Card
      key={index}
      
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#E5CDFB] to-[#AF8FE9] text-white aspect-square shadow-lg rounded-2xl"
    >
      <div className="mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
        {React.cloneElement(metric.icon, { sx: { fontSize: 67 } })} 
      </div>
      <Typography variant="h4" className="font-bold">
        {metric.number}
      </Typography>
      <Typography variant="h6">{metric.title}</Typography>
    </Card>
  ))}
</div>




     <div className="flex gap-4 w-full">
  {/* Bar Chart - 70% */}
  <div className="w-[70%]">
    <Card className="h-full">
      <CardContent className="h-full flex flex-col">
        <div className="flex items-center justify-between w-full mb-4">
          <Typography variant="h6" className='font-semibold'>
            Monthly Complaints
          </Typography>
          <Button
            onClick={handleManualRefresh}
            startIcon={<Refresh />}
            size="small"
            variant="outlined"
            className="text-[#AF8FE9] border-[#AF8FE9] hover:bg-[#AF8FE9] hover:text-white"
          >
            Refresh
          </Button>
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#AF8FE9] mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading data...</p>
            </div>
          ) : monthlyComplaintsData.length > 0 ? (
            <BarChart
              dataset={monthlyComplaintsData}
              xAxis={[{ dataKey: 'month' }]}
              series={[
                {
                  dataKey: 'complaints',
                  label: 'Complaints',
                  color: '#AF8FE9',
                },
              ]}
              height={300}
              slotProps={{
                svg: {
                  children: (
                    <defs>
                      <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#991b1b" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  ),
                },
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <p>No monthly complaint data found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Pie Chart - 30% */}
  <div className="w-[30%]">
    <Card className="h-full">
      <CardContent className="h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full mb-4">
          <Typography variant="h6" className='font-semibold'> 
            Complaint Tags Distribution
          </Typography>
          <Button
            onClick={handleManualRefresh}
            startIcon={<Refresh />}
            size="small"
            variant="outlined"
            className="text-[#AF8FE9] border-[#AF8FE9] hover:bg-[#AF8FE9] hover:text-white"
          >
            Refresh
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#AF8FE9] mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading tags...</p>
            </div>
          ) : tagsData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: tagsData.map((item, index) => ({
                    ...item,
                    color: pieColors[index % pieColors.length],
                  })),
                },
              ]}
              width={250}
              height={300}
              slotProps={{
                svg: {
                  children: (
                    <defs>
                      <linearGradient id="pieGradient" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#991b1b" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  ),
                },
              }}
            />
          ) : (
            <div className="text-center text-gray-500">
              <p>No complaint tags found</p>
            </div>
          )}
        </div>
        {tagsData.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Total Complaints: <span className="font-semibold">{totalComplaints}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Auto-updates every 30 seconds
            </p>
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
</div>





        {/* Recent Issues */}
        
      </Box>
    </Box>
  );
};

export default Dashboard;
