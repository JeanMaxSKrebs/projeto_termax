import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import MeuButton from '../../components/MeuButton';
import { CommonActions } from '@react-navigation/native';

const EscolhaPalavra = ({ navigation }) => {
    const [palavra, setPalavra] = useState('');

    const handleEscolherPalavra = () => {
        if (palavra.trim() !== '') {
            let palavraSelecionada = palavra.toLowerCase()
            setPalavra(palavra.toLowerCase());
            routeFor(['Jogo', palavraSelecionada])
        }
    };
    const routeFor = dados => {
        // console.log('a');
        // console.log(dados);
        switch (dados[0]) {
            case 'Jogo':

                navigation.dispatch(
                    CommonActions.navigate({
                        name: dados[0],
                        params: { palavraSelecionada: dados[1] },
                    }),
                );
                break;
            case 'EscolhaPalavra':

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
            <Text style={styles.texto}>Escolha uma Palavra</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPalavra(text)}
                value={palavra}
                placeholder="Digite a palavra"
            />
            <MeuButton texto="Enviar" onClick={handleEscolherPalavra} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    texto: {
        fontSize: 24,
        color: COLORS.primary,
        margin: 25
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default EscolhaPalavra;