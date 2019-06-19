import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'

export default class MessageBox extends React.Component {

  constructor(props) {
    super(props)
  }


  renderMessage() {
    if (this.props.message.user_id === this.props.logged) {
      return (
        <View >
          <Text style={styles.getStartedTextBold}>
            {this.props.message.content}
          </Text>
        </View>
      )
    } else {
      return(
        <View >
          <Text >
            {this.props.message.content}
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainerLeft}>
          {this.renderMessage()}
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
  getStartedTextBold: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
    fontWeight: '800'
  },


});
