import React from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function ConformationModal(props) {

  const handleConformation = () => {
    props.onSuccessful(true);
    props.onChangeUsers(!props.isChangedUsers)
    props.handleConfirm();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Typography>{props.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleConformation} variant='contained' color='error'>
          {props.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}