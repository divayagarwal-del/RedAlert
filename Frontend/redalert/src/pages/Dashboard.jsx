import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { AccessTime, AttachMoney, Star, Build } from '@mui/icons-material';
import SideNavbar from '../components/SideNav';

const Dashboard = () => {
  // Sample data for the charts
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 6000 },
    { month: 'Mar', revenue: 7000 },
    { month: 'Apr', revenue: 8000 },
    { month: 'May', revenue: 9000 },
    { month: 'Jun', revenue: 10000 },
    { month: 'Jul', revenue: 11000 },
    { month: 'Aug', revenue: 12000 },
    { month: 'Sep', revenue: 13000 },
    { month: 'Oct', revenue: 14000 },
    { month: 'Nov', revenue: 15000 },
    { month: 'Dec', revenue: 16000 },
  ];

  const serviceCategoryData = [
    { id: 0, value: 30, label: 'Cleaning' },
    { id: 1, value: 20, label: 'Technical' },
    { id: 2, value: 25, label: 'Staff' },
    { id: 3, value: 15, label: 'Noise' },
    { id: 4, value: 10, label: 'Others' },
  ];

  // Card data
  const cardData = [
    { icon: <AccessTime />, number: '95%', title: 'Occupancy Rate' },
    { icon: <AttachMoney />, number: '$500K', title: 'Revenue' },
    { icon: <Star />, number: '4.5/5', title: 'Guest Satisfaction' },
    { icon: <Build />, number: '120', title: 'Maintenance Requests' },
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
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-800 to-red-600 text-white aspect-square shadow-lg rounded-2xl"
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
        <Typography variant="h6" gutterBottom className='font-semibold'>
          Monthly Revenue
        </Typography>
        <div className="flex-1">
          <BarChart
            dataset={monthlyRevenueData}
            xAxis={[{ dataKey: 'month' }]}
            series={[
              {
                dataKey: 'revenue',
                label: 'Revenue',
                color: '#dc2626',
                // color: (index) => {
                //   // Shades from red-800 → red-600
                //   const shades = [
                //     '#991b1b', // red-800
                //     '#b91c1c',
                //     '#dc2626',
                //     '#ef4444',
                //     '#f87171', // lightest
                //   ];
                //   return shades[index % shades.length];
                // },
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
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Pie Chart - 30% */}
  <div className="w-[30%]">
    <Card className="h-full">
      <CardContent className="h-full flex flex-col items-center justify-center">
        <Typography variant="h6" gutterBottom className='font-semibold'> 
          Tags Distribution
        </Typography>
        <div className="flex-1 flex items-center justify-center">
          <PieChart
            series={[
              {
                data: serviceCategoryData.map((item, index) => ({
                  ...item,
                  color: (() => {
                    const shades = [
                      '#991b1b', // red-800
                      '#b91c1c',
                      '#dc2626',
                      '#ef4444',
                      '#f87171',
                    ];
                    return shades[index % shades.length];
                  })(),
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
        </div>
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
