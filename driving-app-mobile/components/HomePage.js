import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import homeImage from '../img/registration.jpg';
import { globalStyles } from '../shared/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function HomePage(props) {
  const [name, setName] = useState('')
  const [role, setRole] = React.useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkLoginStatus();
    }
  }, [[isFocused]]);

  const checkLoginStatus = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const name = await AsyncStorage.getItem('name');
      if (jwtToken) {
        setIsLoggedIn(true);
        console.log(jwtToken);
        console.log(name);
        setName(name);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

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
          </View>
        }
      </View>
      {isLoggedIn &&
        <View style={styles.footer}>
          <TouchableOpacity onPress={openRegistration}>
            <MaterialIcons name='person' size={20} color={globalStyles.palette.darkGreen} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logout}>Log out</Text>
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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logout: {
    left: 140,
    color: globalStyles.palette.red,
    fontFamily: globalStyles.titleText.fontFamily,
    fontSize: 16,
    borderWidth: 1,
    padding: 5,
    borderColor: globalStyles.palette.red,
    borderRadius: 10,
  }
});