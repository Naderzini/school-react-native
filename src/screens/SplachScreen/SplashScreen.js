import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './SplashScreenStyle';

function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eb8153" barStyle="light-content" />
      <View style={styles.header}>
      <Image
           style={{borderRadius: 125,width:200,height:200}}
           source={require('../../assets/img/logo.png')}
          ></Image>
      </View>
      <Animatable.View 
      style={styles.footer}
      animation="fadeInUpBig">
        <Text style={styles.title}>Bienvenue</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => 
        navigation.navigate('Login')
          }>
            <LinearGradient
              colors={['#ec8052', '#ff4c41']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Commencer</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
export default SplashScreen;

 