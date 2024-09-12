import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { CoinsExpContext } from '../../../context/CoinsExpProvider';
import { COLORS } from '../../../assets/colors';
import ExpDetails from './ExpDetails';
import { useLanguage } from "../../../context/LanguageProvider";

const Exp = ({ width = 24, height = 24 }) => {
  const { level, updateCoinsExp } = useContext(CoinsExpContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardPosition, setRewardPosition] = useState(null);
  const animation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const { t } = useLanguage(); // Usa o contexto de idioma

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onClaimReward = useCallback(async (level, position) => {
    await updateCoinsExp(0, 0); // Lógica para atualizar as recompensas

    if (position) {
      setRewardPosition(position);
      Animated.timing(animation, {
        toValue: { x: 0, y: -Dimensions.get('window').height },
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        setRewardPosition(null); // Limpa a posição após a animação
      });
    }
  }, [updateCoinsExp, animation]);

  return (
    <View>
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/resources/exp/exp.png')}
            style={[styles.image, { width, height }]}
          />
        </View>
        <Text style={styles.text}>{level !== undefined ? level : 'N/A'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ExpDetails onClaimReward={onClaimReward} />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{t('Fechar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {rewardPosition && (
        <Animated.View style={[styles.reward, { transform: animation.getTranslateTransform() }]}>
          <Image
            source={require('../../../assets/images/resources/exp/exp.png')}
            style={styles.rewardImage}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 3,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    color: COLORS.lightgreen,
    marginLeft: 4,
    flexShrink: 1,  // Evita que o texto transborde
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.primaryDark,
    fontSize: 18,
  },
  reward: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  rewardImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default Exp;
