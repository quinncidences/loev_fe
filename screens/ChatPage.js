//Need to figure out how to create navigation for this page
//Stretch is to create a back button.  I should remove the tabs as well when I get to this page.

import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';

const { navigation } = this.props;
const chat = navigation.getParam('chat')
const chat_id = navigation.getParam('chat_id');
const user_id = navigation.getParam('user_id')
const user_name = navigation.getParam('user_name')
const recipient_id = navigation.getParam('recipient_id')
const recipient_name = navigation.getParam('recipient_name')

export default class ChatHeader extends React.Component {

  constructor() {
    super()
  }

//Do I need to fetch a show page for a Chat and then .messages and .map() ?
//if not I don't see how I'm going to display the messages since they
//AHHH No I think I can pass through the whole chat which will have the messages serialized

//How do I get get the messages out while using the JSON.stringify???
//I also probably need to .reverse the array to show most recent messages first.

  <Text>itemId: {JSON.stringify(itemId)}</Text>

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainerLeft}>
          <Image
            style={{ width: 25, height: 25, borderRadius: 50}}
            source={require('../assets/images/nikola_.png')}
            />
          <Text>{this.props.chat.recipient_name}</Text>
        </View>
        <View style={styles.container>
          {
            messages.map(message => {
              if (message.user_id === logged_user.id) {
                <View style={styles.messageContainerRight}>
                  <Text style={styles.messageTextRight}>
                    {message.content}
                  </Text>
                </View>
              } else {
                <View style={styles.messageContainerLeft}>
                  <Text style={styles.messageTextLeft}>
                    {message.content}
                  </Text>
                </View>
              }
            })
          }
        </View>
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
  messageContainerLeft: {
    backgroundColor: 'rgb(191, 255, 208)',
    marginHorizontal: 20,
    borderRadius: 2,
    borderColor: 'black'
  },
  messageContainerRight: {
    backgroundColor: 'rgb(191, 255, 208)',
    marginHorizontal: 20,
    borderRadius: 2,
    borderColor: 'black'
  },
  messageTextLeft: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
  messageTextRight: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },


});
