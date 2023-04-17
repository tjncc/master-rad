import * as React from 'react';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { appColors } from '../../css/theme';
import Container from '@mui/material/Container';
import { test } from '../../services/schoolService';
import Button from '@mui/material/Button';

export default function Test() {
  const token = localStorage.getItem('jwtToken');
  const [isVerified, setIsVerified] = React.useState(false);

  React.useEffect(() => {
  }, []);

  const handleClick = () => {
    console.log('Button clicked!');
    console.log(token);
    test()
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <ThemeProvider theme={appColors}>
      <Container component="main" maxWidth="xs">

      <Typography component="h1" variant="h6">
                Test
              </Typography>
                <Button variant="body2" color='#FAF2DA' onClick={handleClick}>
                  Click
                </Button>
      </Container>
    </ThemeProvider>
  );
};