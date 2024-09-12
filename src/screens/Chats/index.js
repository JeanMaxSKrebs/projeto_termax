import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import Item from './Item'
import { CommonActions } from '@react-navigation/native';
import { ChatContext } from "../../context/ChatProvider";
import Loading from '../../components/Loading';
import firestore from '@react-native-firebase/firestore';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import { Container } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomButton } from './styles';
import { COLORS } from '../../assets/colors';


const Chats = ({ route, navigation }) => {
    const { messages, fetchMessages } = useContext(ChatContext);
    const [chatsTemp, setChatsTemp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = route.params.user;
    const cliente = route.params.cliente;
    const salao = route.params.salao;

    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {
        let unsubscribe;

        const listenerChat = async (id) => {
            const chatRef = firestore().collection(`chats/${id}/chat`);

            unsubscribe = chatRef.onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((change) => {
                    carregarMensagens()
                });
            });
        };

        // Chame a função de listener para o ID específico aqui
        { salao ? listenerChat(salao.id) : listenerChat(user.id) }
        carregarMensagens();

        // Retorna uma função de limpeza para desmontar o listener
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Chame a função de unsubscribe aqui para parar de ouvir o snapshot
            }
        };
    }, []);

    const carregarMensagens = async () => {
        setIsLoading(true);

        if (cliente) {
            await fetchMessages(salao.id);
        } else {
            await fetchMessages(user.id);
        }
        setIsLoading(false);
    };

    const filterCliente = text => {
        // console.log(text);
        let filtro = [];
        messages.filter(chat => {
            if (chat.nome.toLowerCase().includes(text.toLowerCase())) {
                filtro.push(chat);
            }
        });
        // console.log('filtro');
        // console.log(filtro);
        // console.log(filtro.length);
        if (filtro.length > 0) {
            setChatsTemp(filtro);
            // console.log(filtro.length);
        } else {
            setChatsTemp([]);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <>
                <Item item={item} onPress={() => routeChat(item)} />
            </>
        );
    };

    const routeChat = (item) => {
        // console.log(item);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Chat',
                params: { chat: item, user: user },
            })
        );
    };

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <View>
                <Voltar texto="Voltar" onClick={() => voltar()} />
            </View>
            <Texto tamanho={35} texto={'Chats'}></Texto>
            <SearchBar search={filterCliente} name={'Cliente'} />

            {/* {console.log(chatTemp.length)} */}

            {isLoading ? (
                <Loading />
            ) : (
                // console.log('messages123'),
                // console.log(messages),
                // console.log(messages[0].mensagens[0].content),
                <FlatList
                    data={chatsTemp.length > 0 ? chatsTemp : messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
            {/* <BottomButton>
                <MeuButtonMetade
                    width={'auto'}
                    texto={<Icon size={30} name="refresh"></Icon>}
                    onClick={carregarMensagens}
                />
            </BottomButton> */}

        </SafeAreaView>
    );
};

export default Chats;
