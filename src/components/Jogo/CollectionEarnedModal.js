import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../context/LanguageProvider';

const CollectionEarnedModal = ({ collectionName, itemImage, onClose }) => {
  // console.log("collectionName");
  // console.log(collectionName);
  // console.log("itemImage");
  // console.log(itemImage);
  const { t } = useLanguage();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={collectionName ? true : false}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('Colecionável Recebido!')}</Text>
          <Text style={styles.modalText}>{t('Coleção: ')} {collectionName}</Text>
          {itemImage && <Image source={itemImage} style={styles.itemImage} />}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default CollectionEarnedModal;
