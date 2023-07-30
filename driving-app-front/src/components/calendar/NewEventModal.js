import React from 'react';
import { Modal, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getAvailableExaminers, getUser } from '../../services/userService';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { CLASS_TYPES } from '../../helpers/classTypeEnum';

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

const localizer = momentLocalizer(moment);

export default function NewEventModal({ selectedSlot, open, onClose, onSubmit }) {
  const classes = useStyles();
  const [student, setStudent] = React.useState('');
  const [instructor, setInstructor] = React.useState('');
  const [examiners, setExaminers] = React.useState([]);
  const [examiner, setExaminer] = React.useState('');
  const [classType, setClassType] = React.useState('');
  const [isExam, setIsExam] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const studentResponse = await getUser(localStorage.getItem('id'));
          setStudent(studentResponse.data);

          if (studentResponse) {
            const instructorResponse = await getUser(studentResponse.data.instructorId);
            setInstructor(instructorResponse.data);
          }
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const handleIsExamChange = (event) => {
    event.preventDefault();
    setIsExam(event.target.value)

    const startTime = moment(selectedSlot.start);
    const endTime = moment(selectedSlot.start).add(1, 'hour');

    getAvailableExaminers(startTime, endTime)
      .then(response => {
        setExaminers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!isExam) {
      const eventData = {
        classType: classType,
        studentId: student.id,
        instructorId: instructor.id,
        startTime: moment(selectedSlot.start),
        endTime: moment(selectedSlot.start).add(1, 'hour')
      };
      onSubmit(eventData);
    } else {
      const eventData = {
        isExam: true,
        studentId: student.id,
        examinerId: examiner.id,
        startTime: moment(selectedSlot.start),
        endTime: moment(selectedSlot.start).add(1, 'hour')
      };
      onSubmit(eventData);
    }

    console.log(eventData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modal}>
        {student.passedTheory && student.instructorId ? (
          <Grid>

            <form onSubmit={handleSubmitForm}>
              <div className={classes.formGroup}>
                {student.numberOfClasses === 0 ? (
                  <div className={classes.formGroup}>
                    <FormControl fullWidth>
                      <InputLabel>Class or Exam</InputLabel>
                      <Select
                        required
                        value={isExam}
                        label='Class or Exam'
                        onChange={handleIsExamChange}
                      >
                        <MenuItem value={false}>Class</MenuItem>
                        <MenuItem value={true}>Exam</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  <div className={classes.formGroup}>
                    <Typography variant='h5' style={{ textAlign: 'center' }}>
                      Driving class
                    </Typography>
                  </div>
                )}
              </div>
              <div className={classes.formGroup}>
                <Typography variant='h7'>
                  Student: {student.name} {student.lastName}
                </Typography>
              </div>
              {!isExam &&
                <div className={classes.formGroup}>
                  <Typography variant='h7'>
                    Instructor: {instructor.name} {instructor.lastName}
                  </Typography>
                </div>
              }
              {student.numberOfClasses === 0 && isExam && (
                <div className={classes.formGroup}>
                  <FormControl fullWidth>
                    <InputLabel>Examiner</InputLabel>
                    <Select
                      required
                      value={examiner.id}
                      label='Examiner'
                      onChange={(e) => setExaminer(e.target.value)}
                    >
                      {examiners && examiners.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.name} {option.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
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
              {!isExam &&
                <FormControl fullWidth>
                  <InputLabel>Class type</InputLabel>
                  <Select
                    required
                    value={classType}
                    label='Class Type'
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    {CLASS_TYPES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
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
        ) : (
          <Grid>
            <Typography>
              You need to pass theory and have an instructor chosen to be able to create an appointment for a class or an exam.
            </Typography>
          </Grid>

        )}
      </div>
    </Modal>
  );
};