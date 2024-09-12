const fs = require('fs');

// Função para criar o arquivo com as palavras verificadas e corrigidas
const createVerifiedWordsFile = (wordsByLength) => {
    // Gerar o conteúdo do arquivo
    const fileContent = `const words = {
    en: ${JSON.stringify(wordsByLength, null, 2)}
};

export default words;`;

    // Criar o arquivo com as palavras verificadas e corrigidas
    fs.writeFile('src/db/microprogramm/verifiedWords.js', fileContent, (err) => {
        if (err) {
            console.error('Erro ao criar o arquivo:', err);
        } else {
            console.log('Arquivo criado com sucesso!');
        }
    });
};

// Função para verificar e organizar as palavras
const verifyAndOrganizeWords = (data) => {
    const wordsByLength = {};

    // Regex para capturar palavras e comprimentos
    const regex = /"(\d+)":\s*\[\s*([\s\S]*?)\s*\]/g;
    let match;

    // Processar cada correspondência encontrada
    while ((match = regex.exec(data)) !== null) {
        const length = parseInt(match[1], 10);
        const wordsString = match[2];
        const words = wordsString
            .split(/\s*,\s*/)
            .map(word => word.replace(/['"]/g, '').trim().toLowerCase())
            .filter(word => word.length >= 4 && word.length <= 10);

        if (!wordsByLength[length]) {
            wordsByLength[length] = [];
        }
        words.forEach(word => {
            if (!wordsByLength[length].includes(word)) {
                wordsByLength[length].push(word);
            }
        });
    }

    return wordsByLength;
};

// Ler o arquivo com as palavras
fs.readFile('src/db/words.js', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Verificar e criar o arquivo com palavras corrigidas
    const wordsByLength = verifyAndOrganizeWords(data);
    createVerifiedWordsFile(wordsByLength);
});