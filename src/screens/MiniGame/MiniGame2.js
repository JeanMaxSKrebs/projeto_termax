import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import RewardButton from '../../components/RewardButton'; // Certifique-se de que o caminho está correto

const sequences = ['red', 'blue', 'green', 'yellow'];

const getSequenceLength = (level) => Math.min(10, level); // Aumenta a sequência com o nível, começando em 4

const MiniGame2 = ({ onComplete }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [highlightedColor, setHighlightedColor] = useState(null);
  const [highlightAnim] = useState(new Animated.Value(1));
  const [reward, setReward] = useState(0);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const sequenceRef = useRef(sequence);

  useEffect(() => {
    const newSequenceLength = getSequenceLength(level);
    const newSequence = generateSequence(newSequenceLength);
    setSequence(newSequence);
    sequenceRef.current = newSequence;
    setReward(10 + (level - 1) * 10); // Aumenta a recompensa com o nível
    showSequence(newSequence);
  }, [level]);

  const generateSequence = (length) => {
    // Gera a sequência incluindo todas as 4 cores
    let sequence = [];
    for (let i = 0; i < length; i++) {
      sequence.push(sequences[i % sequences.length]);
    }
    return sequence;
  };

  const showSequence = (sequence) => {
    let index = 0;
    setCurrentSequenceIndex(0);

    const showNextColor = () => {
      if (index < sequence.length) {
        const colorToHighlight = sequence[index];
        setHighlightedColor(colorToHighlight);
        Animated.sequence([
          Animated.timing(highlightAnim, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(highlightAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          index++;
          showNextColor(); // Mostrar a próxima cor após o término da animação
        });
      } else {
        setHighlightedColor(null);
        setCurrentSequenceIndex(sequence.length); // Indica que a sequência foi completamente mostrada
      }
    };

    showNextColor();
  };

  const handlePress = (color) => {
    if (currentSequenceIndex === sequence.length) { // Verifica se a sequência foi completamente mostrada
      const newPlayerSequence = [...playerSequence, color];
      setPlayerSequence(newPlayerSequence);

      if (newPlayerSequence.join('') === sequenceRef.current.join('')) {
        if (sequenceRef.current.length === 10) { // Se o jogador completar a sequência de 10 cores
          setShowRewardModal(true); // Mostra o modal com a recompensa
        } else {
          setLevel(level + 1); // Avança para o próximo nível
        }
        setPlayerSequence([]);
      } else if (newPlayerSequence.length === sequenceRef.current.length) {
        Alert.alert('Errado!', 'Tente novamente.');
        setPlayerSequence([]);
      }
    }
  };

  const handleRewardComplete = (totalReward) => {
    setShowRewardModal(false);
    if (onComplete) onComplete(totalReward);
  };

  const renderColorBoxes = () => (
    sequences.map((color) => (
      <TouchableOpacity
        key={color}
        style={[styles.colorBox, { backgroundColor: color, transform: [{ scale: color === highlightedColor ? highlightAnim : 1 }] }]}
        onPress={() => handlePress(color)}
      />
    ))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Repita a sequência de cores</Text>
      <Text style={styles.levelText}>Nível: {level}</Text>
      <View style={styles.colorContainer}>
        {renderColorBoxes()}
      </View>

      {showRewardModal && (
        <RewardButton
          content={<Text>Você ganhou {reward + 150} de ouro! Parabéns!</Text>}
          buttonText="OK"
          buttonColor="#4CAF50"
          buttonSize={20}
          onPress={() => handleRewardComplete(reward + 150)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 18,
    marginBottom: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorBox: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default MiniGame2;
