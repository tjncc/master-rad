import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import getAlert from '../helpers/alert';
import { globalStyles } from '../shared/theme';
import { getUser } from '../services/userService';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { CATEGORIES } from '../helpers/categoryEnum';
import { getSchool } from '../services/schoolService';

export default function ProfilePage(props) {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schoolName, setSchoolName] = useState('');

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const role = await AsyncStorage.getItem('role');
      const id = await AsyncStorage.getItem('id');
      if (jwtToken) {
        setIsLoggedIn(true);
        setRole(role);
      }

      getUser(id)
        .then(response => {
          setUser(response.data);
          if (response.data.schoolId) {
            getSchool(response.data.schoolId)
              .then(resp => {
                setSchoolName(resp.data.name);
              })
              .catch(error => {
                console.log(error)
              });
          }
        })
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  }

  const openSchool = () => {
    props.navigation.push('School', {
      schoolId: user.schoolId
    });
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
    <View style={styles.viewContainer}>
      <ScrollView style={styles.container}>
        <MaterialIcons name="person" size={50} style={{ alignSelf: 'center' }} color={globalStyles.palette.lightGreen} />
        <Text style={styles.name}>{user.name} {user.lastName}</Text>
        {schoolName &&
          <TouchableOpacity style={styles.schoolButton} onPress={openSchool}>
            <Text style={styles.schoolText}>School</Text>
            <Text style={styles.schoolText}>{schoolName}</Text>
          </TouchableOpacity>
        }
        <View>
          <Text style={styles.category}>Category {CATEGORIES.find((c) => c.value === user.category) ? CATEGORIES.find((c) => c.value === user.category).label : ''}
          </Text>
        </View>
        {role === 'Student' &&
          <View style={styles.column}>
            <Text style={styles.subtitle}>Info</Text>
            <Text style={styles.text}>{user.passedTheory ? 'Theory not passed' : 'TheoryPassed'}</Text>
            <Text style={styles.text}>Number of classes: {user.numberOfClasses}</Text>
            <Text style={styles.text}>Number of exam attempts: {user.numberOfExams}</Text>
            {user.passedDriving && <Text style={styles.text}>Passed driving</Text>}
          </View>
        }
        <View style={styles.column}>
          <Text style={styles.subtitle}>Date of Birth</Text>
          <Text style={styles.text}>{moment(user.dateOfBirth).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.subtitle}>Contact</Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={styles.text}>{user.phoneNumber}</Text>
        </View>
      </ScrollView>
      {isLoggedIn &&
        <View style={styles.footer}>

          <TouchableOpacity style={styles.schoolView} onPress={handleOpenSchools}>
            <MaterialIcons name="school" size={30} color={globalStyles.palette.beige} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileView}>
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
    backgroundColor: globalStyles.palette.beige
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: globalStyles.palette.beige,
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 20
  },
  name: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 33,
    paddingTop: 30,
    paddingBottom: 20,
    alignSelf: 'center'
  },
  subtitle: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.lightGreen,
    fontSize: 18,
    paddingTop: 30,
    paddingBottom: 5,
  },
  column: {
    alignItems: 'center'
  },
  text: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 20
  },
  category: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 20,
    paddingTop: 10,
    alignSelf: 'center'
  },
  schoolButton: {
    alignItems: 'center',
    padding: 5,
    marginTop: 15,
  },
  schoolText: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.peach,
    fontSize: 22,
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