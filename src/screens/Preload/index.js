import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Container, Image} from './styles';
import {COLORS} from '../../assets/colors';

const Preload = ({navigation}) => {

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Preload, retrieveUserSession: ' + error);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      title: 'Carregando',
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
    });
    entrar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entrar = async () => {
    const userSession = await retrieveUserSession();
    // console.log('userSession');
    // console.log(userSession);
    if (userSession) {
      try {
        await auth().signInWithEmailAndPassword(
          userSession.email,
          userSession.senha,
        );
        // console.log(navigation);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } catch (e) {
        console.error('SignIn, entrar: ' + e);
        switch (e.code) {
          case 'auth/user-not-found':
            Alert.alert('Erro', 'Usuário não cadastrado.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Erro', 'Erro na senha.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/user-disabled':
            Alert.alert('Erro', 'Usuário desabilitado.');
            break;
        }
      }
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
