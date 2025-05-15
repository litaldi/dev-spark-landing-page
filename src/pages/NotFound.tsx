
import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import Layout from '../components/layout/Layout';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 6,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '4rem', md: '6rem' }, 
              fontWeight: 700, 
              color: 'text.primary',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            component="p"
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            Oops! This page has gone missing.
          </Typography>
          
          <Typography 
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
          >
            The page you're looking for doesn't exist or has been moved.
            Don't worry, you can find your way back to our homepage.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={RouterLink}
            to="/"
            sx={{ px: 4, py: 1 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
};

export default NotFound;
