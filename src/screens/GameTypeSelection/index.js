import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors';
import { useLanguage } from '../../context/LanguageProvider';

const GameTypeSelection = ({ navigation }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Escolha o Tipo de Jogo')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GameTypeConectadosSelection')}
      >
        <Text style={styles.buttonText}>{t('Conectados')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GameTypeTermaxSelection')}
      >
        <Text style={styles.buttonText}>Termax</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.accentSecondary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameTypeSelection;
