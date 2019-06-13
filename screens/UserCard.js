import React from 'react';
import { Button, AsyncStorage, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as SecureStore from 'expo-secure-store';

export default class UserCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: {},
      logged_in_user: {}, //this should be user id 1 for now it is hardcoded
      pref_gender: '',
      pref_distance: '',
      pref_relationship: '',
      current_index: '',
      current_user: {},
      current_cars: []
    }
    this.userFetch = this.userFetch.bind(this)
  }

  componentWillMount() {
    this.userFetch()
  }

  userFetch() {
    return fetch('https://loev-be.herokuapp.com/users')
      .then((res) => res.json())
      .then(users => {
        this.setState ({
          users: users,
          logged_in_user: users[0],
          pref_gender: users[0].preference.gender,
          pref_distance: users[0].distance,
          pref_relationship: users[0].relationship,
          current_index: users.length -1,
          current_user: users[(users.length -1)],
          current_cars: users[(users.length -1)].cars
        })
      });
  }

  setUserOptions() {

  }

  acceptUser() {
    console.log(this.state.current_user.id)
    if (this.state.current_index === 0) {
      let newIndex = this.state.users.length - 1
      this.setState({
        current_index: newIndex,
        current_user: this.state.users[newIndex],
        current_cars: this.state.users[newIndex].cars
      })
    } else {
      let newIndex = this.state.current_index - 1
      this.setState({
        current_index: newIndex,
        current_user: this.state.users[newIndex],
        current_cars: this.state.users[newIndex].cars
      })
    }
  }


  declineUser() {
    console.log(this.state.current_user.id)
    if (this.state.current_index === this.state.users.length - 1) {
      let newIndex = 0
      this.setState({
        current_index: newIndex,
        current_user: this.state.users[newIndex],
        current_cars: this.state.users[newIndex].cars
      })
    } else {
      let newIndex = this.state.current_index + 1
      this.setState({
        current_index: newIndex,
        current_user: this.state.users[newIndex],
        current_cars: this.state.users[newIndex].cars
      })
    }
  }


  render() {
    if (!this.state.users) {
      return <View />
    }
    console.log(this.state.pref_gender)
    return (
      <View style={styles.container}>

        <View style={styles.getStartedContainer}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/nikola_.png')}
          />
        </View>
        <View style={styles.buttons}>
          <View style={styles.noButton}>
            <Button
              onPress={() => this.declineUser()}
              title='NO!'
              color='white'
              />
          </View>

          <View style={styles.yesButton}>
            <Button
              onPress={() => this.acceptUser()}
              title='YES!'
              color='white'
              />
          </View>
        </View>

        <View>
         <Text style={styles.userInfoName}>{this.state.current_user.first_name}</Text>
         <Text style={styles.userInfoName}>{this.state.current_user.id}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  yesButton: {
    margin: 20,
    backgroundColor: 'green',
    borderRadius: 12,
    fontSize: 20,
    width: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-end'
  },
  noButton: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 12,
    fontSize: 20,
    width: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-start'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row'
  }
});
