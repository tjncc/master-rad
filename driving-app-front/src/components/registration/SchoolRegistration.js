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
import AlertComponent from "../../helpers/AlertComponent";
import Container from '@mui/material/Container';

export default function SchoolRegistration() {

  let [name, setName] = React.useState('');
  let [year, setYear] = React.useState('');
  let [alert, setAlert] = React.useState({ open: false, message: "", severity: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, year };
    console.log(data);
    
    setAlert({
      open: false,
      message: "",
      severity: "",
    });

    if (!data.name) {
      setAlert({
        open: true,
        message: "School's name is required!",
        severity: "warning",
      });
      return;
    }

    addSchool(data)
    .then(response => {
      console.log(response)
      if (response) {
        setAlert({
          open: true,
          message: "School is successfully added",
          severity: "success",
        });
      }
    })
    .catch(error => {
      console.log(error)
      const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : "Something went wrong"
      setAlert({
        open: true,
        message: errorData,
        severity: "error",
      });
    });
  };

  return (
    <ThemeProvider theme={appColors}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 0.5, bgcolor: '#8E9775' }}>
              <SchoolOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Add driving school
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  value={name}
                  label="Name"
                  name="name"
                  onChange={e => setName(e.target.value)}
                  sx={{ marginBottom: '4%' }}
                />
                <TextField
                  required
                  fullWidth
                  name="year"
                  value={year}
                  label="Year"
                  type="year"
                  id="year"
                  onChange={e => setYear(e.target.value)}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="lightGreen"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Grid container>
              <Grid xs item>
                {alert.open ? <AlertComponent
                  open={alert.open}
                  message={alert.message}
                  severity={alert.severity}
                /> : <></> }
              </Grid>
            </Grid>
          </Box>
      </Box>
      </Container>
    </ThemeProvider>
  );
}