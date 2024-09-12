import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Easing, View } from 'react-native';

const styles = StyleSheet.create({
  firework: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

const Fireworks = ({ x, y, color, onAnimationComplete  }) => {
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 4,
        duration: 300,
        easing: Easing.ease, // Alterado para Easing.ease
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease, // Alterado para Easing.ease
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Verifica se onAnimationComplete é uma função antes de chamá-la
      if (typeof onAnimationComplete === 'function') {
        onAnimationComplete();
      }
    });
  }, []);

  // Configuração das partículas menores
  const particles = Array.from({ length: 10 }).map((_, index) => {
    const angle = (index / 8) * Math.PI * 2;
    const particleX = Math.cos(angle) * 40; // Distância das partículas do centro
    const particleY = Math.sin(angle) * 40;

    return (
      <Animated.View
        key={index}
        style={[
          styles.particle,
          { backgroundColor: color, opacity: animatedOpacity, transform: [{ translateX: particleX }, { translateY: particleY }] },
        ]}
      />
    );
  });

  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Animated.View
        style={[
          styles.firework,
          { backgroundColor: color, transform: [{ scale: animatedScale }], opacity: animatedOpacity },
        ]}
      />
      {particles}
    </View>
  );
};

export default Fireworks;
