/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import PushNotification from 'react-native-push-notification';
import 'react-native-gesture-handler';
import React ,{useEffect} from 'react';
import Stacks from './src/Navgation/Stakes';
import Firebase from '@react-native-firebase/app';
import {saveTokenDevice} from './src/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import {EVENT} from "./src/Constant"
import { incrementEvents } from "./src/redux/actions/eventsNumber";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

function App(props) {
  const {incrementEvents} = props;
  Firebase.initializeApp();
  useEffect(() => {
    PushNotification.configure({
      onRegister: async function (token) {
        const device_token = token.token;
        try { 
          const token = await AsyncStorage.getItem('token');
          const parent = await AsyncStorage.getItem('parent');
          const parent_id = JSON.parse(parent).id;
          saveTokenDevice(parent_id,{device_token,parent_id},token)
            .then(response => {
              console.log(response);})
            .catch(error => {
              setIsLoding(false);
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        if (notification.title === EVENT){
          incrementEvents();
        }
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    });
  }, []);
  return <Stacks/>
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    nbEvents: state.nbEvents.nbEvents,
  };
};

const mapDispatchToProps = (dispatch) => ({
  incrementEvents: () => dispatch(incrementEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

