import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getStudentsByInstructor } from '../services/userService';
import getAlert from '../helpers/alert';
import { globalStyles } from '../shared/theme';

export default function ChooseStudentModal(props) {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')

  useEffect(() => {
    getStudentsByInstructor(props.instructorId)
      .then(response => {
        setStudents(response.data);
        setSelectedStudent(response.data[0].id);
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading schools unsuccessful'
        getAlert(errorData, '', 'Cancel', 'cancel');
      });
  }, []);

  const handleOpenMap = () => {
    props.navigation.push('Map', {
      instructorId: props.instructorId,
      studentId: selectedStudent
    });
    props.handleClose()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Choose a student and open map</Text>
          <Picker
            selectedValue={selectedStudent}
            onValueChange={(itemValue) => setSelectedStudent(itemValue)}
            style={styles.picker}
          >
            {students.map((option) => (
              <Picker.Item key={option.id} label={option.name + " " + option.lastName} value={option.id} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
            <Text style={styles.buttonText}>Open Map</Text>
          </TouchableOpacity>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={props.handleClose}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 10,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: globalStyles.palette.lightGreen,
    backgroundColor: globalStyles.palette.lightGreen,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  textStyle: {
    color: globalStyles.palette.darkGreen,
    fontFamily: globalStyles.titleText.fontFamily,
    fontSize: 20
  },
  picker: {
    color: globalStyles.palette.red,
    width: 300,
    fontFamily: globalStyles.titleText.fontFamily,
  },
  title: {
    color: globalStyles.palette.beige,
    fontSize: 23,
    fontFamily: globalStyles.titleText.fontFamily,
  },
  buttonText: {
    color: globalStyles.palette.beige,
    fontSize: 22,
    fontFamily: globalStyles.titleText.fontFamily,
  }
})