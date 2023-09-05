import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import getAlert from '../helpers/alert';
import { globalStyles } from '../shared/theme';
import { getAllSchools } from '../services/schoolService';

export default function SchoolsPage(props) {
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState('');
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    getSchools();
  }, []);


  const getSchools = () => {
    getAllSchools()
      .then(response => {
        setSchools(response.data);
        setFullData(response.data);
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ? error.response.data : 'Loading schools unsuccessful'
        getAlert(errorData, '', 'Cancel', 'cancel');
      });
  }

  const openSchool = (id) => {
    props.navigation.push('School', {
      schoolId: id
    });
  }

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = fullData.filter(school => {
      const name = school.name.toLowerCase();
      return name.includes(formattedQuery)
    });
    setSchools(filteredData);
    setQuery(text);
  };

  const Item = ({ id, name, year, address, city, description, phoneNumber, email, index }) => (
    <TouchableOpacity onPress={() => openSchool(id)} style={styles.item}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text2}>{address}, {city}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <Item
      name={item.name}
      year={item.year}
      id={item.id}
      address={item.address}
      city={item.city}
      description={item.description}
      phoneNumber={item.phoneNumber}
      email={item.email}
      index={index}
    />
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
            placeholder="Search schools"
            style={styles.search}
            keyboardAppearance="dark"
          />
          <FlatList
            data={schools}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.palette.beige
  },
  containerSafe: {
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
    marginVertical: 4,
    marginHorizontal: 16,
    borderBottomColor: globalStyles.palette.lightGreen,
    borderBottomWidth: 1
  },
  text: {
    fontFamily: globalStyles.titleText.fontFamily,
    fontSize: 20,
    color: globalStyles.palette.darkGreen
  },
  text2: {
    fontFamily: globalStyles.titleText.fontFamily,
    fontSize: 20,
    color: globalStyles.palette.lightGreen
  },
  search: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontFamily: globalStyles.titleText.fontFamily,
    color: globalStyles.palette.darkGreen,
    borderColor: globalStyles.palette.lightGreen,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 10
  }
});