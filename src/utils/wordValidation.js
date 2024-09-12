// src/db/microprogramm/VerifyBDinAPI/verifyWords.js
import words from '../db/words.js'; // Caminho relativo para o arquivo words.js
import axios from 'axios';

// URL da API de validação de palavras
const VALIDATE_WORD_API_URL = 'https://api.dicionario-aberto.net/word';

// Função para buscar palavras válidas
export const fetchValidWords = async (length, language = 'pt') => {
    try {
        if (words[language] && words[language][length]) {
            return words[language][length];
        } else {
            console.warn(`No words found for length ${length} and language ${language}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching valid words:', error.message);
        return [];
    }
};

// Função para validar se uma palavra é válida
export const validateWord = async (word) => {
    try {
        const response = await axios.get(`${VALIDATE_WORD_API_URL}/${word}`);
        if (response.data && response.data.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error validating word:', error.response?.data || error.message);
        return false;
    }
};
