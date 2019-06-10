//this should be the login account screen if there is no token
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import t from 'tcomb-form-native';

const Form = t.form.Form

const User = t.struct({
  email: t.Str,
  password: t.Str,
})

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

export default class HomeScreen extends React.Component {
  constructor() {
    super()
  }

  toCreateAccountPage = () => {
    console.log("Navigate to Create Account")
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
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
          <Form
            ref={c => this._form = c}
            type={User}
            options={options}
          />
          <Button title="Login" onPress={this.loginSubmit}/>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity style={styles.helpLink}>
          <Text style={styles.helpLinkText} onPress={this.toCreateAccountPage}>
          Create an Account
          </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};


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
});
