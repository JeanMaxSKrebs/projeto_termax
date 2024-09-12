import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions, StyleSheet } from 'react-native';

const RewardAnimation = ({ reward, startPosition, onAnimationEnd, maxOffset = 30 }) => {
    const animationRefs = useRef([]);

    // Função para gerar uma duração aleatória entre 1500 e 2500 milissegundos
    const getRandomDuration = () => {
        return Math.random() * (2500 - 1500) + 1500;
    };

    // Função para determinar o destino com base no tipo de recompensa
    const getDestination = () => {
        switch (reward.type) {
            case 'coins':
                return { x: 5, y: 10 };
            case 'wordPoints':
                return { x: 290, y: 10 }; // Posições que você mencionou
            case 'exp':
                return { x: 100, y: 10 };
            case 'key':
                return { x: 150, y: 10 };
            case 'specialKey':
                return { x: 220, y: 10 };
            default:
                return { x: 250, y: -210 }; // Padrão, caso o tipo não seja encontrado
        }
    };

    const startAnimation = (index, initialPosition) => {
        const animation = new Animated.ValueXY(initialPosition);
        animationRefs.current.push(animation);

        const destination = getDestination(); // Obter o destino com base no tipo de recompensa
        const animationDuration = getRandomDuration(); // Gerar duração aleatória

        Animated.timing(animation, {
            toValue: destination,
            duration: animationDuration,
            useNativeDriver: true,
        }).start(() => {
            animationRefs.current.splice(animationRefs.current.indexOf(animation), 1);
            if (animationRefs.current.length === 0) {
                onAnimationEnd && onAnimationEnd();
            }
        });
    };

    useEffect(() => {
        if (reward && startPosition) {
            animationRefs.current.forEach(animation => {
                animation.stopAnimation();
                animation.setValue(getDestination()); // Reinicializa para o destino correto
            });
            animationRefs.current.length = 0;

            const { amount } = reward;
            const numberOfAnimations = Math.ceil(amount / (reward.type === 'coins' || reward.type === 'wordPoints' ? 10 : 1));

            for (let i = 0; i < numberOfAnimations; i++) {
                const initialPosition = {
                    x: startPosition.x + Math.random() * maxOffset - maxOffset / 2, // Varie horizontalmente
                    y: startPosition.y + Math.random() * maxOffset - maxOffset / 2, // Varie verticalmente
                };

                startAnimation(i, initialPosition);
            }
        }
    }, [reward, startPosition, onAnimationEnd]);

    if (!reward || !startPosition) {
        return null;
    }

    let rewardImage;
    switch (reward.type) {
        case 'coins':
            rewardImage = require('../../../assets/images/resources/coin/coin.png');
            break;
        case 'exp':
            rewardImage = require('../../../assets/images/resources/exp/exp.png');
            break;
        case 'wordPoints':
            rewardImage = require('../../../assets/images/resources/wordpoint/wordpoint.png');
            break;
        case 'key':
            rewardImage = require('../../../assets/images/resources/key/key.png');
            break;
        case 'specialKey':
            rewardImage = require('../../../assets/images/resources/specialkey/specialkey.png');
            break;
        default:
            return null;
    }

    return (
        <View style={styles.container}>
            {animationRefs.current.map((animation, index) => (
                <Animated.View
                    key={index}
                    style={[styles.rewardContainer, { transform: animation.getTranslateTransform() }]}
                >
                    <Image source={rewardImage} style={styles.rewardImage} />
                </Animated.View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    rewardContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardImage: {
        width: 30,
        height: 25,
    },
});

export default RewardAnimation;
