import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import MainTabNavigator from './MainTabNavigator'
import ChatPage from '../screens/ChatPage'

export default createAppContainer(
  createSwitchNavigator({
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
    App: MainTabNavigator,
    ChatPage: ChatPage
  },
  {
    initialRouteName: 'Login'
  })
);
