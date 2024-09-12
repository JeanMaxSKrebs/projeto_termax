// src/components/Jogo/resources/WordPoints.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AuthUserContext } from '../../../context/AuthUserProvider';
import firestore from '@react-native-firebase/firestore';

const WordPoints = () => {
  const { user } = useContext(AuthUserContext);
  const [wordPoints, setWordPoints] = useState(0);

  useEffect(() => {
    if (user) {
      const userDocRef = firestore().collection('users').doc(user.uid);

      const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setWordPoints(userData.wordPoints || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/resources/wordpoint/wordpoint.png')} style={styles.image} />
      </View>
      <Text style={styles.label}>{wordPoints}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555', // Background color
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
    fontSize: 12, // Adjusted font size
    color: '#111111', // Golden color for word points
    marginLeft: 4,
  },
});

export default WordPoints;
