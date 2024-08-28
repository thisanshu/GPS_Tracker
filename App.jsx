import React, { useState } from 'react';
import './App.css';
import { Container, Typography, Button, Paper } from '@mui/material';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [GPSLatitude, setGPSLatitude] = useState('');
  const [GPSLongitude, setGPSLongitude] = useState('');

  const geo = navigator.geolocation;
  const watchID = geo.watchPosition(userGPSCoord);

  function userGPSCoord(position) {
    let userGPSLatitude = position.coords.latitude;
    let userGPSLongitude = position.coords.longitude;
    setGPSLatitude(userGPSLatitude);
    setGPSLongitude(userGPSLongitude);
  }

  const stopGPS = () => {
    geo.clearWatch(watchID);
  };

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=915ab666376e46fe95df0a4640f07968&q=${GPSLatitude}%2C+${GPSLongitude}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    console.log('User Address :', data);
    setUserAddress(data.results[0].formatted);
  };

  const handleGetUserAddress = () => {
    getUserAddress();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          GPS Tracking
        </Typography>
        <Typography variant="h6" gutterBottom>
          GPS Latitude: {GPSLatitude || 'Tracking...'}
        </Typography>
        <Typography variant="h6" gutterBottom>
          GPS Longitude: {GPSLongitude || 'Tracking...'}
        </Typography>
        <Typography variant="h6" gutterBottom>
          User Address: {userAddress || 'Fetching address...'}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGetUserAddress} 
          style={{ marginRight: '1rem', marginTop: '1rem' }}
        >
          Get User Address
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={stopGPS} 
          style={{ marginTop: '1rem' }}
        >
          Stop Tracking
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
