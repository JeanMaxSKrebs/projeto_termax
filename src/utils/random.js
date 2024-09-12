// Gera um número inteiro aleatório entre 0 e max (exclusivo)
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Gera um número inteiro aleatório entre min e max (inclusive)
const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Seleciona um item aleatório de uma lista
const getRandomItem = (items) => items[getRandomIndex(items.length)];

// Exemplo de uso das funções
const exampleUsage = () => {
  console.log('Random index (0 to 9):', getRandomIndex(10));
  console.log('Random number between 1 and 100:', getRandomBetween(1, 100));
  console.log('Random item from [10, 20, 30, 40, 50]:', getRandomItem([10, 20, 30, 40, 50]));
};

export { getRandomIndex, getRandomBetween, getRandomItem, exampleUsage };
