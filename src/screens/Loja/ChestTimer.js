import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChestOption from './ChestOption';

const ChestTimer = ({ onPress, keys, timeRemaining, setTimeRemaining }) => {
    const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;

    useEffect(() => {
        const checkLastOpened = async () => {
            const lastOpened = await AsyncStorage.getItem('lastOpened');
            const now = Date.now();

            if (lastOpened) {
                const timePassed = now - parseInt(lastOpened);

                if (timePassed >= THREE_HOURS_IN_MS) {
                    setTimeRemaining(null); // Baú pode ser aberto gratuitamente
                } else {
                    setTimeRemaining(THREE_HOURS_IN_MS - timePassed);
                }
            } else {
                setTimeRemaining(null); // Sem registro, pode abrir gratuitamente
            }
        };

        checkLastOpened();

        const interval = setInterval(() => {
            checkLastOpened();
        }, 1000); // Atualiza o contador a cada segundo

        return () => clearInterval(interval);
    }, [setTimeRemaining]);

    const handleOpenChest = async () => {
        if (timeRemaining === null) {
            const currentTime = Date.now();
            await AsyncStorage.setItem('lastOpened', currentTime.toString());
            onPress(); // Chama a função de abrir baú
        }
    };

    const formatTime = (milliseconds) => {
        if (milliseconds === null) {
            return 'Agora!';
        }
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <View style={styles.container}>
            {timeRemaining === null ? (
                <ChestOption
                    onPress={handleOpenChest}
                    type="freeChest" // Ajuste o tipo conforme necessário
                />
            ) : (
                <Text style={styles.timerText}>
                    {t('Próximo baú gratuito em:')} {formatTime(timeRemaining)}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChestTimer;
