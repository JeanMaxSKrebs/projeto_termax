import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';

export const Container = styled.View`
  padding: 1px;
  align-items: center;
  width: 100%;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

export const ChatItem = styled.TouchableOpacity`
  width: 90%;
  height: 100px;
  flex-direction: row;
  padding: 16px;
  margin: 5px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
export const ChatNome = styled.Text`
  font-weight: bold;
  color: ${COLORS.secundary};
  padding-bottom: 10px;
`;
export const ChatMensagem = styled.Text`
  color: ${COLORS.secundary};
`;
export const ChatImage = styled.Text`
  font-weight: bold;
  color: ${COLORS.secundary};
  flex: 2;
`;
export const ChatTexto = styled.View`
  color: ${COLORS.secundary};
  flex: 5;
  flex-direction: column;
  `;
export const ChatHora = styled.Text`
  color: ${COLORS.secundary};
  flex: 1;
`;
export const BottomButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  background-color: ${COLORS.primary};
  align-self: center;
`;