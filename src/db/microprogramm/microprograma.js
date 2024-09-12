const fs = require('fs');

// Função para criar o arquivo com o formato desejado
const createWordsFile = (words) => {
    const wordsByLength = {};

    words.forEach(word => {
        const cleanedWord = word.trim(); // Remove espaços ao redor da palavra
        if (cleanedWord.length > 0) { // Ignora palavras vazias
            const length = cleanedWord.length;
            if (!wordsByLength[length]) {
                wordsByLength[length] = new Set();
            }
            wordsByLength[length].add(cleanedWord);
        }
    });

    // Converte os Sets de volta para arrays para o formato desejado
    Object.keys(wordsByLength).forEach(length => {
        wordsByLength[length] = Array.from(wordsByLength[length]);
    });

    const fileContent = `const words = {
  pt: ${JSON.stringify(wordsByLength, null, 2)}
};

export default words;`;

    fs.writeFile('src/db/microprogramm/teste.js', fileContent, (err) => {
        if (err) {
            console.error('Erro ao criar o arquivo:', err);
        } else {
            console.log('Arquivo criado com sucesso!');
        }
    });
};

// Lê o arquivo com as palavras
fs.readFile('src/db/microprogramm/input_words.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Divide o conteúdo por linhas e depois por espaços
    const words = data
        .split('\n')
        .flatMap(line => line.split(/\s+/)) // Divide apenas por espaços
        .map(word => word.trim())
        .filter(word => word.length > 0);

    createWordsFile(words);
});