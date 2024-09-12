import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';
import { useLanguage } from '../context/LanguageProvider';

const MeuButtonMetade = props => {
  const { t } = useLanguage(); // Usa o contexto de idioma
  const width = props.width || '45%';
  const color = props.cor || COLORS.primary;
  const estiloBorda = props.borda ? { borderWidth: 5, borderColor: color, backgroundColor: COLORS.primaryShadow } : null;
  const disable = props.disabled || false;


  return (
    <TouchableHighlight disabled={disable} style={[{ width },
    estiloBorda
      ? { backgroundColor: COLORS.primaryShadow, ...estiloBorda }
      : { backgroundColor: color },
    disable ? styles.disabledButton : styles.button
  ]}

      onPress={() => props.onClick()}>
      <Text style={styles.texto}>{t(props.texto)}</Text>
      </TouchableHighlight>
  );
};

export default MeuButtonMetade;

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    color: COLORS.secundary,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginStart: 5,
    margin: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: COLORS.terciary, // Cor para botão desabilitado
    opacity: 0.5, // Reduz a opacidade para indicar que está desabilitado
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  disabledText: {
    color: COLORS.background, // Cor do texto para botão desabilitado
  },
});
