import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import carImage from '../../images/registration.jpg';
import { appColors } from '../../css/theme';
import { login } from '../../services/userService';
import AlertComponent from '../../helpers/AlertComponent';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email, password };
    console.log(data);

    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    if (!data.password || !data.email) {
      setAlert({
        open: true,
        message: 'Enter your email and password!',
        severity: 'warning',
      });
      return;
    }

    login(data)
      .then((response) => {
        if (response) {
          console.log(response.data)
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('id', response.data.id);
          setAlert({
            open: true,
            message: 'Login successful',
            severity: 'success',
          });
          navigate('/')
        }
      })
      .catch((error) => {
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Something went wrong';
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });
  };

  return (
    <ThemeProvider theme={appColors}>
      <Grid container component='main' style={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url(${carImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '10% 5%'
            }}
          >
            <Typography
              component='h1'
              variant='h5'
              style={{ color: '#4A503D', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Driving School
            </Typography>
            <br />
            <Avatar style={{ margin: '1%', backgroundColor: '#8E9775' }}>
              <PersonOutlineOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h6'>
              Log in
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} style={{ margin: '5%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    value={email}
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    value={password}
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} />
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='lightGreen'
                style={{ margin: '3% 0' }}
              >
                Log in
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/register/student' variant='body2' color='inherit'>
                    Don`t have an account? Sign up
                  </Link>
                  {alert.open ? (
                    <AlertComponent
                      open={alert.open}
                      message={alert.message}
                      severity={alert.severity}
                    />
                  ) : <></>}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
