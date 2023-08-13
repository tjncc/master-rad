import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../shared/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { login } from '../services/userService';
import getAlert from '../helpers/alert';

export default function LoginPage(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openRegistration = () => {
    props.navigation.navigate('RegistrationPage');
  };

  const handleLogin = () => {
    const data = { email, password };
    console.log(data);

    if (email === '' || password === '') {
      getAlert('You must enter email and password!', '', 'Cancel', 'cancel');
      return;
    }

    try {

      login(data)
        .then(async (response) => {
          if (response) {
            console.log(response)
            try {
              await Promise.all([
                AsyncStorage.setItem('jwtToken', response.data.token),
                AsyncStorage.setItem('role', response.data.role),
                AsyncStorage.setItem('name', response.data.name),
                AsyncStorage.setItem('id', response.data.id.toString())
              ]);
              props.navigation.navigate('Home');
            } catch (error) {
              console.log(error)
              getAlert('Login failed!', '', 'Cancel', 'cancel');
            }
          }
        })
        .catch((error) => {
          console.log(error)
          const errorData = error.response && error.response.data && error.response.data.length < 100 ? error.response.data : 'Something went wrong';
          getAlert(errorData, '', 'Cancel', 'cancel');
        });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name='person' size={40} color={globalStyles.palette.darkGreen} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize='none'
        keyboardType="email-address"
        keyboardAppearance="dark"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
        keyboardAppearance="dark"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registrationButton} onPress={openRegistration}>
        <Text style={styles.registrationButtonText} >Go to Registration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.palette.beige,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  icon: {
    marginTop: -130,
    marginBottom: 20
  },
  input: {
    width: '80%',
    height: 55,
    borderColor: globalStyles.palette.darkGreen,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 22,
    fontFamily: globalStyles.titleText.fontFamily,
  },
  button: {
    backgroundColor: globalStyles.palette.darkGreen,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: globalStyles.palette.beige,
    fontSize: 22,
    fontFamily: globalStyles.titleText.fontFamily,
  },
  registrationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '80%',
    height: 50,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: globalStyles.palette.darkGreen,
    marginTop: 15
  },
  registrationButtonText: {
    color: globalStyles.palette.darkGreen,
    fontSize: 22,
    fontFamily: globalStyles.titleText.fontFamily
  }
});