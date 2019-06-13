import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as SecureStore from 'expo-secure-store';

export default class UserCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: this.props.users,
      current_index: this.props.users.length -1,
      current_user: this.props.users[(this.props.users.length -1)]
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.getStartedContainer}>
            <Image
              style={{width: 300, height: 300}}
              source={require('../assets/images/empty-image.png')}
            />
          </View>
          // <View>
          //   <Text>{this.state.current_user.first_name}</Text>
          // </View>
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
});
