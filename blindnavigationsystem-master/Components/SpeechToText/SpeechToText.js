// App.js
import React from 'react';

import Tts from 'react-native-tts';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Voice from 'react-native-voice';

import playImage from '../../Assets/play.png'
import pauseImage from '../../Assets/pause.png'
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
	  active : false,
	  currentImage: './play.png',
    End: ''
    };
	  Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);

  }
  
  
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
 onSpeechEnd(e) {
  
    this.setState({
      End: '√',
	  active: false
    });
  };
onSpeechResults(e) {
  //this.splitTheWords(e.value[0])
    this.setState({
      results: e.value[0],
    });
	 Tts.getInitStatus().then(() => {
	 Tts.speak(String(e.value[0]), { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_ALARM' } });;
   Tts.setDucking(true);
   //Tts.addEventListener('tts-start', (event) => Tts.speak("taking you to " + String(this.state.x), { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_ALARM' } }));
	});
	console.log(e.value[0])
  }
  

  splitTheWords=(val)=>
  {
    let arr=val.split(" ");
    //alert(arr)
    
 
  let keymap=new Map();


for(let i=0;i<arr.length;i++)
{
  let key=arr[i];
  if(arr[i]=="name"||arr[i]=="ID"||arr[i]=="mobile"||arr[i]=="sub-centre"||arr[i]=="subCentre")
  {
    keymap.set(arr[i],"");
    let temp;
    for(let j=i+1;j<arr.length;j++){
      if(arr[j]=="name"||arr[j]=="ID"||arr[j]=="mobile"||arr[j]=="sub-centre"||arr[i]=="subCentre")
      {

        keymap.set(arr[i],temp)
                   break;

      }
      else if(j==arr.length-1)
      {        temp=temp+arr[j];

        keymap.set(arr[i],temp)

      }
      else{
        temp=temp+arr[j];

      }

      
    }


  }
}

let name=keymap.get("name")
if(name)
name=keymap.get("name").split("undefined")[1];

let id=keymap.get("ID")
if(id)
id=keymap.get("ID").split("undefined")[1];

let mobile=keymap.get("mobile")
if(mobile)
mobile=keymap.get("mobile").split("undefined")[1];

let sc=keymap.get("subCentre") 
if(sc)
sc=keymap.get("subCentre").split("undefined")[1];


alert(name+"     "+id+"   "+mobile+"    "+sc)





}
  
  

  async _startRecognition(e) {
    console.log("start button pressed")
    this.setState({
      recognized: '',
      started: '',
      results: [],
	    active: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
 
async  _stopRecognizing(e){
  console.log("stop button pressed")
	  this.setState({
	  active: false,
    });
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  // testing=()=>{
  //   Tts.speak("Hello")
  // }


render () {
    return (
      <View  style={styles.MainContainer}>
  
	<TouchableHighlight onPress={
 this.state.active ?  this._stopRecognizing.bind(this) : this._startRecognition.bind(this)

}>

	
	<Image source={this.state.active ? pauseImage : playImage} />
    </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems : 'center',

  },
  imageStyle : {
	width: 100,
    height: 100,
  }
});