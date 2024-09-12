import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { COLORS } from '../../assets/colors';
import Coins from '../../components/Jogo/resources/Coins';
import Keys from '../../components/Jogo/resources/Keys';
import SpecialKeys from '../../components/Jogo/resources/SpecialKeys';
import WordPoints from '../../components/Jogo/resources/WordPoints';
import { useLanguage } from '../../context/LanguageProvider';
import firestore from '@react-native-firebase/firestore';
import { AuthUserContext } from '../../context/AuthUserProvider';
import ChestOption from './ChestOption';
import ChestTimer from './ChestTimer';
import ChestOptionAnimation from './ChestOpeningAnimation';
import rewardsChest from '../../utils/Jogo/rewardsChest';

const Loja = ({ navigation }) => {
    const { user } = useContext(AuthUserContext);
    const { t } = useLanguage();
    const [keys, setKeys] = useState(0);
    const [specialKeys, setSpecialKeys] = useState(0);
    const [coins, setCoins] = useState(0);
    const [wordPoints, setWordPoints] = useState(0);
    const [selectedBau, setSelectedBau] = useState(null);
    const [reward, setReward] = useState(null);
    const [isChestOpening, setIsChestOpening] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: COLORS.accentSecondary },
            headerTintColor: COLORS.black,
            headerTitle: () => (
                <View style={styles.headerCenterContainer}>
                    <Coins style={styles.icon} />
                    <Keys style={styles.icon} />
                    <SpecialKeys style={styles.icon} />
                    <WordPoints style={styles.icon} />
                </View>
            ),
        });

        const unsubscribe = firestore().collection('users').doc(user.uid)
            .onSnapshot(snapshot => {
                const userData = snapshot.data();
                if (userData) {
                    setKeys(userData.keys || 0);
                    setSpecialKeys(userData.specialKeys || 0);
                    setCoins(userData.coins || 0);
                    setWordPoints(userData.wordPoints || 0);
                }
            });

        return () => unsubscribe();
    }, [navigation, t, user.uid]);

    const updateResources = async (updates) => {
        await firestore().collection('users').doc(user.uid).update(updates);
    };

    const handleAbrirBau = (tipo) => {
        const reward = rewardsChest(tipo);
        setSelectedBau(tipo);
        setReward(reward);
        setIsChestOpening(true);
    };

    const processarRecompensa = async () => {
        const updates = {};

        if (reward && reward !== null) {
            if (reward.type === 'coins') {
                updates.coins = coins + reward.amount;
            } else if (reward.type === 'wordpoints') {
                updates.wordPoints = (wordPoints || 0) + reward.amount;
            }
        }

        if (selectedBau && selectedBau !== null) {
            if (selectedBau === 'normalKeys' && keys > 0) {
                updates.keys = keys - 1;
            } else if (selectedBau === 'specialKeys' && specialKeys > 0) {
                updates.specialKeys = specialKeys - 1;
            }
        }

        await updateResources(updates);
        setSelectedBau(null);
        setReward(null);
    };

    const onAnimationEnd = () => {
        setIsChestOpening(false);
        processarRecompensa();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{t('Loja')}</Text>
            <View style={styles.bauContainer}>
                {timeRemaining === null ? (
                    <ChestTimer onPress={() => handleAbrirBau('freeKeys')} timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} />
                ) : (
                    <View style={styles.bauContainer}>
                        <ChestTimer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} />
                        <ChestOption
                            onPress={() => handleAbrirBau('normalKeys')}
                            disabled={keys === 0}
                            type="normalChest"
                        />
                    </View>
                )}
                <ChestOption onPress={() => handleAbrirBau('specialKeys')}
                    disabled={specialKeys === 0}
                    type="specialChest" />
            </View>

            {isChestOpening && (
                <Modal visible={true} transparent={true}>
                    <ChestOptionAnimation
                        type={selectedBau}
                        onAnimationEnd={onAnimationEnd}
                        reward={reward}
                    />
                </Modal>
            )}

            <TouchableOpacity
                style={styles.devButton}
                onPress={() => navigation.navigate('DevTools')}
            >
                <Text style={styles.devButtonText}>{t('Dev Tools')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerCenterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 16,
        height: 16,
        marginHorizontal: 5,
    },
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    bauContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    devButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        alignItems: 'center',
    },
    devButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    miniGameButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.accent,
        borderRadius: 10,
        alignItems: 'center',
    },
    miniGameButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Loja;
