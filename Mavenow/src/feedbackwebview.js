import {StatusBar, ScrollView, Animated, FlatList, TextInput, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserSliderDot from './UserSliderDot';
import { Colors, Font } from './Provider/Colorsfont';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { colors } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
// import { TextInput } from 'react-native-gesture-handler';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    className: 'Class Name',
    Learner: 'Learner',
    Maven: 'Maven',
    Duration: 'Duration:',
    StartDate: 'Start Date',
    EndDate: 'End Date',
    Feedback: 'Feedback Date'
    // image: require('./Icon/galley_placeholder.png'),
    // title: 'test',
    // description: 'this is only test',
    // awards: 'Awarded on:27, Sep 2022',
  },

]

export default function Feedback({navigation}) {
  const [description, setDescription] = useState(null);


  useEffect(() => {
    apiCalling();
    // recommendedApi();
  }, [])

  const apiCalling = () => {
    axios.post('https://mavenow.com:8001/GetFeedbackQuestionList?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI&userId=848', {

    })
      .then(function (data) {

        var GetData = data.data.result
        console.log("data=========>", GetData);


        // if(ResponseMessage=="successfuly") {
        //   setResult(GetData)
        //   // navigation.navigate('Home')
        //   // navigation.navigate('Testing')
        //   console.log('=============>',result.old);
        // }else{

        // }

      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.Header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
        </TouchableOpacity>
          <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontSemiBold,  }}>Feedback</Text>
          <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontSemiBold,  }}> </Text>
        </View>
        <View>
          <FlatList
            data={DATA}
            renderItem={({ item, index }) =>
              <View style={{ width: mobileW * 92 / 100, alignSelf: 'center', flexDirection: 'row', margin: mobileW * 4 / 100, }}>
                <View style={{ width: mobileW * 30.6 / 100, }}>
                  <View >
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>Class Name</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.className}</Text>
                  </View>
                  <View style={{ marginTop: mobileW * 2 / 100, }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>Learner</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.Learner}</Text>
                  </View>
                  <View style={{ marginTop: mobileW * 2 / 100 }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>Start Date</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.className}</Text>
                  </View>
                </View>
                <View style={{ width: mobileW * 30.7 / 100, }}>
                  <View >
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}> </Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}> </Text>
                  </View>
                  <View style={{ marginTop: mobileW * 2 / 100 }} >
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>Maven</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.StartDate}</Text>
                  </View>
                  <View style={{ marginTop: mobileW * 2 / 100 }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>End Date</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.EndDate}</Text>
                  </View>
                </View>
                <View style={{ width: mobileW * 30.7 / 100, }}>
                  <View >
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}> </Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}> </Text>
                  </View>
                  <View style={{ marginTop: mobileW * 2 / 100 }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>Duration:</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.Duration}</Text>
                  </View>
                  <View style={{ marginTop: mobileW * 2 / 100 }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>Feedback Date</Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.dark_gray, fontFamily:Font.FontRegular }}>{item.Feedback}</Text>
                  </View>

                </View>
              </View>}
          />
        </View>
        <Text style={{ paddingTop: mobileW * 4 / 100, paddingLeft: mobileW * 4 / 100, color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontRegular }}>Your Rating:</Text>
        <View style={{ flexDirection: 'row', paddingLeft: mobileW * 4 / 100, }}>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
        </View>
        <Text style={{ paddingTop: mobileW * 4 / 100, paddingLeft: mobileW * 4 / 100, color: Colors.black_color, fontSize: mobileW * 4 / 100 }}>Review Description:</Text>
        <View style={{ width: mobileW * 92 / 100, height: mobileH * 22 / 100, marginTop: mobileW * 2 / 100, backgroundColor: Colors.white_color, elevation: 1, borderColor: Colors.themecolor, borderWidth: mobileW * 0.4 / 100, alignSelf: 'center', borderRadius: mobileW * 3 / 100 }}>
          <TextInput style={{ fontSize: mobileW * 5 / 100, color: Colors.gray, padding: mobileW * 2 / 100, fontFamily:Font.FontRegular }}
            multiline onChangeText={setDescription}
            value={description}
            placeholderTextColor={Colors.gray}
            placeholder="Review"
          // keyboardType="numeric"
          />
        </View>
        <Text style={{ paddingTop: mobileW * 4 / 100, paddingLeft: mobileW * 4 / 100, color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontRegular }}>Your Rating:</Text>
        <View style={{ flexDirection: 'row', paddingLeft: mobileW * 5 / 100, }}>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
          <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
            source={require('./Icon/star.png')}></Image>
        </View>

        {/* ======================================= Login Button ===================================== */}
        <TouchableOpacity activeOpacity={0.8} style={styles.LoginView}  onPress={() => navigation.navigate('Feedback1')}>
          <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.white_color, fontFamily:Font.FontMedium }}>POST</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"red"
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW, 
    height: mobileW * 15 / 100,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft:mobileW*4/100,
    paddingRight:mobileW*4/100
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 14 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 3 / 100,
    margin: mobileW * 4 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,


  },
})



// import * as React from 'react';
// import { WebView } from 'react-native-webview';
// import { StyleSheet } from 'react-native';
// import Constants from 'expo-constants';

// export default function App() {
//   return (
    
//     <WebView
//       style={styles.container}
//       source={{ uri: 'https://tawk.to/chat/602650c2918aa261273e3d65/1euaqmub1' }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
// });
