import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import YouTube from 'react-native-youtube';
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width
const mobileH = Dimensions.get('window').height
const VideoRecorder = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [camerastate, setcamerastate] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  // start video recording function 
  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true)
      try {
        const options = { quality: RNCamera.Constants.VideoQuality['720p'] };
        const { uri } = await cameraRef.current.recordAsync(options);
        const saved = await CameraRoll.saveToCameraRoll(uri, 'video');
        if (saved) {
          alert('Video saved to gallery successfully!');
        } else {
          alert('Failed to save the video to the gallery.');
        }
      } catch (error) {
        console.error('Error recording video:', error);
      }
    }

    console.log('startRecording >>>>');
  };

  //   stop recording function 
  const stopRecording = () => {
    setIsRecording(false)

    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
    console.log('..stopRecording >>>');
  };

  return (
    <View style={{ flex: 1 }}>

      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={camerastate ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off} />


      <TouchableOpacity style={{ top:mobileW*10/100, position: 'absolute', alignSelf: 'flex-end' }} activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Image style={styles.closeIcon}
          source={require('./Icon/close2.png')} />
      </TouchableOpacity>
      <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 20, position: 'absolute', alignSelf: 'center' }}>

        {/* <Timer
            totalDuration={timerDuration}
            msecs
            // Time Duration
            start={isTimerStart}
            // To start
            reset={resetTimer}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {alert('Custom Completion Function');
            }}
            // Can call a function On finish of the time
            getTime={(time) => {
            console.log(time);
            }}/> */}
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: mobileW * 3 / 100 }}>
          {/* <TouchableOpacity onPress={() => {setIsRecording(!isRecording), setIsTimerStart(!isTimerStart)}}> */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIsRecording(!isRecording)}>
            <Text>
              {isRecording ?
                  <View style={{ borderColor: "white", borderWidth: mobileW * 0.4 / 100, borderRadius: mobileW * 10 / 100 }}>
                  <TouchableOpacity onPress={() => stopRecording()} style={styles.stopButton}>
                    <Text style={styles.startStoptext}>Start</Text>
                  </TouchableOpacity>
                </View>
              
                :
                <View style={{ borderColor: "white", borderWidth: mobileW * 0.4 / 100, alignItems:'center', justifyContent:'center', width:mobileW*15/100, height:mobileW*15/100, borderRadius: mobileW * 10 / 100 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { startRecording(), setIsTimerStart(!isTimerStart) }} 
                style={{width:mobileW*6/100, height:mobileW*6/100, borderRadius:mobileW*1/100, backgroundColor:'red'}}>
                  {/* <Text style={styles.startStoptext}>Stop</Text> */}
                </TouchableOpacity>
              </View>

              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => setcamerastate(!camerastate)} style={styles.frontCamerabutton}>
        <Image style={styles.frontCamera} resizeMode="contain" source={require("./Icon/Frontcamera.png.png")} />
      </TouchableOpacity>


    </View>
  );
};

export default VideoRecorder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontCamerabutton: {
    width: 80,
    height: 40,
    position: "absolute",
    bottom: 35,
    alignSelf: 'flex-end'
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
  closeIcon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    right: mobileW * 2 / 100,
    tintColor: Colors.white_color
  },

  startStoptext: {
    color: Colors.white_color,
    textAlign: 'center',
    fontSize: mobileW * 4 / 100
  },
  frontCamera: {
    width: mobileW * 10 / 100,
    height: mobileH * 10 / 100,
    tintColor: Colors.white_color,
  },
  stopButton: {
    backgroundColor: Colors.red,
    width: mobileW * 15 / 100,
    height: mobileW * 15 / 100,
    justifyContent: 'center',
    borderRadius: mobileW * 10 / 100
  }

});

const options = {
  // container: {
  //   backgroundColor: 'blue',
  //   padding: 5,
  //   borderRadius: 5,
  //   width: 200,
  //   alignItems: 'center',
  // },
  text: {
    fontSize: 25,
    color: "red",
    marginLeft: 7,
  },
};





