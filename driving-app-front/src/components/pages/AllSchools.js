import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Grid
} from "@material-ui/core";
import Button from '@mui/material/Button';
import { deleteSchool, getAllSchools } from '../../services/schoolService';
import SchoolIcon from '@mui/icons-material/School';
import ListItemIcon from '@mui/material/ListItemIcon';
import schoolimg from '../../images/school.png';
import { useNavigate } from 'react-router-dom';
import ConformationModal from '../modals/ConformationModal';
import AlertComponent from '../../helpers/AlertComponent';
import '../../css/SchoolPage.css'

export default function AllSchools() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isChangedSchool, setIsChangedSchool] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
    getAllSchools()
      .then(response => {
        setSchools(response.data)
      })
      .catch(error => {
      });
  }, [selectedSchool]);

  const openSchoolPage = useCallback((id) => {
    navigate(`/school/${id}`)
  }, [navigate]);

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSchool = () => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    if (selectedSchool) {

      deleteSchool(selectedSchool.id)
        .then(() => {
          setAlert({
            open: true,
            message: 'School successfully deleted',
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
      setSelectedSchool(null);
      setIsSuccess(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const handleConfirmDeleteDialog = () => {
    handleDeleteSchool();
    setOpenDeleteDialog(false);
  }

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Grid container spacing={2} className="divLeftSchools">
        <Grid item xs={12} sm={3}>
          <TextField
            label="Search by School Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <div style={{ maxHeight: "77vh", overflow: "auto" }}>
            <div style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "white", marginTop: "5px" }}>
            </div>
            <List>
              {filteredSchools.map((school) => (
                <div key={school.id}>
                  <ListItem button onClick={() => handleSchoolClick(school)}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={school.name} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <p className="titleSchools">Driving schools</p>
          <div>
            {selectedSchool ? (
              <div className="schoolDetailsDiv">
                <p className="selectedSchoolTitle">{selectedSchool.name}</p>
                <p className="selectedSchoolYear">{selectedSchool.year}</p>
                <p className="selectedSchoolDetails">{selectedSchool.address}</p>
                <p className="selectedSchoolDetails">{selectedSchool.email}</p>
                <p className="selectedSchoolDetails">{selectedSchool.phoneNumber}</p>
                <p className="selectedSchoolDetails">{selectedSchool.description}</p>
                <Button
                  variant="outlined"
                  style={{ marginTop: '2rem', border: '1px solid #FAF2DA', backgroundColor: '#FAF2DA', color: 'black', padding: '0.5rem 2rem' }}
                  onClick={() => openSchoolPage(selectedSchool.id)}>
                  School details page
                </Button>
                {role === 'Admin' &&
                  <div>
                    <Button
                      style={{ marginTop: '2rem', border: '1px solid #880808', color: '#880808', padding: '0.5rem 2rem' }}
                      onClick={handleOpenDeleteDialog}>
                      Delete school
                    </Button>
                    <ConformationModal
                      open={openDeleteDialog}
                      handleClose={handleCloseDialog}
                      handleConfirm={handleConfirmDeleteDialog}
                      onChangeUsers={setIsChangedSchool}
                      isChangedUser={true}
                      schoolId={selectedSchool.id}
                      onSuccessful={setIsSuccess}
                      title={"Confirm Delete"}
                      text={"Are you sure you want to delete this school?"}
                      buttonText={"Delete"} />
                  </div>}
              </div>
            ) : (
              <p>Click a school to see additional information and instructors.</p>
            )}
            {alert.open ? (
              <AlertComponent
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
              />
            ) : <></>}
          </div>
          <div className="imgDiv">
            <img src={schoolimg} style={{ width: "340px", maxHeight: "auto" }} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}