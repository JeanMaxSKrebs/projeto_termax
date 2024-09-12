import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState({});

  // Initialize Firebase Firestore

  // Function to fetch messages from Firestore
  const fetchMessages = async (id) => {
    try {
      // console.log('id');
      // console.log(id);

      const docRef = firestore().doc(`chats/${id}`).collection('chat');
      const docSnapshot = await docRef.get();
      // console.log('docSnapshot');
      // console.log(docSnapshot);
      const chats = [];

      docSnapshot.forEach((chatDoc) => {
        const chatId = chatDoc.id;
        const chatData = chatDoc.data();
        // console.log('Chat ID:', chatId);
        // console.log('Dados da Chat:', chatData);

        // Adicione os dados do chat a um objeto e inclua o ID
        const chat = {
          id: chatId,
          nome: chatData.nome,
          mensagens: chatData.messages.map((message) => {
            // Converter o campo "sent" para uma string no formato ISO 8601
            const sentISO = message.sent ? message.sent.toDate().toISOString() : null;
            // console.log('sentISO');
            // console.log(sentISO);
            return {
              ...message,
              sent: sentISO,
            };
          }),
        };

        // Adicione o objeto chat ao array de chats
        chats.push(chat);

      });
      // console.log('chats');
      // console.log(chats);
      setMessages(chats);
      return chats;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (dados, user) => {
    try {
      console.log('dados');
      console.log(dados);
      console.log('user');
      console.log(user);
      const newMessage = dados.newMessage;
      const tipo = dados.tipo;
      let id = '';
      let to = '';
      switch (tipo) {
        case 'Salao':
          id = dados.sent;
          to = dados.to;

          break;
        case 'Cliente':
          id = dados.to;
          to = dados.sent;

          break;
        default:
          console.log('USUARIO NAO ENCONTRADO');
          break;
      }

      const chatRef = firestore().doc(`chats/${id}/chat/${to}`);
      const chatSnapshot = await chatRef.get();
      const chatData = chatSnapshot.data();
      const newName = chatData.nome;
      if (!chatSnapshot.exists) {
        // O documento não existe, então vamos criar um novo
        await chatRef.set({
          messages: [],  // Inicialmente, a coleção de mensagens está vazia
          nome: user.nome
        });
      }
      // console.log('newMessage');
      // console.log(newMessage);
      // console.log('chatData');
      // console.log(chatData);
      // console.log('newName');
      // console.log(newName);
      const newMessagewithsent = {
        ...newMessage,
        sent: firestore.Timestamp.now()
      };
      // console.log('newMessagewithsent');
      // console.log(newMessagewithsent);

      // Adicione a nova mensagem à coleção de mensagens do chat
      await chatRef.update({
        messages: firestore.FieldValue.arrayUnion(newMessagewithsent),
        nome: tipo == 'Cliente' ? user.nome : newName
      })

      console.log('Mensagem enviada com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };


  return (
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
