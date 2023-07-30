import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { appColors } from '../../css/theme';
import { addSchool } from '../../services/schoolService';
import AlertComponent from '../../helpers/AlertComponent';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function SchoolRegistration() {
  const navigate = useNavigate();

  let [name, setName] = React.useState('');
  let [year, setYear] = React.useState('');
  let [address, setAddress] = React.useState('');
  let [city, setCity] = React.useState('');
  let [phoneNumber, setPhoneNumber] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [description, setDescription] = React.useState('');
  let [alert, setAlert] = React.useState({ open: false, message: '', severity: '' });

  const handleSuccess = () => {
    setName('');
    setYear('');
    setAddress('');
    setCity('');
    setPhoneNumber('');
    setEmail('');
    setDescription('');
    setAlert({ open: true, message: 'School added successfully', severity: 'success' });
  };


  const handleSubmit = (event) => {
    let id = 0;
    event.preventDefault();
    const data = { name, year, address, city, phoneNumber, email, description };
    console.log(data);

    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    if (!data.name) {
      setAlert({
        open: true,
        message: "School's name is required!",
        severity: 'warning',
      });
      return;
    }

    if (!data.phoneNumber) {
      setAlert({
        open: true,
        message: "School's number is required!",
        severity: 'warning',
      });
      return;
    }

    addSchool(data)
      .then(response => {

        if (response) {
          handleSuccess();
        }
      })
      .catch(error => {
        console.log(error)
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Something went wrong'
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });
  };

  return (
    <ThemeProvider theme={appColors}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{ margin: '1%', backgroundColor: '#8E9775' }}>
            <SchoolOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h6'>
            Add driving school
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} style={{ margin: '3% 0' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='name'
                  value={name}
                  label='Name'
                  name='name'
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  InputProps={{
                    inputProps: {
                      type: 'number',
                      maxLength: 4
                    }
                  }}
                  name='year'
                  value={year}
                  label='Year'
                  type='year'
                  id='year'
                  onChange={e => setYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='address'
                  value={address}
                  label='Address'
                  name='address'
                  onChange={e => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='city'
                  value={city}
                  label='City'
                  name='city'
                  onChange={e => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='phoneNumber'
                  value={phoneNumber}
                  label='Phone Number'
                  name='phoneNumber'
                  InputProps={{
                    inputProps: {
                      type: 'number',
                      maxLength: 12
                    }
                  }}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  value={email}
                  label='Email'
                  name='email'
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='description'
                  value={description}
                  label='Description'
                  name='Description'
                  onChange={e => setDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='lightGreen'
                  style={{ margin: '4% 0' }}
                >
                  Create
                </Button>
              </Grid>
              <Grid item xs={12}>
                {alert.open ? (
                  <AlertComponent
                    open={alert.open}
                    message={alert.message}
                    severity={alert.severity}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}