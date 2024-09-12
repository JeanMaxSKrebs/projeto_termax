import React, { useState } from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';
import { View } from '../screens/Orcamento/styles';

const MeuButtonCidade = props => {
    const width = props.width || 'auto';
    const color = props.cor || COLORS.primaryShadow;
    const disable = props.disabled || false;

    const [ativo, setAtivo] = useState(false);

    return (
        <View style={{
            marginTop: 0,
        }} >
            <TouchableHighlight disabled={disable}
                style={[{ width },
                disable && styles.disabledButton
                ]}
                underlayColor={COLORS.primaryShadow}
                onPress={() => { props.onClick(), setAtivo(!ativo) }}>
                {/* <View> */}
                <View style={{
                    marginBottom: 0,
                    backgroundColor: color
                }}>
                    {ativo
                        ? <Text style={styles.texto}>▲  {props.texto}  ▲</Text>
                        : <Text style={styles.texto}>▼  {props.texto}  ▼</Text>
                    }
                </View>
                {/* <View style={{ backgroundColor: color }}> */}
                {/* <View style={{
                        backgroundColor: color
                    }}>
                        <Text style={styles.seta}>▼</Text>
                    </View> */}

                {/* </View> */}
            </TouchableHighlight>
        </View >
    );
};

export default MeuButtonCidade;

const styles = StyleSheet.create({
    texto: {
        fontSize: 16,
        color: COLORS.secondary,
        textAlign: 'center',
        padding: 5,
    },
    seta: {
        fontSize: 8,
        color: COLORS.secondary,
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 5,
        paddingHorizontal: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 0,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: COLORS.tertiary, // Cor para botão desabilitado
        opacity: 0.5, // Reduz a opacidade para indicar que está desabilitado
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    disabledText: {
        color: COLORS.background, // Cor do texto para botão desabilitado
    },
});
