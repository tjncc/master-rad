import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../shared/theme';
import { getAllSchools } from '../services/schoolService';
import getAlert from '../helpers/alert';
import Moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { CATEGORIES } from '../helpers/categoryEnum';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { register } from '../services/userService';

Moment.locale('en');

export default function RegistrationPage(props) {
  const [schools, setSchools] = useState([])
  const [schoolId, setSchoolId] = useState('')
  const [open, setOpen] = useState(false)

  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [jmbg, setJmbg] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [dateOfBirth, setDateOfBirth] = React.useState('')

  useEffect(() => {
    getAllSchools()
      .then(response => {
        setSchools(response.data);
        setSchoolId(response.data[0]?.id || '');
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading schools unsuccessful'
        getAlert(errorData, '', 'Cancel', 'cancel');
      });
  }, []);

  const openLogin = () => {
    props.navigation.navigate('Login');
  };

  const handleRegistration = () => {
    const data = {
      name, lastName, email, password, jmbg, phoneNumber, category, dateOfBirth, role: 2, schoolId
    }

    if (!data.name || !data.lastName || !data.password || !data.jmbg || !data.email) {
      getAlert('Please fill in all necessary fields!', '', 'Cancel', 'cancel')
      return
    }

    // if (data.password.length < 8){
    // getAlert('Password must be at least 8 characters long!', '', 'Cancel', 'cancel')
    //   return
    // }

    if (data.password !== confirmPassword) {
      getAlert('Password and confirmed password do not match!', '', 'Cancel', 'cancel')
      return
    }

    register(data)
      .then((response) => {
        console.log(response);
        if (response) {
          getAlert('Registration successful!', 'You will receive an email with verification link', 'Cancel', 'cancel')
          props.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.log(error);
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Something went wrong'
        getAlert(errorData, '', 'Cancel', 'cancel')
      });
  }

  const handleDateOfBirth = (selectedDate) => {
    setDateOfBirth(selectedDate);
    handleDatePicker();
  }

  const handleDatePicker = () => {
    setOpen(!open)
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Text style={styles.titles}>Name</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            onChangeText={text => setName(text)}
            value={name}
            keyboardAppearance="dark"
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            onChangeText={text => setLastName(text)}
            value={lastName}
            keyboardAppearance="dark"
          />
        </View>
        <Text style={styles.titles}>Email and Password</Text>
        <TextInput
          style={styles.inputFull}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize='none'
          keyboardType="email-address"
          keyboardAppearance="dark"
        />
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            keyboardAppearance="dark"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            keyboardAppearance="dark"
          />
        </View>
        <Text style={styles.titles}>Choose school and category</Text>
        <View style={styles.row}>
          <Picker
            selectedValue={schoolId}
            onValueChange={(itemValue) => setSchoolId(itemValue)}
            style={{ width: '50%', height: '30%' }}
          >
            {schools.map((option) => (
              <Picker.Item key={option.id} label={option.name} value={option.id} />
            ))}
          </Picker>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={{ width: '50%', height: '30%' }}
          >
            {CATEGORIES.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
        <Text style={styles.titles}>JMBG and Date of Birth</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Jmbg"
            secureTextEntry
            onChangeText={text => setJmbg(text)}
            value={jmbg}
            keyboardType="numeric"
            keyboardAppearance="dark"
          />
          <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={handleDateOfBirth}
            onCancel={handleDatePicker}
            pickerStyleIOS={styles.picker}
            buttonTextColorIOS={globalStyles.palette.lightGreen}
            pickerContainerStyleIOS={styles.picker}
            pickerComponentStyleIOS={styles.picker}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dateOfBirth ? Moment(dateOfBirth).format('DD MMM YYYY') : "Date of Birth"}
            editable={false}
            onPressIn={handleDatePicker}
          />
        </View>
        <Text style={styles.titles}>Number</Text>
        <TextInput
          style={styles.inputFull}
          placeholder="Phone number"
          secureTextEntry
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
          keyboardAppearance="dark"
        />
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registrationButton} onPress={openLogin}>
            <Text style={styles.registrationButtonText} >Go to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.palette.beige,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  },
  scroll: {
    flex: 1,
    backgroundColor: globalStyles.palette.beige,
    padding: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  icon: {
    marginTop: 0,
    marginBottom: 20
  },
  input: {
    height: 32,
    width: "50%",
    borderColor: globalStyles.palette.darkGreen,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: globalStyles.titleText.fontFamily,
  },
  inputFull: {
    height: 36,
    width: "100%",
    borderColor: globalStyles.palette.darkGreen,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 20,
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
  },
  buttonsView: {
    flex: 1,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    paddingLeft: 10,
    color: globalStyles.palette.darkGreen
  },
  picker: {
    backgroundColor: globalStyles.palette.darkGreen
  }
});