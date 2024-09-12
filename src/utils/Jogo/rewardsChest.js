// src/utils/Jogo/rewardsChest.js

const rewardsChest = (tipo) => {
    let reward = {};

    // Recompensas baseadas no tipo de baú
    if (tipo === 'freeKeys') {
        // Recompensa para baú gratis
        reward = {
            amount: Math.floor(Math.random() * 100) + 50, // Moedas entre 50 e 149
            type: 'coins'
        };
    } else if (tipo === 'normalKeys') {
        // Recompensa para baú normal
        reward = {
            amount: Math.floor(Math.random() * 100) + 50, // Moedas entre 50 e 149
            type: 'coins'
        };
    } else if (tipo === 'specialKeys') {
        // Recompensa para baú especial
        reward = {
            amount: Math.floor(Math.random() * 50) + 10, // Pontos de palavra entre 10 e 59
            type: 'wordPoints'
        };
    }

    return reward;
};

export default rewardsChest;