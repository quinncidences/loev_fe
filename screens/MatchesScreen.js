//this is the page for matches with swipe right/left

import React from 'react';
import { ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { MonoText } from '../components/StyledText';


export default function LinksScreen() {
  return (
    <View style={styles.container}>

        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/LOEV-dev.png')
                : require('../assets/images/LOEV-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/empty-image.png')}
            />
        </View>

    </View>
  );
}

LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
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
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
