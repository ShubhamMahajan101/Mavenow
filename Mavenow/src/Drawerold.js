// import { View, Modal, Alert, ScrollView, Text, Image, Dimensions, ImageBackground, StyleSheet, Switch, TouchableOpacity, BackHandler } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react';
// import { Colors } from './Provider/Colorsfont';
// import { localStorage } from './Provider/localStorageProvider';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import { Share } from 'react-native';
// import { DrawerActions } from '@react-navigation/native';

// //  import UserMaven from './UserMaven';
// // global.userMode = ''

// const CustomDrawer = ({ navigation, props }) => {
//   const [isEnabled, setIsEnabled] = useState('learner');
//   // console.log(isEnabled,"------------------ccustom drawer!!!!!!!!!!!! > ");
//   const [isEnabled1, setIsEnabled1] = useState('active1');
//   const [text, setText] = useState('');
//   const [ModalVisible_loguot, setModalVisible_loguot] = useState(false);
//   // const [modalVisible_loadergif, setModalVisible_loadergif] = useState(false);

//   const SetMode = async(data) =>{
//     if(data=='maven'){
//       global.togalemode = "maven"
//      await localStorage.setItemString('UserMode',data)
//     setIsEnabled('maven')
//     }else{
//       global.togalemode = "learner"
//      await localStorage.setItemString('UserMode',data)
//       setIsEnabled('learner')
//      }

//    const value =  await localStorage.getItemObject('user_arr');
//      console.log("Hello Maven",value.userType );
//     //  setuserMode(value)
//      }

// useEffect(() => {

//   setTimeout(() => {
//     setModalVisible_loguot(false)
//     }, 1000);

//   // setTimeout(() => {
//   //   setModalVisible_loadergif(false)
//   //   }, 1000);
//   //   SetMode();
//     // setIsEnabled('learner');
//     // setIsEnabled('maven');
//     console.log('i am here in calling');
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );
//   return () => backHandler.remove();
//  }, []);
// const backAction = () => {

//     // BackHandler.exitApp()
//   };
// const onShare = async () => {
//     console.log("sssss")
//     try {
//       const result = await Share.share({
//         message: Platform.OS === "android" ?
//           'https://play.google.com/store/search?q=trulinco&c=apps' :
//           "https://apps.apple.com/in/app/trulinco/id1583020135",
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {

//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//       <View style={{ flex: 1, backgroundColor: Colors.white_color, width: "100%" }}>
//              {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible_loadergif}
//         onRequestClose={() => {
//         setModalVisible_loadergif(!modalVisible_loadergif); }}>
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000096' }}>
//         <Image style={styles.GIF}source={require("./Icon/neighcoach_loader.gif")}></Image>
//         </View>
//         </Modal> */}
//       <ImageBackground resizeMode='stretch' style={styles.BACKGROUND_TOP_IMAGE}source={require('./Icon/drawer_img.png')}>
//       <View style={styles.imageCard2}>

//        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('MyMavenProfile')}>
//           {isEnabled=='learner'?
//            <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_student.png')}></Image>:
//            <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
//            }
//        </TouchableOpacity>
//        </View>

//              {/* { isEnabled=='learner'?
//              <View> <Text>Maven</Text> </View>
//                   :
//              <View><Text>Learner</Text></View>} */}

//              { isEnabled=='learner'?
//              <Text style={styles.welcome_text}>{Lang_chg.WelcomeLearnerTxt[config.language] }</Text>
//                    :
//               <Text style={styles.welcome_text}>{Lang_chg.WelcomeMavenTxt[config.language] }</Text>}
//               </ImageBackground>
//               <View style={styles.containerstyle}>
//               <View style={{ flexDirection: "row", alignSelf: 'center', alignItems: 'center' }}>
//               <View style={styles.togglebuttonview}>
//               <Image style={styles.maven_image} resizeMode='contain' source={require('./Icon/icon_student.png')}></Image>
//               <View style={{ width: mobileW * 15 / 100, }}>
//               <Text style={{ fontSize: mobileW * 3.8 / 100, color: isEnabled == "learner" ? Colors.black_color : Colors.gray, textAlign: 'center', fontFamily:Font.FontRegular }}>{Lang_chg.LearnerModeTxt[config.language] }</Text>
//               </View>
//               </View>

//               <View style={styles.TOGGLE}>
//               <View style={{ width: mobileW * 12 / 100, height: mobileW * 6 / 100, borderColor: isEnabled == "learner" ? Colors.gray : Colors.green, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.25 / 100, flexDirection: "row", justifyContent: "space-between" }}>
//               <TouchableOpacity onPress={() => SetMode('learner')} style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0 / 100, backgroundColor: isEnabled == "learner" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.white_color : Colors.gray }} />
//               <TouchableOpacity onPress={() => SetMode('maven') } style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0/ 100, backgroundColor: isEnabled == "maven" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.gray : Colors.white_color }} />
//               </View>
//               </View>

//                   <View style={ styles.mavenmode_view }>
//                   <Image style={styles.maven_image} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
//                   <View style={{ width: mobileW * 15 / 100, }}>
//                   <Text style={{ fontSize: mobileW * 3.8/ 100, color: isEnabled == "maven" ? Colors.black_color : Colors.gray, textAlign: 'center', fontFamily:Font.FontRegular }}>{Lang_chg.MavenModeTxt[config.language] }</Text>
//                   </View>
//                   </View>
//                   </View>
//                   </View>

//             {isEnabled == 'maven' &&
//             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', marginBottom: mobileW * 1 / 100 }}>
//             <Image style={styles.maven_image} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
//             <Text style={styles.teach_text}>{Lang_chg.AvailableTeachTxt[config.language] }</Text>
//             <View style={styles.ToggleButton_view}>
//             <View style={{ width: mobileW * 11 / 100, height: mobileW * 5.5 / 100,alignItems:'center', borderColor: isEnabled1 == "active1" ? Colors.gray : Colors.green, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.25 / 100, flexDirection: "row", justifyContent: "space-between" }}>
//             <TouchableOpacity onPress={() => setIsEnabled1('active1')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0 / 100, backgroundColor: isEnabled1 == "active1" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled1 == "disactive1" ? Colors.white_color : Colors.gray  }} />
//             <TouchableOpacity onPress={() => setIsEnabled1('disactive1')} style={{ width: mobileW * 5/ 100, height: mobileW * 5 / 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0 / 100, backgroundColor: isEnabled1 == "disactive1" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled1 == "disactive1" ? Colors.gray : Colors.white_color  }} />
//             </View>
//             </View>
//             </View>}

//             <View style={styles.underline_}></View>
//             <ScrollView showsVerticalScrollIndicator={false} >
//             <TouchableOpacity activeOpacity={0.8}>
//             <View style={styles.drawer_style}>
//             <Image resizeMode='contain' style={styles.drawer_image} source={require('./Icon/icons8-home-page-64.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.HomeTxt[config.language] }</Text>
//             </View>
//             </TouchableOpacity>
//             <View style={styles.drawer_underline}></View>

//            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} >
//             <View style={styles.drawer_style}>
//             <Image resizeMode='contain' style={styles.drawer_image}source={require('./Icon/icons8-comments-50.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.RequestTxt[config.language] }</Text>
//             </View>
//             </TouchableOpacity>
//            <View style={styles.drawer_underline}></View>

//            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Chat')} >
//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.Drawer_img}source={require('./Icon/chat-bubble.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.ChatTxt[config.language] }</Text>
//             </View>
//            </TouchableOpacity>
//            <View style={styles.drawer_underline}></View>

//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')} >
//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.Drawer_img}source={require('./Icon/icon_notification.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.NotificationTxt[config.language]}</Text>

//             </View>
//             </TouchableOpacity>
//             <View style={styles.drawer_underline}></View>

//         {isEnabled=== 'maven'?

//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Wallet')}>
//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.drawer_image}source={require('./Icon/icons8-wallet-64.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.WalletTxt[config.language] }</Text>
//             </View>
//             </TouchableOpacity>

//            :

//           <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Refund')}>
//           <View style={styles.drawer_style}>
//           <Image resizeMode="stretch" style={styles.drawer_image} source={require('./Icon/icons8-wallet-64.png')}></Image>
//           <Text style={styles.drawer_txt}>{Lang_chg.RefundTxt[config.language] }</Text>
//           </View>
//           </TouchableOpacity>}
//           <View style={styles.drawer_underline}></View>

//            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Help')} >
//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.Drawer_img}source={require('./Icon/icon_faq.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.HelpTxt[config.language] }</Text>
//             </View>
//             </TouchableOpacity>
//             <View style={styles.drawer_underline}></View>

//                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('History')}>
//                  <View style={styles.drawer_style}>
//                  <Image resizeMode="stretch" style={styles.history___icon}source={require('./Icon/history.png')}></Image>
//                  <Text style={styles.drawer_txt}>{Lang_chg.HistoryTxt[config.language] }</Text>
//                  </View>
//                 </TouchableOpacity>
//                 <View style={styles.drawer_underline}></View>

//            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Feedback')}>
//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.drawer_image}source={require('./Icon/feedbacvkk.pmg.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.FeedbackTxt[config.language] }</Text>
//             </View>
//             </TouchableOpacity>
//             <View style={styles.drawer_underline}></View>

//             <TouchableOpacity activeOpacity={0.8} onPress={() => onShare()}>
//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.Drawer_img} source={require("./Icon/SShare.png")}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.ShareTxt[config.language] }</Text>
//             </View>
//             </TouchableOpacity>
//             <View style={styles.drawer_underline}></View>

//             {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Language'),closeDrawer()} } > */}
//             <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Language'),navigation.dispatch(DrawerActions.closeDrawer())}}>

//             <View style={styles.drawer_style}>
//             <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/settings.png')}></Image>
//             <Text style={styles.drawer_txt}>{Lang_chg.LanguageTxt[config.language] }</Text>
//              </View>
//             </TouchableOpacity>
//             <View style={styles.drawer_underline}></View>

//           <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(true)} style={styles.drawer_style}>
//            <Image resizeMode='contain' style={styles.logout_icon}source={require('./Icon/shutdown.png')}></Image>
//            <Text style={styles.drawer_txt}>{Lang_chg.LogoutTxt[config.language] }</Text>
//            </TouchableOpacity>
//            </ScrollView>
//            <View>

//           <Modal animationType="slide" transparent={true}
//           visible={ModalVisible_loguot}
//           onRequestClose={() => {
//           setModalVisible_loguot(!ModalVisible_loguot); }}>
//           <View style={styles.modal_view}>
//           <View style={styles.Modal}>
//           <View style={styles.ModalHeader}>
//           <Text style={styles.logout_text}>{Lang_chg.LogoutTxt[config.language] }</Text>
//           </View>
//            <ScrollView>

//                   <View style={styles.logout_view}>
//                   <Text style={styles.ask_text}>{Lang_chg.sureLogoutTxt[config.language] }</Text>
//                   <View style={{ flexDirection: 'row', marginTop: mobileW * 3 / 100 }}>
//                   <TouchableOpacity  onPress={() => {setModalVisible_loguot(!ModalVisible_loguot), navigation.navigate('Login'),navigation.dispatch(DrawerActions.closeDrawer())}} activeOpacity={0.8}style={styles.yes_button}>
//                   <Text style={styles.yes_text}>{Lang_chg.YesTxt[config.language] }</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(!ModalVisible_loguot)}style={styles.yes_button}>
//                   <Text style={styles.yes_text}>{Lang_chg.NoTxt[config.language] }</Text>
//                    </TouchableOpacity>
//                   </View>
//                   </View>
//                   </ScrollView>
//                   </View>
//                   </View>
//                   </Modal>
//                   </View>
//                   </View>
//   )
// }
// export default CustomDrawer
// const styles = StyleSheet.create({
//   imageIcon2: {
//     width: mobileW * 20 / 100,
//     height: mobileW * 20 / 100,
//     tintColor: Colors.themecolor,
//     // marginHorizontal: mobileW * 2 / 100,
//     borderRadius: mobileW * 8 / 100,
//   },
//   welcome_text:{
//        color: Colors.black_color,
//        fontSize: mobileW * 4/ 100,
//        marginTop:mobileW*2/100,
//        fontFamily:Font.FontMedium
// },
//   underline_: {
//     width: "100%",
//     height: mobileW * 0.3 / 100,
//     backgroundColor: '#caae88'
//   },
//   GIF: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100
//   },
//   logout_icon: {
//     width: mobileW * 6.5 / 100,
//     height: mobileW * 6.5 / 100,
//     tintColor: Colors.lightgray
//   },
//   togglebuttonview:{
//     flexDirection: "row", 
//   width: mobileW * 25 / 100, 
//   alignItems: 'center',
//    justifyContent: 'center'
//   },
//   logout_view: {
//     alignItems: 'center',
//     padding: mobileW * 3 / 100
//   },
//   history___icon:{ 
//     width: mobileW * 7/ 100,
//    height: mobileW * 7 / 100,
//    tintColor: Colors.light_grey },
//   ToggleButton_view:{
//      width: mobileW * 13 / 100,
//    height: mobileW * 6 / 100, 
//   justifyContent: 'center', 
//   alignItems: 'center' },
//   yes_button: {
//     marginHorizontal: mobileW * 3 / 100,
//     width: mobileW * 15 / 100,
//     height: mobileW * 7 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 1 / 100,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   BACKGROUND_TOP_IMAGE:{ 
//     width:"100%", 
//    height: mobileH * 25 / 100, 
//   alignItems: 'center', 
//   justifyContent: 'center'
// },
//  maven_image:{ 
//     width: mobileW * 7 / 100, 
//     height: mobileW * 7 / 100, 
//   },
//   TOGGLE:{
//      width: mobileW * 13 / 100, 
//   height: mobileW * 6 / 100, 
//   justifyContent: 'center', 
//   alignItems: 'center', 
// },
//   yes_text: {
//     fontSize: mobileW * 3.8 / 100,
//     color: Colors.white_color,
//     fontFamily:Font.FontSemiBold 

//   },
//   teach_text:{
//     color: Colors.black_color, 
//     fontSize: mobileW * 3.8/ 100, 
//     marginHorizontal: mobileW * 1 / 100 ,
//  fontFamily:Font.FontRegular
// },
// mavenmode_view:{
//   flexDirection: "row", 
// width: mobileW * 25 / 100, 
// alignItems: 'center', 
// justifyContent: 'center' },
//   ask_text: {
//     color: Colors.blackColor,
//     fontSize: mobileW * 3.5/ 100,
//     fontFamily:Font.FontRegular
//   },
//   userMode:{
//     width: mobileW * 5.5 / 100, 
//     height: mobileW * 5.5 / 100, 
//     borderRadius: mobileW * 3 / 100,
//     borderWidth: mobileW * 0.4 / 100,
//   },
//   modal_view: {
//     flex: 1,
//     backgroundColor: '#00000060',
//     justifyContent: 'center'
//   },

//   drawer_image: {
//     width: mobileW * 7 / 100,
//     height: mobileW * 7 / 100,
//     tintColor: Colors.light_grey
//   },
//   imageCard2: {
//     width: mobileW * 22 / 100,
//     height: mobileW * 22 / 100,
//     borderRadius: mobileW * 11 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: mobileW * 0.6 / 100,
//     borderColor: Colors.themecolor
//   },
//   logout_text: {
//     color: Colors.white_color,
//     fontSize: mobileW *4/ 100,
//     fontFamily:Font.FontMedium

//   },
//   containerstyle2: {
//     width: mobileW * 78 / 100,
//     height: mobileW * 14 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: mobileW * 2 / 100,
//     shadowColor: '#000',
//     borderColor: Colors.gray,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     marginTop: mobileW * 1 / 100,
//     justifyContent: "center"
//   },
//   ImageIcon: {
//     width: mobileW * 7 / 100,
//     height: mobileW * 7 / 100,
//     tintColor: Colors.light_grey
//   },
//   containerstyle: {
//     margin: mobileW * 2 / 100,
//     alignSelf: "center",
//     width: "95%",
//     height: mobileW * 14 / 100,
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     elevation: mobileW * 0.6 / 100,
//     shadowColor: '#000',
//     borderColor: Colors.gray,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   ModalHeader: {
//     width: mobileW * 90 / 100,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   Modal: {
//     width: mobileW * 90 / 100,
//     borderRadius: mobileW * 3 / 100,
//     alignSelf: 'center',
//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },
//   drawer_style: {
//     flexDirection: "row",
//     padding: mobileW * 3.5 / 100,
//     alignItems: "center"
//   },
//   drawer_underline: {
//     width: mobileW * 79 / 100,
//     height: mobileW * 0.2 / 100,
//     backgroundColor: Colors.light_grey,
//     marginLeft: mobileW * 3 / 100
//   },
//   drawer_txt: {
//     fontSize: mobileW * 4 / 100,
//     color:Colors.gray,
//     marginHorizontal: mobileW * 4.7 / 100,
//     fontFamily:Font.FontRegular
//   },
//   Drawer_img: {
//     width: mobileW * 7/ 100,
//     height: mobileW * 7 / 100,
//     tintColor: Colors.light_grey,
//   },
// })