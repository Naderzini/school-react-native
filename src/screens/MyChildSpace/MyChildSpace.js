import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import styles from '../Events/EventsStyle';
import {getMyChildrens} from '../../api';
import {Avatar} from 'react-native-paper';
import {BASE_PHOTO_PROFIL_URL} from '../../Constant';

let width = Dimensions.get('window').width;

function MyChildSpace({navigation}) {
  const [myChildrens, setMyChildrens] = useState([]);
  const [refreshing, setRereshing] = useState(false);
  const getMyChilds = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const parent = await AsyncStorage.getItem('parent');
      const parent_id = JSON.parse(parent).id;
      getMyChildrens(parent_id, token)
        .then(response => {
          console.log(response);
          setMyChildrens(response.data.data);
          setRereshing(false);
        })
        .catch(error => {
          console.log(error);
          setRereshing(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = () => {
    setRereshing(true);
    getMyChilds();
  };
  useEffect(() => {
    getMyChilds();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#ebecf0'}}>
      <View>
        <Header
          name={'Mes Enfants'}
          backgroundColor={'#fda433'}
          iconName={'reorder-three'}
          handelIcon={() => {
            navigation.openDrawer();
          }}></Header>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <SafeAreaView>
          <FlatList
            data={myChildrens}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            contentContainerStyle={{
              padding: 10,
            }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={myChild => {
              return (
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChildrenDetails', {myChild});
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 7,
                        backgroundColor: '#fff',
                        marginBottom: 10,
                        borderRadius: 15,
                        elevation: 3,
                      }}>
                        {myChild?.item?.photo === null ?
                      <Avatar.Image
                        source={require('../../assets/profil.png')}
                        size={80}
                      />:
                      <Avatar.Image
                        source={{
                          uri: `${BASE_PHOTO_PROFIL_URL}${myChild?.item?.photo}`,
                        }}></Avatar.Image>}
                      <View style={{width}}>
                        <Text style={styles.labelEvent}>Nom et prénom</Text>
                        <Text style={styles.nameEvent}>
                          {myChild?.item?.first_name} {myChild?.item?.last_name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
export default MyChildSpace;
