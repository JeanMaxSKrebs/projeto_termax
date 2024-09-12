import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const Texto = props => {
  // console.log(props);
  return (
    <Text style={[styles.texto, { fontSize: props.tamanho, color:props.cor }]}>{props.texto}
    </Text>  );
};

export default Texto;

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    alignSelf: 'center',
    // backgroundColor: COLORS.gray,
    color: COLORS.black,
  }
});
