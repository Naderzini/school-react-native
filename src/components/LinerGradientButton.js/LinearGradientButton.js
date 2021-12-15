import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity,Text} from 'react-native'

function LinearGradientButton(props) {
    const {nameStyle,buttonStyle,onPress,colors,name} = props
    return (
        <TouchableOpacity
       
        style={buttonStyle}
        onPress={onPress}>
        <LinearGradient
          colors={colors}
          style={buttonStyle}>
          <Text
            style={nameStyle}>
             {name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
}

export default LinearGradientButton
