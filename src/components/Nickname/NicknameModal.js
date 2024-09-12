import React, { useContext } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import InputNickname from './InputNickname';
import { COLORS } from '../../assets/colors';
import { useLanguage } from '../../context/LanguageProvider';
import { AuthUserContext } from '../../context/AuthUserProvider'; // Importar o contexto de autenticação
import firestore from '@react-native-firebase/firestore';

const NicknameModal = ({ visible, onClose }) => {
  const { t } = useLanguage();
  const { user } = useContext(AuthUserContext); // Acessar o contexto de autenticação

  const handleNicknameSubmit = async (nickname) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }
      const userRef = firestore().collection('users').doc(user.uid);
      await userRef.update({ nickname });
      alert(t('Apelido salvo com sucesso!'));
      onClose();
    } catch (error) {
      console.error('Erro ao salvar apelido: ', error);
      alert(t('Erro ao salvar apelido.'));
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* <Text style={styles.title}>{t('Digite seu apelido')}</Text> */}
          <InputNickname onSubmit={handleNicknameSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    padding: 20,
    backgroundColor: COLORS.background || 'white', // Utilize uma cor de fundo definida em COLORS
    borderRadius: 10,
    alignItems: 'center', // Centralize os itens dentro do modalContent
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark || '#000', // Adicione uma cor padrão se COLORS.primaryDark não estiver definido
    marginBottom: 15, // Adiciona um espaço entre o título e o InputNickname
  },
});

export default NicknameModal;
