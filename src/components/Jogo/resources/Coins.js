import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AuthUserContext } from '../../../context/AuthUserProvider';
import firestore from '@react-native-firebase/firestore';

const Coins = ({ width = 24, height = 24 }) => {
  const { user } = useContext(AuthUserContext);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (user) {
      const userDocRef = firestore().collection('users').doc(user.uid);

      const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setCoins(userData.coins || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/resources/coin/coin.png')}
        style={[styles.image, { width, height }]}
      />
      <Text style={styles.label}>{coins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinha a imagem e o texto em linha
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: '#555555', // Fundo cinza
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 3,
  },
  image: {
    resizeMode: 'contain', // Ajusta a imagem para caber dentro do contêiner
  },
  label: {
    fontSize: 12, // Ajuste o tamanho da fonte conforme necessário
    fontWeight: 'bold',
    color: '#FFD700', // Cor dourado claro
    marginLeft: 4, // Espaço entre a imagem e o texto
    flexShrink: 1,  // Evita que o texto transborde
  },
});

export default Coins;
