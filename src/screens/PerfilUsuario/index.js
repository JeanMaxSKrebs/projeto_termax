import React, {useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Body, TextInput, Text} from './styles';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {ProfileContext} from '../../context/ProfileProvider';
import {CommonActions} from '@react-navigation/native';

const PerfilUsuario = ({navigation}) => {
  const {user} = useContext(AuthUserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del, updatePassword} = useContext(ProfileContext);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

  function salvar() {
    if (oldPass === '' && newPass === '' && newPassConfirm === '') {
      Alert.alert(
        'Fique Esperto!',
        'Você tem certeza que deseja alterar estes dados?',
        [
          {
            text: 'Não',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              setLoading(true);
              /*
                Para evitar que dados sensíveis sejam enviados para
                o Firestore, um novo objeto é criado.
              */
              let localUser = {};
              localUser.uid = user.uid;
              localUser.nome = nome;
              if (await save(localUser)) {
                ToastAndroid.show(
                  'Show! Você salvou os dados com sucesso.',
                  ToastAndroid.LONG,
                );
              } else {
                ToastAndroid.show('Ops! Erro ao salvar.', ToastAndroid.LONG);
              }
              setLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }
  }

  function excluir() {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir permanentemente sua conta?\nSe você confirmar essa operação seus dados serão excluídos e você não terá mais acesso ao app.',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            Alert.alert(
              'Que pena :-(',
              `Você tem certeza que deseja excluir seu perfil de usuário ${user.email}?`,
              [
                {
                  text: 'Não',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Sim',
                  onPress: async () => {
                    setLoading(true);
                    if (await del(user.uid)) {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{name: 'AuthStack'}],
                        }),
                      );
                    } else {
                      ToastAndroid.show(
                        'Ops! Erro ao exlcluir sua conta. Contate o administrador.',
                        ToastAndroid.LONG,
                      );
                    }
                    setLoading(false);
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }

  function alterarSenha() {
    if (oldPass !== '' && newPass !== '' && newPassConfirm !== '') {
      if (oldPass !== user.senha) {
        Alert.alert('Veja!', 'A senha antiga é diferente da senha digitada.');
      } else if (newPass === newPassConfirm) {
        //TODO: fazer validar senha forte (uma caixa alta, um número, um caractere especial, tam. mín. 6)
        Alert.alert('Ok!', 'Por favor, confirme a alteração de sua senha.', [
          {
            text: 'Não',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              if (await updatePassword(newPass)) {
                ToastAndroid.show(
                  'Show! Você alterou sua senha com sucesso.',
                  ToastAndroid.LONG,
                );
                navigation.goBack();
              } else {
                ToastAndroid.show(
                  'Ops! Erro ao alterar sua senha. Contate o administrador.',
                  ToastAndroid.LONG,
                );
              }
            },
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('Ops!', 'A nova senha é diferente da confirmação');
      }
    } else {
      Alert.alert('Veja!', 'Preencha os campos relativos a senha');
    }
  }

  return (
    <Body>
      <Text style={{ color: 'black' }}>Perfil do Usuário</Text>
      <TextInput
        placeholderTextColor="gray"
        value={nome}
        placeholder="nome"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholderTextColor="gray"
        value={email}
        editable={false}
        placeholder="email"
        keyboardType="default"
        returnKeyType="next"
      />
      <TextInput
        placeholderTextColor="gray"
        value={oldPass}
        secureTextEntry={true}
        placeholder="Senha antiga"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setOldPass(t)}
      />
      <TextInput
        placeholderTextColor="gray"
        value={newPass}
        secureTextEntry={true}
        placeholder="Nova senha (mín. 6 caracteres)"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNewPass(t)}
      />
      <TextInput
        placeholderTextColor="gray"
        value={newPassConfirm}
        secureTextEntry={true}
        placeholder="Confirme a nova senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNewPassConfirm(t)}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      <MeuButton texto="Alterar Senha" onClick={alterarSenha} />
      <DeleteButton texto="Excluir Conta" onClick={excluir} />
      {loading && <Loading />}
    </Body>
  );
};

export default PerfilUsuario;
