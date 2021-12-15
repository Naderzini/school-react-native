import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import styles from '../Events/EventsStyle';;
import {getMyClaims} from '../../api'
import MyClaimAnswer from './MyClaimAnswer';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function MyClaims({navigation}) {
  const [myClaims, setMyClaims] = useState([]);
  const [Claim, setClaim] = useState();
  const [visible, setVisible] = useState(false);
  const [refreshing,setRereshing] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
 

  const getClaims = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const parent = await AsyncStorage.getItem('parent');
      const parent_id = JSON.parse(parent).id;
      getMyClaims(parent_id,token)
        .then(response => {
          console.log(response);
          setMyClaims(response.data.data);
          setRereshing(false)
        })
        .catch(error => {
          console.log(error);
          setRereshing(false)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () =>{
    setRereshing(true);
    getClaims();
  }
  useEffect(() => {
    getClaims();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#d3d3d3'}}>
      <View>
        <Header
          name={'Réclamations'}
          backgroundColor={'#a03dcd'}
          iconName={'reorder-three'}
          handelIcon={() => {
            navigation.openDrawer();
          }}
          >
          </Header>
      </View>

      <FlatList
        data={myClaims}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        contentContainerStyle={{
          padding: 10,
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={myClaim => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setClaim(myClaim);
                  showModal();
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
                  <Image
                    source={require('../../assets/claimIcon.png')}
                    style={styles.iconEvent}
                    ></Image>
                  <View style={{width}}>
                    <Text style={styles.labelEvent}>Titre de Réclamation</Text>
                    <Text style={styles.nameEvent}>{myClaim.item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <MyClaimAnswer onDismiss={hideModal} visible={visible} myClaim={Claim} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Claim');
        }}
        style={styles.addClaimButton}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
export default MyClaims;
