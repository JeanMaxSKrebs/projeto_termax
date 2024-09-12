import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 5,
  },
  button: {
    borderColor: 'gray',
    margin: 10,
    padding: 10,
  },
  messageContainer: {
    margin: 2,
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  sentByMe: {
    alignSelf: 'flex-end', // Alinha à direita
    backgroundColor: COLORS.primary, // Cor de fundo para mensagens enviadas por "Me"
  },
  sentByOther: {
    alignSelf: 'flex-start', // Alinha à esquerda
    backgroundColor: COLORS.primaryShadow, // Cor de fundo para mensagens enviadas por outros
  },
});
