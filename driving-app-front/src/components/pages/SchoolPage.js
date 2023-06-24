import * as React from 'react';
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography } from '@material-ui/core';
import { getSchool } from '../../services/schoolService';
import { getInstructorsBySchool } from '../../services/userService';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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

export default function SchoolPage() {
  const { id } = useParams();

  const [school, setSchool] = React.useState(null);
  const [instructors, setInstructors] = React.useState([]);
  const [selectedInstructor, setSelectedInstructor] = React.useState(null);
  const [openRegistrationDialog, setOpenRegistrationDialog] = React.useState(false);
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' })

  React.useEffect(() => {
    async function fetchData() {
      try {
        const schoolResponse = await getSchool(id);
        const instructorsResponse = await getInstructorsBySchool(id);
        setSchool(schoolResponse.data);
        setInstructors(instructorsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    console.log(instructors)
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
      const instructorsResponse = await getInstructorsBySchool(id);
      setInstructors(instructorsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={appColors}>
      <div style={{ padding: '1rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            {school ? (
              <Paper style={{ padding: '1rem', backgroundColor: '#fdfaf0' }}>
                <div className="schoolTitleDiv">
                  <InfoOutlinedIcon />
                  <Typography variant="h4" gutterBottom>
                    {school.name}
                  </Typography>
                </div>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {school.address}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Phone Number
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {school.phoneNumber}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {school.email}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {school.description}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
              </Paper>
            ) : (
              <div></div>
            )}
          </Grid>

          <Grid item xs={12} sm={3}>
            <div style={{ maxHeight: "85vh", overflow: "auto" }}>
              <Typography variant="h6" gutterBottom style={{ position: "fixed", backgroundColor: "white", zIndex: 1 }}>
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