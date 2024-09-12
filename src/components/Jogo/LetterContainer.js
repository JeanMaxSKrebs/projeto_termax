import React from 'react';
import { Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LetterContainer = ({ letter, status, onPress, isSelected, clickable, color, maxLetterSize }) => {
    // Calcula a largura baseada no tamanho máximo da letra
    const validMaxLetterSize = typeof maxLetterSize === 'number' && maxLetterSize > 0 ? maxLetterSize : 20;
    const containerSize = validMaxLetterSize * 1.5; // Define o tamanho do contêiner baseado no tamanho máximo da letra

    // Determina a cor de fundo
    const backgroundColor = color || styles[status]?.backgroundColor || 'gray';

    return (
        <TouchableOpacity
            style={[
                styles.letterContainer,
                { width: containerSize, height: containerSize, backgroundColor },
                isSelected && styles.selected
            ]}
            onPress={clickable ? onPress : null}
            disabled={!clickable}
        >
            <Text style={[styles.letterText, { fontSize: validMaxLetterSize }]}>
                {letter.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    letterContainer: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2, // Espaço entre letras
    },
    letterText: {
        fontWeight: 'bold',
        color: 'black',
    },
    correct: {
        backgroundColor: 'green',
    },
    misplaced: {
        backgroundColor: 'yellow',
    },
    wrong: {
        backgroundColor: 'gray',
    },
    selected: {
        borderColor: 'black', // Cor da borda quando selecionado
        borderWidth: 2,      // Largura da borda
    },
    disabled: {
        backgroundColor: 'lightgray', // Cor para indicar que o componente está desabilitado
    },
});

export default LetterContainer;
