import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import homeImage from '../img/registration.jpg';
import { globalStyles } from '../shared/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import ChooseStudentModal from '../modals/ChooseStudentModal';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomePage(props) {
  const [name, setName] = useState('')
  const [instructorId, setInstructorId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = React.useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkLoginStatus();
    }
  }, [isFocused]);

  const checkLoginStatus = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const name = await AsyncStorage.getItem('name');
      const role = await AsyncStorage.getItem('role');
      const id = await AsyncStorage.getItem('id');

      if (jwtToken) {
        setIsLoggedIn(true);
        setName(name);
        if (role === 'Instructor') {
          setInstructorId(id);
          setStudentId(null);
        } else if (role === 'Student') {
          setStudentId(id);
          setInstructorId(null);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const logout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('role');
    setIsLoggedIn(false);
  }

  const openRegistration = () => {
    props.navigation.navigate('RegistrationPage');
  };

  const openLogin = () => {
    props.navigation.navigate('Login');
  };

  const handleOpenRoutes = () => {
    props.navigation.push('Routes', {
      studentId: studentId,
      isReadOnly: true
    });
  }

  const handleOpenSchools = () => {
    props.navigation.push('Schools');
  }

  const handleOpenProfile = () => {
    props.navigation.push('Profile');
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <Image source={homeImage} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.lowerHalf}>
        {!isLoggedIn &&
          <View>
            <Text style={styles.title}>Welcome to Driving School</Text>
            <View>
              <TouchableOpacity style={styles.loginButton} onPress={openLogin}>
                <Text style={styles.loginButtonText} >Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registrationButton} onPress={openRegistration}>
                <Text style={styles.registrationButtonText} >Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        {
          isLoggedIn &&
          <View>
            <Text style={styles.title}>{name}, welcome to Driving school!</Text>
            {instructorId &&
              <View style={styles.centeredView}>
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonModalText}>Choose a student</Text>
                </Pressable>
                <ChooseStudentModal modalVisible={modalVisible} handleClose={handleCloseModal} instructorId={instructorId} navigation={props.navigation} />
              </View>
            }
            {studentId &&
              <TouchableOpacity style={styles.buttonModal} onPress={handleOpenRoutes}>
                <Text style={styles.buttonModalText} >Routes history</Text>
              </TouchableOpacity>
            }
          </View>
        }
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
    flexDirection: 'column',
    backgroundColor: globalStyles.palette.beige,
    fontFamily: 'Avenir-Book'
  },
  upperHalf: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lowerHalf: {
    flex: 4.9,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    color: globalStyles.palette.darkGreen,
    fontSize: 28,
    marginBottom: 30,
    marginTop: 50,
    fontFamily: globalStyles.titleText.fontFamily,
    textAlign: 'center'
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 82,
    borderRadius: 50,
    backgroundColor: globalStyles.palette.darkGreen,
    borderWidth: 2,
    borderColor: globalStyles.palette.darkGreen,
    marginBottom: 18
  },
  loginButtonText: {
    color: globalStyles.palette.beige,
    fontSize: 22,
    fontFamily: globalStyles.titleText.fontFamily
  },
  registrationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 82,
    borderRadius: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: globalStyles.palette.darkGreen

  },
  registrationButtonText: {
    color: globalStyles.palette.darkGreen,
    fontSize: 22,
    fontFamily: globalStyles.titleText.fontFamily
  },
  footer: {
    backgroundColor: globalStyles.palette.lightGreen,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 70
  },
  logout: {
    left: 120
  },
  buttonModal: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 2,
    borderRadius: 50,
    backgroundColor: globalStyles.palette.peach,
    borderWidth: 1,
    borderColor: globalStyles.palette.darkGreen,
    marginBottom: 18,
    marginLeft: 50,
    marginRight: 50
  },
  buttonModalText: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 20,
  },
  schoolView: {
    right: 116
  },
  profileView: {
    right: 0
  }
});