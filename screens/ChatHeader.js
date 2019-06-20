import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'

class ChatHeader extends React.Component {

  constructor(props) {
    super(props)
  }

  toMessage() {
    this.props.navigation.navigate('ChatPage', {
      chat: this.props.chat
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center', flexDirection:'row'}}>
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={require('../assets/images/nikola_.png')}
              />
            <Button
              onPress={() => this.toMessage()}
              title={this.props.chat.recipient_name}
              color='black'
              style={styles.button}
              />
          </View>
        </View>
      </View>
    )
  }
}
export default withNavigation(ChatHeader)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20
  },
  card: {
    height: 80,
    width: 350,
    borderRadius: 12,
    borderColor: 'grey',
    backgroundColor: '#e8e8e8',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    zIndex: 1000,
    borderRadius: 70/2,
  }
});
