import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CollectionPart = ({ image, have, style }) => {
  return (
    <View style={styles.container}>
      <Image source={image}         style={[styles.image, style, { opacity: have ? 1 : 0.5 }]} />
      {!have && (
        <View style={styles.overlay}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Camada cinza
    borderRadius: 10,
  },
  questionMark: {
    fontSize: 40,
    color: 'black',
  },
});

export default CollectionPart;
