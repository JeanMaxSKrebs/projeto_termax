import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useLanguage } from '../../../context/LanguageProvider';
import { COLORS } from '../../../assets/colors';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const CollectionItem = ({ item }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.playerContainer}>
      <Text style={styles.infoText}>{t('Nome')}: {item.name}</Text>
      <Text style={styles.infoText}>{t('Conectados')}: {item.conected}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    width: width * 0.5, // 50% of screen width
    height: height * 0.1, // 30% of screen height
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.cardBackground,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    justifyContent: 'center', // Center content vertically
  },
  infoText: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default CollectionItem;
