import React from 'react';
import { AuthUserProvider } from '../context/AuthUserProvider';
import { ProfileProvider } from '../context/ProfileProvider';
import { CoinsExpProvider } from '../context/CoinsExpProvider';
import { CollectionsProvider } from '../context/CollectionsProvider';
import { ChatProvider } from '../context/ChatProvider';
import { LanguageProvider } from '../context/LanguageProvider';
import { ApiProvider } from '../context/ApiProvider';
import { GameProvider } from '../context/GameProvider'; // Ajuste o caminho conforme necessário

import { ThemeProvider } from "styled-components";

import Navigator from './Navigator';
import { COLORS } from "../assets/colors";
import theme from './styles/index';

import { useColorScheme } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
import themes from "./styles/";


export default function Providers() {
  // dark, light, null, undefined
  const deviceTheme = useColorScheme();
  // console.log('deviceTheme');
  // console.log(deviceTheme);

  // console.log(themes);
  //define o tema, o segundo parametro é o padrão
  const theme = themes[deviceTheme] || theme.dark;
  // console.log(theme);
  return (
    <AuthUserProvider>
      <ApiProvider>
        <LanguageProvider>
          <ProfileProvider>
            <CoinsExpProvider>
              <GameProvider>
                <CollectionsProvider>
                  <ChatProvider>
                    <ThemeProvider theme={theme}>
                      <Navigator />
                    </ThemeProvider>
                  </ChatProvider>
                </CollectionsProvider>
              </GameProvider>
            </CoinsExpProvider>
          </ProfileProvider>
        </LanguageProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
