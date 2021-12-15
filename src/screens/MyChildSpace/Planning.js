import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import PDFView from 'react-native-view-pdf';
import Header from '../../components/Header/Header';
import {BASE_PLAN_URL} from'../../Constant'

function Planning({navigation, route}) {
  const {myChild} = route.params;
  return (
    <View style={{flex: 1}}>
      <View>
        <Header
          name={'Emploie du temps'}
          backgroundColor={'#fda433'}
          iconName={'arrow-back'}
          handelIcon={() => {
            navigation.navigate('ChildrenDetails');
          }}></Header>
      </View>
      <View style={styles.container}>
        <PDFView resource={`${BASE_PLAN_URL}${myChild?.item?.group?.joint}`} style={styles.pdf} />
      </View>
    </View>
  );
}

export default Planning;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
