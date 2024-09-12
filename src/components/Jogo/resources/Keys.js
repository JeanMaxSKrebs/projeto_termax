// src/components/Jogo/resources/Keys.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AuthUserContext } from '../../../context/AuthUserProvider';
import firestore from '@react-native-firebase/firestore';

const Keys = () => {
  const { user } = useContext(AuthUserContext);
  const [keys, setKeys] = useState(0);

  useEffect(() => {
    if (user) {
      const userDocRef = firestore().collection('users').doc(user.uid);

      const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setKeys(userData.keys || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/resources/key/key.png')} style={styles.image} />
      </View>
      <Text style={styles.label}>{keys}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555', // Background color matching other components
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 3,
  },
  image: {
    width: 30,
    height: 25,
  },
  label: {
    fontSize: 12, // Matching font size with other resource components
    color: '#222222', // Light gold color for the text
    marginLeft: 4,
  },
});

export default Keys;
