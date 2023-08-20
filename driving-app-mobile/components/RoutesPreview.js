import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { getRoutesByStudent } from '../services/routeService';
import getAlert from '../helpers/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../shared/theme';
import moment from 'moment';
import { getUser } from '../services/userService';

export default function RoutesPreview(props) {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    checkLoginStatus();
    getRoutes();
  }, [studentId]);

  const checkLoginStatus = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const role = await AsyncStorage.getItem('role');
      const id = await AsyncStorage.getItem('id');

      if (role === 'Student') {
        setStudentId(id);
      } else {
        if (props.route.params.studentId) {
          setStudentId(props.route.params.studentId)
        }
      }
      if (studentId) {
        getUser(studentId)
          .then(response => {
            setStudent(response.data);
          })
          .catch(error => {
            const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading student unsuccessful'
            getAlert(errorData, '', 'Cancel', 'cancel');
          });
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const getRoutes = async () => {
    if (studentId) {
      getRoutesByStudent(studentId)
        .then(response => {
          setRoutes(response.data);
        })
        .catch(error => {
          const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading routes unsuccessful'
          getAlert(errorData, '', 'Cancel', 'cancel');
        });
    }
  }

  const openMap = (id) => {
    props.navigation.push('Map', {
      routeId: id,
      readonly: true
    });
  }

  const Item = ({ id, studentId, startTime, endTime, openMap, index }) => (
    <TouchableOpacity onPress={() => openMap(id)} style={styles.item}>
      <Text style={styles.index}>{index + 1}</Text>
      <Text style={styles.dateAndTime}>{moment(startTime).format('DD-MM-YYYY')}</Text>
      <Text style={styles.dateAndTime}>{moment(startTime).format('hh:mm A')} - {moment(endTime).format('hh:mm A')}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <Item
      startTime={item.startTime}
      endTime={item.endTime}
      id={item.id}
      studentId={item.studentId}
      openMap={openMap}
      index={index}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Click on the time to open the route</Text>
      {student && <Text style={styles.titleName}>{student.name} {student.lastName}'s routes</Text>}
      {routes && <Text style={styles.titleName}>{routes.length} routes available</Text>}
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  titleName: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.lightGreen,
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center'
  },
  item: {
    padding: 20,
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: globalStyles.palette.peach
  },
  index: {
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  dateAndTime: {
    fontFamily: globalStyles.titleText.fontFamily,
    fontSize: 20,
    color: globalStyles.palette.darkGreen
  }
});