import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList, TextInput, RefreshControl } from 'react-native'
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
import VideoRecorder from 'react-native-beautiful-video-recorder'
import DocumentPicker from 'react-native-document-picker';




const Job = ({ navigation, route }) => {
  const Details = route.params.Details
  console.log("your company details is...", Details);
  const [multipleFile, setMultipleFile] = useState([]);
  const [uploderesume, setUploderesume] = useState([]);
  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


const submitData =()=> {
  if (multipleFile.length == '') {
    msgProvider.toast(msgText.uplodeResumefile[config.language], 'center')
    return false
  }
  // if (uploderesume.length == '') {
  //   msgProvider.toast(msgText.uploderesume[config.language], 'center')
  //   return false
  // }
  navigation.navigate('Succefullyjob')
  
   }
  

  

  const videoRecorder = useRef(null)
  function startRecorder() {
    if (videoRecorder && videoRecorder.current) {
      videoRecorder.current.open({ maxLength: 30 }, (data) => {
        console.log('captured data', data);
      })
    }
  }

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {

        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        setUploderesume(res.uri)
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }

      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.Header} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }}
                source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.ApplyTxt[config.language]}</Text>
            <Text>      </Text>
          </View>

          {/* <View style={{}}> */}

          {/* 

           BL =  #121A23
White =  #FFFFFF
Gray =  #9B9B9B
BR =  #EFF2F1
BR2 =  #E7E8EA
Blue=  #00959E
BG =  #FAFAFA */}


          {/* 
        <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center', marginTop: mobileW * 3 / 100, backgroundColor:'yellow' }}>
          <Image resizeMode='contain' style={{ width: mobileW * 10 / 100, height: mobileW * 20 / 100, backgroundColor:'green' }} source={Details.Company_Logo}></Image>
          <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, 
          right: mobileW * 11 / 100, width: mobileW * 38 / 100 }}>{Details.company}</Text>
          <Text></Text>
        </View> */}

          <View style={styles.aboutCompany}>
            <View style={styles.Company_LogoView}>

              <Image resizeMode='contain' style={{ width: mobileW * 11 / 100, height: mobileW * 11 / 100, }}
                source={Details.Company_Logo}></Image>
            </View>
            <View style={{ width: mobileW * 45 / 100, marginHorizontal: mobileW * 2 / 100, }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{Details.company}</Text>
            </View>
          </View>

          <View style={{ marginLeft: mobileW * 4 / 100, marginTop: mobileW * 10 / 100, marginRight: mobileW * 4 / 100 }}>
            <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.VideoRecordingTxt[config.language]}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('VideoRecorder')} style={styles.VideoRecordingView}>
              <Image style={styles.SearchIcon_} resizeMode='contain' source={require("./Icon/video_new.png")}></Image>
              <Text style={{ fontSize: mobileW * 3.5 / 100, left: mobileW * 4 / 100, color: Colors.gray, 
              fontFamily: Font.FontRegular, width: mobileW * 75 / 100 }}>{Lang_chg.LiveVideoRecordingTxt[config.language]}</Text>

            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => selectMultipleFile()} style={{ marginLeft: mobileW * 4 / 100, 
          marginTop: mobileW * 5 / 100, marginRight: mobileW * 4 / 100 }}> */}
            <Text style={{ marginLeft: mobileW * 4 / 100, marginTop: mobileW * 5 / 100, fontSize: mobileW * 3.2 / 100, 
            fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.ResumeTxt[config.language]}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => selectMultipleFile()} style={[styles.VideoRecordingView,{marginLeft: mobileW * 4 / 100}]}>
              <Image style={styles.SearchIcon_} resizeMode='contain' source={require("./Icon/Pdf_file.png")}></Image>
              <Text style={{ width: mobileW * 80 / 100, marginLeft: mobileW * 4 / 100, }}>{uploderesume == '' ? Lang_chg.UploadanewresumefileTxt[config.language] : uploderesume}</Text>
              {/* <TextInput
            // uploderesume
              placeholder={uploderesume==''?Lang_chg.UploadanewresumefileTxt[config.language]:uploderesume}
              placeholderTextColor={'#9B9B9B'}
              fontSize={mobileW * 3.3 / 100}
              //    onChangeText={text =>setSearch(text)}
              style={{ left: mobileW * 3 / 100, fontFamily: Font.FontRegular, width: mobileW * 75 / 100 , }}>
            </TextInput> */}
            </TouchableOpacity>
          {/* </TouchableOpacity> */}



          <View style={{ marginLeft: mobileW * 4 / 100, marginTop: mobileW * 5 / 100, marginRight: mobileW * 4 / 100 }}>

            <TouchableOpacity activeOpacity={0.8} style={styles.ResumeSelectView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.ResumeSelect}>
                  <Image style={styles.SearchIcon_pdf} resizeMode='contain' source={require("./Icon/Pdf_file.png")}></Image>
                </View>

                <View style={{ alignSelf: "center", width: mobileW * 54 / 100, }}>
                  <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>Resume</Text>
                  <Text style={{ color: '#9B9B9B', fontSize: mobileW * 3.1 / 100, }}>1.9 Mb Upload on 1/2/2010</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => selectMultipleFile()}>
                <Text style={{ alignSelf: 'center', color: "#00959E", fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.SelectTxt[config.language]}</Text>
              </TouchableOpacity>
            </TouchableOpacity>




          </View>
          {/* <ScrollView>
          
          {multipleFile.map((item, key) => (
          <View key={key}>
          <Text style={styles.textStyle}>
              File Name: {item.name ? item.name : ''}
              {'\n'}
              Type: {item.type ? item.type : ''}
              {'\n'}
              File Size: {item.size ? item.size : ''}
              {'\n'}
              URI: {item.uri ? item.uri : ''}
              {'\n'}
            </Text>
          </View>
        
        ))}
      </ScrollView> */}



          <TouchableOpacity activeOpacity={0.8} style={styles.LoginView} onPress={() => navigation.navigate('Succefullyjob')}>
          {/* <TouchableOpacity activeOpacity={0.8} style={styles.LoginView} onPress={() => submitData()}> */}
            <Text style={styles.signup_txt}>{Lang_chg.SubmitTxt[config.language]}</Text>
          </TouchableOpacity>

          {/* </View> */}
          <VideoRecorder ref={videoRecorder} compressQuality={'medium'} />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
export default Job;
const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    height: mobileW * 15 / 100,
    padding: mobileW * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color
  },
  backIcon: {
    left: mobileW * 3 / 100,
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  aboutCompany: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: mobileW * 92 / 100,
    marginTop: mobileW * 5 / 100
  },
  Company_LogoView:{ 
    alignItems: 'center', 
    justifyContent: 'center' ,
    backgroundColor: '#FAFAFA', 
    width: mobileW * 14 / 100, 
    height: mobileW * 14 / 100, 
    borderRadius: mobileW * 1 / 100, 
  },
  SearchIcon_: {
    tintColor: '#9B9B9B',
    alignSelf: 'center',
    left: mobileW * 2 / 100,
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  SearchIcon_pdf: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: '#9B9B9B',
    alignSelf: 'center',
    tintColor: Colors.white_color,
  },
  LoginView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00959E',
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    width: mobileW * 92 / 100,
    height: mobileW * 13 / 100,
    marginTop: mobileW * 7 / 100,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
    borderRadius: mobileW * 1.5 / 100,
  },
  signup_txt: {
    color: Colors.white_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4.5 / 100,
  },
  ResumeSelect:{ 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: Colors.red, 
    right: mobileW * 2 / 100, 
    width: mobileW * 8 / 100, 
    height: mobileW * 12 / 100, 
    borderRadius: mobileW * 1 / 100 
  },
  VideoRecordingView:{
    alignItems: 'center',
    flexDirection: 'row', 
    borderColor: "#9B9B9B", 
    backgroundColor: "#FAFAFA",
    width: mobileW * 92 / 100, 
    height: mobileW * 12 / 100, 
    marginTop: mobileW * 1.5 / 100, 
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.1 / 100,
  },
//   ResumeView:{ 
//     alignItems: 'center',
//     flexDirection: 'row', 
//     borderColor: "#9B9B9B", 
//     backgroundColor: "#FAFAFA",
//     width: mobileW * 92 / 100, 
//     height: mobileW * 12 / 100, 
//     marginLeft: mobileW * 4 / 100,
//     marginTop: mobileW * 1.5 / 100, 
//     borderRadius: mobileW * 1 / 100, 
//     borderWidth: mobileW * 0.1 / 100, 
// },
  ResumeSelectView:{
    width: mobileW * 92 / 100, 
    height: mobileW * 14 / 100, 
    paddingLeft: mobileW * 3 / 100, 
    paddingRight: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100, 
    borderWidth: mobileW * 0.1 / 100, 
    alignItems: "center", 
    flexDirection: 'row', 
    borderColor: "#9B9B9B", 
    backgroundColor: "#FAFAFA", 
    justifyContent: 'space-between',
  }

})



