import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import {COLORS} from '../assets/colors';

const styles = StyleSheet.create({
  texto: {
      fontSize: 25,
      color: COLORS.background,
  },
  button: {
      top: 10,
      width: '70%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.red,
      padding: 10,
      margin: 10,
      borderRadius: 5,
  }
});

const DeleteButton = ({texto, onClick}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <Text style={styles.texto}>{texto}</Text>

    </TouchableHighlight>
  );
};
export default DeleteButton;