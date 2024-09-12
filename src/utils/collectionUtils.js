// src/utils/collectionUtils.js

import { collectionTitles, COLLECTION_COUNT } from './generateCollections'; // Importa os títulos

export const initialCollections = () => {
    const initialCollections = {};

    for (let i = 1; i <= COLLECTION_COUNT; i++) {
        let quantityParts = 9;

        switch (i) {
            case 1:
            case 2:
            case 3:
            case 11:
            case 13:
                quantityParts = 15;
                break;
            case 4:
                quantityParts = 30;
                break;
            case 5:
                quantityParts = 16;
                break;

            case 6:
                quantityParts = 66;
                break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 12:

            default:
                quantityParts = 9;
                break;
        }

        const collectionName = `collection${i}`;
        initialCollections[collectionName] = {
            title: collectionTitles[i - 1], // Usando o título do array
            have: false,
            completed: false,
            quantityParts: quantityParts,
            parts: {}
        };
        for (let j = 1; j <= quantityParts; j++) {
            const partName = `part${j}`;
            initialCollections[collectionName].parts[partName] = { have: false };
        }
    }

    return initialCollections;
};
