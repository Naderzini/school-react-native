import React from 'react';
import { View } from 'react-native';
import {TextInput,Text} from 'react-native';
function InputText(props) {
  const {
    placeholder,
    placeholderTextColor,
    autoCapitalize,
    onChangeText,
    style,
    secureTextEntry,
    value,
    onBlur,
    error,
    touched
  } = props;
  return (
  <View  style={style}>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      onBlur={onBlur}
      error={error}
      touched={touched}
    />
    {(touched&& error) && <Text style={{color: 'red', marginTop: 5,fontSize:12}}>{error}</Text>}
    </View>
  )
}

export default InputText;
