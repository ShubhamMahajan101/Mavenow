


import { View, ScrollView,  StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, TextInput, } from "@react-native-material/core";
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg,  msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
import { fonts } from 'react-native-elements/dist/config';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


export default function CourseDetails({navigation}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [count, setCount] = useState('')
    const [duration, setDuration] = useState('')
  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
      {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
      <View style={styles.Header}>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
      <TouchableOpacity activeOpacity={0.8} style={{}} onPress={() => navigation.goBack()}>
      <Image style={{height:mobileW*10/100, height:mobileW*10/100, marginLeft:mobileW*-3/100}} resizeMode='contain'source={require("./Icon/bk.png")}></Image>
      </TouchableOpacity>
      <Text style={{fontSize:mobileW*3.5/100, fontFamily:Font.FontMedium, color:Colors.black_color, marginRight:mobileW*8/100}}>Android Course</Text>
      <Text style={{fontSize:mobileW*3.5/100, fontFamily:Font.FontRegular, color:Colors.black_color, marginRight:mobileW*8/100}}></Text>
      </View>
      <View style={styles.DetailsCard}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{color:Colors.black_color,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Course Details</Text>
      <TouchableOpacity activeOpacity={0.8}>
      <Image style={{width:mobileW*5/100, height:mobileW*5/100,tintColor:Colors.black_color, marginRight:mobileW*5/100}}
      resizeMode='contain'source={require("./Icon/ic_edit.png")}></Image>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', marginTop:mobileW*2/100}}>
        <View style={{width: mobileW*45/100, }}>
            <Text style={{color:Colors.black_color,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Skills</Text>
            <Text style={{color:Colors.gray,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Android</Text>

        </View>
        <View style={{width: mobileW*45/100, }}>
            <Text style={{color:Colors.black_color,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Level</Text>
            <Text style={{color:Colors.gray,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Basic</Text>

        </View>
      </View>
      <View style={{flexDirection:'row',  marginTop:mobileW*3/100}}>
        <View style={{width: mobileW*45/100, }}>
            <Text style={{color:Colors.black_color,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Duration</Text>
            <Text style={{color:Colors.gray,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>6 days</Text>

        </View>
        <View style={{width: mobileW*45/100, }}>
            <Text style={{color:Colors.black_color,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>Session Time</Text>
            <Text style={{color:Colors.gray,fontFamily:Font.FontMedium, fontSize:mobileW*3.5/100}}>15</Text>

        </View>
      </View>




  </View >
  <View style={{flexDirection:'row', justifyContent:'space-between', width:mobileW*92/100, marginTop:mobileW*3/100, alignSelf:'center'}}>
      <Text style={{color:Colors.black_color,fontFamily:Font.FontMedium, fontSize:mobileW*3.8/100}}>Syllabus Details</Text>
     <TouchableOpacity activeOpacity={0.8}>
      <Image style={{width:mobileW*5/100, height:mobileW*5/100,tintColor:Colors.black_color,  marginRight:mobileW*8/100}}
      resizeMode='contain'source={require("./Icon/ic_edit.png")}></Image>
      </TouchableOpacity>
      </View>


  {/* <View style={styles.textinput_view}>
      </View> */}

      <View style={{flexDirection:'row', alignSelf:'center', position:'absolute', bottom:8}}>
        <TouchableOpacity activeOpacity={0.8} style={{width:mobileW*45/100, height:mobileW*12/100, backgroundColor:Colors.lightgray,marginHorizontal:mobileW* 1/100, borderRadius:mobileW*2/100, alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:mobileW*4/100, color:Colors.black_color, fontFamily:Font.FontMedium}}>CLOSE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('FirebaseTutorial')}  activeOpacity={0.8} style={{width:mobileW*45/100, height:mobileW*12/100, backgroundColor:Colors.themecolor,marginHorizontal:mobileW* 1/100, borderRadius:mobileW*2/100, alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:mobileW*4/100, color:Colors.white_color, fontFamily:Font.FontMedium}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    Header: {
      backgroundColor: Colors.white_color,
      width: mobileW, 
      height: mobileW * 13 / 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

    },
    backIcon_: {

        // width: mobileW * 9.5 / 100,
        // height: mobileW * 9.5 / 100,
        tintColor: Colors.white_color
      },
      DetailsCard:{
        alignSelf:'center',  
        backgroundColor:Colors.white_color,
        width:mobileW*94/100, 
        padding:mobileW*2/100,
        borderRadius:mobileW*2/100,
        marginTop:mobileW*3/100,
        elevation: 2,
        shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        shadowOpacity: 0.1, 
    },
})