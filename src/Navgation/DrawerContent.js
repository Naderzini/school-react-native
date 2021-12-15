import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import ItemDrawer from '../components/ItemDrawer';
import styles from './DrawercontentStyle';
import {BASE_PHOTO_PROFIL_URL} from '../Constant';

export function DrawerContent(props) {
  const [parent, setParent] = useState({});
  const logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('parent');
    props.navigation.navigate('Login');
  };
  const getItemStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const currentParent = await AsyncStorage.getItem('parent');
      if (token !== null) {
        setParent(JSON.parse(currentParent));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemStorage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View styles={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 10}}>
              {parent.photo === null ? (
                <Avatar.Image
                  source={require('../assets/profil.png')}
                  size={80}
                />
              ) : (
                <Avatar.Image
                  style={{marginTop: 5}}
                  source={{
                    uri: `${BASE_PHOTO_PROFIL_URL}${parent.photo}`,
                  }}
                  size={50}
                />
              )}
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Title style={styles.title}>
                  {parent.first_name} {parent.last_name}
                </Title>
                <Caption style={styles.caption}>{parent.email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <ItemDrawer
              iconName={'account-outline'}
              label={'Profil'}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}></ItemDrawer>
            <ItemDrawer
              iconName={'calendar'}
              label={'Événements'}
              onPress={() => {
                props.navigation.navigate('Events');
              }}
            />
            <ItemDrawer
              iconName={'exclamation'}
              label={'Mes Réclamations'}
              onPress={() => {
                props.navigation.navigate('MyClaims');
              }}
            />
            <ItemDrawer
              iconName={'face-profile'}
              label={'Mes Enfants'}
              onPress={() => {
                props.navigation.navigate('MyChilds');
              }}
            />
            <ItemDrawer
              iconName={'chat'}
              label={'Messagerie'}
              onPress={() => {
                props.navigation.navigate('Chat');
              }}
            />
          </Drawer.Section>
        </View>
        <DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <ItemDrawer
              iconName={'exit-to-app'}
              label={'Déconnecter'}
              onPress={logout}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
      </DrawerContentScrollView>
    </View>
  );
}
