import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Button
} from "@material-ui/core";
import { getAllUsers } from '../../services/userService';
import { getSchool } from '../../services/schoolService';
import { ROLES } from '../../helpers/roleEnum';
import { CATEGORIES } from '../../helpers/categoryEnum';
import ExaminerModal from '../registration/ExaminerModal';
import ConformationModal from '../modals/ConformationModal';
import { deleteUser } from '../../services/userService';
import AlertComponent from '../../helpers/AlertComponent';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [roleFilter, setRoleFilter] = useState();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [openRegistrationDialog, setOpenRegistrationDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isChangedUsers, setIsChangedUsers] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    getAllUsers()
      .then(response => {
        setUsers(response.data)
        setFilteredUsers(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [isChangedUsers]);

  const handleRoleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleUserClick = (value) => {
    setSelectedUser(value);
    console.log(value);
    if (value.schoolId) {
      getSchoolName(value.schoolId);
    }
  };

  const getSchoolName = (schoolId) => {
    getSchool(schoolId)
      .then(response => {
        setSchoolName(response.data.name);
        console.log(schoolName);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRoleFilter = (event) => {
    const role = event.target.value;
    const filtered = users.filter((user) => user.role === role);
    setFilteredUsers(filtered);
    setSelectedUser(null);
    setRoleFilter(role);
    handleRoleFilterClose();
  };

  const handleNameSearch = (event) => {
    const { value } = event.target;
    setSearchName(value);

    const search = value.toLowerCase().trim();

    const filteredUsers = users.filter((user) => {
      const fullName = `${user.name} ${user.lastName}`.toLowerCase();
      return fullName.includes(search);
    });

    setFilteredUsers(filteredUsers);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    deleteUser(selectedUser.id)
      .then(() => {
        setAlert({
          open: true,
          message: 'User successfully deleted',
          severity: 'success',
        });
      })
      .catch(error => {
        console.log(error);
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Something went wrong';
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });
    setSelectedUser(null);
    setIsChangedUsers(!isChangedUsers);
    setIsSuccess(false);
  };

  const handleOpenRegistrationDialog = () => {
    setOpenRegistrationDialog(true);
  }

  const handleConfirmRegistrationDialog = () => {
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
    setIsChangedUsers(!isChangedUsers);
    setIsSuccess(false);
    setOpenRegistrationDialog(false);
  }

  const handleCloseRegistrationDialog = () => {
    setOpenRegistrationDialog(false);
  }

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const handleConfirmDeleteDialog = () => {
    handleDeleteUser();
    setOpenDeleteDialog(false);
  }

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  }

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Typography component="h1" variant="h6" sx={{ m: 2, color: '#8E9775', fontFamily: 'sans-serif' }}>
          ALL USERS
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Button variant="outline" style={{
            backgroundColor: '#FAF2DA',
            margin: '0 1rem'
          }}
            onClick={handleOpenRegistrationDialog}>
            Add examiner
          </Button>
          <ExaminerModal open={openRegistrationDialog} handleClose={handleCloseRegistrationDialog} handleConfirm={handleConfirmRegistrationDialog} onSuccessful={setIsSuccess} />
          <Paper style={{ maxHeight: '90%', padding: '1rem', margin: '1rem', backgroundColor: '#fdfaf0' }}>
            <TextField
              value={searchName}
              onChange={handleNameSearch}
              id="standard-basic"
              label="Search by name"
              variant="standard"
              style={{ margin: '2%', width: '60%' }}
            />
            <FormControl variant="standard" sx={{ margin: '2%', minWidth: 120, backgroundColor: '#fdfaf0', color: '#8E9775' }}>
              <InputLabel></InputLabel>
              <Select
                style={{ backgroundColor: "#fdfaf0" }}
                value={roleFilter ? roleFilter : "All"}
                onChange={handleRoleFilter}
              >
                {ROLES.filter((role) => role.label !== 'Admin').map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ backgroundColor: "#fdfaf0" }}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ maxHeight: "59vh", overflow: "auto" }}>
              <div style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "white", marginTop: "5px" }}>
              </div>
              <List style={{ marginTop: '1rem' }}>
                {filteredUsers.map((user) => (
                  <ListItem
                    key={user.id}
                    button
                    selected={selectedUser && selectedUser.id === user.id}
                    onClick={() => handleUserClick(user)}
                  >
                    <ListItemText>
                      {user.name} {user.lastName}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid style={{ height: '100%', padding: '1rem' }}>
            {selectedUser ? (
              <div style={{ color: '#2C3024', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    {selectedUser.name} {selectedUser.lastName}
                  </Typography>
                  <Button style={{ marginLeft: '2rem', border: '1px solid #E28F83', color: '#E28F83' }} onClick={handleOpenDeleteDialog}>Delete user</Button>
                  <ConformationModal
                    open={openDeleteDialog}
                    handleClose={handleCloseDialog}
                    handleConfirm={handleConfirmDeleteDialog}
                    onChangeUsers={setIsChangedUsers}
                    isChangedUser={isChangedUsers}
                    userId={selectedUser.id}
                    onSuccessful={setIsSuccess}
                    title={"Confirm Delete"}
                    text={"Are you sure you want to delete this user?"}
                    buttonText={"Delete"} />
                </div>
                <Typography variant="h6" gutterBottom>
                  {ROLES.find((r) => r.value === selectedUser.role) ? ROLES.find((r) => r.value === selectedUser.role).label : ''}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Category: {CATEGORIES.find((c) => c.value === selectedUser.category) ? CATEGORIES.find((c) => c.value === selectedUser.category).label : ''}
                </Typography>
                {selectedUser.schoolId &&
                  <Typography variant="subtitle1" gutterBottom>
                    School:
                    <Link
                      style={{
                        color: '#2C3024',
                        fontFamily: 'sans-serif',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        backgroundColor: '#FAF2DA'
                      }}
                      to={`/school/${selectedUser.schoolId}`}>
                      {schoolName}
                    </Link>
                  </Typography>
                }
                <Typography variant="subtitle1" gutterBottom>
                  Email: {selectedUser.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone number: {selectedUser.phoneNumber}
                </Typography>
                {alert.open ? (
                  <AlertComponent
                    open={alert.open}
                    message={alert.message}
                    severity={alert.severity}
                  />
                ) : <></>}
              </div>
            ) : (
              <div>
                <Typography variant="body1">
                  No user selected.
                </Typography>
                {alert.open ? (
                  <AlertComponent
                    open={alert.open}
                    message={alert.message}
                    severity={alert.severity}
                  />
                ) : <></>}
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};