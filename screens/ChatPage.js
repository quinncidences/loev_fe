import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
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

  refreshMessages() {
    this.chatFetch()
  }

  render() {
    if (!this.state.messages || !this.state.recipient_chat_id) {
      return <View />
    }
    const chat = this.props.navigation.getParam('chat')
    return (
      <View style={styles.container}>
          <View style={styles.header}>

            <View>
              <Button
                title="⤺"
                color='black'
                onPress={() => {this.props.navigation.navigate('MessagesStack')}}
                />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.image}
                source={require('../assets/images/nikola_.png')}
                />
              <Text style={styles.user_name}>  {chat.recipient_name}</Text>
            </View>

            <View>
              <Button
                title="↻"
                color='black'
                onPress={() => this.refreshMessages()}
                />
            </View>

          </View>
        <ScrollView>
          {this.renderMessages()}
        </ScrollView>
        <View style={{flex: 1, height: 60, borderTopWidth:0.75, borderColor: '#e8e8e8'}}>
          <TextInput
            style={styles.footer}
            value={this.state.text}
            onSubmitEditing={(ev) => this.createMessage(ev)}
            returnKeyType="send"
            placeholder="  send a message..."
            onChangeText={(text) => this.textState(text)}
            />
        </View>
      </View>
    )
  }
}
export default withNavigation(ChatPage)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
  messageContainerLeft: {
    backgroundColor: 'rgb(191, 255, 208)',
    marginHorizontal: 20,
    borderRadius: 2,
    borderColor: 'black'
  },
  footer: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'flex-end',
    zIndex: 1000,
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  image: {
    width: 40,
    height: 40,
    zIndex: 1000,
    borderRadius: 40/2,
  },
  user_name: {
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    borderBottomWidth: 0.75,
    borderColor: 'grey',
    justifyContent: 'space-between',
    borderColor: '#e8e8e8',
    flexDirection:'row',
    alignItems: 'center'
  }
});
