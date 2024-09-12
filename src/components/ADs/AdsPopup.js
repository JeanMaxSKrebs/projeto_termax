import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const AdsPopup = ({ adsData }) => {


  return (
    <View style={styles.container}>
      {console.log('adsData')}
      {console.log(adsData)}
      <Image
        source={{ uri: adsData.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Anúncio</Text>
        <Text style={styles.title}>{adsData.title}</Text>
        <Text style={styles.description}>{adsData.description}</Text>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',

    flexDirection: 'row'

  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center'

  },
  description: {
    fontSize: 14,
    textAlign:'center'
  },
  image: {
    width: 150,
    height: 75,
    borderRadius: 15,
  },
});

export default AdsPopup;
