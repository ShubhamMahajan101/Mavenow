import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function YouTubePlayer() {

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View style={styles.Container}>
      <YoutubePlayer
        height={mobileH * 30 / 100}
        width={mobileW * 98 / 100}
        play={playing}
        videoId={"27WN1UKKphA"}
        onChangeState={onStateChange}
        onFullScreenChange={true}
      />
    </View>
  )
}

const styles =  StyleSheet.create({
  Container : {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.black_color
  }
})