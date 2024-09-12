const fs = require('fs');
const path = require('path');

// Caminho do arquivo
const filePath = 'C:\\TSI\\TCC\\Termax\\textExtracted.txt';

// Função principal para extrair os textos
function extractTexts() {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const regex = /Texto:\s*{t\('(.*?)'\)}/g;
    let match;
    const translations = [];

    // Extraindo os textos usando regex
    while ((match = regex.exec(fileContent)) !== null) {
        translations.push(`'${match[1]}': '',`);
    }

    // Imprimindo o resultado
    console.log(translations.join('\n'));
}

// Executa a função principal
extractTexts();
