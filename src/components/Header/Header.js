import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './HeaderStyle';
import {Icon} from 'react-native-elements';

function Header({name,handelIcon,iconName}) {
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#f78f50"></StatusBar>
      <View style={{marginLeft:10}} >
      <Icon
        name={iconName}
        type="ionicon"
        color="#fff"
        onPress={handelIcon}
      />
      </View>
      <Text style={styles.text}> {name} </Text>
    </View>
  );
}
export default Header;
