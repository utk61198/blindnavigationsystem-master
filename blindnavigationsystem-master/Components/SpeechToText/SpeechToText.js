import "react-native-gesture-handler";
import React from "react";
import { debounce } from "lodash";
import ShortestPath from "../../shortestpath";
import Toast from 'react-native-simple-toast';


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

import data from "./data";

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: "",
      started: "",
      results: [],
      start: "S2",
      endnode: null,
      endDest: "",
      dataSource: "",
      active: false,
      currentImage: "./play.png",
      End: "",
      end: null
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
      started: "v",
      dataSource: data.info
    });
  };

  onSpeechRecognized(e) {
    this.setState({
      recognized: "v"
    });
  }
  onSpeechEnd(e) {
    this.setState({
      End: "v",
      active: false
    });
  }
  onSpeechResults = debounce(e => {
    this.splitTheWords(e.value[0]);
    this.setState({
      end: this.state.endnode
    });

    // Tts.getInitStatus().then(() => {
    //   if (this.state.endnode != null) {
    //     Tts.speak(
    //       "Taking you to " + String(this.state.endDest),
    //       Tts.QUEUE_FLUSH,
    //       {
    //         androidParams: {
    //           KEY_PARAM_PAN: -1,
    //           KEY_PARAM_VOLUME: 1,
    //           KEY_PARAM_STREAM: "STREAM_ALARM"
    //         }
    //       }
    //     );
    //   }
    // });
    // console.log(e.value);
    //console.log(data);
  }, 50);

  //Tts.setDucking(true);
  //Tts.addEventListener('tts-start', (event) => Tts.speak("taking you to " + String(this.state.x), { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_ALARM' } }));

  async _startRecognition(e) {
    Tts.speak(
      "Please Say the destination after the beep."
    );
    this.setState({
      recognized: "",
      started: "",
      results: [],
      active: true
    });

    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    // setTimeout(function() {
      sleep(3000).then(() => {
        try {
          Voice.start("en-US");
        } catch (e) {
          console.error(e);
        }
        //// code
        })

 
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


  

  splitTheWords = val => {
    let arr = val.split(" ");
    console.log(arr);
    let count = true;

    for (let j = 0; j < this.state.dataSource.length && count == true; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (this.state.dataSource[j].destination == arr[i]) {
          this.state.endnode = this.state.dataSource[j].node;
          
          this.state.endDest = this.state.dataSource[j].destination;
          count = false;
        }
      }
    }
    if (count == true) {
      this.state.endnode = null;
      this.state.endDest = Tts.speak(
        "This destination does not exist in the building"
        
      );
      Toast.show("This destination does not exist in the building")
    }
    //alert(this.state.endnode);
    console.log(this.state.endnode);
  };

  render() {
    // if (this.state.endnode != null) alert(this.state.endnode);
    // console.log(this.state.end);

    const shortest = (
      <ShortestPath start={this.state.start} end={this.state.end} />
    );
    const text = <Text></Text>;
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
        <View>
          {this.state.start != null && this.state.end != null ? shortest : text}
        </View>
      </View>
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
