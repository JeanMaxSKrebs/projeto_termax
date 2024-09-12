import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import MiniGame1 from './MiniGame1'; // Certifique-se de que o caminho está correto
import MiniGame2 from './MiniGame2'; // Certifique-se de que o caminho está correto
import MiniGame3 from './MiniGame3'; // Certifique-se de que o caminho está correto
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from "../../context/LanguageProvider";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../assets/colors';
import RewardButton from '../../components/RewardButton';

const MiniGameSelector = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const { t } = useLanguage();

  const miniGames = [
    { id: '1', name: `${t('Mini Jogo')} 1`, component: MiniGame1, premioMaximo: 150, premioNormal: `${t('Nível')} x 10` },
    { id: '2', name: `${t('Mini Jogo')} 2`, component: MiniGame2, premioMaximo: 350, premioNormal: `${t('Nível')} x 10` },
    { id: '3', name: `${t('Mini Jogo')} 3`, component: MiniGame3, premioMaximo: 1000, premioNormal: `${t('Nível')} x 10` },
  ];

  useFocusEffect(
    React.useCallback(() => {
      const checkAvailability = async () => {
        const lastPlayed = await AsyncStorage.getItem('lastPlayedMiniGame');
        const now = Date.now();
        const intervals = [3 * 60 * 60 * 1000, 6 * 60 * 60 * 1000, 12 * 60 * 60 * 1000]; // 3h, 6h, 12h em milissegundos

        if (lastPlayed) {
          const lastPlayedTime = parseInt(lastPlayed);
          const timePassed = now - lastPlayedTime;
          const nextAvailableInterval = intervals.find(interval => timePassed < interval);

          if (nextAvailableInterval) {
            const nextAvailable = lastPlayedTime + nextAvailableInterval;
            setNextAvailableTime(nextAvailable);
          } else {
            setNextAvailableTime(null);
          }
        } else {
          setNextAvailableTime(null);
        }
      };

      checkAvailability();
    }, [])
  );

  useEffect(() => {
    const updateRemainingTime = () => {
      if (nextAvailableTime) {
        const now = Date.now();
        const remaining = nextAvailableTime - now;
        if (remaining > 0) {
          setTimeRemaining(remaining);
        } else {
          setTimeRemaining(null);
        }
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000); // Atualiza o tempo restante a cada segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [nextAvailableTime]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGame(null);
  };

  const renderMiniGameButtons = () => (
    miniGames.map((game) => (
      <View key={game.id} style={styles.gameContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGameSelect(game)}
        >
          <Text style={styles.buttonText}>{t(game.name)}</Text>
        </TouchableOpacity>
        <RewardButton
          content={(
            <View>
              <Text>{t('Prêmio Máximo')}: {game.premioMaximo}</Text>
              <Text>{t('Prêmio Normal')}: {game.premioNormal}</Text>
            </View>
          )}
          buttonText="?"
          buttonColor={COLORS.accentPrimary}
          buttonSize={10}
        />
      </View>
    ))
  );

  const formatTimeRemaining = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{t('Selecione um Mini Jogo')}</Text>
      {timeRemaining !== null ? (
        <Text style={styles.infoText}>
          {t('Próximo mini jogo disponível em:')} {formatTimeRemaining(timeRemaining)}
        </Text>
      ) : (
        renderMiniGameButtons()
      )}
      {selectedGame && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t(selectedGame.name)}</Text>
              <selectedGame.component onComplete={handleCloseModal} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>{t('Fechar')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },
  texto: {
    textAlign: 'center',
    fontSize: 50,
    color: COLORS.accentSecondary,
    marginBottom: 30,
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.accentSecondary,
    padding: 15,
    borderRadius: 10,
    width: '100%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.primaryDark,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  infoText: {
    fontSize: 18,
    color: '#f44336',
    marginBottom: 20,
  },
});

export default MiniGameSelector;
