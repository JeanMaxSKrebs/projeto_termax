import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const VoltarWithoutColor = props => {
  // console.log(props);
  return (
    <View style={styles.content}>
      <View style={styles.area}>
      <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
        <Text style={styles.texto}>&lt; voltar</Text>
      </TouchableHighlight>
      </View>
    </View>
  );
};

export default VoltarWithoutColor;

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    color: COLORS.secundary,
  },
  area: {
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    height: 50,
    // backgroundColor: COLORS.white,
  },
  button: {
    // backgroundColor: COLORS.gray,
    height: 30,
    width: '30%',
    justifyContent: 'center',
    paddingLeft: 20,

  },
});
