import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';
import Preload from '../screens/Preload';
import ForgotPassword from '../screens/ForgotPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Manutencao from '../screens/Manutencao';
import Loja from '../screens/Loja'; // Importe a tela da Loja
import MiniGameSelector from '../screens/MiniGame/MiniGameSelector'; // Importe a tela da Loja
import DevTools from '../screens/DevTools'; // Importe a tela da Loja

import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';

import Info from '../screens/Info';

import LanguageSelection from '../screens/LanguageSelection'; // Ajuste o caminho conforme necessário

//jogo

import GameTypeTermaxSelection from '../screens/GameTypeSelection/termaxSelection';
import GameTypeConectadosSelection from '../screens/GameTypeSelection/conectadosSelection';
import GameTypeSelection from '../screens/GameTypeSelection/index';
import ConectadosGame from '../screens/Jogo/Conectados/ConectadosGame';
import ConectadosApp from '../screens/Jogo/Conectados/index';
import TermaxGame from '../screens/Jogo/index';
import EscolhaPalavra from '../screens/Jogo/EscolhaPalavra';
import Colecao from '../screens/Colecao';
import Colecoes from '../screens/Colecoes';

import { COLORS } from '../assets/colors';
import { StyleSheet, StatusBar } from 'react-native';

import { AuthUserContext } from '../context/AuthUserProvider';
import { useLanguage } from "../context/LanguageProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" options={SignInStyle} />
    <Stack.Screen component={SignUp} name="SignUp" options={SignUpStyle} />
    <Stack.Screen
      component={ForgotPassword}
      name="ForgotPassword"
      options={ForgotPasswordStyle}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const { user } = useContext(AuthUserContext)
  const { t } = useLanguage();
  const miniGamesName = t('Mini Jogos');

  useEffect(() => {
    if (user) {
      console.log('email user conectado: ' + user.email)
      console.log(user)
    }
  }, [user]);


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}>
      <Tab.Screen
        component={Loja}
        name="Loja"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <Icon name="storefront" color={COLORS.primaryDark} />,
        }}
      />

      <Tab.Screen
        component={MiniGameSelector}
        name={miniGamesName}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <Icon name="game-controller" color={COLORS.primaryDark} />,
        }}
      />
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <Icon name="home" color={COLORS.primaryDark} />,
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <Icon name="list" color={COLORS.primaryDark} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={COLORS.primary} />
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen component={Manutencao} name="Manutencao" options={{ headerShown: true, }} />
      <Stack.Screen component={Chats} name="Chats" />
      <Stack.Screen component={Chat} name="Chat" />
      <Stack.Screen component={Info} name="Info" />
      <Stack.Screen component={ConectadosApp} name="ConectadosApp" />
      <Stack.Screen component={ConectadosGame} name="ConectadosGame" />
      <Stack.Screen component={TermaxGame} name="TermaxGame" />
      <Stack.Screen component={EscolhaPalavra} name="EscolhaPalavra" />
      <Stack.Screen component={LanguageSelection} name="LanguageSelection" />
      <Stack.Screen component={GameTypeSelection} name="GameTypeSelection" />
      <Stack.Screen component={GameTypeConectadosSelection} name="GameTypeConectadosSelection" />
      <Stack.Screen component={GameTypeTermaxSelection} name="GameTypeTermaxSelection" />
      <Stack.Screen component={DevTools} name="DevTools" />
      <Stack.Screen
        component={PerfilUsuario}
        name="PerfilUsuario"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen component={Colecao} name="Colecao" />
      <Stack.Screen component={Colecoes} name="Colecoes" />

      {/* <Stack.Screen component={Salao} name="Salao" /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;

const SignInStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Bem Vindo',
  headerStyle: { backgroundColor: COLORS.primaryShadow },
  headerTitleStyle: { color: COLORS.black },
};
const SignUpStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Cadastre-se',
  headerStyle: { backgroundColor: COLORS.secondary },
  headerTitleStyle: { color: COLORS.primaryDark },
  headerTintColor: COLORS.primaryDark,
};
const ForgotPasswordStyle = {
  headerTitleAlign: 'center',
  title: 'Esqueceu a Senha',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
  headerTintColor: COLORS.primaryDark,
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});
