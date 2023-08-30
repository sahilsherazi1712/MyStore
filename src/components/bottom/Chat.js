import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { useIsFocused } from '@react-navigation/native';
import ThemeContext from '../common/ThemeContext';
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = () => {
  const { theme } = useContext(ThemeContext)
  const [users, setUsers] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [messagesList, setMessagesList] = useState([])

  const isFocued = useIsFocused();

  useEffect(() => {
    fetchUserDetails();
  }, [isFocued])

  const fetchUserDetails = async () => {
    try {
      setSenderId(auth().currentUser.uid)
      firestore()
        .collection('users')
        .where('id', '!=', auth().currentUser.uid)
        .get()
        .then((res) => {
          console.log('userData', res.docs[0]._data);
          setUsers(res._docs)
        })
        .catch((error) => {
          console.log('FetchingDataError: ', error);
        })
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const getMessagesList = (id) => {
    try {
      firestore()
        .collection('chats')
        .doc(senderId + id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          console.log(snapshot.docs);
          const allMsgs = snapshot.docs.map((item) => {
            return { ...item._data} //  return { ...item._data, createdAt: Date.parse(new Date()) }
          })
          console.log('allMsgs',allMsgs);
          setMessagesList(allMsgs);
        })
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  console.log('senderId',senderId);
  console.log('receiverId',receiverId);
  console.log('senderId + receiverId', senderId + receiverId);
  console.log('receiverId + senderId',receiverId + senderId);

  useEffect(() => {
    setMessagesList([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: senderId,
      receivedBy: receiverId,
      // createdAt: Date.parse(msg.createdAt)
    }
    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    )

    try {
      firestore()
        .collection('chats')
        .doc(senderId + receiverId)
        .collection('messages')
        .add(myMsg)
      firestore()
        .collection('chats')
        .doc(receiverId + senderId)
        .collection('messages')
        .add(myMsg)
    } catch (error) {
      console.log('error: ', error);
    }
  }, [])

  console.log('senderId', senderId);
  console.log('receiverId', receiverId);

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <FlatList
        data={users}
        extraData={users}
        style={{ flex: 1, margin: 10, }}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 10, backgroundColor: theme.primaryColor, padding: 15, height: 90, alignItems: 'center', borderRadius: 20 }}
              onPress={() => {
                setReceiverId(item._data.id)
                getMessagesList(item._data.id);
              }}
            >
              <Image source={{ uri: item._data.image }} style={{ width: 64, height: 64, borderRadius: 32 }} />
              <View style={{ marginLeft: 8, }}>
                <Text style={{ fontSize: 15, color: theme.textColor1 }}>{item._data.name}</Text>
                <Text>{item._data.mobile}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      {receiverId !== '' &&
        <View style={{ flex: 1, marginBottom: 80 }}>
          <GiftedChat
            messages={messagesList}
            onSend={messages => onSend(messages)}
            user={{
              _id: senderId,
            }}
          />
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({})
export default Chat