import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';
import { useLanguage } from "../context/LanguageProvider";

const Loading = ({ message = 'Carregando...', maxPlayers }) => {
  // console.log("maxPlayers");
  // console.log(maxPlayers);
  const { t } = useLanguage(); // Usa o contexto de idioma
  messageTraduzida = t(message)
  return (
    <View style={styles.loadingArea}>
      <ActivityIndicator size="large" color={COLORS.primaryDark || '#000'} />
      <Text style={styles.loadingText}>
        {messageTraduzida}
      </Text>
      <Text style={styles.loadingText}>
        {maxPlayers !== undefined && ` ${t('Máximo de jogadores:')} ${maxPlayers}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.primaryLight || '#000', // Garante uma cor padrão se COLORS.primaryLight não estiver definido
  },
});


export default Loading;
