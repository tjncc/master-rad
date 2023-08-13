import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from './theme';

export default function Header(props) {

  return (
    <View style={styles.header}>
      {props.icon && <MaterialIcons name='directions-car' size={28} style={styles.icon} />}
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: globalStyles.palette.beige,
    fontFamily: 'Avenir-Book'
  },
  icon: {
    position: 'absolute',
    right: 212,
    color: globalStyles.palette.beige
  }
});