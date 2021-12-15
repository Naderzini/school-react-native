import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../Navgation/DrawerContent';
import MyChildSpace from '../screens/MyChildSpace/MyChildSpace';
import MainTabScreen from '../screens/MainTabScreen/MainTabScreen';
import MyClaims from '../screens/MyClaims/MyClaims';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
      <Drawer.Screen name="MyChilds" component={MyChildSpace} />
      <Drawer.Screen name="MyClaims" component={MyClaims} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation;
