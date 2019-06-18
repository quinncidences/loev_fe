import React from 'react';
import { Button, AsyncStorage, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text, Dimensions, Animated, PanResponder } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as SecureStore from 'expo-secure-store';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class UserCard extends React.Component {

  constructor(props) {
    super(props)
    this.position = new Animated.ValueXY()
    this.state = {
      users: null,
      logged_in_user: {}, //this is hardcoded for now as the 0 index
      pref_gender: '',
      pref_distance: '',
      pref_relationship: '',
      current_index: '',
      current_user: {},
      current_cars: []
    }
    this.userFetch()

    this.rotate = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:['-10deg','0deg','10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[0,0,1],
      extrapolate: 'clamp'
    })

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0,0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0,1],
      extrapolate: 'clamp'
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0.7,1],
      extrapolate: 'clamp'
    })

  }

  componentWillMount() {
    //Put the function from the turorial in here instead
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(ev,gestureState) => true,
      onPanResponderMove:(ev, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease:(ev, gestureState) => {
        if(gestureState.dx > 130){
          Animated.spring(this.position, {
            toValue:{x: SCREEN_WIDTH + 100, y: gestureState.dy}
          }).start(() => {
            console.log("LIKED")
            this.userAction('yes')
          })
        } else if(gestureState.dx < -130){
          Animated.spring(this.position, {
            toValue:{x: -SCREEN_WIDTH - 100, y: gestureState.dy}
          }).start(() => {
            console.log("DISLIKED")
            this.userAction('no')
          })
        } else {
          Animated.spring(this.position,{
            toValue:{ x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  userFetch() {
    return fetch('https://loev-be.herokuapp.com/users')
      .then((res) => res.json())
      .then(users => {
        this.initialUserFilter(users)
      });
  }

  checkLikesInitial(user_id, logged_user) {
    let userlikes = logged_user.likes.filter((like) => (like.liked_id === user.id))
    return userlikes.length != 0 ? true : false
  }

  checkDislikesInitial(user_id, logged_user) {
    let userdislikes = logged_user.dislikes.filter((dislike) => dislike.disliked_id === user.id)
    return userdislikes.length != 0 ? true : false
  }

  initialUserFilter(users) {
    let logged_user = users[0]
    users_filtered = users.filter((user) => {return user.gender === logged_user.preference.gender
       && user.preference.relationship === logged_user.preference.relationship
       && !this.checkLikesInitial(user.id, logged_user) && !this.checkDislikesInitial(user.id, logged_user)
    })
    this.setState ({
      users: users_filtered,
      logged_in_user: users[0],
      pref_gender: users[0].preference.gender,
      pref_distance: users[0].preference.distance,
      pref_relationship: users[0].preference.relationship,
      current_index: users_filtered.length -1,
      current_user: users_filtered[(users_filtered.length -1)],
      current_cars: users_filtered[(users_filtered.length -1)].cars
    })
  }

  userAction(type) {
    if (type == "no") {
      this.createDislike()
    } else {
      if (this.checkLikes(this.state.current_index)) {
        this.createLike()
        this.createMatch()
        this.createChat()
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
      current_cars: this.state.users[newIndex].cars}, () => {
        this.position.setValue({ x: 0, y: 0 })
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
    console.log("Hit Create Like")
    fetch('https://loev-be.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyOX0.nrDAbSD3hLsX3c8XxXJh09aarQJ7Ap9GXV7NIE906oE'
      },
      body: JSON.stringify({
        "user_id": this.state.logged_in_user.id,
        "liked_id": this.state.current_user.id,
      })
    })
  }

  createDislike() {
    console.log("Hit Create Dislike")
    fetch('https://loev-be.herokuapp.com/dislikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyOX0.nrDAbSD3hLsX3c8XxXJh09aarQJ7Ap9GXV7NIE906oE'
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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyOX0.nrDAbSD3hLsX3c8XxXJh09aarQJ7Ap9GXV7NIE906oE'
      },
      body: JSON.stringify({
        "user_id": this.state.logged_in_user.id,
        "match_id": this.state.current_user.id,
      })
    })
  }

  createChat() {
    fetch('https://loev-be.herokuapp.com/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyOX0.nrDAbSD3hLsX3c8XxXJh09aarQJ7Ap9GXV7NIE906oE'
      },
      body: JSON.stringify({
        "user_id": this.state.logged_in_user.id,
        "user_name": this.state.logged_in_user.first_name,
        "recipient_id": this.state.current_user.id,
        "recipient_name": this.state.current_user.first_name,
      })
    })
  }

  renderUsers = () => {
    return this.state.users.map((user, idx) => {
      if (idx > this.state.current_index) {
        return null
      } else if (idx === this.state.current_index) {
        return(
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={user.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, borderRadius: 20, position: 'absolute'}]}>

            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000}}>
              <Text style={{borderWidth:1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES
              </Text>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000}}>
              <Text style={{borderWidth:1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NO
              </Text>
            </Animated.View>

            <Image
              style={{ width: 300, height: 300, borderRadius: 20}}
              source={require('../assets/images/nikola_.png')}
              />
            <Text style={styles.userInfoName}>{user.first_name}</Text>
            <Text style={styles.userInfoName}>{user.id}</Text>
            <Text style={styles.userInfoBio}>{user.bio}{"\n"}</Text>
          </Animated.View>
        )
      } else {
        return(
          <Animated.View
            key={user.id} style={[{opacity: this.nextCardOpacity, transform: [{scale: this.nextCardScale}], height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, borderRadius: 20, position: 'absolute'}]}>
            <Image
              style={{ width: 300, height: 300, borderRadius: 20}}
              source={require('../assets/images/nikola_.png')}
              />
          </Animated.View>
        )
      }
    })
  }

  render() {
    if (!this.state.users) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          {this.renderUsers()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
