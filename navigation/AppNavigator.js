import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(
  createSwitchNavigator({
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
    App: MainTabNavigator
  },
  {
    initialRouteName: 'Login'
  })
);
