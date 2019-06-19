import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import { MonoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'
import MessageBox from './MessageBox'

class ChatPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null,
      text: '',
      recipient_chat_id: null
    }
    this.chatFetch()
  }

  chatFetch() {
    const chat_id = this.props.navigation.getParam('chat').id
    return fetch('https://loev-be.herokuapp.com/chats/' + chat_id, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MX0.zsoJgMqpKjB4ZHC2TlXh_IKOou033J4_aKfJDJo1jUc'
      }
    })
    .then((res) => res.json())
    .then(chat => {
      this.setState({
        messages: chat.messages
      })
      this.recipientChatFetch()
    })
  }

  findChat(chats) {
    let chat = chats.find(chat => {return chat.recipient_id == this.props.navigation.getParam('chat').user_id})
    this.setState({recipient_chat_id: chat.id})
  }

  recipientChatFetch() {
    const rec = this.props.navigation.getParam('chat').recipient_id
    return fetch('https://loev-be.herokuapp.com/users/' + rec, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MX0.zsoJgMqpKjB4ZHC2TlXh_IKOou033J4_aKfJDJo1jUc'
      }
    })
    .then((res) => res.json())
    .then(user => this.findChat(user.chats))
  }


  renderMessages() {
    const logged_user_id = this.props.navigation.getParam('chat').user_id
    return this.state.messages.map(message => {
        return (
          <MessageBox key={message.id} logged={logged_user_id} message={message}/>
        )
    })
  }

  createMessage(ev) {
    fetch('https://loev-be.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MX0.zsoJgMqpKjB4ZHC2TlXh_IKOou033J4_aKfJDJo1jUc'
      },
      body: JSON.stringify({
        "user_id": this.props.navigation.getParam('chat').user_id,
        "chat_id": this.props.navigation.getParam('chat').id,
        "recipient_id": this.props.navigation.getParam('chat').recipient_id,
        "recipient_chat_id": this.state.recipient_chat_id,
        "content": ev.nativeEvent.text
      })
    })
    

    this.setState({
      text: ''
    })
  }

  textState(text) {
    this.setState({text: text}, () => console.log("textState", this.state))
    // console.log("Hey")
  }

  render() {
    if (!this.state.messages || !this.state.recipient_chat_id) {
      return <View />
    }
    const chat = this.props.navigation.getParam('chat')
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.messageContainerLeft}>
            <Image
              style={{ width: 55, height: 55, zIndex: 1000}}
              source={require('../assets/images/nikola_.png')}
              />
            <Text>{chat.recipient_name}</Text>
          </View>
          <View style={styles.container}>
            {this.renderMessages()}
          </View>
          <TextInput
            style={styles.bottom}
            value={this.state.text}
            onSubmitEditing={(ev) => this.createMessage(ev)}
            returnKeyType="send"
            placeholder="send a message..."
            onChangeText={(text) => this.textState(text)}
            />
        </ScrollView>
      </View>
    )
  }
}
export default withNavigation(ChatPage)


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
  bottom: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});
