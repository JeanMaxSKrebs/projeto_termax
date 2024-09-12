import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { COLORS } from '../assets/colors';
import MeuButton from '../components/MeuButton';
import MeuButtonMetade from '../components/MeuButtonMetade';
import LogoutButton from '../components/LogoutButton';
import { CommonActions } from '@react-navigation/native';
import Coins from '../components/Jogo/resources/Coins';
import Exp from '../components/Jogo/resources/Exp';
import Keys from '../components/Jogo/resources/Keys';
import SpecialKeys from '../components/Jogo/resources/SpecialKeys';
import WordPoints from '../components/Jogo/resources/WordPoints';
import { AuthUserContext } from '../context/AuthUserProvider';
import firestore from '@react-native-firebase/firestore';
import { initialCollections } from '../utils/collectionUtils';
import { CollectionsContext } from '../context/CollectionsProvider';
import { useLanguage } from '../context/LanguageProvider';

const Home = ({ navigation }) => {
  const { user } = useContext(AuthUserContext);
  const { collections } = useContext(CollectionsContext);
  const { t } = useLanguage();

  useEffect(() => {
    const setupUserData = async () => {
      if (user) {
        const userDocRef = firestore().collection('users').doc(user.uid);
    
        try {
          const userDoc = await userDocRef.get();
    
          if (userDoc.exists) {
            const userData = userDoc.data();
            // Verifica se cada campo existe, caso contrário cria com valores iniciais
            const updatedData = {
              coins: userData.coins ?? 100, // Valor inicial para coins
              exp: userData.exp ?? 0, // Valor inicial para exp
              specialKeys: userData.specialKeys ?? 1, // Valor inicial para specialKeys
              keys: userData.keys ?? 1, // Valor inicial para keys
              wordPoints: userData.wordPoints ?? 100, // Valor inicial para wordPoints
            };
    
            // Atualiza o documento do usuário com os valores padrão, se necessário
            await userDocRef.set(updatedData, { merge: true });
          } else {
            // Cria o documento do usuário com valores iniciais se não existir
            await userDocRef.set({
              coins: 100,
              exp: 0,
              specialKeys: 1,
              keys: 1,
              wordPoints: 100,
            });
          }
        } catch (error) {
          console.error('Error setting up user data:', error);
        }
      }
    };
    
    const setupCollections = async () => {
      if (user) {
        try {
          const userCollectionsRef = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('collections')
            .doc('collectionStatus');
          const userDoc = await userCollectionsRef.get();

          if (userDoc.exists) {
            let collectionsData = userDoc.data();
            const newCollections = initialCollections();

            // Mescla as coleções existentes com as iniciais
            const mergedCollections = { ...newCollections };
            for (const [key, value] of Object.entries(collectionsData)) {
              if (mergedCollections[key]) {
                mergedCollections[key] = {
                  ...mergedCollections[key],
                  ...value,
                };

                // Adiciona novas partes com have: false
                for (const partKey in mergedCollections[key].parts) {
                  if (!value.parts || !value.parts[partKey]) {
                    mergedCollections[key].parts[partKey] = {
                      have: false,
                    };
                  }
                }
                mergedCollections[key].quantityParts = Object.keys(newCollections[key].parts).length;
              }
            }

            // Remove campos undefined
            for (const [key, value] of Object.entries(mergedCollections)) {
              for (const field in value) {
                if (value[field] === undefined) {
                  delete value[field];
                }
              }
            }

            // Salva as coleções mescladas de volta no Firestore
            await userCollectionsRef.set(mergedCollections);
          } else {
            // Se não existir, cria com as coleções iniciais
            await userCollectionsRef.set(initialCollections());
          }
        } catch (error) {
          console.error('Error setting up collections:', error);
        }
      }
    };

    setupUserData();
    setupCollections();

    navigation.setOptions({
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: COLORS.accentSecondary },
      headerTintColor: COLORS.black,
      title: t(''), // Título vazio para centralizar
      headerTitle: () => (
        <View style={styles.headerCenterContainer}>
          <Coins style={styles.icon} />
          <Exp style={styles.icon} />
          <Keys style={styles.icon} />
          <SpecialKeys style={styles.icon} />
          <WordPoints style={styles.icon} />
        </View>
      ),
    });
  }, [user]);

  const routeFor = (dados) => {
    switch (dados[0]) {
      case 'LanguageSelection':
        navigation.dispatch(
          CommonActions.navigate({
            name: dados[0],
            params: {},
          }),
        );
        break;
      case 'GameTypeSelection':
        navigation.dispatch(
          CommonActions.navigate({
            name: dados[0],
            params: { collections },
          }),
        );
        break;
      case 'Colecoes':
        navigation.dispatch(
          CommonActions.navigate({
            name: dados[0],
            params: { collections },
          }),
        );
        break;
      case 'EscolhaPalavra':
        navigation.dispatch(
          CommonActions.navigate({
            name: dados[0],
            params: { collections },
          }),
        );
        break;
      case 'Info':
        navigation.dispatch(
          CommonActions.navigate({
            name: dados[0],
            params: {},
          }),
        );
        break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Manutencao',
            params: { value: dados[0] },
          }),
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>TERMAX</Text>
      {user ? (
        <Text style={styles.userText}>Usuário: {user.email}</Text>
      ) : (
        <Text style={styles.userText}>Usuário não encontrado</Text>
      )}

      <MeuButton
        cor={COLORS.accentSecondary}
        style={styles.button}
        texto={'JOGAR'}
        onClick={() => routeFor(['GameTypeSelection'])}
      />
      <MeuButton
        cor={COLORS.accentSecondary}
        style={styles.button}
        texto={'COLEÇÕES'}
        onClick={() => routeFor(['Colecoes'])}
      />
      <MeuButton
        cor={COLORS.accentSecondary}
        style={styles.button}
        texto={'DESAFIE AMIGOS'}
        onClick={() => routeFor(['EscolhaPalavra'])}
      />
      <MeuButton
        cor={COLORS.accentSecondary}
        style={styles.button}
        texto={'IDIOMA'}
        onClick={() => routeFor(['LanguageSelection'])}
      />
      <MeuButtonMetade
        cor={COLORS.accentSecondary}
        style={styles.button}
        texto={'INFORMAÇÕES'}
        onClick={() => routeFor(['Info'])}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginRight: 10, // Espaçamento entre o botão de logout e a borda direita
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  texto: {
    textAlign: 'center',
    fontSize: 50,
    color: COLORS.primaryDark,
    marginBottom: 30,
  },
  userText: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    width: 16, // Ajuste o tamanho para melhor visibilidade
    height: 16, // Ajuste o tamanho para melhor visibilidade
    marginHorizontal: 2, // Ajuste o espaçamento entre os ícones
  },
});
