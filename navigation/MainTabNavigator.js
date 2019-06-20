import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessagesScreen from '../screens/MessagesScreen';
import MatchesScreen from '../screens/MatchesScreen';
import HotspotsScreen from '../screens/HotspotsScreen';

const MessagesStack = createStackNavigator({
  Messages: MessagesScreen,
});

MessagesStack.navigationOptions = {
  tabBarLabel: 'MESSAGES',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-chatbubbles` : 'md-chatbubbles'}
    />
  ),
};



const MatchesStack = createStackNavigator({
  Matches: MatchesScreen,
});

MatchesStack.navigationOptions = {
  tabBarLabel: 'LO.EV',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

const HotspotsStack = createStackNavigator({
  Hotspots: HotspotsScreen,
});

HotspotsStack.navigationOptions = {
  tabBarLabel: 'HOTSPOTS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-navigate' : 'md-compass'}
    />
  ),
};

export default createBottomTabNavigator({
  MessagesStack,
  MatchesStack,
  HotspotsStack,
  },
  {
    initialRouteName: 'MatchesStack'
  });
