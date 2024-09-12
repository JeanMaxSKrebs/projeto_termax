import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CollectionListItem from '../../components/ColectionListItem';
import { collections, collectionTitles } from '../../utils/generateCollections';
import { CollectionsContext } from '../../context/CollectionsProvider';
import { useLanguage } from '../../context/LanguageProvider';

const Colecoes = ({ navigation }) => {
  const { t } = useLanguage();

  const { collectionsBase } = useContext(CollectionsContext); // Acesse o contexto
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Minhas Coleções')}</Text>

      <FlatList
        data={collections}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item, index }) => { // Adicione index aqui
          // console.log("collectionsBase[item.name]");
          // console.log(collectionsBase[item.name]);
          const parts = collectionsBase[item.name]?.parts || {};
          // console.log(`Rendering parts: ${JSON.stringify(parts)}`);

          const partsCount = Object.keys(parts).filter(partKey => parts[partKey]?.have).length;
          // console.log(`Rendering partsCount: ${partsCount}`);
          const partsTotal = Object.keys(parts).filter(partKey => parts[partKey]).length;
          // console.log(`Rendering partsTotal: ${partsTotal}`);

          return (
            <>
              <CollectionListItem
                // {...console.log(`item.fullImage`)}
                // {...console.log(item.fullImage)}
                have={collectionsBase[item.name]?.have} // Acesse o valor 'have' diretamente
                image={item.fullImage}
                partsCount={partsCount} // Passando a quantidade de partes
                partsTotal={partsTotal} // Passando a quantidade de partes
                text={collectionTitles[index]} // Use o índice para pegar o título
                onPress={() => navigation.navigate('Colecao', { collectionName: item.name, title: collectionsBase[item.name].title })}
              />
            </>
          );
        }}
        contentContainerStyle={styles.list}
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
  list: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Colecoes;
