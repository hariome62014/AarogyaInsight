import React from 'react';
import Header from './Header';
import { Container, Grid, Box, Typography } from '@mui/material';
import iitLogo from '../assets/IITPatnaL.jpg';
import backgroundImage from '../assets/bghome.svg'; // Ensure you have a background image in assets

const HomePage = () => {
  return (
    <div className='relative top-12 bg-white mb-8'
    style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        >
      {/* <Header /> */}
      <Box
        sx={{
          // backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      
      </Box>
    </div>
  );
};

export default HomePage;
