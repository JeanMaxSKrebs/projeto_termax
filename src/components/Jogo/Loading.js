// src/components/Loading.js
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// Componente de letra giratória
const RotatingLetter = ({ letter }) => {
  const rotate = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  );
};

// Componente de loading
const Loading = ({ message = 'Carregando...', maxPlayers = 0 }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        {letters.map((letter, index) => (
          <RotatingLetter key={index} letter={letter} />
        ))}
      </View>
      <Text style={[{ color: '#ff0000' }, styles.text]}>{message}</Text>
      <Text style={styles.playerCountText}>{`Número de jogadores conectados: ${maxPlayers}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
  },
  loadingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  letter: {
    fontSize: 24,
    margin: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerCountText: {
    fontSize: 16,
  },
});

export default Loading;
