import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import Header from './shared/header';
import { globalStyles } from './shared/theme';
import LoginPage from './components/LoginPage';
import MapPage from './components/MapPage';
import RoutesPreview from './components/RoutesPreview';
import SchoolsPage from './components/SchoolsPage';
import SchoolPage from './components/SchoolPage';
import ProfilePage from './components/ProfilePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: globalStyles.palette.beige
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitle: () => <Header title='Driving School' icon={true} />, headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
          options={{
            headerTitle: () => <Header title='Register' icon={false} />,
            headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerTitle: () => <Header title='Log in' icon={false} />,
            headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
          options={{
            headerTitle: () => <Header title='Map' icon={false} />,
            headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="Routes"
          component={RoutesPreview}
          options={{
            headerTitle: () => <Header title='Routes' icon={false} />, headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="Schools"
          component={SchoolsPage}
          options={{
            headerTitle: () => <Header title='Schools' icon={false} />, headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="School"
          component={SchoolPage}
          options={{
            headerTitle: () => <Header title='School' icon={false} />, headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            headerTitle: () => <Header title='School' icon={false} />, headerStyle: {
              backgroundColor: globalStyles.palette.lightGreen
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
