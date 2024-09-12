import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import CollectionPart from '../../components/CollectionPart';
import { collections } from '../../utils/generateCollections';
import { CollectionsContext } from '../../context/CollectionsProvider';
import { useLanguage } from "../../context/LanguageProvider";

const Colecao = ({ route }) => {
  const { collectionName } = route.params;
  const { title } = route.params;
  const { collectionsBase } = useContext(CollectionsContext); // Pega o estado do Firestore
  const collection = collections.find(col => col.name === collectionName);
  const screenWidth = Dimensions.get('window').width;
  const { t } = useLanguage(); // Usa o contexto de idioma

  if (!collection) {
    // Tratar caso não encontre a coleção
    console.log('Collection not found');
    return null;
  }
  const collectionBase = collectionsBase[collectionName];
  // console.log("collectionBase");
  // console.log(collectionBase);


  if (!collectionBase) {
    // Tratar caso não encontre a coleção
    console.log('collectionBase not found');
    return null;
  }

  if (!collectionBase) {
    console.log(`Collection base data not found for ${collectionName}`);
    return null;
  }

  const partSize = screenWidth / 4;
  const collectionParts = Object.entries(collection.parts).map(([partName, partImage]) => ({
    partName,
    partImage: collection.parts[partName], // Ajuste aqui para acessar corretamente partImage
    have: collectionBase.parts[partName]?.have || false, // Utiliza optional chaining
  }));

  // console.log('Collection Parts:', collectionParts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Minhas Coleções')}</Text>
      <Text style={styles.title}>{t(title)}</Text>
      <FlatList
        data={collectionParts}
        keyExtractor={item => item.partName}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <CollectionPart
            image={item.partImage}
            have={item.have}
            style={{
              width: partSize,
              height: partSize,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  flatListContainer: {
    alignItems: 'center', // Centraliza horizontalmente os blocos
    justifyContent: 'center', // Centraliza verticalmente os blocos
    flexGrow: 1, // Permite que a FlatList cresça e centralize os itens
  },
});

export default Colecao;
