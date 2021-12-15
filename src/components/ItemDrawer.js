import React from 'react'
import { DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ItemDrawer(props) {
    const {iconName,label,onPress} = props
    return (
        <DrawerItem
        icon={({color, size}) => (
          <Icon name={iconName} color={color} size={size}  />
        )}
        label={label}
        onPress={onPress}
      >
      </DrawerItem>
    )
}

export default ItemDrawer
