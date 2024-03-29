import * as React from 'react'
import { Dialog, DialogContent, DialogActions, TextField } from '@material-ui/core';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {
  Select, MenuItem, FormControl, InputLabel, Container,
} from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import Typography from '@mui/material/Typography'
import moment from 'moment/moment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { register } from '../../services/userService'
import { CATEGORIES } from '../../helpers/categoryEnum'
import AlertComponent from '../../helpers/AlertComponent'

export default function InstructorModal(props) {
  const { schoolName, schoolId } = props;
  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [jmbg, setJmbg] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [dateOfBirth, setDateOfBirth] = React.useState(moment('1999-08-18T21:11:54'))
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' })

  const handleCloseModal = () => {
    setName('');
    setLastName('');
    setEmail('');
    setJmbg('');
    setPhoneNumber('');
    setCategory('');
    setAlert({
      open: false,
      message: '',
      severity: '',
    })
    props.onUpdateInstructors();
    props.handleClose();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name, lastName, email, jmbg, phoneNumber, category, dateOfBirth, role: 1, schoolId
    }

    setAlert({
      open: false,
      message: '',
      severity: '',
    })

    if (!data.name || !data.lastName || !data.jmbg || !data.email) {
      setAlert({
        open: true,
        message: 'Please fill in all necessary fields!',
        severity: 'warning',
      })
      return
    }

    register(data)
      .then((response) => {
        if (response) {
          props.handleRegister();
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.log(error);
        const errorData = error.response?.data && error.response?.data.length < 100 ? error.response?.data : 'Something went wrong'
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}
      PaperProps={{
        style: {
          backgroundColor: '#fdfaf0'
        },
      }}>
      <DialogContent>
        <Container component='main' maxWidth='md'>
          <CssBaseline />
          <Box
            style={{
              margin: '2.5%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar style={{ margin: '1%', backgroundColor: '#E28F83' }}>
              <PersonOutlineOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h6'>
              Register Instructor
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} style={{ margin: '1%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='name'
                    value={name}
                    required
                    fullWidth
                    id='name'
                    label='First Name'
                    autoFocus
                    variant='outlined'
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    value={lastName}
                    label='Last Name'
                    name='lastName'
                    variant='outlined'
                    autoComplete='family-name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    value={email}
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    variant='outlined'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Driving School'
                    value={schoolName}
                    disabled
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='jmbg'
                    value={jmbg}
                    label='JMBG'
                    name='jmbg'
                    type='number'
                    variant='outlined'
                    onChange={(e) => setJmbg(e.target.value)}
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
                    type='number'
                    variant='outlined'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      required
                      value={category}
                      label='Category'
                      style={{ backgroundColor: '#fdfaf0' }}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map((option) => (
                        <MenuItem key={option.value} value={option.value} style={{ backgroundColor: '#fdfaf0' }}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Date of Birth'
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
                <Grid item xs={12} />
              </Grid>
              <Grid container justifyContent='flex-end'>
                <Grid item>
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
        </Container>
      </DialogContent>
      <DialogActions style={{ margin: '0.5% 4%' }}>
        <Button
          type='submit'
          style={{ color: '#8E9775', border: '1px solid #8E9775' }}
          onClick={handleSubmit}
        >
          Register
        </Button>
        <Button style={{ color: '#880808' }} onClick={handleCloseModal}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}