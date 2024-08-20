import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import axios from "axios"
import { it } from 'date-fns/locale';
import { NativeWebViewAndroid } from 'react-native-webview/lib/WebViewTypes';
// import { TextInput } from 'react-native-gesture-handler';




const Job = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />

        <View>
          <TouchableOpacity activeOpacity={0.8} style={styles.Header} onPress={() => navigation.goBack()}>
            <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }}
              source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: mobileH * 35 / 100 }}>
            <View style={{}}>
              <Image style={styles.success_icon} resizeMode='contain' source={require("./Icon/26.png")}></Image>
              <Text style={styles.jobSuccessfullyText}>{Lang_chg.JobSuccessfullyAppliedTxt[config.language]}</Text>
              <Text numberOfLines={2} style={styles.successfullDescription}>Our hiring manager will be in touch with you shortly to discuss the next steps</Text>
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: mobileH * -32 / 100 }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.LoginView}>
              <Text style={styles.signup_txt}>{Lang_chg.SearchotherJobsTxt[config.language]}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Job')}>
              <Text style={styles.back_text}>{Lang_chg.BacktoHome[config.language]}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </View>
  )
}
export default Job;
const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    justifyContent: 'center',
    height: mobileW * 15 / 100,
    padding: mobileW * 4 / 100,
    backgroundColor: Colors.white_color
  },
  backIcon: {
    left: mobileW * 5.7 / 100,
    width: mobileW * 7.5 / 100,
    height: mobileW * 6.5 / 100,
  },
  SearchIcon: {
    alignSelf: 'center',
    tintColor: '#9B9B9B',
    left: mobileW * 2 / 100,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
  },
  signup_txt: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold
  },
  LoginView: {
    elevation: 1,
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOffset: { width: 0, },
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 88 / 100,
    height: mobileW * 12.8 / 100,
    marginLeft: mobileW * 6 / 100,
    marginRight: mobileW * 6 / 100,
    borderRadius: mobileW * 1.2 / 100,
    backgroundColor: Colors.themecolor,
  },
  back_text: {
    alignSelf: 'center',
    color: Colors.themecolor,
    fontFamily: Font.FontRegular,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.5 / 100,
  },
  success_icon: {
    alignSelf: "center",
    width: mobileW * 22 / 100,
    height: mobileW * 22 / 100,
    borderRadius: mobileW * 11 / 100
  },
  jobSuccessfullyText: {
    alignSelf: 'center',
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 5 / 100,
    fontSize: mobileW * 4.2 / 100
  },
  successfullDescription: {
    color: Colors.gray,
    textAlign: 'center',
    alignSelf: "center",
    fontFamily: Font.FontRegular,
    width: mobileW * 75 / 100,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.2 / 100,
  },
})


{/* 
BL =  #121A23
White =  #FFFFFF
Gray =  #9B9B9B
BR =  #EFF2F1
BR2 =  #E7E8EA
Blue=  #00959E
BG =  #FAFAFA 
*/}

