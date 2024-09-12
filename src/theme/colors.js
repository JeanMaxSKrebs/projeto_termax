// src/theme/colors.js
const interpolateColor = (startColor, endColor, factor) => {
    const result = startColor.slice(1).match(/.{2}/g)
      .map((c, i) => {
        const start = parseInt(c, 16);
        const end = parseInt(endColor.slice(1).match(/.{2}/g)[i], 16);
        const value = Math.round(start + factor * (end - start));
        return value.toString(16).padStart(2, '0');
      }).join('');
    return `#${result}`;
  };
  
  export const getDangerColor = (level, maxLevel) => {
    const lowColor = '#FFDD57'; // Amarelo
    const winColor = '#00FF00'; // Verde
    const highColor = '#FF0000'; // Vermelho
    const deadColor = '#000000'; // Preto
    const factor = Math.max(0, Math.min(level / maxLevel, 1)); // Garante que o fator está entre 0 e 1
    // console.log('Factor:', factor);
    // console.log('Interpolated Color:', interpolateColor(lowColor, highColor, factor));
    return interpolateColor(lowColor, highColor, factor);
  };
  