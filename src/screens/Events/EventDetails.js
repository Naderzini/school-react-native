import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import Header from '../../components/Header/Header';
import {BASE_PHOTO_EVENT_URL} from '../../Constant';
import moment from "moment";


let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
function EventDetails({navigation,route}) {
  const {eve} = route.params;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{backgroundColor: '#fff', height: height}}>
          <View>
            <Header
              name={'Détails'}
              backgroundColor={'#eb8153'}
              iconName={'arrow-back'}
              handelIcon={() => {
                navigation.navigate('Events');
              }}></Header>
          </View>
          <View>
            {eve.item.photo === null ? (
              <Image
                style={{width: width, height: height / 4}}
                source={require('../../assets/event.png')}></Image>
            ) : (
              <Image
                style={{width: width, height: height / 4}}
                source={{
                  uri: `${BASE_PHOTO_EVENT_URL}${eve?.item?.photo}`,
                }}></Image>
            )}
            <View style={{margin: 10}}>
              <Text style={{marginBottom: 15}}>
                Vous êtes invités à {eve?.item?.name} le { moment(eve?.item?.date).format("YYYY-MM-DD")} à { moment(eve?.item?.date).format("HH:mm")}
              </Text>
              <Text style={{fontSize: 20,fontFamily:'Nunito-Regular'}}>
                {' '}
                {eve?.item?.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EventDetails;
