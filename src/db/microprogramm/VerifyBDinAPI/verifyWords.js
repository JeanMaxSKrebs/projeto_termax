import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { validateWord } from '../../../utils/wordValidation.js';
import fs from 'fs';
import path from 'path';

// Obtém o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminho do arquivo de palavras
const filePath = path.resolve(__dirname, '../../../db/words.js');

// Função principal para verificar palavras e gerar arquivo de saída
const verifyWords = async () => {
  try {
    // Importa o módulo dinamicamente
    const wordsModule = await import(`file://${filePath}`);
    const wordList = wordsModule.default.pt; // Acessa as palavras do arquivo

    // Prepara um objeto para armazenar os resultados
    const validatedWords = {};

    for (const length in wordList) {
      const words = wordList[length];
      validatedWords[length] = [];

      for (const word of words) {
        const isValid = await validateWord(word);
        if (isValid) {
          validatedWords[length].push(word);
        }
      }
    }

    // Caminho do arquivo de saída
    const outputFilePath = path.resolve(__dirname, 'validated_words.js');

    // Cria o conteúdo do arquivo no formato desejado
    const fileContent = `const words = {
  pt: ${JSON.stringify(validatedWords, null, 2)}
};

export default words;`;

    // Grava o conteúdo no arquivo
    fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

    console.log('Arquivo de palavras validadas salvo em:', outputFilePath);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

verifyWords();
