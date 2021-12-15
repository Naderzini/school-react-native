import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView,FlatList,Image} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import Header from '../../components/Header/Header';
import {BASE_API_URL, GET_CHILDREN_TEACHERS} from '../../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Events/EventsStyle';
import axios from 'axios';

function ChildrenTeacher({navigation, route}) {
  const {myChild} = route.params;
  const [tableData, setTableData] = useState([ ]);
  

  const getChildTeachers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios
        .get(`${BASE_API_URL}${GET_CHILDREN_TEACHERS}${myChild?.item?.id}`, {
          headers: {Authorization: 'Bearer ' + token},
        })
        .then(response => {
          setTableData(response.data.success);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChildTeachers();
  }, []);
  return (
  
      <View  style={{flex:1, backgroundColor:"#ebecf0c"}}>
        <View>
          <Header
            name={'Enseignants'}
            backgroundColor={'#fda433'}
            iconName={'arrow-back'}
            handelIcon={() => {
              navigation.navigate('ChildrenDetails');
            }}></Header>
        </View>
        <FlatList
        data={tableData}
        keyExtractor={(item) => {
          return item.id;
        }}
        contentContainerStyle={{
          padding: 10,
        }}
      
        renderItem={item => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 7,
                  backgroundColor: '#fff',
                  marginBottom: 10,
                  borderRadius: 15,
                  elevation: 5,
                }}>
                    <Image
                    source={require('../../assets/teacherIcon.png')}
                    style={styles.iconEvent}></Image>
                <View style={{margin:10}}>
                  <Text style={{color:"blue",fontSize:17,fontWeight:'bold'}}>{item?.item?.first_name}{" "}{item?.item?.last_name}</Text>
                  <Text style={{color:"gray"}}> Email : {item?.item?.email}</Text>
                  <Text style={{color:"gray"}}> Matiere : {item?.item?.subject}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      </View>
  
  );
}
export default ChildrenTeacher;
