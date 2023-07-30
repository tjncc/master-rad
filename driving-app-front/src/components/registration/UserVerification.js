import * as React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { appColors } from '../../css/theme';
import { verify } from '../../services/userService';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'
import { makeStyles } from '@material-ui/core/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: '6%'
  },
  linkButton: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#8E9775',
    fontFamily: 'Open Sans',
    color: '#FAF2DA',
    borderRadius: '6% 6%',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#4A503D',
      color: '#FAF2DA'
    }
  },
}));

export default function UserVerification() {
  const classes = useStyles();

  const { id } = useParams();

  const [isVerified, setIsVerified] = React.useState(false);

  React.useEffect(() => {
    verify(id)
      .then(response => {
        setIsVerified(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <ThemeProvider theme={appColors}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          style={{
            marginTop: '6%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{ margin: '5%', backgroundColor: '#8E9775' }}>
            <DirectionsCarIcon />
          </Avatar>
          <br />
          {isVerified ? (
            <div>
              <Typography component='h1' variant='h6'>
                You have successfully verified your account! You can now log in.
              </Typography>
              <div className={classes.linkContainer}>
                <Link href='/login' variant='body2' color='#FAF2DA' className={classes.linkButton}>
                  Log in
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <Typography component='h1' variant='h6'>
                Something went wrong with your email verification!
                If you still don't have an active account, please try again with registration.
              </Typography>
              <div className={classes.linkContainer}>
                <Link href='/register/student' variant='body2' color='#FAF2DA' className={classes.linkButton}>
                  Register
                </Link>
              </div>
            </div>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}