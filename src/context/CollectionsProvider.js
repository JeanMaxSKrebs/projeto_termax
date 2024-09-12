import React, { createContext, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthUserContext } from './AuthUserProvider';
import { getRandomBetween } from '../utils/random'; // Função para gerar números aleatórios
import { collections, getCollectionEarnedFull } from '../utils/generateCollections';

export const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
  const [collectionsBase, setCollectionsBase] = useState({});
  const [collectionEarned, setCollectionEarned] = useState({});
  const [lastCollectionName, setLastCollectionName] = useState({});
  const [lastItemName, setLastItemName] = useState({});
  const { user } = useContext(AuthUserContext);
  // console.log("Authenticated User:", user);

  useEffect(() => {
    const fetchCollections = async () => {
      // console.log("fetchCollections called");
      if (user) {
        // console.log("User UID:", user.uid);
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('collections')
            .doc('collectionStatus') // Acesse o documento com as coleções iniciais
            .get();

          if (userDoc.exists) {
            const userCollections = userDoc.data();
            // console.log("User Collections:", userCollections);
            // console.log("collectionsBase:", collectionsBase);
            setCollectionsBase(userCollections || {});
          } else {
            console.log('No user collections found');
          }
        } catch (error) {
          console.log('Error fetching collections:', error);
        }
      } else {
        console.log('No user is logged in');
      }
    };

    if (user) {
      fetchCollections();
    }
  }, [user]);

  const updateCollection = async () => {
    if (!user) {
      console.log('Usuário não está autenticado');
      return;
    }

    try {
      const userDocRef = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('collections')
        .doc('collectionStatus');

      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const currentData = userDoc.data();
        const updatedCollections = { ...currentData };

        // Função para sortear uma coleção e uma parte não adquirida
        const getRandomCollectionAndPart = () => {
          console.log('Entrando em getRandomCollectionAndPart');

          if (!collectionsBase) {
            console.error('collectionsBase não está definido');
            return null;
          }

          // const collectionsArray = Object.values(collectionsBase);
          // console.log('updatedCollections:', updatedCollections);
          const collectionsArray = Object.values(updatedCollections);
          // console.log('collectionsArray:', collectionsArray);

          const availableCollections = collectionsArray.filter(collection =>
            Object.values(collection.parts).some(part => !currentData[collection.name]?.parts[part]?.have)
          );
          // console.log('availableCollections:', availableCollections);

          if (availableCollections.length === 0) {
            console.log('Nenhuma coleção ou parte disponível para sorteio.');
            return null;
          }

          // Sorteia uma coleção
          const randomCollectionIndex = getRandomBetween(1, availableCollections.length - 1);
          const randomCollection = availableCollections[randomCollectionIndex]; // Retorna apenas o nome da coleção
          const collectionName = "collection" + randomCollectionIndex; // Nome da coleção
          console.log('collectionName:', collectionName);
          // Verifica se a coleção sorteada é válida
          if (!randomCollection) {
            console.error('randomCollection não está definido');
            return null;
          }

          // console.log('randomCollection:', randomCollection);
          // Obtém as partes disponíveis na coleção sorteada
          const availableParts = Object.keys(collectionsBase[collectionName]?.parts || {}).filter(part =>
            !currentData[collectionName]?.parts[part]?.have
          );
          // console.log('availableParts:', availableParts);

          if (availableParts.length === 0) {
            console.log('Nenhuma parte disponível para sorteio na coleção escolhida.');
            return null;
          }

          // Sorteia uma parte
          const randomPart = availableParts[getRandomBetween(1, availableParts.length - 1)];
          // console.log('randomPart:', randomPart);
          // randomCollection = 1;
          // randomPart = 1;
          return { collectionName: collectionName, itemName: randomPart };
        };

        const result = getRandomCollectionAndPart();

        if (result) {
          const { collectionName, itemName } = result;

          // console.log("result:");
          // console.log(result);
          if (updatedCollections[collectionName]) {
            updatedCollections[collectionName].have = true;

            if (updatedCollections[collectionName].parts && updatedCollections[collectionName].parts[itemName]) {
              updatedCollections[collectionName].parts[itemName].have = true;
            } else {
              console.error(`Parte ${itemName} não encontrada na coleção ${collectionName}`);
            }

            await userDocRef.set(updatedCollections);
            setCollectionsBase(updatedCollections);
            setLastCollectionName(collectionName);
            setLastItemName(itemName);

            //carregar set collections Earned
            const collection = getCollectionEarnedFull(collectionName, itemName);
            console.log("collection");
            console.log(collection);
            setCollectionEarned(collection)
            
            console.log(`Coleção ${collectionName} atualizada com o item ${itemName}`);
            return true; // ou false baseado na lógica
          } else {
            console.error(`Coleção ${collectionName} não encontrada em updatedCollections`);
          }
        } else {
          console.log('Nenhuma coleção ou parte disponível para sorteio.');
        }
      } else {
        console.log('Documento de coleções do usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao atualizar coleção:', error);
    }
    return false;
  };

  return (
    <CollectionsContext.Provider value={{
      collectionsBase, lastCollectionName, lastItemName,
      setCollectionsBase, updateCollection, collectionEarned
    }}>
      {children}
    </CollectionsContext.Provider>
  );
};