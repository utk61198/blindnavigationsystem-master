import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import VoiceNative from './Components/SpeechToText/SpeechToText'
//import Sensor from './Components/Sensor'
import Magneto  from './Components/Navigation/Magnetometer'
import Location from './Components/Navigation/Geolocation'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = { magnetometerData: {}}

  callbackFunction = (childData) => {
      this.setState(childData);
  }

  render() {
    return (
      //<VoiceNative />
      //<Sensor />
      <View>
              {/* <Magneto  parentCallback = {this.callbackFunction} />
              <Text>
                x: {this.state.magnetometerData.x} y: {this.state.magnetometerData.y} z: {this.state.magnetometerData.z}
              </Text> */}
              <Location />
              
      </View>
      //<StepCount/>
    );
  }
}

