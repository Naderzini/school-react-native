import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllEvents} from '../../api';
import {connect} from 'react-redux';
import {initEvents} from '../../redux/actions/eventsNumber';
import styles from './EventsStyle';
import {BASE_PHOTO_EVENT_URL} from '../../Constant';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

function Events({navigation, initEvents}) {
  const SPACING = 20;
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loding, setloding] = useState(false);

  const getEvents = async () => {
    setloding(true);
    try {
      const token = await AsyncStorage.getItem('token');
      getAllEvents(token)
        .then(response => {
          setloding(false);
          setEvents(response.data.data);
          setRefreshing(false);
        })
        .catch(error => {
          setloding(false);
          console.log(error);
          setRefreshing(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
console.log(events)
  function handleRefresh() {
    setRefreshing(false);
    initEvents();
    getEvents();
  }
  return (
    <View style={{flex: 1, backgroundColor: '#d3d3d3'}}>
      <View>
        <Header
          name={'Événements'}
          iconName={'reorder-three'}
          handelIcon={() => {
            navigation.openDrawer();
          }}></Header>
      </View>
      {loding ?
      (<View style={{marginTop: 30}}>
            <ActivityIndicator size="large" color="#ec8052" />
          </View>):
      (<View
        style={{
          flex: 1,
        }}>
        <SafeAreaView>
          <FlatList
            data={events}
            keyExtractor={item => {
              return item.id;
            }}
            contentContainerStyle={{
              padding: SPACING,
            }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={eve => {
              return (
                <View>
                    <View
                      style={[
                        {
                          alignSelf: 'center',
                          width: '100%',
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 4,
                          },
                          shadowOpacity: 0.32,
                          shadowRadius: 5,
                          elevation: 9,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginVertical: 10,
                          paddingVertical: 20,
                        },
                      ]}>
                      <View >
                        {eve?.item?.photo === null ? (
                          <Image
                          style={{width: Dimensions.get('screen').width - 50,
                          height: 365  }}
                             style={{width: width-(width*0.11), height: height / 4}}
                            source={require('../../assets/event.png')}></Image>
                        ) : (
                          <Image
                          style={{width: Dimensions.get('screen').width - 50,
                          height: 365  }}
                             style={{width: width-(width*0.11), height: height / 4}}
                            source={{
                              uri: `${BASE_PHOTO_EVENT_URL}${eve?.item?.photo}`
                            }}></Image>
                        )}
                      </View>
                      <View >
                        <Text style={{fontSize: 22, marginTop:10,fontFamily: 'Nunito-Regular'}}>{eve?.item?.name}</Text>
                      </View>
                      <TouchableOpacity
                      style={[styles.button, { width: width - 90 }]}
                    onPress={() => {
                      navigation.navigate('EventDetails', {eve});
                    }}>
                       <Text style={styles.textBtnStyle}>Détailles</Text>
                  </TouchableOpacity>
                    </View>
                    
                </View>
              );
            }}
          />
        </SafeAreaView>
      </View>)}
    </View>
  );
}
const mapStateToProps = state => {
  console.log('State', state);
  return {
    nbEvents: state.nbEvents.nbEvents,
  };
};

const mapDispatchToProps = dispatch => ({
  initEvents: () => dispatch(initEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
