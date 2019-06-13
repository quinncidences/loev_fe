//this should be the login account screen if there is no token
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {AsyncStorage, Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import {Card, Icon, Input, CheckBox} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      remember: false,
      here: ''
    }
  }

  loginFetch() {
    // fetch('https://loev-be.herokuapp.com/login', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       "email": this.state.email,
    //       "password": this.state.password
    //     }
    //   })
    // })
    // .then(res => res.json())
    // .then(res => AsyncStorage.setItem('jwt', res.jwt))
    this.props.navigation.navigate('App')
  }


  static navigationOptions = {
    title: 'Login'
  };

  toCreateAccountPage = () => {
    this.props.navigation.navigate('CreateAccount')
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
          <Image
            style={{width: 70, height: 80}}
            source={require('../assets/images/loevlogobulb.png')}
          />
        <Text>{"\n"} We Found Love in a Gasless Place</Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            placeholder=" Email"
            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            />
          <Input
            placeholder=" Password"
            leftIcon={{ type: 'font-awesome', name: 'key'}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
            />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({remember: !this.state.remember})}
            containerStyle={styles.formCheckbox}
            checkedColor='#79F7D6'
            />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.loginFetch()}
              title='Login'
              color='white'
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
    flex: 1,
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
  formCheckbox: {
    margin: 40,
    backgroundColor: '#ffffff'
  },
  formButton: {
    margin: 60,
    backgroundColor: '#79F7D6',
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
