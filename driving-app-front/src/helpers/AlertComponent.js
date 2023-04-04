import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as React from 'react';

export default function AlertComponent({ open, message, severity }) {
  const [isOpen, setIsOpen] = React.useState(open);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };
  console.log(isOpen, message);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
