import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const CollectionImage = ({ image, have }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      {!have && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>?</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1, // Mantém a proporção quadrada
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CollectionImage;
