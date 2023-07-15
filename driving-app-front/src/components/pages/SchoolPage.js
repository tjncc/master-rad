import * as React from 'react';
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography } from '@material-ui/core';
import { getSchool, updateSchool } from '../../services/schoolService';
import { getInstructorsBySchool } from '../../services/userService';
import { appColors } from '../../css/theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'
import {
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import { CATEGORIES } from '../../helpers/categoryEnum'
import '../../css/SchoolPage.css'
import InstructorModal from '../registration/InstructorModal';
import AlertComponent from '../../helpers/AlertComponent';
import TextField from '@material-ui/core/TextField';

export default function SchoolPage() {
  const { id } = useParams();

  const [school, setSchool] = React.useState(null);
  const [schoolUpdated, setSchoolUpdated] = React.useState(null);
  const [instructors, setInstructors] = React.useState([]);
  const [selectedInstructor, setSelectedInstructor] = React.useState(null);
  const [openRegistrationDialog, setOpenRegistrationDialog] = React.useState(false);
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' })

  React.useEffect(() => {
    async function fetchData() {
      try {
        const schoolResponse = await getSchool(id);
        const instructorsResponse = await getInstructorsBySchool(id, 999);
        setSchool(schoolResponse.data);
        setSchoolUpdated(schoolResponse.data);
        setInstructors(instructorsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

  }, [id]);

  const handleOpenRegistrationDialog = () => {
    setOpenRegistrationDialog(true);
  }

  const handleRegisterDialog = () => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });
    setAlert({
      open: true,
      message: 'Registration successful',
      severity: 'success',
    });
    setOpenRegistrationDialog(false);
  }

  const handleCloseRegistrationDialog = () => {
    setOpenRegistrationDialog(false);
  }

  async function updateInstructors() {
    try {
      const instructorsResponse = await getInstructorsBySchool(id, 999);
      setInstructors(instructorsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSchool = () => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });
    if (school) {
      const schoolUpdate = { name: school.name, address: school.address, email: school.email, phoneNumber: school.phoneNumber, description: school.description };
      updateSchool(school.id, schoolUpdate)
        .then((response) => {
          setSchool(response.data);
          setAlert({
            open: true,
            message: 'Information successfully updated',
            severity: 'success',
          });
        })
        .catch((error) => {
          setAlert({
            open: true,
            message: 'Unsuccessfully updated',
            severity: 'error',
          });
        });
    }
  };

  async function handleCancel() {
    try {
      const schoolResponse = await getSchool(id);
      setSchool(schoolResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={appColors}>
      <div style={{ padding: '1rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            {school ? (
              <Paper style={{ padding: '1rem 2rem', backgroundColor: '#fdfaf0' }}>
                <Typography variant="h6" gutterBottom>
                  Name
                </Typography>
                {localStorage.getItem('role') === 'Admin' ? 
                (<TextField
                  variant="outlined"
                  name="name"
                  value={school.name}
                  onChange={handleChange}
                  style={{ width: '400px', padding: '0' }}
                />) :
                (<Typography variant="h6" style={{color: '#8E9775'}} gutterBottom>
                  {school.name}
                </Typography>
                )}
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
                {localStorage.getItem('role') === 'Admin' ?
                  (<TextField
                    variant="outlined"
                    name="address"
                    value={school.address}
                    onChange={handleChange}
                    style={{ width: '400px', padding: '0' }}
                  />) :
                  (<Typography variant="h6" style={{color: '#8E9775'}} gutterBottom>
                    {school.address}
                  </Typography>)
                }
                <Typography variant="h6" gutterBottom>
                  Phone Number
                </Typography>
                {localStorage.getItem('role') === 'Admin' ? 
                (<TextField
                  variant="outlined"
                  name="phoneNumber"
                  value={school.phoneNumber}
                  onChange={handleChange}
                  style={{ width: '400px', padding: '0' }}
                />) :
                (<Typography variant="h6" style={{color: '#8E9775'}} gutterBottom>
                    {school.phoneNumber}
                  </Typography>)
                }
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                {localStorage.getItem('role') === 'Admin' ? 
                (<TextField
                  variant="outlined"
                  name="email"
                  value={school.email}
                  onChange={handleChange}
                  style={{ width: '400px', padding: '0' }}
                />) : 
                (<Typography variant="h6" style={{color: '#8E9775'}} gutterBottom>
                    {school.email}
                  </Typography>)
                }
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                {localStorage.getItem('role') === 'Admin' ? 
                (<TextField
                  variant="outlined"
                  name="description"
                  value={school.description}
                  onChange={handleChange}
                  style={{ width: '400px', padding: '0' }}
                />) : 
                (<Typography variant="h6" style={{color: '#8E9775'}} gutterBottom>
                    {school.description}
                  </Typography>)
                }
                { localStorage.getItem('role') === 'Admin' &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    style={{ margin: '2rem 2rem 0 0', border: '1px solid #8E9775', backgroundColor: '#8E9775', color: 'white', padding: '1% 5%' }}
                    onClick={handleUpdateSchool}>
                    Update
                  </Button>
                  <Button
                    style={{ marginTop: '2rem', border: '1px solid #8E9775', color: '#8E9775', padding: '1% 5%' }}
                    onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
                }
              </Paper>
            ) : (
              <div></div>
            )}
          </Grid>

          <Grid item xs={12} sm={3}>
            {school &&
              <div style={{ maxHeight: "85vh", overflow: "auto" }}>
                {localStorage.getItem('role') === 'Admin' &&
                  <div>
                    <Button
                      variant="contained"
                      color="peach"
                      sx={{
                        mt: 3,
                        mb: 2
                      }}
                      onClick={handleOpenRegistrationDialog}>
                      Add instructor
                    </Button>
                    <InstructorModal open={openRegistrationDialog}
                      handleClose={handleCloseRegistrationDialog}
                      handleRegister={handleRegisterDialog}
                      schoolName={school.name}
                      schoolId={school.id}
                      onUpdateInstructors={updateInstructors} />
                  </div>
                }
                <Typography variant="h6" gutterBottom style={{ backgroundColor: "white" }}>
                  List of instructors in this school
                </Typography>
                <List style={{ marginTop: '2rem' }}>
                  {instructors && instructors.map((instructor) => (
                    <div key={instructor.id}>
                      <ListItem button onClick={() => setSelectedInstructor(instructor)}>
                        <ListItemText primary={instructor.name} />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
                {alert.open ? (
                  <AlertComponent
                    open={alert.open}
                    message={alert.message}
                    severity={alert.severity}
                  />
                ) : <></>}
              </div>
            }
          </Grid>

          <Grid item xs={12} sm={5}>
            {selectedInstructor ? (
              <div style={{ padding: '1rem' }}>
                <Typography variant="h6" gutterBottom>
                  Instructor Details
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Name: {selectedInstructor.name} {selectedInstructor.lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Category: {CATEGORIES.find(c => c.value === selectedInstructor.category)?.label}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {selectedInstructor.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone: {selectedInstructor.phoneNumber}
                </Typography>
              </div>
            ) : (
              <div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}