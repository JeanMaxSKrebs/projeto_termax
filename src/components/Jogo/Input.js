import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Keyboard from './Keyboard'; // ajuste o caminho conforme necessário
import WordDisplay from './WordDisplay'; // ajuste o caminho conforme necessário

const Input = ({ value, onChangeText, wordLength = 0, onPressEnter }) => {
    const [text, setText] = useState(value);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (typeof wordLength === 'number' && wordLength > 0) {
            const updatedText = text.split('').concat(Array(Math.max(0, wordLength - text.length)).fill('_'));
            const firstEmptyIndex = updatedText.indexOf('_');
            setSelectedIndex(firstEmptyIndex !== -1 ? firstEmptyIndex : (updatedText.length - 1));
        } else {
            console.error('Invalid wordLength:', wordLength);
        }
    }, [wordLength, text]);

    if (typeof wordLength !== 'number' || wordLength <= 0) {
        return null; // Retorna null se wordLength for inválido
    }

    const correctGuesses = text.split('').concat(Array(Math.max(0, wordLength - text.length)).fill('_'));

    const handlePressEnter = () => {

        if (onPressEnter) {
            onPressEnter(); // Chama a função onPressEnter passada como prop
            setText('');
            setSelectedIndex(0);
        }
    };

    const handlePressLetter = (letter) => {


        const updatedText = correctGuesses.slice();
        if (selectedIndex !== null && selectedIndex < wordLength) {
            updatedText[selectedIndex] = letter;
            const newText = updatedText.join('');
            setText(newText);
            onChangeText(newText);

            // Move to the next empty index or to the next index if no empty indices are available
            const nextEmptyIndex = updatedText.indexOf('_', selectedIndex + 1);
            if (nextEmptyIndex !== -1) {
                setSelectedIndex(nextEmptyIndex);
            } else if (text.length < wordLength) {
                setSelectedIndex(selectedIndex + 1);
            } else {
                setSelectedIndex(null); // Remove o índice se a palavra estiver cheia
            }
        }
    };

    const handlePressSpace = () => {
        if (selectedIndex !== null && selectedIndex < wordLength) {
            const updatedText = correctGuesses.slice();
            updatedText[selectedIndex] = '_';
            const newText = updatedText.join('');
            setText(newText);
            onChangeText(newText);

            const nextEmptyIndex = updatedText.indexOf('_', selectedIndex + 1);
            setSelectedIndex(nextEmptyIndex !== -1 ? nextEmptyIndex : null);
        }
    };

    const handlePressBackspace = () => {
        if (selectedIndex !== null) {
            const updatedText = correctGuesses.slice();
    
            if (updatedText[selectedIndex] !== '_') {
                // Caso haja uma letra no índice selecionado
                updatedText[selectedIndex] = '_';
                const newText = updatedText.join('');
                setText(newText);
                onChangeText(newText);
    
                // Move para o índice vazio anterior ou para o índice anterior se não houver índices vazios
                const previousEmptyIndex = updatedText.lastIndexOf('_', selectedIndex - 1);
                setSelectedIndex(previousEmptyIndex !== -1 ? previousEmptyIndex : (selectedIndex - 1 >= 0 ? selectedIndex - 1 : 0));
            } else {
                // Caso não haja uma letra no índice selecionado
                const previousIndex = selectedIndex - 1;
                if (previousIndex >= 0) {
                    // Move para o índice anterior se possível
                    setSelectedIndex(previousIndex);
                } else {
                    // Caso esteja no início, talvez queira configurar o índice para o último item ou remover a seleção
                    setSelectedIndex(null);
                }
            }
        } else {
            // Se não há índice selecionado, defina o índice para o último item que não seja vazio
            const lastNonEmptyIndex = correctGuesses.map((char, idx) => (char !== '_' ? idx : -1)).filter(idx => idx !== -1).pop();
            if (lastNonEmptyIndex !== undefined) {
                const updatedText = correctGuesses.slice();
                updatedText[lastNonEmptyIndex] = '_';
                const newText = updatedText.join('');
                setText(newText);
                onChangeText(newText);
    
                // Move para o índice vazio anterior ou para o último índice se não houver índices vazios
                const previousEmptyIndex = updatedText.lastIndexOf('_', lastNonEmptyIndex - 1);
                setSelectedIndex(previousEmptyIndex !== -1 ? previousEmptyIndex : null);
            }
        }
    };
    

    const handleLetterPress = (index) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <WordDisplay
                letters={correctGuesses}
                wordLength={wordLength}
                selectedIndex={selectedIndex}
                onLetterPress={handleLetterPress}
                clickable={true}
            />
            <Keyboard
                onPressEnter={handlePressEnter}
                onPressLetter={handlePressLetter}
                onPressSpace={handlePressSpace}
                onPressBackspace={handlePressBackspace}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});

export default Input;
