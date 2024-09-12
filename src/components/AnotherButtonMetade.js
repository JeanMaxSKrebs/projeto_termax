import React from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const AnotherButtonMetade = props => {
  // console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
        <View>
          <Text style={styles.prefixo}>{props.prefixo}</Text>
          <Text style={styles.texto}>{props.texto}</Text>
        </View>
    </TouchableHighlight>
  );
};

export default AnotherButtonMetade;

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    color: COLORS.secundary,
    textAlign: 'center',
  },
  prefixo: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  button: {
    top: 10,
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 2, // Tamanho da borda preta em pixels
    borderColor: 'black',
  },
});
