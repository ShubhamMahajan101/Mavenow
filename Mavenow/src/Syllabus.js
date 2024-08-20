import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageComponent } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
import { fonts } from 'react-native-elements/dist/config';
import { it } from 'date-fns/locale';
import { brown100 } from 'react-native-paper/lib/typescript/styles/colors';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 41,
    title: 'Android',
    discription: 'Android we can customize the OS based on our requirements'
  },
  {
    id: 42,
    title: 'Android Setup',
    discription: 'Android Open Source Project so we can customize the OS based on our requirements.'
  },
  {
    id: 43,
    title: 'Android Studio Setup',
    discription: 'The design of the Android Application has guidelines from Google, which becomes easier for...'
  },
  {
    id: 44,
    title: 'Android Intro',
    discription: 'Android Open Source Project so we can customize the OS based on our requirements.'
  },
  {
    id: 45,
    title: 'ALayout View',
    discription: 'Layout View is very important of Android'
  },

];


export default function Syllabus({ navigation }) {
  const [itemDeletmodal, setItemDeletmodal] = useState(false)
  const [itemDelet, setItemDelet] = useState(DATA)
  const [removeid, setRemoveid] = useState(0)


  const handleRemove = ( ) => {
    var id = removeid
    const Datalist = itemDelet.filter((items) => items.id !== id);
 
    console.log("item Remove :- ",Datalist);
    console.log("item Remove :- ",id);
    setItemDelet(Datalist)
  };


  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}  >
              <Image style={{width:mobileW*6/100, height:mobileW*6/100}} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
              </TouchableOpacity>
              <Text style={{ color: Colors.black_color, fontSize: mobileW *4/ 100,fontFamily:Font.FontSemiBold,}}>{Lang_chg.SyllabusTxt[config.language] }</Text>
              <Text></Text>
              </View>

{itemDelet==''?
<View style={{flex:1, justifyContent:'center', alignItems:'center', }}>
  <Image resizeMode='contain' style={{width:mobileW*55/100, height:mobileW*55/100, }}
  source={require('./Icon/graphics_learner.png')}></Image>
  <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('CreateSyllabus')} style={{backgroundColor:Colors.themecolor, borderRadius:mobileW*2/100, padding:mobileW*4/100, marginTop:mobileW*5/100}}>
    <Text style={{fontSize:mobileW*4/100, color:Colors.white_color, fontFamily:Font.FontSemiBold}}>CLICK HERE TO ADD YOUR SYLLABUS</Text>
  </TouchableOpacity>
</View>:
 
        <View style={{ paddingBottom: mobileH * 20 / 100 }}>

          <FlatList
            data={itemDelet}
            renderItem={({ item, index }) =>
              <View style={styles.CardView}>
                <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular, color: Colors.black_color }}>{item.title}</Text>
                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>{item.discription}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: mobileW * 3 / 100, alignItems:'center' }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CreateTopic')}>
                    <Image resizeMode='contain' style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100,  }}
                      source={require('./Icon/Group_269.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CreateSyllabus')}>
                    <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100,  marginHorizontal: mobileW * 2 / 100 }}
                      source={require('./Icon/Group_270.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>{setItemDeletmodal(true),setRemoveid(item.id)}}>
                  {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>handleRemove(item.id)}> */}
                  <Image resizeMode='contain' style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100,}}source={require('./Icon/Group_271.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            } />
        </View>}



            <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 8 }}>
            <TouchableOpacity  activeOpacity={0.8} style={styles.ExitBtn}>
            <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontSemiBold }}>{Lang_chg.PREVIEWTxt[config.language]}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.NextBtn} onPress={()=>navigation.navigate('CreateSyllabus')}>
            <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.white_color, fontFamily: Font.FontSemiBold }}>{Lang_chg.ADDTOPICTxt[config.language]}</Text>
            </TouchableOpacity>
            </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


        <View  >
        <Modal
              animationType='fade'
               transparent={true}
              // {item.id} setItemDeletmodal=
               visible={itemDeletmodal}>
              <View style={styles.modal_commission}>
              <View style={[styles.ModelCard]}>
              <View style={styles.ModelHeader}>
              <Text style={styles.Alert_text}>{Lang_chg.AlertTxt[config.language]}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>setItemDeletmodal(!itemDeletmodal)}>
              {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>setItemDeletmodal(!itemDeletmodal)}> */}
              <Image style={{width:mobileW*6/100, height:mobileW*6/100, tintColor:Colors.color_orange}} resizeMode='contain'
               source={require("./Icon/close2.png")}></Image>
               </TouchableOpacity>
              </View>

              <View style={{width:mobileW*85/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA',  marginBottom: mobileW * 5 / 100,}}></View>               
              <Text style={styles.commission_TExt}>{Lang_chg.yousuredeleteTxt[config.language]}</Text>
              <View style={{ alignItems: 'center', flexDirection:'row', justifyContent: 'center', marginTop: mobileW * 3 / 100 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setItemDeletmodal(!itemDeletmodal)} style={[styles.ok_Button,{backgroundColor:Colors.white_color}]} >
              <Text style={[styles.OK_TExt,{color:Colors.themecolor}]}>{Lang_chg.NOTxt[config.language]}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() =>{handleRemove(),setItemDeletmodal(!itemDeletmodal)}} style={styles.ok_Button}>
              <Text style={styles.OK_TExt}>{Lang_chg.OkTxt[config.language]}</Text>
              </TouchableOpacity>
              </View>
              </View>
              </View>
              </Modal>
              </View>




        {/* </View>  */}
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
    height: mobileW * 15 / 100,
    paddingLeft:mobileW*2/100,
    paddingRight:mobileW*2/100,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row', 
  },
  CardView: {
    width: mobileW * 96 / 100,
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
    marginBottom: mobileW * 0.5 / 100,
    backgroundColor: Colors.white_color,
    alignSelf: 'center',
    borderColor: "#e8edfb",
    borderWidth: mobileW*0.3/100,
  },
  NextBtn: {
    width: mobileW * 47 / 100,
    height: mobileW * 11 / 100,
    backgroundColor: Colors.themecolor,
    marginHorizontal: mobileW * 1 / 100,
    borderRadius: mobileW * 1.5 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ExitBtn: {
    width: mobileW * 47 / 100,
    height: mobileW * 11 / 100,
    backgroundColor: Colors.lightgray,
    marginHorizontal: mobileW * 1 / 100,
    borderRadius: mobileW * 1.5 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_commission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000060'
  },
  ModelCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  ModelHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    height: mobileW * 13 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft:mobileW*3/100, 
    paddingRight:mobileW*3/100,
    backgroundColor: Colors.white_color
  },
  Alert_text: {
    color: Colors.black_color,
    fontSize: mobileW * 4.5 / 100,
    fontFamily:Font.FontMedium
  },
  commission_TExt: {
    fontSize: mobileW * 3.5 / 100,
    fontFamily:Font.FontRegular,
    color: Colors.black_color,
    textAlign: 'center'
  },
  ok_Button: {
    width: mobileW * 22 / 100,
    height: mobileW * 8 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mobileW * 2 / 100,
    marginBottom: mobileW * 3 / 100,
    marginHorizontal:mobileW*1/100,
    borderWidth:mobileW*0.2/100,
    borderColor:Colors.themecolor
  },
  OK_TExt: {
    fontSize: mobileW * 4 / 100,
    fontFamily:Font.FontMedium,
    color: Colors.white_color
  },
})