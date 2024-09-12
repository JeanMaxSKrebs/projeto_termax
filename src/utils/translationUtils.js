import axios from 'axios';

// Substitua pelo endpoint correto da API de tradução Nitro
const BASE_URL = 'https://api.nitrotranslate.com/v1/translate'; 

// Sua chave de API
const API_KEY = '8e78a6d16dfc4a609958bc4cbc7132b4';

// Função para traduzir texto
export const translateText = async (languageCode, texts) => {
  try {
    const translations = {};
    
    // Itera sobre cada texto a ser traduzido
    for (const [key, text] of Object.entries(texts)) {
      const response = await axios.post(
        BASE_URL,
        {
          text: capitalizeFirstLetter(text), // Formata o texto
          target_lang: languageCode, // Código do idioma alvo
        },
        {
          headers: {
            'Authorization': `Basic ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Verifica a estrutura da resposta
      console.log('Translation response:', response.data);
      
      // Ajusta o acesso à resposta baseado na estrutura real
      if (response.data && response.data.translations && response.data.translations.length > 0) {
        translations[key] = response.data.translations[0].translated_text;
      } else {
        console.warn(`No translation found for key: ${key}`);
        translations[key] = text; // Usa o texto original se não houver tradução
      }
    }
    
    return translations;
  } catch (error) {
    console.error('Error translating text:', error.response ? error.response.data : error.message);
    return texts; // Retorna o texto original em caso de erro
  }
};

// Função para capitalizar a primeira letra do texto
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
