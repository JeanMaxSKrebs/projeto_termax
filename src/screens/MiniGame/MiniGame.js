import React from 'react';
import { View, StyleSheet } from 'react-native';

const MiniGame = ({ gameComponent: GameComponent, onComplete }) => {
 
  const handleMiniGameComplete = async (success, rewards) => {
    setShowMiniGame(false);
    const updates = {};

    if (success) {
        rewards.forEach((rewardItem) => {
            if (rewardItem.type === 'coins') {
                updates.coins = (updates.coins || coins) + rewardItem.amount;
            } else if (rewardItem.type === 'wordpoints') {
                updates.wordPoints = (updates.wordPoints || wordPoints) + rewardItem.amount;
            }
        });

        await updateResources(updates);
    }
};
  return (
    <View style={styles.container}>
      {/* Renderiza o componente do mini jogo passado como prop */}
      <GameComponent onComplete={onComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MiniGame;
