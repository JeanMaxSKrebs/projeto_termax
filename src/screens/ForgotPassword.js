import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '../assets/colors';
import MeuButton from '../components/MeuButton';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      // alert('email')
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            'Atenção',
            'Verifique seu Email.\n Foi enviado um email de recuperação de senha para: ' +
              email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.log('ForgotPassword: erro em recover:' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não encontrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Senha Incorreta.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email Inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário Desativado.');
              break;
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyBoardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <MeuButton texto="Recuperar" onClick={recover} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  input: {
    // textAlign: 'center',
    width: '70%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 20,
    color: 'black',
  },
});
