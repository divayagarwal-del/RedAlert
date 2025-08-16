import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNavbar from "../components/SideNav";
import { Tag, Button, Spin, message } from "antd";
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function IssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        // Fetch the specific complaint from your backend API
        const response = await fetch(`http://localhost:8000/api/admin/getComplaint/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch complaint data');
        }
        
        const data = await response.json();
        setIssue(data.complaint);
      } catch (err) {
        console.error('Error fetching issue:', err);
        setError(err.message);
        message.error('Failed to load complaint data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIssue();
    }
  }, [id]);

  const handleAccept = async () => {
    try {
      let newStatus = 'Accepted';
      
      // Determine the next status based on current status
      if (issue.status === 'New') {
        newStatus = 'Accepted';
      } else if (issue.status === 'Accepted') {
        newStatus = 'Finished';
      } else {
        // If already finished, don't allow further changes
        return;
      }

      const response = await fetch(`http://localhost:8000/api/admin/updateComplaintStatus/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      message.success(`Complaint status updated to ${newStatus}`);
      // Refresh the issue data
      const updatedResponse = await fetch(`http://localhost:8000/api/admin/getComplaint/${id}`);
      const updatedData = await updatedResponse.json();
      setIssue(updatedData.complaint);
    } catch (err) {
      console.error('Error updating status:', err);
      message.error('Failed to update complaint status');
    }
  };

  // Function to get button properties based on status
  const getButtonProps = (status) => {
    if (status === 'New') {
      return {
        text: 'Accept',
        backgroundColor: '#AF8FE9',
        borderColor: '#AF8FE9',
        clickable: true
      };
    } else if (status === 'Accepted') {
      return {
        text: 'Finish',
        backgroundColor: '#FFD700', // Yellow
        borderColor: '#FFD700',
        clickable: true
      };
    } else if (status === 'Finished') {
      return {
        text: 'Finished',
        backgroundColor: '#FF4444', // Red
        borderColor: '#FF4444',
        clickable: false
      };
    }
    return {
      text: 'Unknown',
      backgroundColor: '#CCCCCC',
      borderColor: '#CCCCCC',
      clickable: false
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <SideNavbar />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Box>
      </Box>
    );
  }

  if (error || !issue) {
    return (
      <Box sx={{ display: 'flex' }}>
        <SideNavbar />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" color="error">
            {error || 'Complaint not found'}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Top App Bar */}
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
              Complaint #{issue._id?.slice(-6) || 'N/A'}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Body */}
        <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
          {/* Complaint Title */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'gray.800', mb: 3 }}>
            {issue.title}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {issue.tags && issue.tags.map((tag, index) => (
              <Tag color="blue" key={index} style={{ fontSize: '14px', padding: '4px 12px' }}>
                {tag}
              </Tag>
            ))}
          </Box>

          {/* Description & Images */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 4 }}>
            {/* Left - Description */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Description
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'gray.700', 
                  lineHeight: 1.7, 
                  whiteSpace: 'pre-wrap',
                  mb: 4 
                }}
              >
                {issue.description}
              </Typography>

              {/* Timestamp + Accept Button */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4 }}>
                <Typography variant="body2" sx={{ color: 'gray.600', fontWeight: 'medium' }}>
                  Raised: {dayjs(issue.createdAt).format('YYYY-MM-DD HH:mm')}
                </Typography>
                {issue && (() => {
                  const buttonProps = getButtonProps(issue.status);
                  return (
                    <Button 
                      type="primary" 
                      onClick={handleAccept}
                      disabled={!buttonProps.clickable}
                      style={{ 
                        backgroundColor: buttonProps.backgroundColor, 
                        borderColor: buttonProps.borderColor,
                        borderRadius: '8px',
                        padding: '8px 24px',
                        height: 'auto',
                        cursor: buttonProps.clickable ? 'pointer' : 'not-allowed',
                        opacity: buttonProps.clickable ? 1 : 0.6
                      }}
                    >
                      {buttonProps.text}
                    </Button>
                  );
                })()}
              </Box>
            </Box>

            {/* Right - Images */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', alignSelf: 'flex-start' }}>
                Images
              </Typography>
              {issue.images && issue.images.length > 0 ? (
                issue.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Complaint Image ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                ))
              ) : (
                <Typography variant="body2" sx={{ color: 'gray.500', fontStyle: 'italic' }}>
                  No images attached
                </Typography>
              )}
            </Box>
          </Box>

          {/* Additional Details */}
          <Box sx={{ mt: 4, p: 3, backgroundColor: 'gray.50', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Additional Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'gray.600' }}>
                  User ID: {issue.user}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'gray.600' }}>
                  Status: {issue.status}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'gray.600' }}>
                  Created: {dayjs(issue.createdAt).format('YYYY-MM-DD HH:mm')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
