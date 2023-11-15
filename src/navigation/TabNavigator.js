import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Buy} from '../screens/buy';
import {Sell} from '../screens/sell';
import { MySell } from '../screens/mySell';
import { ShowProfile } from '../screens/profile';
import {primaryColor,  gray} from '../Dimens';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: gray,
        keyboardHidesTabBar: true
      }}>
      <Tab.Screen
        name="Buy"
        component={Buy}
        options={{
          tabBarLabel: 'Buy',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={h('3%')} />
          ),
        }}
      />

<Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          tabBarLabel: 'Sell',
          tabBarIcon: ({color}) => (
            <Ionicons name="add" color={color} size={h('3%')} />
          ),
        }}
      />

      <Tab.Screen
        name="MySell"
        component={MySell}
        options={{
          tabBarLabel: 'My Sell',
          tabBarIcon: ({color}) => (
            <Icon name="post-add" color={color} size={h('3%')} />
          ),
        }}
      />

      <Tab.Screen
        name="ShowProfile"
        component={ShowProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={h('3%')} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};
