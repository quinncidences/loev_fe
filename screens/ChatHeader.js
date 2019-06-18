import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';

export default class ChatHeader extends React.Component {

  constructor() {
    super()
  }

  toMessage() {
    console.log("CHAT OBJECT", this.props.chat)
    console.log("ChatID", this.props.chat.id)
    console.log("UserID", this.props.chat.user_id)
    console.log("RecipientID", this.props.chat.recipient_id)
    console.log("RecipientName", this.props.chat.recipient_name)
    // this.props.navigation.navigate('ChatPage', {
    //   chat: this.props.chat,
    //   chat_id: this.props.chat.id,
    //   user_id: this.props.chat.user_id,
    //   recipient_id: this.props.chat.recipient_id,
    //   recipient_name: this.props.chat.recipient_name,
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainerLeft}>
          <Image
            style={{ width: 55, height: 55, zIndex: 1000}}
            source={require('../assets/images/nikola_.png')}
            />
          <Button
            onPress={() => this.toMessage()}
            title={this.props.chat.recipient_name}
            color='black'
            />
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
  getStartedTextLeft: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },


});
