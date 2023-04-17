import * as React from 'react';
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { getSchool } from '../../services/schoolService';
import { getInstructorsBySchool } from '../../services/userService';
import Stack from '@mui/material/Stack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { appColors } from '../../css/theme';
import { ThemeProvider } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import { CATEGORIES } from '../../helpers/categoryEnum'
import '../../css/SchoolPage.css'

export default function SchoolPage() {
  const { id } = useParams();

  const [school, setSchool] = React.useState(null);
  const [instructors, setInstructors] = React.useState([]);
  const [selectedInstructor, setSelectedInstructor] = React.useState(null);

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

  return (
    <ThemeProvider theme={appColors}>
      <div style={{ padding: '1rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            {school ? (
              <Paper style={{ padding: '1rem' }}>
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
              </Paper>
            ) : (
              <div></div>
            )}
          </Grid>

          <Grid item xs={12} sm={3}>
            <div style={{ padding: '1rem', maxHeight: '80vh', overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                List of instructors in this school
              </Typography>
              <List>
                {instructors.map((instructor) => (
                  <div key={instructor.id}>
                    <ListItem button onClick={() => setSelectedInstructor(instructor)}>
                      <ListItemText primary={instructor.name} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
              <div style={{ padding: '1rem' }}>
                <Typography variant="h7" gutterBottom>
                  You can add an instructor or examiner to this school.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#8E9775",
                      "&:hover": {
                        bgcolor: "#71825A"
                      }
                    }}>
                    Add instructor
                  </Button>
                  <Button variant="contained">Add examiner</Button>
                </Stack>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={5}>
            {selectedInstructor ? (
              <div style={{ padding: '1rem' }}>
                <Typography variant="h6" gutterBottom>
                  Instructor Details
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Name: {selectedInstructor.name}
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