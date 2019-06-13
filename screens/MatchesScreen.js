//this is the page for matches with swipe right/left

import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as SecureStore from 'expo-secure-store';
import Card from './UserCard'


export default class MatchesScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: {},
      current_index: '',
      current_user: {},
      current_cars: []
    }
  }

  componentDidMount() {
    this.userFetch()
  }

  userFetch() {
    return fetch('https://loev-be.herokuapp.com/users')
      .then((res) => res.json())
      .then(users => {
        this.setState ({
          users: users,
          current_index: users.length -1,
          current_user: users[(users.length -1)],
          current_cars: users[(users.length -1)].cars
        })
      });
  }

  render() {
    if (!this.state.users) {
      return <View />
    }
    return (
      <View style={styles.container}>

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/LOEV-dev.png')
                  : require('../assets/images/LOEV-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Image
              style={{width: 300, height: 300}}
              source={require('../assets/images/nikola_.png')}
            />
          </View>

          <View>
            <Text style={styles.userInfoName}>{this.state.current_user.first_name}</Text>
            <Text style={styles.userInfoLocation}>{this.state.current_user.current_location}</Text>
            <Text style={styles.userInfoTagline}>{this.state.current_user.tagline}{"\n"}</Text>
            <Text style={styles.userInfoBio}>{this.state.current_user.bio}{"\n"}</Text>
          </View>

          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Cars</Text>
            {this.state.current_cars.map(car => {
              return <Text style={styles.userInfoCar} key={car.id}>
                {car.make} - {car.model} - {car.year}
              </Text>
            })}
          </View>
      </View>
    )
  }
}

MatchesScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  userInfoName: {
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center'
  },
  userInfoLocation: {
    fontSize: 25,
    lineHeight: 25,
    textAlign: 'center',
  },
  userInfoTagline: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'center'
  },
  userInfoBio: {
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center'
  },
  userInfoCar: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'left',
    marginHorizontal: 10
  },
});
