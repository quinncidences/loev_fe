import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, ScrollView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import t from 'tcomb-form-native';
import { MonoText } from '../components/StyledText';
import {Card, Icon, Input, CheckBox} from 'react-native-elements'



let Gender = t.enums({
  M: "Male",
  F: "Female",
})

const Form = t.form.Form

const options = {
  email: {
      error: 'Please enter an email address.  This will be your username'
    },
  password: {
    error: 'Your passwords do not match'
  },
  "confirm password": {
    error: 'Your passwords do not match'
  },
  fields: {
    terms: {
      label: 'Agree to Terms',
      error: 'You must agree to the Terms'
    },
  },
};

const User = t.struct({
  email: t.String,
  password: t.String,
  "confirm password": t.String,
  birthdate: t.Date,
  gender: Gender, //enum
  terms: t.Boolean
})

export default class CreateAccountScreen extends React.Component {
  constructor() {
    super()
  }

  toLoginPage = () => {
    this.props.navigation.navigate('Login')
  }
  createAccountSubmit = () => {
    console.log("Submitted Create Account")
    this.props.navigation.navigate('App')
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

        <View style={styles.helpContainer}>
          <TouchableOpacity style={styles.helpLink}>
            <Text style={styles.helpLinkText} onPress={this.toLoginPage}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Form
            type={User}
            options={options}
            />
          <Button title="Create Account" onPress={this.createAccountSubmit}/>
        </View>

      </ScrollView>

    </View>);
  }
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
