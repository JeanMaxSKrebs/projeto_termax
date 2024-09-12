import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);
  const [tempoBase, setTempoBase] = useState(0);
  const [gameId, setGameId] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [playersCount, setPlayersCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [gameIdState, setGameIdState] = useState(null);
  const [unsubscribe, setUnsubscribe] = useState(null);
  const [userGame, setUserGame] = useState(null);

  // console.log(userGame);
  // console.log(gameId);
  // console.log(maxPlayers);
  // Function to create a new game
  const createNewGame = async (user, gameId, maxPlayers) => {
    setMaxPlayers(maxPlayers);
    setGameId(gameId);
    setUserGame(user);
    try {
      const newGameRef = firestore().collection('games').doc(gameId);
      const newPlayer = {
        id: user.uid,
        name: user.nickname || 'Unknown',
        conected: 0
      };

      await newGameRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        status: 'waiting',
        maxPlayers: maxPlayers,
        players: [newPlayer]
      });

      setPlayersCount(1);
      // console.log('Novo jogo criado com ID:', newGameRef.id);
      return newGameRef;
    } catch (err) {
      console.error('Erro ao criar nova sala:', err);
      throw err;
    }
  };


  // Function to get a game reference
  const getGameRef = async (gameId) => {
    try {
      console.log('Obtendo referência do jogo:', gameId);
      const gameRef = firestore().doc(`games/${gameId}`);
      const gameDoc = await gameRef.get();
      console.log('Documento do jogo obtido:', gameDoc.exists);

      if (gameDoc.exists) {
        console.log('Jogo existente encontrado.');
        return gameRef;
      } else {
        console.log('Jogo não encontrado. Criando novo jogo.');
        const newGameRef = await createNewGame();
        setGameIdState(newGameRef.id); // Atualiza o ID do jogo
        return newGameRef;
      }
    } catch (error) {
      console.error('Erro ao obter referência do jogo:', error);
      throw error;
    }
  };

  // Function to add a player
  const addPlayer = async (gameRef, userId) => {
    try {
      if (!gameRef || !userId) throw new Error('gameRef ou userId não fornecido.');
      console.log('Adicionando jogador com ID:', userId);
      await gameRef.update({
        players: firestore.FieldValue.arrayUnion(userId)
      });
      await updatePlayersCount(gameRef);
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
    }
  };

  // Function to remove a player
  const removePlayer = async (gameRef, userId) => {
    try {
      if (!gameRef || !userId) throw new Error('gameRef ou userId não fornecido.');
      console.log('Removendo jogador com ID:', userId);
      await gameRef.update({
        players: firestore.FieldValue.arrayRemove(userId)
      });
      await updatePlayersCount(gameRef);
    } catch (error) {
      console.error('Erro ao remover jogador:', error);
    }
  };

  // Function to update player count
  const updatePlayersCount = async (gameRef) => {
    try {
      if (!gameRef) throw new Error('gameRef não fornecido.');
      const doc = await gameRef.get();
      if (doc.exists) {
        const players = doc.data().players || [];
        console.log('Contagem de jogadores atualizada:', players.length);
        setPlayersCount(players.length);
      }
    } catch (error) {
      console.error('Erro ao atualizar contagem de jogadores:', error);
    }
  };

  // Function to fetch tempoBase
  const fetchTempoBase = async () => {
    try {
      console.log('Buscando tempo base para o jogo com ID:', gameIdState);
      const gameRef = firestore().doc(`games/${gameIdState}`);
      const doc = await gameRef.get();
      if (doc.exists) {
        console.log('Tempo base buscado:', doc.data().baseTime || 0);
        return doc.data().baseTime || 0;
      }
      return 0;
    } catch (error) {
      console.error('Erro ao buscar o tempo base:', error);
      return 0;
    }
  };


// Function to increment player count in Firestore
const incrementPlayerCount = async () => {
  try {
    console.log('Incrementando contagem de jogadores...');
    const gameRef = firestore().collection('games').doc(gameId);

    // Verifica se o documento existe
    const gameDoc = await gameRef.get();
    if (!gameDoc.exists) {
      console.error('Documento do jogo não encontrado, criando um novo documento...');
      // Cria um novo documento se não existir
      await gameRef.set({ playersCount: 0 });
    }

    // Incrementa a contagem de jogadores
    await gameRef.update({
      playersCount: firestore.FieldValue.increment(1) // Incrementa a contagem de jogadores em 1
    });

    // Atualiza o estado local com o novo valor
    const updatedGameDoc = await gameRef.get();
    if (updatedGameDoc.exists) {
      const data = updatedGameDoc.data();
      setPlayersCount(data.playersCount || 0);
    }
  } catch (error) {
    console.error('Erro ao incrementar a contagem de jogadores:', error);
  }
};



  useEffect(() => {
    return () => {
      if (unsubscribe) {
        console.log('Desconectando o listener do jogo');
        unsubscribe();
      }
    };
  }, [unsubscribe]);

  return (
    <GameContext.Provider value={{
      gameData,
      playersCount,
      loading,
      addPlayer,
      removePlayer,
      updatePlayersCount,
      fetchTempoBase,
      incrementPlayerCount,
      gameIdState,
      createNewGame
    }}>
      {children}
    </GameContext.Provider>
  );
};
