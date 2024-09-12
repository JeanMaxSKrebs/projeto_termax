import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../../../assets/colors';
import { useLanguage } from '../../../context/LanguageProvider';
import Loading from '../../Loading';
import CollectionItem from './CollectionItem'; // Import CollectionItem

const CollectionSelection = ({ gameId, playerId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const gameDoc = await firestore()
          .collection('games')
          .doc(gameId)
          .get();

        if (gameDoc.exists) {
          const gameData = gameDoc.data();
          if (gameData.players) {
            setPlayers(gameData.players);
          } else {
            Alert.alert(t('Erro'), t('Nenhum jogador encontrado.'));
          }
        } else {
          Alert.alert(t('Erro'), t('Dados do jogo não encontrados.'));
        }
      } catch (error) {
        Alert.alert(t('Erro'), t('Houve um problema ao buscar os dados do jogo.'));
        console.error('Error fetching player data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [gameId, players]);

  if (loading) {
    return <Loading />;
  }

  if (players.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('Nenhum jogador disponível')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Dados dos Jogadores')}</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <CollectionItem item={item} />}
        contentContainerStyle={styles.list}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    textAlign: 'center',
  },
});

export default CollectionSelection;
