import React, { useState, useEffect } from 'react';
import {magnetometer, accelerometer , setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Magneto(props) {

const [accelerometerData, setAccerlometerData] = useState({});
const [magnetometerData, setMagnetometerData] = useState({});

setUpdateIntervalForType(SensorTypes.accelerometer, 16);
setUpdateIntervalForType(SensorTypes.magnetometer, 16);

const subscriptionToAccerelometer = accelerometer.subscribe(({ x, y, z, timestamp }) => {
  setAccerlometerData({ x, y, z, timestamp });
});

let { x, y, z } = accelerometerData;

const subscriptionToMagnetometer = magnetometer.subscribe(({ x,y,z, timestamp }) => {
    setMagnetometerData({ x,y,z, timestamp });
    sendData();
});

let a = magnetometerData.x
let b = magnetometerData.y
let c = magnetometerData.z

sendData = () => {
  props.parentCallback({magnetometerData});
};

//World coordinates
//var trueacceleration= new Array();
//trueacceleration[0] =  parseFloat(x*(Math.cos(c)*Math.cos(a)+Math.sin(c)*Math.sin(b)*Math.sin(a)) + y*(Math.cos(b)*Math.sin(a)) + z*(-Math.sin(c)*Math.cos(a)+Math.cos(c)*Math.sin(b)*Math.sin(a)));
//trueacceleration[1] =  parseFloat(x*(-Math.cos(c)*Math.sin(a)+Math.sin(c)*Math.sin(b)*Math.cos(a)) + y*(Math.cos(b)*Math.cos(a)) + z*(Math.sin(c)*Math.sin(a)+ Math.cos(c)*Math.sin(b)*Math.cos(a)));
//trueacceleration[2] =  parseFloat(x*(Math.sin(c)*Math.cos(b)) + y*(-Math.sin(b)) + z*(Math.cos(c)*Math.cos(b)));

return (
  null
  // <View>
  //   <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
  //   <Text>
  //       x: {trueacceleration[0]} y: {trueacceleration[1]} z: {trueacceleration[2]}
  //   </Text>
  //   <Text>
  //       x: {magnetometerData.x} y: {magnetometerData.y} z: {magnetometerData.z}
  //   </Text>
  //   <Text>
  //       x: {a} y: {b} z: {c}
  //   </Text>
  //   <Text>
  //       x: {accelerometerData.x} y: {accelerometerData.y} z: {accelerometerData.z}
  //   </Text>
  //   <Text>
  //       x: {x} y: {y} z: {z}
  //   </Text>
  // </View>
);

}