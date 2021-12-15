import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header/Header';
import {Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ChildrenDetailsStayle'
import {BASE_PHOTO_PROFIL_URL} from '../../Constant';

function ChildrenDetails({navigation, route}) {
  const {myChild} = route.params;
  return (
    <View style={{flex: 1}}>
      <View>
        <Header
          name={"Details de l'enfant"}
          backgroundColor={'#fda433'}
          iconName={'arrow-back'}
          handelIcon={() => {
            navigation.navigate('MyChilds');
          }}></Header>
      </View>
      <SafeAreaView>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image
              source={{uri: `${BASE_PHOTO_PROFIL_URL}${myChild?.item?.photo}`}}
              size={80}></Avatar.Image>
            <View style={{marginLeft: 20}}>
              <Title style={(styles.title, {marginTop: 5, marginBottom: 5})}>
                {myChild?.item?.first_name} {myChild?.item?.last_name}
              </Title>
              <Caption style={styles.caption}>
                {' '}
                classe : {myChild?.item?.group.name}{' '}
              </Caption>
              <Caption style={styles.caption}>
                {' '}
                age : {myChild?.item?.age}{' '}
              </Caption>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.menuWrapper}>
        <TouchableOpacity
         style={styles.button}
         onPress={() => {
          navigation.navigate('Planning', {myChild});
        }}>
          <View style={styles.menuItem}>
            <Icon name="clock-time-eight-outline" size={25}></Icon>
            <Text style={styles.menuItemText}> Emploi du temps</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
          onPress={() => {
            navigation.navigate('ChildrenTeachers', {myChild});
          }}>
          <View style={styles.menuItem}>
            <Icon name="account-outline" size={25}></Icon>
            <Text style={styles.menuItemText}> Enseignants</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
          onPress={() => {
            navigation.navigate('ChildrenSubjects', {myChild});
          }}>
          <View style={styles.menuItem}>
            <Icon name="bookshelf" size={25}></Icon>
            <Text style={styles.menuItemText}> Matières</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChildrenDetails;
