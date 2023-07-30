import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <Box style={{ flexGrow: '1' }}>
      <AppBar position='static' style={{ backgroundColor: '#8E9775', color: 'white' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            style={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <DirectionsCarIcon />
          </IconButton>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            Driving School
          </Typography>
          {!isLoggedIn ? (
            <div>
              <Button color='inherit' onClick={() => navigate('/register/student')}>Register</Button>
              <Button color='inherit' variant='outlined' onClick={() => navigate('/login')} >Login</Button>
            </div>
          ) :
            (
              <div style={{ display: 'inline' }}>
                {role === 'Admin' && (<Button color='inherit' onClick={() => navigate('/schools')} >Manage schools</Button>)}
                {role === 'Admin' && (<Button color='inherit' onClick={() => navigate('/users')} >Manage users</Button>)}
                {role === 'Admin' && (<Button color='inherit' onClick={() => navigate('/school/add')} >Add school</Button>)}
                {role !== 'Admin' && (<Button color='inherit' onClick={() => navigate('/profile')} >Profile</Button>)}
                {role !== 'Admin' && (<Button color='inherit' onClick={() => navigate('/calendar')} >Appointments</Button>)}

                <Button color='inherit' variant='outlined' onClick={logOut}>Log out</Button>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
