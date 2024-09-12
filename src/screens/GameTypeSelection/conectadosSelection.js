import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../assets/colors';
import { useLanguage } from '../../context/LanguageProvider';
import testAuth from '../../utils/tests/testAuth';
import Loading from '../../components/Loading';
import firestore from '@react-native-firebase/firestore';

const GameTypeConectadosSelection = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const { t } = useLanguage();

  const handlePlayerCountPress = async (players) => {
    setLoading(true);
    setSelectedPlayers(players);

    try {
      // console.log("players");
      // console.log(players);
      // Gere um ID único para o jogo
      const newGameRef = firestore().collection('games').doc(); 
      const uniqueGameId = newGameRef.id;

      const authResponse = await testAuth();
      if (!authResponse.id) {
        Alert.alert(t('Erro'), t('Falha na autenticação.'));
        setLoading(false);
        return;
      }

      // console.log("uniqueGameId");
      // console.log(uniqueGameId);

      // Se a autenticação for bem-sucedida, navegue para a tela ConectadosApp
      navigation.navigate('ConectadosApp', {
        gameId: uniqueGameId, // Use o ID gerado
        maxPlayers: players,
      });
    } catch (error) {
      Alert.alert(t('Erro'), t('Houve um problema ao processar o jogo.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading maxPlayers={selectedPlayers} />
      ) : (
        <>
          <Text style={styles.title}>{t('SELECIONE O NÚMERO DE JOGADORES')}</Text>
          {[2, 3, 4].map(players => (
            <TouchableOpacity
              key={players}
              style={styles.button}
              onPress={() => handlePlayerCountPress(players)}
            >
              <Text style={styles.buttonText}>{`${players} ${t('JOGADORES')}`}</Text>
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

export default GameTypeConectadosSelection;
