import React, { Component } from 'react';
import { Pedometer } from "expo-sensors";
import {magnetometer, accelerometer , setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { GetInfraData } from './InfraData'
import { watchPosition } from 'react-native-geolocation-service';
import BackgroundJob from 'react-native-background-job'
import {View,Text} from 'react-native'


// const backgroundJob={
//   jobKey:'location',
//   job:()=>PathTracker.checkpath()

// };
// BackgroundJob.register(backgroundJob)
// const backgroundSchedule={
//   jobKey:"location"
// }
// BackgroundJob.schedule(backgroundSchedule)

export default class PathTracker1 extends Component{

    constructor(props){


        super(props);

        this.state = {
          isPedometerAvailable: "checking",
          currentStepCount: 0,
          magnetometer: {},
          heading : '',
          index:0,
          
        };

        let infraData ='';
        this.checkpath=this.checkpath.bind(this)
        this.subscribeToPedometer();
        
        this.subscribeToMagnetometer();

        let infraDataJson = GetInfraData();

        this.infraData = JSON.parse(infraDataJson);
      
        

     

    }


    componentWillUnmount()
    {
        this.unsubscribeToPedometer();
        this.unsubscribeToMagnetometer();
    }

    checkpath=()=>{
        let obj=this.infraData.Route[this.state.index];
        if(this.state.heading==obj.Direction)
     



    }

    componentDidUpdate()
    {
       

    }

    subscribeToPedometer = () => {
      this._subscription = Pedometer.watchStepCount(result => {
        this.setState({
          currentStepCount: result.steps
        });
      });
  
      Pedometer.isAvailableAsync().then(
        result => {
          this.setState({
            isPedometerAvailable: String(result)
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: "Could not get isPedometerAvailable: " + error
          });
        }
      );
    };

    unsubscribeToPedometer = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    };

    subscribeToMagnetometer = () => {

        this.magnetometerSubscribe =  magnetometer.subscribe(({ x,y,z, timestamp }) => {
            this.setState({
              magnetometer : { x,y,z, timestamp },
              heading : this.calculateHeading(x,y)
            });
        });

    }; 

    calculateHeading(magnetometerX,magnetometerY)
    {
        let x_rad = magnetometerX * (Math.PI/180);
        let y_rad = magnetometerY * (Math.PI/180);

        let radians = Math.atan2(x_rad, y_rad);

        //console.log("Radians: " + radians);

        let degree = radians * (180 / Math.PI);

        if (degree >= 22.5 && degree < 67.5) {
          return 'NE';
        }
        else if (degree >= 67.5 && degree < 112.5) {
          return 'E';
        }
        else if (degree >= 112.5 && degree < 157.5) {
          return 'SE';
        }
        else if (degree >= 157.5 && degree < 202.5) {
          return 'S';
        }
        else if (degree >= 202.5 && degree < 247.5) {
          return 'SW';
        }
        else if (degree >= 247.5 && degree < 292.5) {
          return 'W';
        }
        else if (degree >= 292.5 && degree < 337.5) {
          return 'NW';
        }
        else {
          return 'N';
        }

    }

  unsubscribeToMagnetometer = () => {
      this.magnetometerSubscribe && this.magnetometerSubscribe.remove();
      this.magnetometerSubscribe = null;
    };

    render() {
      //this.checkpath();

        return (
          <View>
            <Text>
              {this.state.heading}

              {this.state.currentStepCount}
            </Text>
          </View>
        );
      }

}