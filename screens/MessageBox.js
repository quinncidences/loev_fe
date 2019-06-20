import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MonoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'

export default class MessageBox extends React.Component {

  constructor(props) {
    super(props)
  }


  // <Text style={styles.messageUser}>
  //   {this.props.message.content}
  // </Text>

  renderMessage() {
    if (this.props.message.user_id === this.props.logged) {
      return (
        <View style={styles.containerUser}>
          <View style={styles.colorContainerUser}>
            <Text style={styles.messageUser}>
              {this.props.message.content}
            </Text>
          </View>
        </View>
      )
    } else {
      return(
        <View style={styles.containerRec}>
          <View style={styles.colorContainerRec}>
            <Text style={styles.messageRec}>
              {this.props.message.content}
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        {this.renderMessage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerRec: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerUser: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  colorContainerUser: {
    width: 275,
    backgroundColor: 'rgb(121, 247, 214)',
    borderRadius: 12,
    margin: 10,
  },
  colorContainerRec: {
    width: 275,
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    margin: 10,
  },
  messageUser: {
    fontSize: 17,
    color: 'black',
    lineHeight: 22,
    margin: 3,
    textAlign: 'left',
    overflow: 'hidden',
  },
  messageRec: {
    fontSize: 17,
    color: 'black',
    lineHeight: 22,
    margin: 3,
    textAlign: 'left',
    overflow: 'hidden',
  },
});
