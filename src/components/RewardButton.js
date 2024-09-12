import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useLanguage } from "../context/LanguageProvider";

const RewardButton = ({ content, buttonText, buttonColor, buttonSize, onPress }) => {
  const [showContent, setShowContent] = React.useState(false);
  const { t } = useLanguage(); // Usa o contexto de idioma

  const handlePress = () => {
    setShowContent(true);
    if (onPress) onPress();
  };

  const closeContent = () => {
    setShowContent(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor, padding: buttonSize }]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal visible={showContent} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {content}
            <TouchableOpacity onPress={closeContent} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{t('Fechar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default RewardButton;
