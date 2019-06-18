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


  // <ScrollView
  //   style={styles.container}
  //   contentContainerStyle={styles.contentContainer}/>
  //
  //   <View style={styles.messageContainerRight}>
  //       this.state.chats.map(chat => {
  //         <ChatHeader key={chat.id} chat={chat}/>
  //       })
  //   </View>
  //
  // </ScrollView>

  navigateToMessage(chat) {
    console.log("NAVIGATING")
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
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.messageContainerRight}>
            {this.renderChats()}
          </View>

        </ScrollView>

      </View>
    )
  }
}

MessagesScreen.navigationOptions = {
  header: null,
};


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
  }


});
