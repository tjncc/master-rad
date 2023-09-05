import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import getAlert from '../helpers/alert';
import { globalStyles } from '../shared/theme';
import { getSchool } from '../services/schoolService';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SchoolPage(props) {
  const [school, setSchool] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getCurrentSchool();
  }, []);


  const getCurrentSchool = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const role = await AsyncStorage.getItem('role');
      const id = await AsyncStorage.getItem('id');
      if (jwtToken) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
    if (props.route.params.schoolId)
      getSchool(props.route.params.schoolId)
        .then(response => {
          setSchool(response.data);
        })
        .catch(error => {
          const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading school unsuccessful'
          getAlert(errorData, '', 'Cancel', 'cancel');
        });
  }

  const handleOpenProfile = () => {
    props.navigation.push('Profile');
  }

  const handleOpenSchools = () => {
    props.navigation.push('Schools');
  }

  const logout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('role');
    setIsLoggedIn(false);
    props.navigation.push('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <MaterialIcons name="school" size={50} color={globalStyles.palette.lightGreen} />
        <Text style={styles.title}>{school.name}</Text>
        <Text style={styles.year}>{school.year}</Text>
        <Text style={styles.subtitle}>Address:</Text>
        <Text style={styles.text}>{school.address}, {school.city}</Text>
        <Text style={styles.subtitle}>Description:</Text>
        <Text style={styles.text}>{school.description}</Text>
        <Text style={styles.subtitle}>Contact:</Text>
        <View style={styles.row}>
          <MaterialIcons name="email" size={24} color={globalStyles.palette.lightGreen} />
          <Text style={styles.contact}>{school.email}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="phone" size={24} color={globalStyles.palette.lightGreen} />
          <Text style={styles.contact}>{school.phoneNumber}</Text>
        </View>
      </View>
      {isLoggedIn &&
        <View style={styles.footer}>

          <TouchableOpacity style={styles.schoolView} onPress={handleOpenSchools}>
            <MaterialIcons name="school" size={30} color={globalStyles.palette.beige} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileView} onPress={handleOpenProfile}>
            <MaterialIcons name="person" size={30} color={globalStyles.palette.beige} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={logout}>
            <MaterialIcons name="logout" size={30} color={globalStyles.palette.beige} />
          </TouchableOpacity>

        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.palette.beige,
    alignContent: 'center',
    alignItems: 'center'
  },
  subContainer: {
    flex: 1,
    paddingVertical: 30,
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 40,
    paddingTop: 30,
    paddingBottom: 5,
  },
  year: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 20,
    paddingBottom: 40,
  },
  text: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 22,
    paddingBottom: 40,
    marginLeft: 4
  },
  subtitle: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 18,
  },
  contact: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 22,
    marginLeft: 8
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 35
  },
  rowAdr: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 80
  },
  footer: {
    backgroundColor: globalStyles.palette.lightGreen,
    padding: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 70
  },
  logout: {
    left: 120
  },
  schoolView: {
    right: 116
  },
  profileView: {
    right: 0
  }
});