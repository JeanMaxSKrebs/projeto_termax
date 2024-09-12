import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import RewardAnimation from '../../components/Jogo/resources/RewardAnimation';
import { COLORS } from '../../assets/colors';

const ChestOptionAnimation = ({ type, onAnimationEnd, reward }) => {
    const animationRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false); // Novo estado para controlar a animação
    const [rewardAnimationFinished, setRewardAnimationFinished] = useState(false); // Novo estado para RewardAnimation
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        if (!animationStarted && reward) {
            setAnimationStarted(true); // Marca a animação como iniciada

            // Inicia a animação do baú
            if (animationRef.current) {
                animationRef.current.play();
            }
        }
    }, [animationStarted, reward]);

    const handleAnimationFinish = () => {
        if (onAnimationEnd) {
            onAnimationEnd();
        }
    };

    const handleRewardAnimationFinish = () => {
        setRewardAnimationFinished(true);
    };

    const getAnimationSource = () => {
        switch (type) {
            case 'specialKeys':
                return require('../../assets/images/resources/chest/specialChestOpening.json');
            case 'normalKeys':
                return require('../../assets/images/resources/chest/chestOpening.json');
            case 'freeKeys':
                return require('../../assets/images/resources/chest/chestOpening.json');
            default:
                return require('../../assets/images/resources/chest/chestOpening.json');
        }
    };

    const getInfoText = () => {
        switch (type) {
            case 'specialKeys':
                return 'Abrindo Baú Especial...';
            case 'normalKeys':
                return 'Abrindo Baú Normal...';
            case 'freeKeys':
                return 'Abrindo Baú Gratuito...';
            default:
                return 'Abrindo Baú...';
        }
    };

    return (
        <Modal visible={true} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <Text style={styles.infoText}>{getInfoText()}</Text>
                    <LottieView
                        ref={animationRef}
                        source={getAnimationSource()}
                        autoPlay
                        loop={false}
                        onAnimationFinish={rewardAnimationFinished && handleAnimationFinish}
                        style={styles.animation}
                    />
                    {reward && (
                        <Text  style={[
                            styles.rewardAmount,
                            { color: reward.type === 'coins' ? COLORS.coins : COLORS.wordPoints }
                          ]} >
                            + {reward.amount} {reward.type}
                        </Text>
                    )}

                </View>
            </View>

            {reward && animationStarted && (
                <RewardAnimation
                    reward={reward}
                    startPosition={{ x: (width / 2), y: (height / 2) }} // Posição inicial padrão
                    onAnimationEnd={handleRewardAnimationFinish}
                />
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#6E5050',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
    infoText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
});

export default ChestOptionAnimation;
