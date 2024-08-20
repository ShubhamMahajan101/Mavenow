// import React, { useState, useEffect } from 'react';
// import { FlatList, Text, Alert, BackHandler, ScrollView, Modal, StatusBar, View, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
// import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font, Colors, mobileH, mobileW, localimag, SocialLogin } from './Provider/utilslib/Utils';
// import axios from 'axios';
// import { useIsFocused } from '@react-navigation/native';
// import moment from 'moment';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

//  const data = [{ sendBy: 1, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 3, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 3, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-11', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-11', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-11', time: '04:47 PM' },
//   { sendBy: 3, msg: 'i am in indore now', date: '2023-02-15', time: '04:47 PM' },
//   { sendBy: 1, msg: 'now where are you', date: '2023-02-15', time: '04:47 PM' },
//   { sendBy: 3, msg: 'i am fine', date: '2023-02-15', time: '04:47 PM' },
//   { sendBy: 1, msg: 'i am fine & whats about you ?', date: '2023-01-02', time: '04:47 PM' },
//   { sendBy: 3, msg: 'How  are You ?', date: '2023-01-02', time: '04:47 PM' },
//   { sendBy: 1, msg: 'hii', date: '2023-01-02', time: '04:47 PM' },
//   { sendBy: 3, msg: 'Hello', date: '2023-01-02', time: '04:47 PM' }]

// export default function Chat({ navigation, route }) {

//   const [message, setmessage] = useState(data)
//   const [currentUid, setcurrentUid] = useState(1)

//   // const [allMessages, setallMessages] = useState(data)
//  const [inboxmessages, setallMessages] = useState()

//   const [modalVisible, setModalVisible] = useState(false);
//   const [ImageForShow, setImageForShow] = useState('');
//   const [LoginUserId, setLoginUserId] = useState('');
//   const [inputHeight, setInputHeight] = useState(0);
//   const [isblocked, setisblocked] = useState(false);
//   const [BlockByStatus, setBlockByStatus] = useState(false);
//   const [blockedby, setblockedby] = useState("");
//   const [GuestToken, setGuestToken] = useState("");
//   const isFocused = useIsFocused();
//   const insets = useSafeAreaInsets();



// //   BL =  #121A23
// // White =  #FFFFFF
// // Gray =  #9B9B9B
// // BR =  #EFF2F1
// // BR2 =  #E7E8EA
// // Blue=  #00959E
// // BG =  #FAFAFA

//   console.log();

//   useEffect(() => {
//     if (isFocused) {
//     }
//   }, [isFocused]);

//   // ------------ To Send Message --------------------
//   const sendMessagesss = async () => {
//     setmessage('')
//      allMessages.push({
//         msg:message,
//         sendBy:1,
//         date:moment(new Date()).format('YYYY-MM-DD'),
//         time:'07:45 PM'
//     })
//     console.log({
//         msg:message,
//         sendBy:1,
//         date:moment(new Date()).format('YYYY-MM-DD'),
//         time:'07:45 PM'
//     });
//     console.log('allMessages-----------------------------------',allMessages);
//     setallMessages(inboxmessages)
//     Keyboard.dismiss()
//     // ApiCalling();
//     // return false
//     const currentUid111 = await AsyncStorage.getItem('UID');
//     const guestUid111 = route.params.guestuuid;
//     var blockStatus = false;
//     console.log(currentUid111, '============', guestUid1);
//     if (message) {
//       SendMessage(currentUid111, guestUid1, message, "", blockStatus).
//         then((res) => {
//           // console.log(res);
//           setmessage('')
//         }).catch((err) => {
//           alert(err)
//         })
//       // ------------ To Receive Messages -----------------
//       RecieveMessage(currentUid111, guestUid1, message, "", blockStatus).
//         then((res) => {
//           // console.log(res);
//           setmessage('')
//         }).catch((err) => {
//           alert(err)
//         })
//     }
//   }

//   // --------------------------------------------------
//   const ApiCallingforImage = async () => {
//     var checkTocken = message.fcmToken1
//     // console.log("the old tocken-----------",checkTocken);
//     var data = JSON.stringify({
//       data: {
//         "message": "Card",
//         "messageType": '',
//       },
//       notification: {
//         "body": "Card",
//         "image": 'https://reactnative.dev/img/tiny_logo.png',
//         "tag": "hey",
//         "title": UserName
//       },
//       to: GuestToken
//     });

//     var configuration = {
//       method: 'post',
//       url: 'https://fcm.googleapis.com/fcm/send',
//       headers: {
//         'Authorization': 'key=AAAAeuTzlQI:APA91bGdBRTLA97sb7g0vngLm3pXh82ZqPEFNpDW3oUN_aCHqNjEIvJaLDHr7yEzIkf0gcg7la98Lff0Ciotp9A_wWMCgd6m-1mvK2pc3y-XmXDubF29trhzIxcwLJwjo8zVL1XIgRtx',
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };
//     axios(configuration)
//       .then(function (response) {
//         // console.log("Api Data======",response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   // --------------------------------------------------
//   const ApiCalling = async (UserUUid12) => {
//     // console.log('GuestToken',GuestToken);
//     axios.post(config.baseURL + 'sendNotifiction', {
//       receiverDeviceToken: GuestToken,
//       title: UserName,
//       body: message
//     })
//       .then(data => {
//         // console.log(data);
//         var Succeess = data.data.Succeeded
//         var Message = data.data.ErrorMessage
//         // console.log('data.data------>>>',data.data)

//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });

//   }

//   const getMessageDay = (LastDate) => {
//     // return false
//     // console.log('LastDate======',LastDate);
//     const diff = moment(moment(LastDate)).diff(moment(), 'days');
//     // console.log('LastDate======',diff);
//     let time = "";
//     if (diff == -1) {
//       time += "Yesterday";
//     } else if (diff < -1) {
//       time += moment(LastDate).locale('en').format('DD MMMM YYYY') + "";
//     } else {
//       time += "Today";
//     }
//     return time;
//   }


//   // =======================================================================

//   const openGallery = async () => {
//     // ApiCallingforImage();
//     const currentUid111 = await AsyncStorage.getItem('UID');
//     const guestUid111 = route.params.guestuuid;
//     ImgToBase64.getBase64String(route.params.image)
//       .then(async (base64String) => {
//         let source = "data:image/jpeg;base64," + base64String;
//         SendMessage(currentUid111, guestUid1, "", source).
//           then((res) => {
//             this.setState({ loader: false })
//             // console.log(res);
//           }).catch((err) => {
//             alert(err)
//           })

//         RecieveMessage(currentUid111, guestUid1, "", source).
//           then((res) => {
//             // this.setState({ loader: false })
//             // console.log(res);
//           }).catch((err) => {
//             alert(err)
//           })
//       })
//       .catch(err => this.setState({ loader: false }));
//   }

//   const ToShowImage = (item) => {
//     var imageData = item.image
//     setImageForShow(imageData)
//     // console.log(ImageForShow);
//     setModalVisible(!modalVisible)
//   }

//   return (
//     <View style={styles.container}>
//       {/* ---------------Modal To show Image End-------------  */}
//       <SafeAreaView
//         style={{ flex: 0, backgroundColor: Colors.themecolor }} />
//       <StatusBar
//         hidden={false}
//         backgroundColor={Colors.themecolor}
//         translucent={false}
//         networkActivityIndicatorVisible={true}
//       />
//    <View style={{width:mobileW, height:mobileW*15/100,  justifyContent:'center',  }}>

//   <View style={{flexDirection:'row',padding:mobileW*4/100,alignItems:"center"}}>
//   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//   <Image resizeMode='contain' style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100}} source={require("./Icon/back(1).png")}></Image>
//   </TouchableOpacity>

//   <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('MyMavenProfile')} style={{flexDirection:'row', alignItems:'center',left:mobileW*2/100}}>
//     <Image resizeMode='contain' style={{width:mobileW*10/100, height:mobileW*10/100, backgroundColor:Colors.themecolor, borderRadius:mobileW*5/100}}
//     source={require("./Icon/11.jpg")}></Image>

//     <View style={{marginHorizontal:mobileW*2/100}}>
//       <Text style={{fontSize:mobileW*3.2/100, color:Colors.black_color, fontFamily:Font.FontMedium}}>Hi Arman</Text>
//       <Text style={{fontSize:mobileW*2.5/100, marginTop:mobileW*-1/100, color:Colors.gray, fontFamily:Font.FontRegular, }}>Good to see you Maven</Text>
//     </View>
//   </TouchableOpacity>

//   </View>
// </View>



//       <KeyboardAvoidingView
//         style={[styles.messageList, { marginBottom: inputHeight + hp('12%') }]}
//         behavior={Platform.OS === 'android' ? null : 'padding'}
//         keyboardVerticalOffset={Platform.OS === 'android' ? 0 : inputHeight + hp('7%')}>
//         <FlatList
//           style={{ width: mobileW, paddingHorizontal: mobileW * 3 / 100, flex: 1 }}
//           inverted
//           data={message}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item, index }) => (
//             <View>
//               {
//                 index == message.length - 1 || (index != message.length - 1 && !moment(message[index + 1].date).isSame(item.date, 'day')) ?
//                   <View style={{ paddingBottom: mobileH * 1.5 / 100, paddingTop: mobileH * 1.5 / 100}}>
//                     <Text style={{ alignSelf: "center", paddingStart: 5, paddingEnd: 5, paddingTop: mobileW*1.5/100, paddingBottom: mobileW*1.5/100, marginVertical: 2.5,   backgroundColor:'#EFF2F1',
//                     color: Colors.gray, borderRadius:mobileW*2/100, overflow: 'hidden',fontSize:mobileW*3/100,fontFamily:Font.FontRegular,}}>
//                       {getMessageDay(item.date)}</Text>
//                       </View>
//                   : <></>
//               }

//       <View style={{marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10,alignSelf: currentUid === item.sendBy ? 'flex-end' : 'flex-start'  }}>

//                 <View style={currentUid === item.sendBy ? {
//                   // backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1',
//                   backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1',
//                   borderTopLeftRadius: 10, borderBottomRightRadius: 20, borderBottomLeftRadius: 10}
//                   :{
//                     backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1' ,
//                     borderTopRightRadius: 10, borderBottomRightRadius:10, borderBottomLeftRadius: 10  }}>
//                   <Text style={{ padding: 10, fontSize:mobileW*3/100,fontFamily:Font.FontMedium, color: Colors.blackColor }}>
//                     {item.msg} {"..   "} 
//                     {/* <Text>.....</Text> */}
//                     {/* <Text style={{ fontSize: 0.5,color: Colors.blackColor }}>{getMessageDay(item.date)}</Text> */}
//                 </Text>
//                 <View style={{marginTop:mobileW*-2/100,alignSelf:"flex-end"}}>
//                 <Text style={{ fontSize:mobileW*2.5/100,color: Colors.gray,margin:mobileW*1/100,right:mobileW*2/100 }}>{item.time}</Text>
//                 </View>

//                   {/* {item.image === "" ? <Text 
//               style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}>
//                 {item.msg} {"   "} <Text 
//                 style={{ fontSize: 0.5 }}>{getMessageDay(item.date)}</Text>
//                 <Text 
//                 style={{ fontSize: 12 }}>{item.time}</Text>
//               </Text> :
//                 <TouchableOpacity
//                 activeOpacity={0.8}
//                 // onPress={() => ToShowImage(item)}
//                 >
//                   <Image source={{ uri: item.image }} style={{
//                     width: mobileW*45/100 ,
//                     height: mobileH*33/100 , resizeMode:'contain', borderRadius: 30
//                   }} />
//                   <Text 
//                   style={{ 
//                   fontSize: 12, 
//                   position: 'absolute', 
//                   bottom: 5, 
//                   right: 5 
//                   }}>{item.time}</Text>
//                 </TouchableOpacity>
//               } */}
//                 </View>




//               </View>
//             </View>
//           )}
//         />
//       </KeyboardAvoidingView>
//       <KeyboardAvoidingView
//         style={{
//           position: 'absolute',
//           bottom: wp('1.2%'),
//           width: '97.5%',
//           marginHorizontal: wp('1.2%')
//         }}
//         behavior={Platform.OS === 'android' ? null : 'position'}
//         // keyboardVerticalOffset={Platform.OS === 'android' ? 0 : insets.top + hp('0.8%')}
//         keyboardVerticalOffset={Platform.OS === 'android' ? 0 : mobileH * 5 / 100}
//         enabled>
//         <View style={{
//           flexDirection: 'row',
//           alignSelf: 'center', bottom: 3,
//           width: mobileW * 95 / 100,
//           alignItems: 'center',
//           // height:mobileH*20/100,
//           justifyContent: 'space-around',
//         }}>
//           <View
//             onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               width: mobileW * 86.2 / 100,
//               borderRadius: mobileW * 2 / 100,
//               // borderWidth: mobileW * 0.5 / 100,
//               // borderColor: Colors.themecolor,
//                height: mobileW * 10 / 100,
//               backgroundColor:'#EFF2F1',
//               borderRadius:mobileW*10/100
//             }}>

//             <TextInput
//               maxLength={1000}
//               placeholderTextColor={Colors.border_color}
//               multiline={true}
//               // numberOfLines={6}
//               value={message}
//               placeholder='Message'
//               fontFamily={Font.FontRegular}
//               // onChangeText={(text) => setmessage(text)}
//               style={{
//                 width: mobileW * 68 / 100, fontFamily: Font.FontRegular,
//                 fontSize: mobileW * 3 / 100, marginLeft: mobileW * 3 / 100
//               }}></TextInput>
//                  <TouchableOpacity
//             activeOpacity={0.8}
//             style={{
//               width: mobileW * 8.3 / 100, height: mobileW * 8.3 / 100,
//               backgroundColor:'#FB4C00', borderRadius: mobileW * 5.5 / 100, alignItems: 'center', justifyContent: 'center',left:mobileW*5.5/100}}
//             // onPress={() => sendMessagesss()}
//           >
//             <Image
//               resizeMode='contain'
//               style={{
//                 tintColor: Colors.whiteColor,
//                 height: mobileW * 5 / 100,
//                 width: mobileW * 5 / 100,
//               }}
//               source={require('./Icon/SendMessage.png')}
//             />
//           </TouchableOpacity>

//           </View>

//         </View>
//       </KeyboardAvoidingView>

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:
//   {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: Colors.whiteColor
//   },
//   header_View: {
//     width: mobileW,
//     paddingHorizontal: mobileW * 4 / 100,
//     height: mobileW * 15 / 100,
//     alignItems: 'center',
//     flexDirection: "row",
//     backgroundColor: Colors.themecolor,
//     justifyContent: 'space-between'
//   },
//   back_Icon: {
//     width: mobileW * 8 / 100,
//     height: mobileW * 8 / 100,
//     alignItems: "center",
//     justifyContent: 'center',
//     borderRadius: mobileW * 4 / 100,
//   },
//   backIcon_: {
//     width: mobileW * 6/ 100,
//     height: mobileW * 6 / 100,
// },
// infoicon: {
//     width: mobileW * 6/ 100,
//     height: mobileW * 6 / 100,
//     tintColor:Colors.black_color
//   },
//   header_text: {
//     fontSize: mobileW * 5 / 100,
//     color: 'black',
//     fontWeight: '500'
//   },
//   arrayback:
//   {
//     width: mobileW,
//     height: mobileH * 10 / 100,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: mobileW * 4 / 100,
//     borderBottomColor: Colors.border_color,
//     borderBottomWidth: mobileW * 0.2 / 100,
//     justifyContent: 'space-between',
//   },
//   activeicon:
//   {
//     tintColor: Colors.green_color,
//     height: mobileW * 1.8 / 100,
//     width: mobileW * 1.8 / 100,
//   },
//   backname:
//   {
//     width: mobileW * 65 / 100,
//     height: '90%',
//   },
//   personname:
//   {
//     marginTop: mobileW * 1 / 100,
//     fontSize: mobileW * 3.5 / 100,
//     fontFamily: Font.FontSemiBold,
//     color: Colors.whiteColor
//   },
//   Header: {
//     backgroundColor: Colors.white_color,
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding:mobileW*4/100,
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   status: {
//     fontSize: mobileW * 2.8 / 100,
//     fontFamily: Font.FontRegular,
//     color: Colors.whiteColor,
//     marginTop: mobileW * 1 / 100
//   },

//   arrayback11:
//   {
//     width: mobileW,
//     paddingVertical: mobileW * 2 / 100,
//     alignItems: "center",
//     flexDirection: 'row',
//     width: mobileW,
//     position: 'absolute',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1
//     , shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.4,
//     shadowColor: 'black',
//     bottom: 0,
//     justifyContent: 'space-around',
//   }
// })

// ===================================================== chat main design  screen =========================================