import React, { useState, useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { globalStyles } from '../shared/theme';
import { addRoute, getRoute } from '../services/routeService';
import Moment from 'moment';
import getAlert from '../helpers/alert';

Moment.locale('en');

export default function MapPage(props) {
  const [mapRegion, setMapRegion] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [route, setRoute] = useState(null);

  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [classStartTime, setClassStartTime] = useState(null);
  const [classOngoing, setClassOngoing] = useState(false);

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.122;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  useEffect(() => {
    getLocation();
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1
      },
      (newLocation) => {
        setLocation(newLocation);
        if (classOngoing) {
          updatePath(newLocation.coords.latitude, newLocation.coords.longitude);
        }
      }
    );
  }, [classOngoing]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    if (props.route.params.readonly) {
      getRouteDetails();
    } else {
      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    }
  }

  const getRouteDetails = async () => {
    if (props.route.params.routeId) {
      getRoute(props.route.params.routeId)
        .then(response => {
          setRoute(response.data);
          setPathCoordinates(response.data.coordinates);
          setMapRegion({
            latitude: response.data.coordinates[0].latitude,
            longitude: response.data.coordinates[0].longitude,
            latitudeDelta: 0.051,
            longitudeDelta: 0.051 * ASPECT_RATIO
          })
        })
        .catch(error => {
          const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading route unsuccessful'
          getAlert(errorData, '', 'Cancel', 'cancel');
        });
    }
  }

  const startClass = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    setPathCoordinates([]);
    const startTime = new Date();
    setClassOngoing(true);
    setClassStartTime(startTime);
  };

  const updatePath = (newLat, newLng) => {
    setPathCoordinates((currentCoords) => [...currentCoords, { latitude: newLat, longitude: newLng }]);
  };

  const endClass = async () => {
    setClassOngoing(false);

    data = {
      coordinates: pathCoordinates,
      studentId: props.route.params.studentId,
      instructorId: props.route.params.instructorId,
      startTime: Moment(classStartTime),
      endTime: Moment(new Date())
    }

    addRoute(data)
      .then((response) => {
        if (response) {
          getAlert('Class finished', 'You have saved class route successfully', 'Okay', 'cancel')
        }
      })
      .catch((error) => {
        console.log(error);
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Something went wrong'
        getAlert(errorData, '', 'Cancel', 'cancel')
      });
  };



  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
        provider='google'
        rotateEnabled={true}
        showsUserLocation>
        <Polyline coordinates={pathCoordinates} strokeWidth={5} strokeColor={globalStyles.palette.peach} />

      </MapView>
      {!props.route.params.readonly &&
        <TouchableOpacity style={styles.buttonContainer} onPress={classOngoing ? endClass : startClass}>
          <Text style={styles.textButton}>{classOngoing ? 'End Class' : 'Start Class'}</Text>
        </TouchableOpacity>
      }
      {props.route.params.readonly && route &&
        <View style={styles.routeInfo}>
          <Text style={styles.dateAndTime}>{Moment(route.startTime).format('DD-MM-YYYY')}</Text>
          <Text style={styles.dateAndTime}>{Moment(route.startTime).format('hh:mm A')} - {Moment(route.endTime).format('hh:mm A')}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.palette.darkGreen,
    marginLeft: 110,
    marginRight: 110,
    height: 53,
    borderRadius: 8,
    opacity: 0.7
  },
  textButton: {
    color: globalStyles.palette.beige,
    fontSize: 19,
    fontFamily: globalStyles.titleText.fontFamily,
  },
  routeInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.palette.darkGreen,
    opacity: 0.7,
    height: 60,
    borderRadius: 8,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    margin: 80,
    marginTop: 0
  },
  dateAndTime: {
    fontFamily: globalStyles.titleText.fontFamily,
    fontSize: 18,
    color: globalStyles.palette.beige
  }
});