import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthUserContext } from '../../../context/AuthUserProvider';
import { GameContext } from '../../../context/GameProvider';
import firestore from '@react-native-firebase/firestore';
import CollectionSelection from '../../../components/Jogo/Conectados/CollectionSelection';
import ConectadosGame from './ConectadosGame';

const ConectadosApp = ({ route }) => {
  const { user } = useContext(AuthUserContext);
  const { createNewGame } = useContext(GameContext);
  const { gameId, maxPlayers } = route.params || {};
  const [gameStarted, setGameStarted] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const [unsubscribe, setUnsubscribe] = useState(null);

  // Inicializa o jogo
  const initializeGame = async (gameId) => {
    try {
      const gameRef = firestore().collection('games').doc(gameId);
      const gameDoc = await gameRef.get();

      if (!gameDoc.exists) {
        // Criar um novo jogo se o documento não existir
        const newGameRef = await createNewGame(user, gameId, maxPlayers);
        setPlayerId(user.uid);
        // console.log("newGameRef");
        // console.log(newGameRef);
        startGameListener(newGameRef.id);

      } else {
        // Atualizar o jogo existente
        await gameRef.update({
          players: firestore.FieldValue.arrayUnion(user.uid),
          status: 'waiting',
          maxPlayers: maxPlayers
        });
        startGameListener(gameId);
      }
    } catch (error) {
      console.error('Erro ao inicializar o jogo:', error);
    }
  };

  // Inicia o listener para o jogo
  const startGameListener = (gameId) => {
    // console.log("gameId");
    // console.log(gameId);
    const gameRef = firestore().collection('games').doc(gameId);

    const unsubscribe = gameRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        console.log('Dados do jogo atualizados:', data);
        setGameStarted(true);
        setPlayerId(user.uid);
      } else {
        console.log('Documento do jogo não encontrado.');
      }
    }, (error) => {
      console.error('Erro ao receber o snapshot:', error);
    });

    setUnsubscribe(() => unsubscribe);
  };

  useEffect(() => {
    // console.log("gameIda");
    // console.log(gameId);
    if (user) {
      // Use a função de inicialização para o gameId fornecido ou crie um novo
      initializeGame(gameId || '');
    }

    // Cleanup function to unsubscribe from the listener
    return () => {
      if (unsubscribe) {
        console.log('Desconectando o listener do jogo');
        unsubscribe(); // Chame a função de unsubscribe aqui para parar de ouvir o snapshot
      }
    };
  }, [user, gameId]);

  return (
    <View style={styles.container}>
      {gameStarted ? (
        <>
          <CollectionSelection gameId={gameId} playerId={playerId} />
          <ConectadosGame gameId={gameId} playerId={playerId} />
        </>
      ) : (
        <Text style={styles.loadingText}>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ConectadosApp;
