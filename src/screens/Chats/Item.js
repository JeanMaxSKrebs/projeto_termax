import React from 'react';
import { Container, ChatItem, ChatImage, ChatNome, ChatMensagem, ChatTexto, ChatHora } from './styles';
import Texto from '../../components/Texto';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../assets/colors';

const Item = ({ item, onPress }) => {
    return (
        <Container>
            {/* {console.log('item123')}
            {console.log(item)} */}
            {/* {item.mensagens } */}
            <ChatItem onPress={onPress}>
                <ChatImage>
                    <Icon name="person-circle-outline" size={60} color="black" />
                </ChatImage>
                <ChatTexto>
                    <ChatNome>
                        {item.nome ? (
                            <>
                                <Texto tamanho={18} texto={item.nome} />
                            </>
                        ) : (
                            <>
                                <Texto tamanho={16} texto={'Sem nome cadastrado'} />
                            </>
                        )}

                    </ChatNome>
                    <ChatMensagem>
                        {item.mensagens && item.mensagens.length === 0 ? (
                            <>
                                <Texto tamanho={15} cor={COLORS.primaryDark} texto={' * '} />
                                <Texto tamanho={16} texto={'Deu uma espiada no seu salão, entre em contato'} />
                                <Texto tamanho={15} cor={COLORS.primaryDark} texto={' * '} />
                            </>
                        ) : (
                            <Texto tamanho={16} texto={item.mensagens[item.mensagens.length - 1].content} />
                        )}
                    </ChatMensagem>
                </ChatTexto>
                <ChatHora>
                    {item.mensagens && item.mensagens.length !== 0 ? (
                        <Texto tamanho={10} texto={item.mensagens[item.mensagens.length - 1].sentISO} />
                    ) : null
                    }
                </ChatHora>
            </ChatItem>
        </Container >
    )
}

export default Item;
