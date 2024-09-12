import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';
import { useLanguage } from '../context/LanguageProvider';

const MeuButton = props => {
  const { t } = useLanguage(); // Usa o contexto de idioma

  // console.log(props);
  const color = props.cor || COLORS.primary;

  return (
    <TouchableHighlight style={[styles.button, { backgroundColor: color }]} onPress={() => props.onClick()}>
      <Text style={styles.texto}>{t(props.texto)}</Text>
    </TouchableHighlight>
  );
};

export default MeuButton;

const styles = StyleSheet.create({
  texto: {
    fontSize: 25,
    color: COLORS.background,
  },
  button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
});
