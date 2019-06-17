import React from 'react';
import { Button, AsyncStorage, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text, Dimensions, Animated, PanResponder } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as SecureStore from 'expo-secure-store';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class UserCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: {},
      logged_in_user: {}, //this is hardcoded for now as the 0 index
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
        this.initialUserFilter(users)
      });
  }

  initialUserFilter(users) {
    //this filter does not work for likes/dislikes at the moment
    let logged_user = users[0]
    f = users.filter((user) => {return user.gender == logged_user.preference.gender
       && user.preference.relationship == logged_user.preference.relationship
       // && !this.checkLikes(user.id) && !this.checkDislikes(user.id)
    })

    this.setState ({
      users: f,
      logged_in_user: users[0],
      pref_gender: users[0].preference.gender,
      pref_distance: users[0].preference.distance,
      pref_relationship: users[0].preference.relationship,
      current_index: f.length -1,
      current_user: f[(f.length -1)],
      current_cars: f[(f.length -1)].cars
    })
  }

  userAction(type) {
    if (type == "no") {
      this.createDislike()
    } else {
      if (this.checkLikes(this.state.current_index)) {
        this.createLike()
        this.createMatch()
      }
      this.createLike()
    }
    let newIndex = this.state.current_index - 1
    if (newIndex < 0) {
      newIndex = this.state.users.length - 1
    }
    while (this.userFilter(newIndex)) {
      newIndex -= 1
      if (newIndex < 0) {
        newIndex = this.state.users.length -1
      }
    }
    this.setState({
      current_index: newIndex,
      current_user: this.state.users[newIndex],
      current_cars: this.state.users[newIndex].cars
    })
  }

  userFilter(newIndex) {
    //need to filter out the actual logged_in_user
    if (
      this.state.users[newIndex].gender != this.state.pref_gender || this.state.users[newIndex].preference.relationship != this.state.pref_relationship || this.checkLikes(newIndex) || this.checkDislikes(newIndex)
    ) {
      return true
    } else {
      return false
    }
  }

  checkLikes(newIndex) {
    let userlikes = this.state.logged_in_user.likes.filter((like) => (like.liked_id === this.state.users[newIndex].id))
    return userlikes.length != 0 ? true : false
  }

  checkDislikes(newIndex) {
    let userdislikes = this.state.logged_in_user.dislikes.filter((dislike) => dislike.disliked_id === this.state.users[newIndex].id)
    return userdislikes.length != 0 ? true : false
  }

  createLike() {
    fetch('https://loev-be.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxN30.1qQerJT8rUDLPLbKS8nBSqX9m2pkgU7QOovgTvprfrc'
      },
      body: JSON.stringify({
        "user_id": this.state.logged_in_user.id,
        "liked_id": this.state.current_user.id,
      })
    })
  }

  createDislike() {
    fetch('https://loev-be.herokuapp.com/dislikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxN30.1qQerJT8rUDLPLbKS8nBSqX9m2pkgU7QOovgTvprfrc'
      },
      body: JSON.stringify({
        "user_id": this.state.logged_in_user.id,
        "disliked_id": this.state.current_user.id,
      })
    })
  }

  createMatch() {
    fetch('https://loev-be.herokuapp.com/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxN30.1qQerJT8rUDLPLbKS8nBSqX9m2pkgU7QOovgTvprfrc'
      },
      body: JSON.stringify({
        "user_id": this.state.logged_in_user.id,
        "match_id": this.state.current_user.id,
      })
    })
  }


  render() {
    if (!this.state.users) {
      return <View />
    }
    return (
      <View style={styles.container}>

        <View style={styles.getStartedContainer}>
          <Image
            style={{width: 270, height: 270}}
            source={require('../assets/images/nikola_.png')}
          />
        </View>
        <View style={styles.buttons}>
          <View style={styles.noButton}>
            <Button
              onPress={() => this.userAction("no")}
              title='N'
              color='white'
              />
          </View>

          <View style={styles.yesButton}>
            <Button
              onPress={() => this.userAction("yes")}
              title='Y'
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
    width: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-end'
  },
  noButton: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 12,
    fontSize: 20,
    width: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-start'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row'
  }
});
