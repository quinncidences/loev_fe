import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

class MainAuthScreen extends React.Component {
  static navigationOptions = {
    title: 'LO.EV',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signIn} />
        <Button title="Create an Account!" onPress={this._createAccount} />
      </View>
    );
  }

  _signIn = () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('SignIn');
  };
  _createAccount = () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('CreateAccount');
  };
}

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'LO.EV',
  };

    render() {
    return (
      <View style={styles.container}>
        <Button title="Sign In Form" onPress=    {this._showMoreApp}/>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Home');
  };
}






  class CreateAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'LO.EV',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Create Account Form" onPress=    {this._showMoreApp}/>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Home');
  };
}






class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'LO.EV',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="THIS IS THE HOME SCREEN" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOut} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOut = () => {
    this.props.navigation.navigate('Auth');
  };
}







class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Main');
  };
}







class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Main');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ Main: MainAuthScreen, SignIn: SignInScreen, CreateAccount: CreateAccountScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
