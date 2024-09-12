import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import RewardButton from '../../components/RewardButton'; // Certifique-se de que o caminho está correto

const MiniGame1 = ({ onComplete }) => {
  const [waiting, setWaiting] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [level, setLevel] = useState(1);
  const [reward, setReward] = useState(0);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [animate] = useState(new Animated.Value(1));

  useEffect(() => {
    // Ajusta a dificuldade conforme o nível
    const randomDelay = Math.floor(Math.random() * (5000 - 2000)) + 2000 - (level - 1) * 200;
    const timer = setTimeout(() => {
      setWaiting(false);
      setStartTime(new Date().getTime());
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [level]);

  useEffect(() => {
    // Recompensa do nível
    setReward(10 + (level - 1) * 10);
  }, [level]);

  const handlePress = () => {
    if (!waiting) {
      const endTime = new Date().getTime();
      const time = endTime - startTime;
      setReactionTime(time);
      setShowRewardModal(true);
      if (onComplete) onComplete();
    }
  };

  const handleRewardComplete = () => {
    setShowRewardModal(false);
    setLevel(level + 1); // Avança para o próximo nível
  };

  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(animate, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animate, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (reactionTime !== null) {
      pulseAnimation();
    }
  }, [reactionTime]);

  return (
    <View style={styles.container}>
      {reactionTime === null ? (
        <TouchableOpacity style={[styles.screen, { transform: [{ scale: animate }] }]} onPress={handlePress}>
          <Text style={styles.text}>
            {waiting ? 'Espere...' : 'Toque agora!'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Seu tempo de reação: {reactionTime} ms</Text>
          {showRewardModal && (
            <RewardButton
              content={<Text style={styles.rewardText}>Você ganhou {reward} de ouro! Parabéns!</Text>}
              buttonText="OK"
              buttonColor="#4CAF50"
              buttonSize={20}
              onPress={handleRewardComplete}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Cor de fundo suave
    padding: 20,
  },
  screen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347', // Cor de fundo do botão
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  rewardText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default MiniGame1;
