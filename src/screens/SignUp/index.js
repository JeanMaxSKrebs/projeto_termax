import React, { useState } from 'react';
import { Alert } from 'react-native';
import MeuButton from '../../components/MeuButton';
import { Body, TextInput } from './styles';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { initialCollections } from '../../utils/collectionUtils.js';

const SignUp = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const cadastrar = () => {
        if (nome && email && senha && confirmaSenha) {
            if (senha === confirmaSenha) {
                auth()
                    .createUserWithEmailAndPassword(email, senha)
                    .then(() => {
                        const userFirebase = auth().currentUser;
                        const user = { nome, email };

                        firestore()
                            .collection('users')
                            .doc(userFirebase.uid)
                            .set(user)
                            .then(() => {
                                const initialCollectionsData = initialCollections();

                                firestore()
                                    .collection('users')
                                    .doc(userFirebase.uid)
                                    .collection('collections')
                                    .doc('collectionStatus')
                                    .set(initialCollectionsData)
                                    .then(() => {
                                        userFirebase.sendEmailVerification().then(() => {
                                            Alert.alert('Informação', `Foi enviado um email para: ${email} para verificação`);
                                            navigation.dispatch(
                                                CommonActions.reset({
                                                    index: 0,
                                                    routes: [{ name: 'SignIn' }],
                                                }),
                                            );
                                        }).catch((e) => console.log('SignUp: enviar email:' + e));
                                    }).catch((e) => console.log('SignUp: erro ao salvar coleções:' + e));
                            }).catch((e) => console.log('SignUp: erro ao salvar usuário:' + e));
                    })
                    .catch((e) => {
                        console.log('SignUp: erro ao cadastrar:' + e + " " + e.code);
                        switch (e.code) {
                            case 'auth/email-already-in-use':
                                Alert.alert('Erro', 'Email já está em uso.');
                                break;
                            case 'auth/operation-not-allowed':
                                Alert.alert('Erro', 'Problemas ao fazer o cadastro.');
                                break;
                            case 'auth/invalid-email':
                                Alert.alert('Erro', 'Email inválido.');
                                break;
                            case 'auth/weak-password':
                                Alert.alert('Erro', 'Senha fraca. Digite uma senha forte.');
                                break;
                        }
                    });
            } else {
                Alert.alert('Erro', 'As senhas diferem.');
            }
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };

    return (
        <Body>
            <TextInput
                placeholder="Nome Completo"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                keyboardType="default"
                returnKeyType="next"
                secureTextEntry={true}
                onChangeText={setSenha}
            />
            <TextInput
                placeholder="Confirmar Senha"
                keyboardType="default"
                returnKeyType="send"
                secureTextEntry={true}
                onChangeText={setConfirmaSenha}
            />
            <MeuButton texto={"Cadastrar"} onClick={cadastrar} />
        </Body>
    );
};

export default SignUp;
