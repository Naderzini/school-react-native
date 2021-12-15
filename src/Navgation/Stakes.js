import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import SplashScreen from '../screens/SplachScreen/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from './DrawerNavigation';
import EventDetails from '../screens/Events/EventDetails';
import MyClaims from '../screens/MyClaims/MyClaims';
import ChildrenDetails from '../screens/MyChildSpace/ChildrenDetails';
import ChildrenSubjects from '../screens/MyChildSpace/ChildrenSubjects';
import ChildrenTeacher from '../screens/MyChildSpace/ChildrenTeachers';
import Claim from '../screens/Claim/Claim';
import Planning from '../screens/MyChildSpace/Planning';
import ResetPassword from '../screens/Login/ResetPassword';

const Stack = createStackNavigator();

function Stacks({navigation}) {
  const [token, setToken] = useState('');

  const getItemStorage = async () => {
    setLoding(true);
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
        setLoding(false);
        console.log(value);
      }
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getItemStorage;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        {!token && (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={Drawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Claim"
          component={Claim}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChildrenDetails"
          component={ChildrenDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChildrenSubjects"
          component={ChildrenSubjects}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChildrenTeachers"
          component={ChildrenTeacher}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Planning"
          component={Planning}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Stacks;
