import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthUserContext } from './AuthUserProvider';

// Criação do contexto para moedas e experiência
export const CoinsExpContext = createContext({});

// Função para gerar níveis e requisitos de XP
const generateLevels = (maxLevel) => {
  const levels = [];
  let totalXP = 0;
  const baseXP = 100; // Base XP requirement for level 1
  const xpIncrease = 20; // XP increase per level before level 50
  const xpIncreaseAfter30 = 300; // XP requirement for levels 50 and above
  const xpIncreaseAfter65 = 600; // XP requirement for levels 100 and above
  const xpIncreaseAfter100 = 1000; // XP requirement for levels 100 and above

  for (let i = 0; i < maxLevel; i++) {
    if (i >= 99) {
      totalXP += xpIncreaseAfter100;
    } else if (i >= 64) {
      totalXP += xpIncreaseAfter65;
    } else if (i >= 29) {
      totalXP += xpIncreaseAfter30;
    } else {
      totalXP += baseXP + i * xpIncrease;
    }
    levels.push({ level: i + 1, xpRequired: totalXP });
  }

  return levels;
};

// Gerar níveis até 150
const levels = generateLevels(150);

// Função para gerar recompensas baseadas no nível
const generateRewards = (maxLevel) => {
  const rewards = {};
  
  for (let i = 1; i <= maxLevel; i++) {
    if (i === 1) {
      rewards[i] = { coins: 10, wordpoints: 100 };
    } else if (i === 2) {
      rewards[i] = { coins: 20, wordpoints: 200 };
    } else {
      const baseCoins = 10;
      const baseWordpoints = 100;
      const incrementCoins = 10;
      const incrementWordpoints = 100;

      rewards[i] = {
        coins: baseCoins + (i - 2) * incrementCoins,
        wordpoints: baseWordpoints + (i - 2) * incrementWordpoints,
      };
    }
  }
  
  return rewards;
};

// Gerar recompensas para níveis de 1 a 150
const rewardMap = generateRewards(150);

export const CoinsExpProvider = ({ children }) => {
  const { user } = useContext(AuthUserContext);
  const [coins, setCoins] = useState(100);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1); // Inicializa o nível com 1

  useEffect(() => {
    const fetchCoinsExp = async () => {
      if (user) {
        try {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setCoins(data.coins !== undefined ? data.coins : 100);
            setExp(data.exp !== undefined ? data.exp : 0);
            calculateLevel(data.exp !== undefined ? data.exp : 0);
          }
        } catch (error) {
          console.error('Error fetching coins and exp:', error);
        }
      }
    };

    fetchCoinsExp();
  }, [user]);

  const calculateLevel = (expValue) => {
    const maxLevel = 150;
    let currentLevel = 1;
    let remainingExp = expValue;

    while (currentLevel < maxLevel && remainingExp >= levels[currentLevel - 1].xpRequired) {
      remainingExp -= levels[currentLevel - 1].xpRequired;
      currentLevel += 1;
    }

    setLevel(currentLevel);

    if (currentLevel !== level || remainingExp !== exp) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          exp: remainingExp,
          level: currentLevel
        })
        .then(() => {
          setExp(remainingExp);
        })
        .catch(error => console.error('Error updating exp and level:', error));
    }
  };

  const updateCoinsExp = async (newCoins, additionalExp) => {
    if (user) {
      try {
        const updatedExp = exp + additionalExp;
        calculateLevel(updatedExp);

        await firestore().collection('users').doc(user.uid).update({
          coins: newCoins,
          exp: updatedExp,
        });

        setCoins(newCoins);
        setExp(updatedExp);
      } catch (error) {
        console.error('Error updating coins, exp, and level:', error);
      }
    }
  };

  const getRewardForLevel = (level) => rewardMap[level] || { coins: 0, wordpoints: 0 };

  return (
    <CoinsExpContext.Provider value={{ coins, exp, level, updateCoinsExp, levels, getRewardForLevel }}>
      {children}
    </CoinsExpContext.Provider>
  );
};

export const useCoinsExp = () => useContext(CoinsExpContext);
