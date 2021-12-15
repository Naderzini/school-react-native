import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_API_URL,SEND_MESSAGE,GET_MESSAGES,MESSAGE} from '../../Constant';
import Firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import styles from './ChatStyle';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Header from '../../components/Header/Header';
import moment from "moment";

function Chat({navigation}) {
  const [messages, setMessages] = useState([]);
  const [content,setContent] = useState("");
  const [messageNotification, setMessageNotification] = useState("");

  const getMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const parent = await AsyncStorage.getItem('parent');
      const parent_id = JSON.parse(parent).id;
      axios
        .get(`${BASE_API_URL}${GET_MESSAGES}${parent_id}`, {
          headers: {Authorization: 'Bearer ' + token},
        })
        .then(response => {
          console.log(response);
          setMessages(response.data.data);
          
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessages = async () => { 
    try {
      const token = await AsyncStorage.getItem('token');
      const parent = await AsyncStorage.getItem('parent');
      const parent_id = JSON.parse(parent).id;
      console.log(token,parent,parent_id)
      axios
        .post(`${BASE_API_URL}${SEND_MESSAGE}`,{content,parent_id}, {
          headers: {Authorization: 'Bearer ' + token},
        })
        .then(response => {
          console.log(response);
          if (response.status === 200){
          setContent("");
          getMessages();
        }
        })

        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getMessages();
    Firebase.initializeApp();
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIF:", notification);
        if (notification.title === MESSAGE){
         setMessageNotification(notification);
        }}
      })
  }, [messageNotification]);


  return (
    <View style={styles.container}>
       <View>
        <Header
          name={'Messages'}
          backgroundColor={'#a03dcd'}
          iconName={'reorder-three'}
          handelIcon={() => {
            navigation.openDrawer();
          }}
          >
          </Header>
      </View>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={message => {
          console.log(item);
          const item = message.item;
          let inMessage = item.admin_id !== null;
          let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
          return (
            <View style={[styles.item, itemStyle]}>
              <View style={[styles.balloon]}>
                {inMessage ? (
                  <View style={{flexDirection:"column"}}>
                  <Text style={{color: '#000',fontSize:15}}>{item.content}</Text>
                  <Text style={{color: '#aaacb0',fontSize:11}}>{moment(item.created_at).format("HH:mm")}</Text>
                  </View>

                ) : (
                  <View style={{flexDirection:"column"}}>
                  <Text style={{color: '#fff',fontSize:15}}>{item.content}</Text>
                  <Text style={{color: '#C6C6C6',fontSize:11}}>{moment(item.created_at).format("HH:mm")}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder=" Taper votre message..."
            underlineColorAndroid="transparent"
            onChangeText={(content) => setContent(content)}
            value={content}/>
        </View>
        <TouchableOpacity style={styles.btnSend} onPress={()=>{sendMessages()}}>
          <Image
            source={{
              uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png',
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Chat;

