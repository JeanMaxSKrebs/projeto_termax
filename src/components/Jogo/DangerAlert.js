import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDangerColor } from '../../theme/colors'; // Ajuste o caminho conforme necessário

const DangerAlert = ({ level, maxLevel, message, children }) => {
    // Obtém a cor baseada no nível de perigo
    const color = getDangerColor(level, maxLevel);

    return (
        <View style={[styles.container, { borderColor: "gray", backgroundColor: color}]}>
            {message ?
                <Text style={styles.message}>{message}</Text>
                :
                <>{children}</>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 5,
        borderRadius: 10,
        marginVertical: 5,
    },
    message: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DangerAlert;
