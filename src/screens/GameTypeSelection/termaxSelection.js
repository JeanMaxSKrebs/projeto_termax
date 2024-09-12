import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../../assets/colors';
import { fetchValidWords } from '../../utils/wordValidation';
import { useLanguage } from '../../context/LanguageProvider';
import testAuth from '../../utils/tests/testAuth';

const GameTypeTermaxSelection = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [selectedNum, setSelectedNum] = useState(null);
  const { t } = useLanguage();

  const handleGameTypePress = async (num) => {
    setLoading(true);
    setSelectedNum(num);

    try {
      const authResponse = await testAuth();
      if (!authResponse.id) {
        Alert.alert(t('Erro'), t('Falha na autenticação.'));
        setLoading(false);
        return;
      }
      const words = await fetchValidWords(num);
      if (words.length === 0) {
        Alert.alert(t('Erro'), t('Não foi possível encontrar palavras válidas.'));
      } else {
        navigation.navigate('TermaxGame', { wordLength: num, words });
      }
    } catch (error) {
      Alert.alert(t('Erro'), t('Houve um problema ao buscar as palavras.'));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Text style={styles.title}>{`${selectedNum} ${t('LETRAS')}`}</Text>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{t('SELECIONE O NÚMERO DE LETRAS')}</Text>
          {[4, 5, 6, 7, 8, 9, 10].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.button}
              onPress={() => handleGameTypePress(num)}
            >
              <Text style={styles.buttonText}>{`${num} ${t('LETRAS')}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
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

export default GameTypeTermaxSelection;
