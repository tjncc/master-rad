import React from 'react';
import { Modal, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

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
    fontFamily: 'sans-serif',
    color: "#4A503D"
  },
  formGroup: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex'
  },
}));

export default function EventDetailsModal({ selectedEvent, open, onClose }) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.modal}>
        <Grid container direction="column">
          <Grid item container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6">Date:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                {selectedEvent.start && moment(selectedEvent.start).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6">Start:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                {selectedEvent.start && moment(selectedEvent.start).format("hh:mm A")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6">Student:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{selectedEvent.studentName}</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6">Instructor:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{selectedEvent.instructorName}</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6">Type of class:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{selectedEvent.classType}</Typography>
            </Grid>
          </Grid>
          <Grid style={{ margin: '0 auto', display: 'block', textAlign: 'center' }}>
            <Button
              onClick={onClose}
              style={{
                border: '1px solid #8E9775',
                color: '#8E9775',
                padding: '0.5rem 1rem',
                marginTop: '1rem',
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};