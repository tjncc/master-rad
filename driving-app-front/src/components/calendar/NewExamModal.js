import React from 'react';
import { Modal, Typography, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getStudentsForExam, getUser } from '../../services/userService';
import { getAllSchools } from '../../services/schoolService';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    fontFamily: 'sans-serif'
  },
  formGroup: {
    marginBottom: theme.spacing(2),
  }
}));

export default function NewExamModal({ selectedSlot, open, onClose, onSubmit }) {
  const classes = useStyles();
  const [students, setStudents] = React.useState([]);
  const [examiner, setExaminer] = React.useState('');
  const [student, setStudent] = React.useState('');
  const [schools, setSchools] = React.useState([]);
  const [school, setSchool] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const examinerResponse = await getUser(localStorage.getItem('id'));
          setExaminer(examinerResponse.data);
        }

        getAllSchools()
          .then(response => {
            console.log(response.data);
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

        if (school) {
          getStudentsForExam(school.id)
            .then(response => {
              setStudents(response.data);
              console.log(response.data);
            })
            .catch(error => {
              const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading students unsuccessful'
              setAlert({
                open: true,
                message: errorData,
                severity: 'error',
              });
            });
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSchoolChange = (school) => {
    if (school) {
      console.log(school)
      setSchool(school);
      getStudentsForExam(school.id)
        .then(response => {
          setStudents(response.data);
          console.log(response.data);
        })
        .catch(error => {
          const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading students unsuccessful'
          setAlert({
            open: true,
            message: errorData,
            severity: 'error',
          });
        });
    }
  }

  const handleSubmitForm = (event) => {
    if (student === null || school === null) {
      return;
    }
    event.preventDefault();
    const eventData = {
      isExam: true,
      studentId: student.id,
      examinerId: examiner.id,
      startTime: moment(selectedSlot.start),
      endTime: moment(selectedSlot.start).add(1, 'hour')
    };
    onSubmit(eventData);

    console.log(eventData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modal}>
        <Grid>
          <form onSubmit={handleSubmitForm}>

            <div className={classes.formGroup}>
              <Typography variant='h5' style={{ textAlign: 'center' }}>
                Exam
              </Typography>
            </div>
            <div className={classes.formGroup}>
              <Typography variant='h7'>
                Date: {selectedSlot.start && moment(selectedSlot.start).format('DD-MM-YYYY')}
              </Typography>
            </div>
            <div className={classes.formGroup}>
              <Typography variant='h7'>
                Start: {selectedSlot.start && moment(selectedSlot.start).format('hh:mm A')}
              </Typography>
            </div>
            <div className={classes.formGroup}>
              <Typography variant='h7'>
                End: {selectedSlot.start && moment(selectedSlot.start).add(1, 'hour').format('hh:mm A')}
              </Typography>
            </div>
            {schools && (
              <div className={classes.formGroup}>
                <FormControl fullWidth>
                  <InputLabel>School</InputLabel>
                  <Select
                    required
                    value={school.id}
                    label='School'
                    onChange={(e) => handleSchoolChange(e.target.value)}
                  >
                    {schools && schools.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            {schools && school && (
              <div className={classes.formGroup}>
                <FormControl fullWidth>
                  <InputLabel>Student</InputLabel>
                  <Select
                    required
                    value={student.id}
                    label='Student'
                    onChange={(e) => setStudent(e.target.value)}
                  >
                    {students && students.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name} {option.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            <Grid style={{ margin: '0 auto', display: 'block', textAlign: 'center' }}>
              <Button variant='contained' type='submit'
                style={{ margin: '1rem 0rem', border: '1px solid #8E9775', backgroundColor: '#8E9775', color: 'white', padding: '0.5rem 1rem' }}
              >
                Create
              </Button>
              <Button onClick={onClose}
                style={{ margin: '1rem 1rem', border: '1px solid #8E9775', color: '#8E9775', padding: '0.5rem 1rem' }}>
                Cancel
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    </Modal>
  );
};