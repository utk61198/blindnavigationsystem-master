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

export default class PathTracker extends Component{

    constructor(props){


        super(props);
        this.subscribeToMagnetometer();

        
        this.state = {
          isPedometerAvailable: "checking",
          currentStepCount: 0,
          magnetometer: {},
          heading :"",
          
          
        };

        let infraData ='';
        this.checkpath=this.checkpath.bind(this)
        
        

     

    }

    componentDidMount()
    {  
     
       this.subscribeToPedometer();
        
        //this.subscribeToMagnetometer();

        let infraDataJson = GetInfraData();

        this.infraData = JSON.parse(infraDataJson);
        this.checkpath();



        
    }

    componentWillUnmount()
    {
        this.unsubscribeToPedometer();
        this.unsubscribeToMagnetometer();
    }


    get_magnetometerValue=()=>{




       let x1;
       let y1;


      const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>
      {
        x1=x;
        y1=y;

      }

  
  
);


let heading=this.calculateHeading(x1,y1);
return heading;

    }

    checkpath=()=>{
      let i = 0;
    
    
      for(i = 0; i<this.infraData.Route.length; i++)
      {   
        var obj  = this.infraData.Route[i]; 
    
        if(!obj.Direction==this.state.heading)
        {
            console.log("You are in the wrong direction!!");
        }

        var j = 0;
        // this.setState({
        //   currentStepCount: 0
        // });

        //step count
let count=0;
                 




        // while(count<=10)
        // {

 




        //     if(!obj.Direction==this.state.heading)
        //     {
        //         console.log("You are not in the right direction!!: " + this.state.heading);

        //     }
        //     else if(j==obj.Steps && this.state.heading==obj.Direction){
        //       console.log("Reached : " + this.state.heading);
        //       break;
        //     }
        //     else if(obj.Direction==this.state.heading)
        //     {
        //       console.log("You are in the right direction: "+this.state.heading)
        //     j++;
           
        //     }
        //     count++;

        // }
        j=0;

        
      }
}



    

    componentDidUpdate()
    {
        //   var i = 0;
        //   for(i = 0; i<this.infraData.Route.length; i++)
        //   {
        //     var obj  = this.infraData.Route[i]; 
        
        //     if(!obj.Direction==this.state.heading)
        //     {
        //         console.log("You are in the right direction!!");
        //     }

        //     var j = 0;
        //     //step count

        //     while(this.state.currentStepCount != obj.Steps)
        //     {

        //         j++;
        //         //chek direction
        //         this.setState({
        //           currentStepCount: j
        //         });

        //         if(!obj.Direction==this.state.heading)
        //         {
        //             console.log("You are not in the right direction!!: " + this.state.heading);
        //         }
        //         else{
        //           console.log("You are in the right direction : " + this.state.heading);
        //           break;
        //         }
        //     }
        //     this.setState({
        //       currentStepCount: 0
        //     });

        // }

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

    render() 
      {
      return(<View><Text>{this.state.heading}</Text></View>)
      }

    }