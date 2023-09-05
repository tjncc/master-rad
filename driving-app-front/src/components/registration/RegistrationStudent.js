import * as React from 'react'
import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {
  Select, MenuItem, FormControl, InputLabel,
} from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import carImage from '../../images/registration.jpg'
import { appColors } from '../../css/theme'
import { register } from '../../services/userService'
import { getAllSchools } from '../../services/schoolService'
import { CATEGORIES } from '../../helpers/categoryEnum'
import AlertComponent from '../../helpers/AlertComponent'

export default function SignInSide() {
  const navigate = useNavigate();

  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState('');

  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [jmbg, setJmbg] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [dateOfBirth, setDateOfBirth] = React.useState(moment('1999-08-18T21:11:54'))
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' })

  useEffect(() => {
    getAllSchools()
      .then(response => {
        setSchools(response.data);
        setSchoolId(response.data[0]?.id || '');
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading schools unsuccessful'
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name, lastName, email, password, jmbg, phoneNumber, category, dateOfBirth, role: 2, schoolId
    }

    setAlert({
      open: false,
      message: '',
      severity: '',
    })

    if (!data.name || !data.lastName || !data.password || !data.jmbg || !data.email) {
      setAlert({
        open: true,
        message: 'Please fill in all necessary fields!',
        severity: 'warning',
      })
      return
    }

    // if (data.password.length < 8){
    //   setAlert({
    //     open: true,
    //     message: 'Password must be at least 8 characters long!',
    //     severity: 'warning',
    //   })
    //   return
    // }

    if (data.password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Password and confirmed password do not match!',
        severity: 'warning',
      })
      return
    }

    register(data)
      .then((response) => {
        console.log(response);
        if (response) {
          setAlert({
            open: true,
            message: 'Registration successful',
            severity: 'success',
          });
          setTimeout(2000)
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error);
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
      <Grid container component="main" style={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={6}
          style={{
            backgroundImage: `url(${carImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={7} md={6} component={Paper} elevation={6} square>
          <Box
            style={{
              margin: '6%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ color: '#4A503D', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Driving School
            </Typography>
            <br />
            <Avatar style={{ margin: '1%', backgroundColor: '#8E9775' }}>
              <PersonOutlineOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Register as Student
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} style={{ margin: '3%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    value={name}
                    required
                    fullWidth
                    id="name"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    value={lastName}
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    value={email}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Driving School</InputLabel>
                    <Select
                      required
                      value={schoolId}
                      label="School"
                      onChange={(e) => setSchoolId(e.target.value)}
                    >
                      {schools.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    value={password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="jmbg"
                    value={jmbg}
                    label="JMBG"
                    name="jmbg"
                    type="number"
                    onChange={(e) => setJmbg(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    value={phoneNumber}
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      required
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      minDate={new Date(1920, 1, 1)}
                      maxDate={new Date(2010, 1, 1)}
                      value={dateOfBirth}
                      onChange={(newValue) => {
                        setDateOfBirth(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="lightGreen"
                style={{ margin: '3% 0' }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" color="inherit">
                    Already have an account? Sign in
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
  )
}
