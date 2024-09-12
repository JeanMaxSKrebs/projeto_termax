import React from 'react';
import styled from 'styled-components/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

const ButtonExit = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const Image = styled.Image`
  width: 25px;
  height: 25px;
`;

const LogoutButton = () => {
  const signOut = () => {
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        RNRestart.Restart();
      })
      .catch(e => {
        console.log('Logout, signOut em remove item: ' + e);
      });
  };

  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/logout.png')}
        accessibilityLabel="botão sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
