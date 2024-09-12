import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { useLanguage } from '../context/LanguageProvider';

const CollectionListItem = ({ have, image, partsCount, partsTotal, onPress, text }) => {
  const { t } = useLanguage();

  // console.log("have")
  // console.log(have)
  return (
    <TouchableOpacity style={styles.overlay} onPress={onPress} activeOpacity={0.98}>
      <View style={styles.item}>
        <View>
          <Text style={styles.text}>{t(text)}</Text>
          <Text style={styles.textNumber}>( {partsCount} / {partsTotal} ) </Text>
        </View>
        <Image source={image} style={[styles.image]} />
        {have === undefined ?
          <View style={styles.content}>
            <Text style={styles.overlayText}>X</Text>
          </View>
          : !have ?
            <View style={styles.overlayContent}>
              <Text style={styles.overlayText}>?</Text>
            </View>
            :
            <View style={styles.content}>
              <Text style={styles.overlayText}></Text>
            </View>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    aspectRatio: 1, // Mantém a proporção da imagem quadrada
    overflow: 'hidden',
    borderColor: "#555",
    borderWidth: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    width: "100%",
  },
  overlay: {
    flex: 1,
    position: 'relative',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Sobreposição cinza com 50% de transparência
  },
  overlayText: {
    fontSize: 40,
    color: "red",
  },
  text: {
    color: "#555",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textNumber: {
    color: "#555",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CollectionListItem;
