import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import ChatHeader from './ChatHeader'

export default class MessagesScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chats: null,
    }
  }

  componentWillMount() {
    this.chatFetch()
  }

  chatFetch() {
    return fetch('https://loev-be.herokuapp.com/users')
      .then((res) => res.json())
      .then(users => {
        //need to move away from hardcoding when Auth is fully functional
        this.setState({chats: users[0].chats})
      });
  }

  renderChats() {
    return this.state.chats.map((chat, idx) => {
      return(
        <ChatHeader key={chat.id} chat={chat}/>
      )
    })
  }

  render() {
    if (!this.state.chats) {
      return <View />
    }

    return (
      <View style={styles.container}>
        <View >
        </View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          {this.renderChats()}

        </ScrollView>

      </View>
    )
  }
}

MessagesScreen.navigationOptions = {
  headerTitle: (
    <Image
      source={require('../assets/images/LOEV-dev.png')}
      style={{width: 100,height: 80, resizeMode: 'contain', marginTop: 3}}
      />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
