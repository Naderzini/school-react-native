import React,{useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import Header from '../../components/Header/Header';
import {Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_PHOTO_PROFIL_URL} from '../../Constant';
import styles from './ProfileStyle'
import ChangePasswordModal from './ChangePasswordModal';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

function Profile({navigation}) {
  const [parentObj,useParentObj] = useState();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
 
  const getItemStorage = async () => {
    try {
      const parent = await AsyncStorage.getItem('parent');
      useParentObj(JSON.parse(parent))
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemStorage();
  }, []);

  return (
    <View style={{backgroundColor:"#d3d3d3",flex:1}}>
      <Header
        name={'Profile'}
        backgroundColor={'#eb8153'}
        iconName={'reorder-three'}
        handelIcon={() => {
          navigation.openDrawer();
        }}></Header>
      <SafeAreaView>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
          {parentObj?.photo === null ?
             <Avatar.Image
              source={require('../../assets/profil.png')}
              size={80}/>:
              <Avatar.Image
              source={{uri:`${BASE_PHOTO_PROFIL_URL}${parentObj?.photo}`}}
              size={80}/>}
            <View style={{marginLeft: 20}}>
              <Title style={(styles.title, {paddingTop:20, marginBottom: 5,fontSize:30,color:"#469be1"})}>
              {parentObj?.first_name}{" "}{parentObj?.last_name}
              </Title>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.menuItem}>
        <Icon name="account-outline" size={30} color="#469be1"></Icon>
        <Text style={styles.menuItemText}>{parentObj?.cin}</Text>
      </View>
      <View style={styles.menuItem}>
        <Icon name="email-outline" size={30} color="#469be1"></Icon>
        <Text style={styles.menuItemText}>{parentObj?.email}</Text>
      </View>
      <View style={styles.menuItem} >
        <Icon name="office-building" size={30} color="#469be1"></Icon>
        <Text style={styles.menuItemText}> {parentObj?.government}, {parentObj?.city}, {parentObj?.postal_code} </Text>
      </View>
      <View style={styles.menuItem}>
        <Icon name="phone" size={30} color="#469be1"></Icon>
        <Text style={styles.menuItemText}>{parentObj?.phone}</Text>
      </View>
      <TouchableOpacity
       style={styles.button}
        onPress={() => {
          showModal();
        }}>
        <View style={styles.menuItem}>
          <Ionicon name="settings-outline" size={30} color="#469be1"></Ionicon>
          <Text style={styles.menuItemText}> Changer mot de passe</Text>
        </View>
      </TouchableOpacity>
      <ChangePasswordModal onDismiss={hideModal} visible={visible} currentParent={parentObj} />
    </View>
  );
}
export default Profile;
