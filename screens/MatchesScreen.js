//this is the page for matches with swipe right/left

import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as SecureStore from 'expo-secure-store';
import Card from './UserCard'


export default class MatchesScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>

          <View style={styles.welcomeContainer}>

          </View>
          <Card />

          <View style={{height: 30}}>
          </View>

      </View>
    )
  }
}

MatchesScreen.navigationOptions = {
  headerTitle: (
    <Image
      source={require('../assets/images/LOEV-dev.png')}
      style={{width: 100,height: 80, resizeMode: 'contain', marginTop: 3}}
      />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FFF'
  },
});
