import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import LevelItem from './LevelItem';
import RewardAnimation from './RewardAnimation';
import { useLanguage } from '../../../context/LanguageProvider';
import { useCoinsExp } from '../../../context/CoinsExpProvider';
import { COLORS } from '../../../assets/colors';

const ExpDetails = ({ onClaimReward }) => {
    const scrollViewRef = useRef(null);
    const [reward, setReward] = useState(null);
    const [rewardPosition, setRewardPosition] = useState(null);
    const [claimedLevels, setClaimedLevels] = useState(new Set());
    const { t } = useLanguage();
    const { levels, exp, getRewardForLevel } = useCoinsExp();

    const currentLevel = levels.find(level => exp >= level.xpRequired)?.level || 1;

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                y: (currentLevel - 1) * 80,
                animated: true,
            });
        }
    }, [currentLevel]);

    const claimReward = useCallback((level, layout) => {
        if (reward || claimedLevels.has(level.level)) return;

        const reward = getRewardForLevel(level.level);
        setReward(reward);
        setRewardPosition(layout);
        onClaimReward(level.level);
        setClaimedLevels(prev => new Set(prev).add(level.level));
    }, [reward, onClaimReward, claimedLevels, getRewardForLevel]);
    
    const handleAnimationEnd = () => {
        setReward(null);
        setRewardPosition(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Trilha de EXP')}</Text>
            <ScrollView
                style={styles.scrollView}
                ref={scrollViewRef}
            >
                {levels.map((level, index) => {
                    const isActive = exp >= level.xpRequired;
                    const reward = getRewardForLevel(level.level); // Obtenha recompensa do contexto
                    return (
                        <LevelItem
                            key={index}
                            level={level}
                            isActive={isActive}
                            reward={reward} // Passe recompensa como prop
                            onClaimReward={claimReward}
                        />
                    );
                })}
            </ScrollView>
            {reward && rewardPosition && (
                <RewardAnimation 
                    reward={reward} 
                    startPosition={rewardPosition}
                    onAnimationEnd={handleAnimationEnd} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightgreen,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.7,
        maxHeight: Dimensions.get('window').height * 0.7,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.primary,
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        maxHeight: Dimensions.get('window').height * 0.6,
    },
});

export default ExpDetails;
