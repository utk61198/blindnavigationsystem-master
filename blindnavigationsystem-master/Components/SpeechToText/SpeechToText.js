import "react-native-gesture-handler";
import React from "react";
import { debounce } from "lodash";
import ShortestPath from "../../shortestpath"


import Tts from "react-native-tts";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Voice from "react-native-voice";

import playImage from "../../Assets/play.png";
import pauseImage from "../../Assets/pause.png";

import { data } from "./data";

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: "",
      started: "",
      results: [],
      start:"S2",
      end:"S1",

      active: false,
      currentImage: "./play.png",
      End: ""
    };

    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    this.setState({
      started: "√"
    });
  };

  onSpeechRecognized(e) {
    this.setState({
      recognized: "√"
    });
  }
  onSpeechEnd(e) {
    this.setState({
      End: "√",
      active: false
    });
  }
  onSpeechResults = debounce(e => {
    this.setState({
      results: e.value[0],
      end:e.value[0],
      //data: data
    });
    Tts.getInitStatus().then(() => {
      Tts.speak("Taking you to " + String(e.value[0]), Tts.QUEUE_FLUSH, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: "STREAM_ALARM"
        }
      });

      setTimeout(function() {
        Tts.speak(String(data), Tts.QUEUE_FLUSH, null, null);
      }, 5000);
    });
    console.log(e.value);
    console.log(data);
  }, 50);
  //this.splitTheWords(e.value[0])

  //Tts.setDucking(true);
  //Tts.addEventListener('tts-start', (event) => Tts.speak("taking you to " + String(this.state.x), { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_ALARM' } }));

  async _startRecognition(e) {
    // Tts.speak(
    //   "Please Say the destination after the beep. Thank you. where do u want to go"
    // );
    this.setState({
      recognized: "",
      started: "",
      results: [],
      active: true
    });

    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    // setTimeout(function() {
      try {
        Voice.start("en-US");
      } catch (e) {
        console.error(e);
      }
    // }, 5000);
  }

  //alert("start");

  async _stopRecognizing(e) {
    this.setState({
      active: false
    });
    setTimeout(function() {
      try {
        Voice.stop();
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    }, 5000);
  }

  render() {
  if(this.state.end!=null)
  alert(this.state.end)

    const shortest=<ShortestPath start={this.state.start} end={this.state.end}/>
    const text=<Text></Text>
    return (
      <View>
         <TouchableHighlight
        style={styles.container}
        onPress={
          this.state.active
            ? this._stopRecognizing.bind(this)
            : this._startRecognition.bind(this)
        }
      >
        <Image
          style={styles.imageStyle}
          source={this.state.active ? pauseImage : playImage}
        />
      </TouchableHighlight>
      <View>{this.state.start!=null && this.state.end!=null?shortest:text}</View>
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },

  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 480,
    height: 480
  }
});