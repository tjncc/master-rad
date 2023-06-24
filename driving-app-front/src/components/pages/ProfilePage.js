import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid, Card, CardContent } from '@material-ui/core';
import { getUser, updateUser } from '../../services/userService';
import { getSchool } from '../../services/schoolService';
import { CATEGORIES } from '../../helpers/categoryEnum';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import { ROLES } from '../../helpers/roleEnum';
import AlertComponent from '../../helpers/AlertComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: 'auto',
    backgroundColor: '#8E9775'
  },
  name: {
    marginTop: theme.spacing(2),
  },
  card: {
    backgroundColor: '#FAF2DA'
  },
  role: {
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

export default function ProfilePage() {
  const classes = useStyles();

  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setRole(localStorage.getItem('role'));
      setUserId(localStorage.getItem('id'));

      getUser(userId)
        .then(response => {
          setUser(response.data);
          console.log(response.data);
          if (response.data) {
            getSchool(response.data.schoolId)
              .then(response => {
                setSchoolName(response.data.name);
                console.log(response.data.name);
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [userId]);

  const getDateFormat = (date) => {
    const d = new Date(date);
    return format(d, "dd.MM.yyyy.");
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = () => {
    if (user) {
      const userUpdate = {email: user.email, phoneNumber: user.phoneNumber};
      updateUser(user.id, userUpdate)
        .then((response) => {
          setUser(response.data);
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


  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar className={classes.avatar} />
                </Grid>
                {user ? (
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h5" className={classes.name}>
                          {user.name} {user.lastName}
                        </Typography>
                        <br />
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={5}>
                          <Typography variant="subtitle1" style={{ margin: '10% 0' }}>Date of Birth:</Typography>
                          <Typography variant="subtitle1" style={{ margin: '12% 0' }}>Email:</Typography>
                          <Typography variant="subtitle1" style={{ margin: '22% 0' }}>Phone number:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="subtitle1" style={{ marginTop: '6%' }}>
                            {getDateFormat(user.dateOfBirth)}
                          </Typography>
                          <TextField
                            variant="outlined"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            style={{ width: '250px', margin: '2% 0' }}
                          />
                          <TextField
                            variant="outlined"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            style={{ width: '250px', margin: '2% 0' }}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        style={{ marginTop: '2rem', border: '1px solid #8E9775', backgroundColor: '#8E9775', color: 'white', padding: '1% 5%' }}
                        onClick={handleSubmit}>
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <div></div>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {user ? (
          <Grid item xs={8}>
            <Typography style={{fontSize: '30px', margin: '0 40%', color: '#8E9775'}}>
                  {ROLES.find((r) => r.value === user.role) ? ROLES.find((r) => r.value === user.role).label : ''}
                </Typography>
            <Grid style={{ margin: '0 2%', color: '#4A503D' }}>
              <Typography
                style={{ color: '#8E9775', fontSize: '22px' }}>
                SCHOOL INFO
              </Typography>
              <Typography variant="h6">Name: {schoolName}</Typography>
              <Typography variant="h6">Category: {CATEGORIES.find((c) => c.value === user.category) ? CATEGORIES.find((c) => c.value === user.category).label : ''}
              </Typography>
            </Grid>
            {user.role === 2 &&
            <Grid style={{ margin: '0 2%', color: '#4A503D', marginTop: '7%' }}>
              <Typography
                style={{ color: '#8E9775', fontSize: '22px' }}>
                STUDENT INFO
              </Typography>
              {!user.passedTheory && <Typography variant="h6"  style={{color: '#E28F83'}}>Not passed theory</Typography>}
              {user.passedTheory && <Typography variant="h6" style={{color: '#8E9775'}}>Passed theory</Typography>}
              <Typography variant="h6">Number of remaining classes: {user.numberOfClasses}</Typography>
              <Typography variant="h6">Number of exam attempts: {user.numberOfExams} </Typography>
            </Grid>
            }
          </Grid>
        ) : (
          <div></div>
        )}
        {alert.open ? (
                  <AlertComponent
                    open={alert.open}
                    message={alert.message}
                    severity={alert.severity}
                  />
                ) : <></>}
      </Grid>
    </div>
  );
};