// LanguageSelectionScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../assets/colors'; // Ajuste o caminho conforme necessário
import { useLanguage } from '../../context/LanguageProvider'; // Importa o contexto

const languages = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'Inglês' },
  // Adicione outros idiomas conforme necessário
];

const LanguageSelection = ({ navigation }) => {
  const { setLanguage, t } = useLanguage(); // Usa o contexto

  const handleSelectLanguage = (languageCode) => {
    setLanguage(languageCode); // Define o idioma no contexto
    navigation.navigate('Home'); // Navega para a tela principal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('ESCOLHA O IDIOMA')}</Text>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={t(item.name)}
              onPress={() => handleSelectLanguage(item.code)}
              color={COLORS.primary} // Usa a cor primária do seu sistema
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background, // Usa a cor de fundo do seu sistema
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary, // Usa a cor primária do seu sistema
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '100%', // Ajusta a largura do botão
  },
});

export default LanguageSelection;
