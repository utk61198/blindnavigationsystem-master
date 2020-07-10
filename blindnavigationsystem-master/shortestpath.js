/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Pedometer } from "expo-sensors";


import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';


import Graph from './graph';
import Tts from 'react-native-tts'
import Toast from 'react-native-simple-toast';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GetButton from './Components/Database/database';



export default class ShortestPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startNode: "",
      endNode: "",
      path: "",
      
    };
    const database_object =new GetButton();
    this.handleStart=this.handleStart.bind(this)
    this.handleEnd=this.handleEnd.bind(this)


  
  };

  static getDerivedStateFromProps(props,state) {
      
   if (props.start != state.startNode || props.end!=state.endNode) {
     let val1=props.start
     let val2=props.end
     if (val1=="W1"){
      val1 = 242;
    }
    
    else if (val1=="G1"){
      val1 = 246;
    }

    else if (val1=="R1"){
      val1 = 182;
    }

    else if (val1=="I1"){
      val1 = 186;
    }

    else if (val1=="S1"){
      val1 = 189;
    }

    else if (val1=="I2"){
      val1 = 190;
    }

    else if (val1=="G2"){
      val1= 250;
    }

    else if (val1=="C1"){
      val1 = 146;
    }
    else if (val1=="C2"){
      val1= 106;
    }

    else if (val1=="S2"){
      val1 = 148;
    }

    else if (val1=="S3"){
      val1 = 149;
    }

    else if (val1=="S4"){
      val1= 150;
    }

    else if (val1=="M1"){
      val1 = 107;
    }

    else if (val1=="M2"){
      val1= 108;
    }

    else if (val1=="M3"){
      val1= 109;
    }

    else if (val1=="F1"){
      val1= 110;
    }


    if (val2=="W1"){
      val2 = 242;
    }

    else if (val2=="G1"){
      val2 = 246;
    }

    else if (val2=="R1"){
      val2 = 182;
    }

    else if (val2=="I1"){
      val2 = 186;
    }

    else if (val2=="S1"){
      val2 = 189;
    }

    else if (val2=="I2"){
      val2 = 190;
    }

    else if (val2=="G2"){
      val2 = 250;
    }

    else if (val2=="C1"){
      val2 = 146;
    }
    else if (val2=="C2"){
      val2 = 106;
    }

    else if (val2=="S2"){
      val2 = 148;
    }

    else if (val2=="S3"){
      val2 = 149;
    }

    else if (val2=="S4"){
      val2 = 150;
    }

    else if (val2=="M1"){
      val2 = 107;
    }

    else if (val2=="M2"){
      val2 = 108;
    }

    else if (val2=="M3"){
      val2 = 109;
    }

    else if (val2=="F1"){
      val2 = 110;
    }


   





      

      return {
        startNode:val1+"",
        endNode:val2+"",
      };
   }

    // Return null if the state hasn't changed
    return null;
  }

  
componentDidMount(){
this.updatePath()



  }


  // componentDidUpdate(){

  //   this.updatePath()
  // }


  


  updatePath = function () {
    if ((this.state.startNode != null) && (this.state.endNode != null)) {
      let map;
      map = new Graph();

      let floorPlan = [];
      floorPlan.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      floorPlan.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      floorPlan.push([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
      floorPlan.push([0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1]);
      floorPlan.push([0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
      floorPlan.push([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1]);
      floorPlan.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1]);
      floorPlan.push([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      //console.log(floorPlan)
      for (i = 0; i < 13; i++) {
        for (j = 0; j < 20; j++) {
          if (floorPlan[i][j] == 1) {
            let current = 20 * i + j;
            let up = 20 * (i - 1) + j;
            let upPrevious = (20 * (i - 1) + j - 1);
            let upNext = (20 * (i - 1) + j + 1);
            let Previous = (20 * (i) + j - 1);
            map.addNode(`${current}`);
            if (j == 0) {
              if (floorPlan[i - 1][j] == 1) {
                map.addEdge(`${up}`, `${(current)}`, 1);
              }
              if (floorPlan[i - 1][j + 1] == 1) {
                map.addEdge(`${upNext}`, `${(current)}`, 20)
              }
            }
            else {
              if (floorPlan[i][j - 1] == 1) {
                map.addEdge(`${Previous}`, `${(current)}`, 1)
              }
              if (floorPlan[i - 1][j - 1] == 1) {
                map.addEdge(`${upPrevious}`, `${(current)}`, 20)
              }
              if (floorPlan[i - 1][j] == 1) {
                map.addEdge(`${up}`, `${(current)}`, 1);
              }
              if (floorPlan[i - 1][j + 1] == 1) {
                map.addEdge(`${upNext}`, `${(current)}`, 20)
              }
            }
          }
        }
      }
      // console.log(map.adjacencyList[56]);
      // start = 56;
      // end = 259;
      let newpath = map.findPathWithDijkstra(`${this.state.startNode}`, `${this.state.endNode}`);
      let direction = [];
      let i;
      for (i = 0; i < newpath.length - 1; i++) {
        if (newpath[i + 1] - newpath[i] == 20) {
          direction.push("Move Forward");
        }
        else if (newpath[i + 1] - newpath[i] == 21) {
          direction.push("Move Left Diagonal");
        }
        else if (newpath[i + 1] - newpath[i] == 19) {
          direction.push("Move Right Diagonal");
        }
        else if (newpath[i + 1] - newpath[i] == 1) {
          direction.push("Move Left");
        }
        else if (newpath[i + 1] - newpath[i] == -1) {
          direction.push("Move Right");
        }
        else if (newpath[i] - newpath[i + 1] == 20) {
          direction.push("Move Backward");
        }
        else if (newpath[i] - newpath[i + 1] == 21) {
          direction.push("Move Backward Diagonally Right");
        }
        else if (newpath[i] - newpath[i + 1] == 19) {
          direction.push("Move Backward Diagonally Left");
        }
        else if (newpath[i] - newpath[i + 1] == 1) {
          direction.push("Move Right ");
        }
        else if (newpath[i] - newpath[i + 1] == -1) {
          direction.push("Move Left");
        }

        // direction.push("  ");
      }

      let temp = [];
      let steps =1 ;
      for (var j = 0; j < direction.length; j++) {

          if (direction[j]==direction[j+1]){
            steps ++;
          }else{
           steps=steps*5
            const val={
              direction:direction[j] + ` ${steps} Step(s) `,
              stepcount:steps
            }
            temp.push(val);
            steps =1;
          }  
      
        //console.log (temp);
      }

      // for (var j = 0; j < direction.length; j++) {
      //   var steps = 0;
      //   while (direction[i] == "Move Forward") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Left Diagonal") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Right Diagonal") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Left") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Right") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Backward") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Backward Diagonally Right") {
      //     steps++;
      //   }
      //   newdir.push(steps);
      //   while (direction[i] == "Move Backward Diagonally Left") {
      //     steps++;
      //   }
      // }

        // var dict = {};
      //   let array1=[];

      //   for (var j = 0; j < direction.length; j++) {
      //     var item = direction[j];
      //     // console.log(dict[item]);
      //     array1.push(item);
      //     dict[item] = array1.length;
      //     array1=[];
      //     // dict[item] = dict[item] + 1;
      // }
      // while(i<length){
      //   steps =0;
      //   while(a[i]==a[i+1]){
      //     steps++;
      //   }
      //   print(a[i-1],steps)
      // }

      // console.log(newdir);

      // console.log(path);
      console.log(temp)
      // var Path=temp.split(" ");
      
 
      //   setTimeout(function() {
      //   Tts.speak(String(data), Tts.QUEUE_FLUSH, null, null);
      // }, 5000);

      let str=""
      for(i=0;i<temp.length;i++)
      {
 

        str=str+temp[i].direction+"\n"

      }

     //alert(str)
      
Tts.setDefaultRate(0.4);
let sleep_val=0;

let step_c=0;



// const doSomething = async () => {
//   for(i=0;i<=temp.length;i++) {
//     await sleep(sleep_val)
//     if(i<temp.length)
//     {if(temp[i].stepcount>=10)
//       sleep_val=temp[i].stepcount*700
//       else
//     sleep_val=temp[i].stepcount*1500
//     }
//     if(i==temp.length)
//         {
          

//           Tts.speak("You have reached your destination", {
//             androidParams: {
//               KEY_PARAM_PAN: 1,
             
//             },
//           });

//           Toast.show("You have reached your destination")
          

          
//         }
//         else
//         {
         

//               console.log(temp[i])
          
//           Tts.speak(temp[i].direction, {
//           androidParams: {
//             KEY_PARAM_PAN: 1,
            
//           },
//         });
//         Toast.show(temp[i].direction)
        
        
        


        





      
      
//       }
       
//   }
// }
// doSomething()



let count=0;
let flag=1;
Pedometer.watchStepCount(result => {
  step_c=result.steps

  if(count==0 && flag==1)
  {

    flag=0;
        Tts.speak(temp[count].direction, {
    androidParams: {
      KEY_PARAM_PAN: 1,
      
    },
  });
  Toast.show(temp[count].direction)
  step_track=temp[count].stepcount




  }
  
  else if(step_c-step_track>0)
  {

  

   
    
    count++;
    if(count<temp.length)
    {

     
    


      step_track=step_track+temp[count].stepcount

        console.log(temp[count])
  Tts.speak(temp[count].direction, {
        androidParams: {
          KEY_PARAM_PAN: 1,
          
        },
      });


      Toast.show(temp[count].direction)

   



    }
    else if(count==temp.length)
    {
    
      Tts.speak("You have reached your destination", {
        androidParams: {
          KEY_PARAM_PAN: 1,
          
        },
      });
      Toast.show("You have reached your destination")





  }
  }





});


// for(let i=0;i<=temp.length;i++)
// { 
  
// let start=new Date();
// if(i==temp.length)
// {


//   Tts.speak("You have reached your destination", {
//     androidParams: {
//       KEY_PARAM_PAN: 1,
      
//     },
//   });
//   Toast.show("You have reached yout destination")



// }



// else {

// let end=new Date()
// alert(end)
// let x=Pedometer.getStepCountAsync(start,end).steps
// while(x-temp[i].stepcount<0)
// {

//   end=new Date();
//   x=Pedometer.getStepCountAsync(start,end).steps;

// }
// Tts.speak(temp[i].direction, {
//   androidParams: {
//     KEY_PARAM_PAN: 1,
    
//   },
// });

// Toast.show(temp[i].direction)









// }



// }





  };
}

  handleStart = (text) => {
    if (text=="W1"){
      text = 242;
    }

    else if (text=="G1"){
      text = 246;
    }

    else if (text=="R1"){
      text = 182;
    }

    else if (text=="I1"){
      text = 186;
    }

    else if (text=="S1"){
      text = 189;
    }

    else if (text=="I2"){
      text = 190;
    }

    else if (text=="G2"){
      text = 250;
    }

    else if (text=="C1"){
      text = 146;
    }
    else if (text=="C2"){
      text = 106;
    }

    else if (text=="S2"){
      text = 148;
    }

    else if (text=="S3"){
      text = 149;
    }

    else if (text=="S4"){
      text = 150;
    }

    else if (text=="M1"){
      text = 107;
    }

    else if (text=="M2"){
      text = 108;
    }

    else if (text=="M3"){
      text = 109;
    }

    else if (text=="F1"){
      text = 110;
    }

    this.setState({ startNode: text })
  }


  handleEnd = (text) => {
    if (text=="W1"){
      text = 242;
    }

    else if (text=="G1"){
      text = 246;
    }

    else if (text=="R1"){
      text = 182;
    }

    else if (text=="I1"){
      text = 186;
    }

    else if (text=="S1"){
      text = 189;
    }

    else if (text=="I2"){
      text = 190;
    }

    else if (text=="G2"){
      text = 250;
    }

    else if (text=="C1"){
      text = 146;
    }
    else if (text=="C2"){
      text = 106;
    }

    else if (text=="S2"){
      text = 148;
    }

    else if (text=="S3"){
      text = 149;
    }

    else if (text=="S4"){
      text = 150;
    }

    else if (text=="M1"){
      text = 107;
    }

    else if (text=="M2"){
      text = 108;
    }

    else if (text=="M3"){
      text = 109;
    }

    else if (text=="F1"){
      text = 110;
    }


    this.setState({ endNode: text })
  }

  render() {
    return (
    //   <View style={styles.container}>
    //     <TextInput style={styles.input}
    //       underlineColorAndroid="transparent"
    //       placeholder="Enter Start Node"
    //       placeholderTextColor="#9a73ef"
    //       autoCapitalize="none"
    //       onChangeText={this.handleStart} />

    //     <TextInput style={styles.input}
    //       underlineColorAndroid="transparent"
    //       placeholder="Enter End Node"
    //       placeholderTextColor="#9a73ef"
    //       autoCapitalize="none"
    //       onChangeText={this.handleEnd} />

    //     <TouchableOpacity
    //       style={styles.submitButton}
    //       onPress={
    //         () => this.updatePath()
    //       }>
    //       <Text style={styles.submitButtonText}> Submit </Text>
    //     </TouchableOpacity>
    //     <Text style = {styles.textstyle}>{this.state.path}</Text>

    //     <GetButton/>
    //   </View>

    null


    )

  }

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  textstyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
  },
  // inditext: {
  //   justifyContent: 'center',
  //   textAlign: 'center',
  //   fontSize: 16,
  // }
})