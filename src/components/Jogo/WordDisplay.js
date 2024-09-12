import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LetterContainer from './LetterContainer'; // ajuste o caminho conforme necessário
import { getDangerColor } from '../../theme/colors'; // Certifique-se de que essa função está corretamente importada

const WordDisplay = ({ letters, wordLength, onLetterPress, selectedIndex, clickable = false, colorMixed, attemptsLeft }) => {
    // Calcula o tamanho máximo da letra baseado na largura da tela e número de letras
    const width = Dimensions.get('window').width;
    const letterSize = Math.floor((width) / wordLength * 0.3);
    const adjustedLetterSize = Math.max(18, Math.min(letterSize, 30));

    return (
        <View style={styles.wordDisplay}>
            {letters.map((letter, index) => {
                const color = colorMixed ? getDangerColor(attemptsLeft, wordLength) : null;
                return (
                    <LetterContainer
                        key={index}
                        letter={letter === '_' ? '' : letter}
                        status="input" // Verifique se este status está correto para suas necessidades
                        color={color}
                        wordLength={wordLength}
                        onPress={() => onLetterPress(index)}
                        isSelected={selectedIndex === index}
                        clickable={clickable}
                        maxLetterSize={adjustedLetterSize} // Passa o tamanho ajustado da letra
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    wordDisplay: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', // Centraliza verticalmente
        marginVertical: 10,
        marginHorizontal: -10
    },
});

export default WordDisplay;
