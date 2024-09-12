import React, { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { COLORS } from '../../../assets/colors';
import { useLanguage } from '../../../context/LanguageProvider';

const LevelItem = memo(({ level, isActive, reward, onClaimReward }) => {
    const [layout, setLayout] = useState(null);
    const [claimed, setClaimed] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const { t } = useLanguage();

    const handleLayout = useCallback((event) => {
        const { layout } = event.nativeEvent;
        setLayout(layout);
    }, []);

    const handleClaimReward = useCallback(() => {
        if (layout && !claimed) {
            setClaimed(true);
            onClaimReward(level, layout);
            startAnimation();
        }
    }, [layout, claimed, onClaimReward, level]);

    const startAnimation = useCallback(() => {
        Animated.timing(animation, {
            toValue: -1000,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    useEffect(() => {
        // Optional: Log or other side effects
    }, [level.level]);

    const rewardImage = useMemo(() => {
        if (reward.coins) {
            return require('../../../assets/images/resources/coin/coin.png');
        } else if (reward.wordpoints) {
            return require('../../../assets/images/resources/wordpoint/wordpoint.png');
        }
        return require('../../../assets/images/resources/coin/coin.png');
    }, [reward.coins, reward.wordpoints]);

    const imageCount = useMemo(() => {
        return reward.coins ? Math.ceil(reward.coins / 10) : reward.wordpoints ? Math.ceil(reward.wordpoints / 10) : 0;
    }, [reward.coins, reward.wordpoints]);

    return (
        <View style={styles.levelContainer} onLayout={handleLayout}>
            <View style={styles.levelInfo}>
                <View style={styles.lineContainer}>
                    <View style={[
                        styles.line,
                        { backgroundColor: isActive ? COLORS.soMuchAccent : COLORS.gray }
                    ]} />
                    <View style={[
                        styles.dot,
                        { backgroundColor: isActive ? COLORS.soMuchAccent : COLORS.gray }
                    ]} />
                    <View style={[
                        styles.line,
                        { backgroundColor: isActive ? COLORS.soMuchAccent : COLORS.gray }
                    ]} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.levelText}>{t('Nível')} {level.level}</Text>
                    <View style={styles.detailsWrapper}>
                        <Text style={styles.xpText}>{level.xpRequired} {t('EXP')}</Text>
                        <View style={styles.rewardView}>
                            {reward.coins > 0 && (
                                <>
                                    <Text style={styles.rewardText}>
                                        {reward.coins}
                                    </Text>
                                    <Image source={require('../../../assets/images/resources/coin/coin.png')} style={styles.rewardImage} />
                                </>
                            )}
                            {reward.wordpoints > 0 && (
                                <>
                                    <Text style={styles.rewardText}>
                                        {reward.wordpoints}
                                    </Text>
                                    <Image source={require('../../../assets/images/resources/wordpoint/wordpoint.png')} style={styles.rewardImage} />
                                </>
                            )}
                            </View>
                        {isActive && !claimed && (
                            <TouchableOpacity
                                style={styles.claimButton}
                                onPress={handleClaimReward}
                            >
                                <Text style={styles.claimButtonText}>{t('Pegar Recompensa')}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            {claimed && (
                Array.from({ length: imageCount }).map((_, i) => (
                    <Animated.View
                        key={i}
                        style={[
                            styles.animationContainer,
                            {
                                transform: [{ translateY: animation }],
                            },
                        ]}
                    >
                        <Image source={rewardImage} style={styles.coinImage} />
                    </Animated.View>
                ))
            )}
        </View>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isActive === nextProps.isActive &&
        prevProps.level.level === nextProps.level.level &&
        prevProps.reward.coins === nextProps.reward.coins &&
        prevProps.reward.wordpoints === nextProps.reward.wordpoints
    );
});

const styles = StyleSheet.create({
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    levelInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    lineContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 20,
    },
    line: {
        width: 2,
        height: 30,
        backgroundColor: COLORS.gray,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        marginVertical: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.soMuchAccent,
    },
    detailsWrapper: {
        flex: 1,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: COLORS.lightgreen,
        padding: 5,
    },
    levelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    xpText: {
        fontSize: 16,
        color: COLORS.secondary,
    },
    rewardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },
    rewardText: {
        fontSize: 16,
        color: COLORS.secondary,
    },
    rewardImage: {
        width: 15,
        height: 12,
    },
    claimButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    claimButtonText: {
        color: COLORS.lightgreen,
        fontSize: 16,
        fontWeight: 'bold',
    },
    animationContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    coinImage: {
        width: 50,
        height: 50,
    },
});

export default LevelItem;
