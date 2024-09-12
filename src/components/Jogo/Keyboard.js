import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Keyboard = ({ onPressLetter, onPressSpace, onPressBackspace, onPressEnter }) => {
    const topRow = 'QWERTYUIOP'.split('');
    const middleRow = 'ASDFGHJKL'.split('');
    const bottomRow = 'ZXCVBNM'.split('');

    return (
        <View style={styles.keyboardContainer}>
            <View style={styles.row}>
                {topRow.map((letter) => (
                    <TouchableOpacity key={letter} style={styles.key} onPress={() => onPressLetter(letter)}>
                        <Text style={styles.keyText}>{letter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {middleRow.map((letter) => (
                    <TouchableOpacity key={letter} style={styles.key} onPress={() => onPressLetter(letter)}>
                        <Text style={styles.keyText}>{letter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {bottomRow.map((letter) => (
                    <TouchableOpacity key={letter} style={styles.key} onPress={() => onPressLetter(letter)}>
                        <Text style={styles.keyText}>{letter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.key, styles.largeKey]} onPress={onPressSpace}>
                    <Text style={styles.keyText}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.key, styles.doubleKey]} onPress={onPressBackspace}>
                    <Text style={styles.keyText}>⌫</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.key, styles.doubleKey]} onPress={onPressEnter}>
                    <Text style={styles.keyText}>→</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    key: {
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        margin: 2,
        left: 6,
        borderRadius: 5,
    },
    keyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    largeKey: {
        width: 150,
    },
    doubleKey: {
        width: 60,
    },
});

export default Keyboard;
