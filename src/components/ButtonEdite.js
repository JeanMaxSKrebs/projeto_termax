import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importe a biblioteca de ícones apropriada

const ButtonEdite = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="create" size={20} />
    </TouchableOpacity>
  );
};

export default ButtonEdite;
