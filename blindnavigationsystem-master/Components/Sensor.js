import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
//import { Accelerometer } from "react-native-sensors";
import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
//import data from './Navigation/Magnetometer'

setUpdateIntervalForType(SensorTypes.accelerometer, 400);

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
  </View>
)

export default class Sensor extends Component {
  constructor(props) {
    super(props);

    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
                    this.setState({x,y,z, timestamp})  , error => {
                    console.log("The sensor is not available");
              });

    this.state = {x: 0, y: 0, z: 0, timestamp: 0}; 

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          Accelerometer values
        </Text>
        <Value name="x" value={this.state.x} />
        <Value name="y" value={this.state.y} />
        <Value name="z" value={this.state.z} />
        <Value name="timestamp" value={this.state.timestamp} />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});