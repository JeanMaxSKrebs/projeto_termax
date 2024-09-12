import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Fireworks from './Fireworks'; // Ajuste o caminho conforme necessário

const MultipleFireworks = ({ count, duration, onAnimationComplete }) => {
    const [fireworks, setFireworks] = useState([]);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        const newFireworks = [];

        for (let i = 0; i < count; i++) {
            newFireworks.push({
                x: Math.random() * width,
                y: Math.random() * height,
            });
        }

        setFireworks(newFireworks);

        // Marcar a animação como completa após a duração
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, duration);

        return () => clearTimeout(timer);
    }, [count, duration]);

    useEffect(() => {
        if (animationComplete) {
            setFireworks([]);
            if (onAnimationComplete) {
                onAnimationComplete();
            }
        }
    }, [animationComplete]);

    return (
        <View style={StyleSheet.absoluteFill}>
            {fireworks.map((firework, index) => (
                <Fireworks key={index} x={firework.x} y={firework.y} />
            ))}
        </View>
    );
};

export default MultipleFireworks;
