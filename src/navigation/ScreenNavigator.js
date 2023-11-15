import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Auth } from '../screens/auth';
import { Buy, Detail } from '../screens/buy';
import { Sell } from '../screens//sell';
import { TabNavigator } from './TabNavigator';
import { MySell, MySellDetail, MySellEdit, } from '../screens/mySell';
import { EditProfile, Profile, ShowProfile } from '../screens/profile';
import { Splash } from '../screens/splash';

const Stack = createStackNavigator();

export const ScreenNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
      <Stack.Screen name="Auth" component={Auth} options={{headerShown:false}} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}} />
        <Stack.Screen name="Buy" component={Buy} options={{headerShown:false}} />
        <Stack.Screen name="MySell" component={MySell} options={{headerShown:false}} />
        <Stack.Screen name="Sell" component={Sell} options={{headerShown:false}} />
        <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}} />
        <Stack.Screen name="MySellDetail" component={MySellDetail} options={{headerShown:false}} />
        <Stack.Screen name="MySellEdit" component={MySellEdit} options={{headerShown:false}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
        <Stack.Screen name="ShowProfile" component={ShowProfile} options={{headerShown:false}} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

