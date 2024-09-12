import React, { createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AuthUserContext } from './AuthUserProvider';

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const { user, signOut } = useContext(AuthUserContext);

  const save = async (user) => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({ nome: user.nome }, { merge: true });

      //renew user in session
      if (await getUser(user.pass)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error('Erro ao salvar perfil: ', e);
      return false;
    }
  };

  const del = async (uid) => {
    try {
      await firestore().collection('users').doc(uid).delete();
      await auth().currentUser.delete();
      await signOut();
      return true;
    } catch (e) {
      console.error('Erro ao excluir usuário: ', e);
      return false;
    }
  };

  async function updatePassword(pass) {
    try {
      await auth().currentUser.updatePassword(pass);
      return true;
    } catch (e) {
      console.error('Erro ao atualizar a senha: ', e);
      return false;
    }
  }

  const fetchNickname = async () => {
    try {
      if (!user) return null;

      const doc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      if (doc.exists) {
        return doc.data().nickname;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar apelido: ', error);
      return null;
    }
  };

  const updateNickname = async (nickname) => {
    try {
      if (!user) return 'Usuário não autenticado.';

      await firestore()
        .collection('users')
        .doc(user.uid)
        .doc('nickname')
        .set({ nickname });

      return 'Apelido atualizado com sucesso.';
    } catch (error) {
      console.error('Erro ao atualizar apelido: ', error);
      return 'Erro ao atualizar apelido.';
    }
  };

  const addNickname = async (nickname) => {
    try {
      if (!user) return 'Usuário não autenticado.';

      await firestore()
        .collection('users')
        .doc(user.uid)
        .doc('nickname')
        .set({ nickname });

      return 'Apelido adicionado com sucesso.';
    } catch (error) {
      console.error('Erro ao adicionar apelido: ', error);
      return 'Erro ao adicionar apelido.';
    }
  };

  const deleteNickname = async () => {
    try {
      if (!user) return 'Usuário não autenticado.';

      await firestore()
        .collection('users')
        .doc(user.uid)
        .doc('nickname')
        .delete();

      return 'Apelido excluído com sucesso.';
    } catch (error) {
      console.error('Erro ao excluir apelido: ', error);
      return 'Erro ao excluir apelido.';
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        fetchNickname, updateNickname, addNickname, deleteNickname,
        save, del, updatePassword
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
