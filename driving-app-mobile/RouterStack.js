import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import Header from './shared/header';
import regImg from './img/registration.jpg'

const screens = {
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerBackground: () => (
        <Image
          style={StyleSheet.absoluteFill}
          source={regImg}
        />
      )
    },
  },
  RegistrationPage: {
    screen: RegistrationPage,
    navigationOptions: {
      title: 'Registration Page',
    }
  },
};

const RouterStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default RouterStack;