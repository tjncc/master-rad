import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
  }

  return (
    <Box sx={{ flexGrow: 1, background: 'red' }}>
      <AppBar position="static" sx={{ backgroundColor: '#8E9775' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Driving School
          </Typography>
          {!isLoggedIn ? (
            <div>
              <Button color="inherit" onClick={() => navigate("/register/student")}>Register</Button>
              <Button color="inherit" variant="outlined" onClick={() => navigate("/login")} >Login</Button>
            </div>
          ) :
            (
              <div >
                {role === 'Admin' ? (<Button color="inherit" onClick={() => navigate("/school/add")} >Add school</Button>) : (<div></div>)}
                <Button color="inherit" variant="outlined" onClick={logOut}>Log out</Button>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
