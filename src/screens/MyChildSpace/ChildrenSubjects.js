import React, {useState, useEffect} from 'react';
import {View, FlatList,Image} from 'react-native';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native-elements';
import styles from '../Events/EventsStyle';
import {getChildrenSubjects} from '../../api'

function ChildrenSubjects({navigation, route}) {
  const {myChild} = route.params;
  const [tableData, setTableData] = useState([]);

  const getChildSubjects = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      getChildrenSubjects(myChild?.item?.id,token)
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
    getChildSubjects();
  }, []);
  return (
    <View style={{ flex:1,backgroundColor:"#cccccc"}}>
      <View>
        <Header
          name={'Matiers'}
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
                    source={require('../../assets/bookIcon.png')}
                    style={styles.iconEvent}></Image>
                <View style={{margin: 10}}>
                  <Text style={{color: 'blue', fontSize: 17, fontWeight: 'bold'}}>{item?.item?.name}</Text>
                  <Text style={{color:"gray"}}> Nombre d'heurs par semaine : {item?.item?.hours_week}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default ChildrenSubjects;
