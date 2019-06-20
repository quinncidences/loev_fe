//this is the hotspots screen

import React from 'react';
import { ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/pike.jpg')}
          />
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Pike Place Market{"\n"}{"\n"}</Text>
        </View>

        <View style={styles.getStartedContainer}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/supercharger.jpg')}
          />
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Tesla Supercharger{"\n"}{"\n"}</Text>
        </View>

        <View style={styles.getStartedContainer}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/mall.jpg')}
          />
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Mall of America{"\n"}{"\n"}</Text>
        </View>


      </ScrollView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  headerTitle: (
    <Image
      source={require('../assets/images/LOEV-dev.png')}
      style={{width: 100,height: 80, resizeMode: 'contain', marginTop: 3, marginLeft: 10}}
      />
  )
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
