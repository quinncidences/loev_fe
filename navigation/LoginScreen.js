//this should be the login account screen if there is no token
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import {Card, Icon, Input, CheckBox} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

const options = {
  fields:{
    email: {
      error: 'These credentials do not match'
    },
    password: {
      password: true,
      error: 'These credentials do not match'
    },
  }
};

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      remember: false,
      users: {}
    }
  }

  componentDidMount() {
    this.userFetch()
    this.tokenCreation()
  }

  userFetch() {
    return fetch('https://loev-be.herokuapp.com/users')
      .then((res) => res.json())
      .then((users) => {
        console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  tokenCreation() {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
          this.setState({email: userinfo.email});
          this.setState({password: userinfo.password});
          this.setState({remember: true})
        }
      })
  }

  static navigationOptions = {
    title: 'Login'
  };

  handleLogin() {
    console.log(JSON.stringify(this.state))
    if (this.state.remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({email: this.state.email, password: this.state.password})
      )
      .catch((error) => console.log("Could not save user info", error));
      //need to adjust this so that it only redirects with a successful login
      this.props.navigation.navigate('App')
    } else {
      SecureStore.deleteItemAsync('userinfo')
      .catch((error) => console.log("Could not delete user info", error))
      //need to adjust this so that it only redirects with a successful account creation
      this.props.navigation.navigate('App')
    }

  }


  toCreateAccountPage = () => {
    this.props.navigation.navigate('CreateAccount')
  }

  loginSubmit = () => {
    const ev = this._form.getValue();
    console.log("Submitted Login: ", ev);
    // this.props.navigation.navigate('App')
  }

  render() {
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
        <View style={styles.formContainer}>
          <Input
            placeholder=" Email"
            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            containerStyle={styles.formInput}
            />
          <Input
            placeholder=" Password"
            leftIcon={{ type: 'font-awesome', name: 'key'}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            containerStyle={styles.formInput}
            />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({remember: !this.state.remember})}
            containerStyle={styles.formCheckbox}
            />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleLogin()}
              title='Login'
              color="#512DA8"
              />
          </View>
        </View>
            <View style={styles.helpContainer}>
              <TouchableOpacity style={styles.helpLink}>
              <Text style={styles.helpLinkText} onPress={this.toCreateAccountPage}>
              Create an Account
              </Text>
              </TouchableOpacity>
            </View>
      </View>
  )}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 25,
    backgroundColor: '#ffffff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
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
    padding: 25,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },


  formInput: {
    margin: 40
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null
  },
  formbutton: {
    margin: 60
  }
});
