import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { COLORS } from '../assets/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// import { Container } from './styles';

const SearchBar = ({ search, name, logo }) => {
  // console.log(search);
  // console.log('name');
  // console.log(name);

  const [texto, setTexto] = useState('');

  return (
    <View style={styles.container}>
      {console.log('logo')}
      {console.log(logo)}
      {name === 'Salões' ?
        (logo
          ?
          <View style={{ width: 75, height: 75, alignSelf: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: logo }} style={{ width: 60, height: 60 }}
              onError={() => console.log('Image failed to load')}
            />
          </View>
          : <Icon name="person-circle-outline" size={60} color="black" />
        )
        : null}
      <TextInput
        style={{ flex: 1, color: 'black', marginLeft: 50, fontSize: 20 }}
        placeholderTextColor="gray"
        placeholder={`Pesquise ${name}`}
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => {
          setTexto(t)
          search(t);
        }}
      />
      <TouchableOpacity onPress={() => { search(texto) }}>
        <Icon name="search" size={30} color="black" style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};


export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
    backgroundColor: COLORS.background,
    borderRadius: 15,
  },
  button: {
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.background,
    margin: 20,
  },
});