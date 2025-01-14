import React from 'react';
import Header from './Header';
import { Container, Grid, Box, Typography } from '@mui/material';
import iitLogo from '../assets/IITPatnaL.jpg';
import backgroundImage from '../assets/background.jpg'; // Ensure you have a background image in assets

const HomePage = () => {
  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '40px',
            borderRadius: '10px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Container>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <img src={iitLogo} width="200px" height="200px" alt="IIT Patna Logo" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                  Hospital Management and Prediction Portal
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                  Predicting Patient Mortality & Length of Stay
                </Typography>
                <Typography variant="body1">
                  Our advanced predictive analytics provides insights to help healthcare professionals make informed decisions, improving patient outcomes and hospital resource management.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
