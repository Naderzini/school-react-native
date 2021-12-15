import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Events from '../Events/Events';
import {connect} from 'react-redux';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

function MainTabScreen(props) {
  const {nbEvents} = props;
  return (
    <Tab.Navigator
      initialRouteName="profile"
      barStyle={{backgroundColor: '#eb8153'}}
      activeColor="#fff">
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarColor: '#a03dcd',
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Evenements',
          tabBarColor: '#2799de',
          tabBarBadge: nbEvents,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarColor: '#25737d',
          tabBarLabel: 'Chat',

          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const mapStateToProps = state => {
  console.log('State', state);
  return {
    nbEvents: state.nbEvents.nbEvents,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen);
