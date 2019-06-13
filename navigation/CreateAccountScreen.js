import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {AsyncStorage, Picker, Button, Image, ScrollView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import t from 'tcomb-form-native';
import { MonoText } from '../components/StyledText';
import {Card, Icon, Input, CheckBox} from 'react-native-elements'


export default class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      location: '',
      tagline: '',
      bio: '',
      interest_type: '',
      interest_gender: '',
      interest_distance: '',
      users: {}
    }
  }

  componentDidMount() {
    // this.tokenCreation()
  }

  // tokenCreation() {
  //   SecureStore.getItemAsync('userinfo')
  //     .then((userdata) => {
  //       let userinfo = JSON.parse(userdata);
  //       if (userinfo) {
  //         this.setState({email: userinfo.email});
  //         this.setState({password: userinfo.password});
  //         this.setState({remember: true})
  //       }
  //     })
  // }

  toLoginPage = () => {
    this.props.navigation.navigate('Login')
  }

  handleCreateAccount = () => {
    console.log("created account")
      //need to adjust this so that it only redirects with a successful account creation
  }

  // static navigationOptions = {
  //   title: 'CreateAccount'
  // };

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
          <Input
            placeholder=" Confirm Password"
            leftIcon={{ type: 'font-awesome', name: 'key'}}
            onChangeText={(confirm_password) => this.setState({confirm_password})}
            value={this.state.confirm_password}
            secureTextEntry={true}
            />
          <Input
            placeholder=" First Name"

            onChangeText={(first_name) => this.setState({first_name})}
            value={this.state.first_name}
            />
          <Input
            placeholder=" Last Name"

            onChangeText={(last_name) => this.setState({last_name})}
            value={this.state.last_name}
            />
          <Picker
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <Input
            placeholder=" Location"

            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            />
          <Text> Profile Info </Text>
          <Input
            placeholder=" Tagline"

            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            />
          <Input
            placeholder=" Bio"

            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            />
          <Text> Preferences </Text>

          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleCreateAccount()}
              title='Create Account'
              color='black'
              />
          </View>
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
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
