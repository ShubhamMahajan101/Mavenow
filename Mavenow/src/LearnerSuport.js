
import { View, ScrollView, StatusBar, ImageBackground, TextInput as TextInputPepar, Text,  StyleSheet, Dimensions, TouchableOpacity, Image ,Modal,RefreshControl} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Font } from './Provider/Colorsfont';
import { Stack, TextInput, } from "@react-native-material/core";
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { useState } from 'react';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function LearnerSuport({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible,setModalVisible] =useState(false)

      // ================ refresh controller 
      const [refreshing, setRefreshing] = React.useState(false);
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
      // ================ refresh controller

  return (
       <View style={{ flex: 1, }}>
       <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>

        
    <ScrollView
       
       refreshControl={
         <RefreshControl 
         // tintColor={Colors.themecolor}
         colors={[Colors.themecolor]}
         refreshing={refreshing} onRefresh={onRefresh} />
       }>

        {/* ======> Header */}
        <View style={styles.Header}>
        <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon_Arrow} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
        </TouchableOpacity>
        <Text style={{ color: Colors.black_color,  fontFamily:Font.FontMedium, fontSize: mobileW * 4.5 / 100 }}>{Lang_chg.Supporttext[config.language]}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>setModalVisible(true)} >
        <Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/about.png")}></Image>
        </TouchableOpacity>
        </View>
        {/* ======> Header */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }} >
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.ModelCard}>
                <View style={styles.ModelHeader}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium, }}>Help:Learner Request</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
                    <Image style={styles.backIcon_CLOSE} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>

                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular, }}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>


        <View style={{paddingLeft:mobileW*4/100,paddingRight:mobileW*4/100,}} >
        <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontMedium}}>We are looking forward to providing you support.
         Please fill out information below and a team member will be with you soon.</Text>

            <View style={{marginTop: mobileW * 3 / 100,height:mobileW*15/100,}}>
            <TextInput color={Colors.themecolor}
            height={mobileW*15/100}
            fontFamily={Font.FontRegular}
            // backgroundColor={'red'}
            label="Question" variant="outlined" trailing={props => (<Text></Text>)}/>

          </View>
          <View style={{ marginTop: mobileW * 3 / 100 }}>
            <TextInput color={Colors.themecolor} 
             fontFamily={Font.FontRegular}
            label="Answer" variant="outlined" trailing={props => (<Text></Text>)} />

          </View>

          <View style={styles.inputBoxView}>
            <TextInputPepar
         style={{fontSize:mobileW*5/100,color:Colors.gray,padding:mobileW*2/100, height:mobileW*35/100, }}
         multiline
        onChangeText={onChangeNumber}
        textAlignVertical='top'
        value={number}
        placeholderTextColor = {Colors.gray}
        placeholder="Hello,"
        // keyboardType="numeric"
      />
          </View>
          {/* ======================================= Submit Button ===================================== */}

          <TouchableOpacity activeOpacity={0.8} style={styles.LoginView} onPress={()=>navigation.navigate('UserMaven')}>
            {/* <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily:Font.FontMedium}}>{Lang_chg.SUBMITtext[config.language]}</Text> */}
            <Text style={{ fontSize: mobileW * 4.5/ 100, color: Colors.white_color,fontFamily:Font.FontMedium }}>{Lang_chg.SUBMITtext[config.language]}</Text>
          </TouchableOpacity>
          
        </View>


        <View style={{ bottom: mobileW * 0 / 100, }}>

          <Image resizeMode='contain' style={{ width: mobileW, height: mobileH * 30 / 100, }}
            source={require('./Icon/graphic_new.png')}>

          </Image>

        </View>
        </ScrollView>
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
    paddingRight:mobileW*4/100,
    paddingLeft:mobileW*4/100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.black_color
  },
  backIcon_Arrow: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  inputBoxView: {
    borderColor: Colors.lightgray,
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    width: mobileW * 92 / 100,
    alignSelf: 'center',
    // height: mobileW * 35 / 100,

  },
  ModelCard: {
    width: mobileW * 85 / 100, 
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
},
backIcon_: {
  width: mobileW * 6 / 100,
  height: mobileW * 6 / 100,
  tintColor: Colors.black_color
},
ModelHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft:mobileW*3/100, 
    paddingRight:mobileW*3/100,
    backgroundColor: Colors.white_color,
    flexDirection:'row',
    justifyContent:'space-between'
},
ModelCard: {
  width: mobileW * 90 / 100,
  borderRadius: mobileW * 2 / 100,
  backgroundColor: Colors.white_color,
  elevation: 5
},
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 6 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  backIcon_CLOSE:{
    width:mobileW*6/100,
    height:mobileW*6/100,
    tintColor:Colors.color_orange
  }
}
)


// import {   Alert, ScrollView, TextInput, StatusBar, Modal, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet,RefreshControl } from 'react-native'
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors, Font } from './Provider/Colorsfont';
// import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

// import { WebView } from 'react-native-webview';
// import HTMLView from 'react-native-htmlview';
// import AnimatedLoader from 'react-native-animated-loader';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import axios from 'axios';
// import style from 'react-native-beautiful-video-recorder/lib/style';
// const data =[
//   {
//     id:1,
//     name:"daurav",
//     status:true
//   },
//   {
//     id:15,
//     name:"daurav",
//     status:false
//   },
//   {
//     id:155554,
//     name:"daurav",
//     status:false
//   },
//   {
//     id:17555555,
//     name:"daurav",
//     status:false
//   },
//   {
//     id:4555714,
//     name:"daurav",
//     status:false
//   },
//   {
//     id:4444414,
//     name:"daurav",
//     status:false
//   },
//   {
//     id:1444475,
//     name:"daurav",
//     status:false
//   },
//   {
//     id:7444414,
//     name:"daurav",
//     status:false
//   },
// ]


// const LearnerSuport =()=> {
//   const [checked, setChecked] = useState(data)
  
// const onSelectedItemsChange=(gaurav)=> {
//     let temp=checked         
//     temp.map((item,index)=> {
//       if(index === gaurav) item.status=!item.status 
//     })
//     setChecked([...temp]) 
//   }





//   const Radio_Button = (item) => {
//     var data = checked
//     let updatedState = data.map((data) =>
//         data.id === item.id
//           ? 
//              { ...data, status: true }
//           :  { ...data, status: false }
//       );
//       setChecked(updatedState);
//       console.log('i am here with data -----', updatedState);
//     };
  
    
//   return (
//     <View>
//           {/* <View style={{flexDirection:"row"}}>
//           <TouchableOpacity  onPress={()=>setChecked('Current')} style={{backgroundColor:checked==='Current'?"red":"purple",width:105,height:30}}>
//            <Text>jay</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={()=>setChecked('old')} style={{backgroundColor:checked ==='old'?"red":"purple",width:105,height:30}}>
//           <Text>jay</Text>
//           </TouchableOpacity>
//        </View> */}
//        <FlatList
//        data={checked}
//        renderItem={({item,index})=>

//          <View>
//           <Text>{item.name}</Text>
//           <TouchableOpacity activeOpacity={0.8} onPress={() => onSelectedItemsChange( index ,item)}>
//                         <View style={[styles.redioBtn, { borderColor: item.status === true ? Colors.themecolor :'#E7E8EA' }]}>
//                           <View style={[styles.RedioBtnDot, { backgroundColor: item.status === true ? Colors.themecolor : Colors.white_color, }]}>
//                           </View>
//                         </View>
//                       </TouchableOpacity>

//        </View>
//       }>

//        </FlatList>
//        </View>
//   )
// }
// export default LearnerSuport 
//  const styles =StyleSheet.create({
//   redioBtn: {
//     width: mobileW * 4 / 100,
//     height: mobileW * 4 / 100,
//     borderRadius: mobileW * 10 / 100,
//     borderWidth: mobileW * 0.40 / 100,
//     justifyContent: 'center',
//     alignItems: "center",
//   },
//   RedioBtnDot: {
//     width: mobileW * 2.4 / 100,
//     height: mobileW * 2.4 / 100,
//     borderRadius: mobileW * 10 / 100,
//   },

//  })












