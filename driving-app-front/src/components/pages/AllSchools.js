import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { getAllSchools } from '../../services/schoolService';
import SchoolIcon from '@mui/icons-material/School';
import ListItemIcon from '@mui/material/ListItemIcon';
import schoolimg from '../../images/school.png';
import { useNavigate } from 'react-router-dom';
import '../../css/SchoolPage.css'

export default function AllSchools() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllSchools()
      .then(response => {
        setSchools(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
                <Button variant="outlined" onClick={() => openSchoolPage(selectedSchool.id)}>School details page</Button>
              </div>
            ) : (
              <p>Click a school to see additional information and instructors.</p>
            )}
          </div>
          <div className="imgDiv">
            <img src={schoolimg} style={{ width: "340px", maxHeight: "auto" }} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}