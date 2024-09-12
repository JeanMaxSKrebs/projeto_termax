import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WordDisplay from '../../components/Jogo/WordDisplay';
import Keyboard from '../../components/Jogo/Keyboard';
import { ProfileContext } from '../../context/ProfileProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { COLORS } from '../../assets/colors';

const InputNickname = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [nicknameMax] = useState(11);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { fetchNickname, updateNickname, addNickname } = useContext(ProfileContext);
  const { t } = useLanguage();

  const handleConfirmNickname = async () => {
    try {
      const existingNickname = await fetchNickname();
      if (existingNickname) {
        await updateNickname(nickname);
      } else {
        await addNickname(nickname);
      }
      onSubmit(nickname);
    } catch (error) {
      console.error('Erro ao confirmar apelido: ', error);
      alert(t('Erro ao confirmar apelido.'));
    }
  };

  const handleLetterPress = (index) => {
    setSelectedIndex(index);
  };

  const handlePressLetter = (letter) => {
    if (nickname.length < nicknameMax) {
      setNickname((prev) => prev + letter);
    }
  };

  const handlePressSpace = () => {
    if (nickname.length < nicknameMax) {
      setNickname((prev) => prev + ' ');
    }
  };

  const handlePressBackspace = () => {
    setNickname((prev) => prev.slice(0, -1));
  };

  const handlePressEnter = () => {
    handleConfirmNickname();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Definir Apelido')}</Text>
      <WordDisplay
        letters={nickname.split('')}
        wordLength={nickname.length}
        onLetterPress={handleLetterPress}
        selectedIndex={selectedIndex}
        clickable={false}
        colorMixed={false}
        attemptsLeft={0}
      />
      <Keyboard
        style={styles.keyboard}
        onPressLetter={handlePressLetter}
        onPressSpace={handlePressSpace}
        onPressBackspace={handlePressBackspace}
        onPressEnter={handlePressEnter}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirmNickname}>
        <Text style={styles.buttonText}>{t('Confirmar Apelido')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  keyboard: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.accentSecondary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
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

export default InputNickname;
