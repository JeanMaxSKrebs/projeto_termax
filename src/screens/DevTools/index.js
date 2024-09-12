import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUserContext } from '../../context/AuthUserProvider'; // Importe o contexto
import { useLanguage } from "../../context/LanguageProvider";

const DevTools = () => {
  const { user } = useContext(AuthUserContext); // Acesse o usuário do contexto
  const { t } = useLanguage();

  const handleAddCoins = async () => {
    if (user) {
      await firestore().collection('users').doc(user.uid).update({
        coins: firestore.FieldValue.increment(1000),
      });
    }
  };

  const handleAddKeys = async () => {
    if (user) {
      await firestore().collection('users').doc(user.uid).update({
        keys: firestore.FieldValue.increment(1),
      });
    }
  };

  const handleAddSuperKeys = async () => {
    if (user) {
      await firestore().collection('users').doc(user.uid).update({
        specialKeys: firestore.FieldValue.increment(1),
      });
    }
  };

  const handleAddWordPoints = async () => {
    if (user) {
      await firestore().collection('users').doc(user.uid).update({
        wordPoints: firestore.FieldValue.increment(500),
      });
    }
  };

  const handleResetChestTimer = async () => {
    await AsyncStorage.removeItem('lastOpened');
  };

  const handleResetAll = async () => {
    if (user) {
      await firestore().collection('users').doc(user.uid).set({
        coins: 0,
        keys: 0,
        specialKeys: 0,
        wordPoints: 0,
      }, { merge: true });
    }
  };

  const handleUnlockMiniGames = async () => {
    await AsyncStorage.removeItem('lastPlayedMiniGame');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Ferramentas de Desenvolvimento')}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddCoins}>
        <Text style={styles.buttonText}>{t('Adicionar Coins')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddKeys}>
        <Text style={styles.buttonText}>{t('Adicionar Keys')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddSuperKeys}>
        <Text style={styles.buttonText}>{t('Adicionar Super Keys')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddWordPoints}>
        <Text style={styles.buttonText}>{t('Adicionar Word Points')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleResetChestTimer}>
        <Text style={styles.buttonText}>{t('Resetar Temporizador de Baú')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUnlockMiniGames}>
        <Text style={styles.buttonText}>{t('Desbloquear Mini Jogos')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleResetAll}>
        <Text style={styles.buttonText}>{t('Resetar Tudo')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DevTools;
