const fs = require('fs');
const path = require('path');

const targetFolder = 'src'; // Diretório alvo
const outputFile = 'textExtracted.txt'; // Arquivo para salvar a saída

// Função para ler todos os arquivos .js recursivamente
const readFilesRecursively = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      readFilesRecursively(fullPath, fileList);
    } else if (stats.isFile() && path.extname(fullPath) === '.js') {
      fileList.push(fullPath);
    }
  });

  return fileList;
};

// Função para processar o conteúdo dos arquivos
const processFile = (file) => {
  const fileContent = fs.readFileSync(file, 'utf8');
  const lines = fileContent.split('\n');

  lines.forEach((line, index) => {
    const regex = /<Text[^>]*>(.*?)<\/Text>/g; // Regex para encontrar o conteúdo dos componentes <Text>
    let match;

    while ((match = regex.exec(line)) !== null) {
      let textContent = match[1].trim();

      // Ignorar texto dentro de chaves
      if (textContent.includes('{') && textContent.includes('}')) {
        textContent = textContent.split(/{|}/).filter((part, idx) => idx % 2 === 0).join('');
      }

      if (textContent) {
        fs.appendFileSync(outputFile, `Arquivo: ${file}\nLinha: ${index + 1}\nTexto: {t('${textContent}')}\n\n`);
      }
    }
  });
};

// Função principal
const main = () => {
  // Limpar arquivo de saída
  fs.writeFileSync(outputFile, '');

  const jsFiles = readFilesRecursively(targetFolder);

  jsFiles.forEach(file => {
    processFile(file);
  });

  console.log('Processamento concluído. Verifique o arquivo', outputFile);
};

main();
