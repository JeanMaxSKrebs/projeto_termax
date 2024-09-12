import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GameContext } from '../../../context/GameProvider';
import Loading from '../../../components/Loading';
import NicknameModal from '../../../components/Nickname/NicknameModal';
import { useLanguage } from '../../../context/LanguageProvider';
import Timer from '../../../components/Jogo/Timer';
import { COLORS } from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ConectadosGame = ({ gameId, playerId }) => {
  const { gameData, playersCount, loading, fetchTempoBase, incrementPlayerCount, maxPlayers } = useContext(GameContext);
  const [isNicknameModalVisible, setIsNicknameModalVisible] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [tempoBase, setTempoBase] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Novo estado para verificar se o jogo começou
  const { t } = useLanguage();
  const navigation = useNavigation();

  useEffect(() => {
    if (!gameId) return; // Evita a execução se gameId não estiver disponível

    const gameRef = firestore().collection('games').doc(gameId);

    const unsubscribe = gameRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();
        console.log('Dados do jogo atualizados:', data);

        // Verifica se a quantidade máxima de jogadores foi atingida e se o jogo não começou ainda
        if (data.players.length >= maxPlayers && !gameStarted) {
          startGame(); // Inicia o jogo automaticamente se a condição for satisfeita
        }
      } else {
        console.error('Documento do jogo não encontrado.');
      }
    }, error => {
      console.error('Erro ao receber o snapshot:', error);
    });

    // Cleanup function to unsubscribe from the listener
    return () => {
      console.log('Desconectando o listener do jogo');
      unsubscribe(); // Chama a função de unsubscribe para parar de ouvir o snapshot
    };
  }, [gameId, gameStarted, maxPlayers, playersCount]);
  const startGame = async () => {
    setIsGameActive(true);
    setGameStarted(true); // Marca o jogo como iniciado
    // console.log("gameId");
    // console.log(gameId);
    if (gameId) {
      try {
        const fetchedTempoBase = await fetchTempoBase();
        console.log("fetchedTempoBase");
        console.log(fetchedTempoBase);
        setTempoBase(fetchedTempoBase);
        await firestore().collection('games').doc(gameId).update({
          status: 'active',
          startTime: firestore.FieldValue.serverTimestamp()
        });
        updatePlayerCount(playersCount + 1);
      } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
      }
    }
  };

  const addBotToGame = async () => {
    if (gameId) {
      try {
        const botPlayer = {
          id: `bot_${Date.now()}`, // Gera um ID único para o bot
          name: `Bot_${Date.now()}`,
          conected: 0
        };

        const gameRef = firestore().collection('games').doc(gameId);
        const gameDoc = await gameRef.get();
        console.log("TESTE");
        await incrementPlayerCount(); // Incrementa a contagem se o número de jogadores aumentou

        if (gameDoc.exists) {
          const gameData = gameDoc.data();

          // Verifica se o bot já está presente para evitar múltiplos bots
          const botExists = gameData.players.some(player => player.id === botPlayer.id);
          if (!botExists) {
            await gameRef.update({
              players: firestore.FieldValue.arrayUnion(botPlayer)
            });

            console.log('Bot adicionado ao jogo:', botPlayer);
            // Se um novo jogador entra, incrementa a contagem

          }

        }

      } catch (error) {
        console.error('Erro ao adicionar bot ao jogo:', error);
      }
    }
  };


  const handleNicknameSubmit = (nickname) => {
    console.log('Apelido submetido:', nickname);
    setIsNicknameModalVisible(false);
    // Aqui você pode atualizar o apelido do jogador no Firestore se necessário
  };

  const handleButtonPress = (action) => {
    if (action === 'exit') {
      navigation.goBack();
    } else if (action === 'play') {
      startGame();
    } else if (action === 'bots') {
      addBotToGame(); // Chama a função para adicionar um bot
    } else {
      console.log('Ação de bot ou sair da fila ativada');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {gameStarted ? t('Jogo iniciado com sucesso!') : t('Sala Criada com sucesso!')}
      </Text>
      {gameId && <Text style={styles.infoText}>{t('Game ID:')} {gameId}</Text>}
      <Text style={styles.infoText}>{t('Jogadores conectados:')} {playersCount}</Text>
      {isGameActive && (
        <>
          <Text style={styles.infoText}>{t('Tempo percorrido na fila:')} <Timer isActive={true} /> {t('s')}</Text>
          <Text style={styles.infoText}>{t('Tempo base na fila:')} <Timer isActive={false} initialTime={tempoBase} /> {t('s')}</Text>
        </>
      )}
      <NicknameModal
        visible={isNicknameModalVisible}
        onClose={() => setIsNicknameModalVisible(false)}
        onSubmit={handleNicknameSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('play')}>
        <Text style={styles.buttonText}>{t('Iniciar')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('bots')}>
        <Text style={styles.buttonText}>{t('Adicionar Bot')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('exit')}>
        <Text style={styles.buttonText}>{t('Sair')}</Text>
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
  infoText: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 10,
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

export default ConectadosGame;
