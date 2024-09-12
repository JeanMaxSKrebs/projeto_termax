import React, { createContext, useState, useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuário que está na sessão

  useEffect(() => {
    retrieveUserSession();
  }, []);

  /**
   * Armazena a sessão do usuário de forma criptografada
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise<boolean>} - Retorna true se a sessão foi armazenada com sucesso
   */
  const storeUserSession = async (email, senha) => {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email,
          senha,
        })
      );
      return true;
    } catch (error) {
      console.error('Erro ao armazenar a sessão do usuário: ', error);
      return false;
    }
  };

  /**
   * Recupera a sessão do usuário armazenada de forma criptografada
   */
  const retrieveUserSession = async () => {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      if (session) {
        const { email, senha } = JSON.parse(session);
        signIn(email, senha);
      }
    } catch (error) {
      console.error('Erro ao recuperar a sessão do usuário: ', error);
    }
  };

  /**
   * Registra um novo usuário
   * @param {Object} localUser - Objeto contendo as informações do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise<string>} - Retorna 'ok' se o cadastro foi realizado com sucesso ou uma mensagem de erro
   */
  const signUp = async (localUser, senha) => {
    try {
      await auth().createUserWithEmailAndPassword(localUser.email, senha);
      await auth().currentUser.sendEmailVerification();
      await firestore().collection('users').doc(auth().currentUser.uid).set(localUser);
      return 'ok';
    } catch (error) {
      return handleAuthError(error);
    }
  };

  /**
   * Realiza o login do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise<string>} - Retorna 'ok' se o login foi realizado com sucesso ou uma mensagem de erro
   */
  const signIn = async (email, senha) => {
    try {
      await auth().signInWithEmailAndPassword(email, senha);
      if (!auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await storeUserSession(email, senha);
      const userData = await getUserData(senha);
      return userData ? 'ok' : 'Problemas ao buscar o seu perfil. Contate o administrador.';
    } catch (error) {
      return handleAuthError(error);
    }
  };

  /**
   * Envia um email para resetar a senha do usuário
   * @param {string} email - Email do usuário
   * @returns {Promise<string>} - Retorna 'ok' se o email foi enviado com sucesso ou uma mensagem de erro
   */
  const forgotPass = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (error) {
      return handleAuthError(error);
    }
  };

  /**
   * Realiza o logout do usuário
   * @returns {Promise<boolean>} - Retorna true se o logout foi realizado com sucesso
   */
  const signOut = async () => {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (error) {
      console.error('Erro ao realizar logout: ', error);
      return false;
    }
  };

  /**
   * Busca os detalhes do usuário no Firestore e armazena no estado
   * @param {string} senha - Senha do usuário
   * @returns {Promise<Object|null>} - Retorna os dados do usuário ou null se não encontrados
   */
  const getUserData = async (senha) => {
    try {
      const userDoc = await firestore().collection('users').doc(auth().currentUser.uid).get();
      if (userDoc.exists) {
        const userData = { ...userDoc.data(), uid: auth().currentUser.uid, senha };
        setUser(userData);
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário: ', error);
      return null;
    }
  };

  /**
   * Manipula os erros de autenticação e retorna uma mensagem amigável
   * @param {Object} error - Objeto de erro retornado pela autenticação
   * @returns {string} - Mensagem de erro amigável
   */
  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador.';
    }
  };

  return (
    <AuthUserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        retrieveUserSession,
        forgotPass,
        signOut,
        getUserData,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
