



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old DeshBoard Screen +++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions, TouchableOpacity, Modal, Image, StyleSheet, Alert } from 'react-native'
// import React, { useCallback, useRef, useState, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import UserSliderDot from './UserSliderDot';
// import { Colors } from './Provider/Colorsfont';
// import { localStorage } from './Provider/localStorageProvider';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import Footer from './Provider/Footer';
// import HideWithKeyboard from 'react-native-hide-with-keyboard';
// import axios from 'axios';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { ImageBackground } from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// // const SLIDER_WIDTH = Dimensions.get('window').width + 20;
// //  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

// // +++++++++++++++++++++++++++++++++++++++++++++++++++++ Learner testing +++++++++++++++++++++++++++++++++++++++++++++++++++++
// const Learner = [
//   {
//     id: 1,
//     image: require('./Icon/img_6.png'),
//     name: 'Shubham Mahajan',
//     skill: 'Kotlin',
//     level: 'Basic',
//     category: 'testing',
//     title: 'Work Stress Management',
//     discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk',
//   },
//   {
//     id: 2,
//     image: require('./Icon/img_6.png'),
//     name: 'Ishina Choudhary',
//     skill: 'Kotlin',
//     level: 'Basic',
//     category: 'testing',
//     title: 'Work Stress Management',
//     discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
//   },
//   {
//     id: 3,
//     image: require('./Icon/img_6.png'),
//     name: 'Sahil',
//     skill: 'Kotlin',
//     level: 'Basic',
//     category: 'testing',
//     title: 'Work Stress Management',
//     discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
//   },
// ]

// // ----------------------------------------------------------------
// const MavenTesting = [
//   {
//     id: 1,
//     image: require('./Icon/icon_student.png'),
//     heading: 'Maven(s) Recommended for Automation testing',
//     title: 'Support Team',
//     skills: 'Automation testing',
//     level: 'Basic',
//     categary: 'Testing',
//   },

// ]


// export const trimText = (text, length) => {
//   return text.length > length ? text.substring(0, length) + "..." : text;
// }

// export default function UserMaven({ navigation, route }) {
//   //  const datasend = route.params.datasend;
//   //  console.log(datasend,'....................................................');
//   const [slider, setSlider] = useState([]);
//   const [recommendedData, setRecommendedData] = useState([]);
//   const [upskillingCourses, setUpskillingCourses] = useState([]);
//   const [refresh, setrefresh] = useState(false);
//   const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
//   const [modalVisible, setModalVisible] = useState(global.dashoard_modal);
//   const [modalhighlighter, setmodalhighlighter] = useState(true);
//   const [ModalVale, setModalVale] = useState(9);
//   const [userMode, setuserMode] = useState();
//   const isFocused = useIsFocused();
//   const [ApplicationMode, setApplicationMode] = useState();
//   console.log(setApplicationMode, '......................setApplicationMode.......................');
//   const [CountForApi, setCountForApi] = useState(0)
//   useEffect(() => {
//     // DataSET()
//     SetMode();
//     // console.log('i am here in Count ', CountForApi);
//   })

//   useEffect(() => {

//     console.log("UserMode==>111");
//     if (isFocused) {
//       SetMode();
//       apiCalling();
//       recommendedApi();
//       UpskillingCourses();
//     }


//     SetMode();
//     setTimeout(() => {
//       setModalVisible_Gif(false)
//     }, 2000);


//     const ShoWHeighlights = async () => {
//       let ShowHeighlights = await localStorage.json.stringify('ShowHeighlights');
//       if (ShowHeighlights == null) {
//         setModalVale(0)
//       } else {
//         let OnboardingPageNav = await localStorage.json.stringify('ShowHeighlights');
//         if (OnboardingPageNav == 'Done') {
//           setModalVale(9)
//         }
//       }
//     }

//     ShoWHeighlights()
//   }, [isFocused])

//   // ------- Continue Calling to update User Mode for Application -------


//   // ------------------------------------------
//   // const SetMode = async () => {
//   //   try {
//   //     const value = await AsyncStorage.getItemString('UserMode');
//   //     if (value !== null) {
//   //       SetMode(value);
//   //     }
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
//   // };
//   // ------------------------------------------

//   const apiCalling = () => {
//     axios.post('https://mavenow.com:8001/SettingImage/getSettingImage', {
//       imagetype: "Slider",
//       type: "App"
//     })
//       .then(function (data) {
//         var GetData = data.data.getSettingImage
//         var ErrorMessage = data.data.ErrorMessage
//         console.log("all data", ErrorMessage)
//         console.log('Sliders  all images data =====================>', GetData);
//         if (ErrorMessage == "successfuly") {
//           setSlider(GetData)
//         } else {
//         }
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }
//   const recommendedApi = () => {
//     axios.post('https://mavenow.com:8001/course/GetAllRecommendedCourses', {
//       userid: "848",
//       usertype: "1"
//     })
//       .then(function (data) {
//         var GetData = data.data.GetAllRecommendedCourses
//         console.log("Recommended data here==", GetData);
//         var ErrorMessage = data.data.ErrorMessage
//         console.log("all data", ErrorMessage)
//         // console.log('Recommende  ====================>',GetData);
//         if (ErrorMessage == "successfuly") {

//           setRecommendedData(GetData)
//           // navigation.navigate('Home')
//           // navigation.navigate('Testing')
//         } else {
//         }
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }

//   // ---------------------------------------------------------------------------------------------------------------- 22-2-2002 -------

//   const UpskillingCourses = () => {
//     axios.post('https://mavenow.com:8001/course/GethiglightVideosForApp?logid=848', {
//       "skip": 1,
//       "categoryIds": [
//         "20",
//         "7"
//       ],
//       "skillIds": [
//         "249",
//         "53",
//         "54"
//       ],
//       "studentid": 655,
//       "showeveryone": 1
//     })
//       .then(function (data) {
//         var GetData = data.data.GethiglightVideosForApp
//         var ErrorMessage = data.data.ErrorMessage
//         console.log("all data", ErrorMessage)
//         console.log('upskillingCoursesData  ==================== #>', GetData);
//         if (ErrorMessage == "getting successfuly") {
//           setUpskillingCourses(GetData)
//         } else {
//         }
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }

//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [index, setIndex] = useState(0);

//   // ====================youtube player===================================
//   const [playing, setPlaying] = useState(false);
//   const onStateChange = useCallback((state) => {
//     if (state === "ended") {
//       setPlaying(false);
//       Alert.alert("video has finished playing!");
//     }
//   }, []);

//   const togglePlaying = useCallback(() => {
//     setPlaying((prev) => !prev);
//   }, []);

//   const handleOnScroll = event => {
//     Animated.event(
//       [
//         {
//           nativeEvent: {
//             contentOffset: {
//               x: scrollX
//             },
//           },
//         },
//       ],
//       {
//         useNativeDriver: false
//       },
//     )(event)
//   };

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;


//   const modalChangeFunction = () => {
//     setmodalhighlighter(false)
//     setModalVale(ModalVale + 1)

//     setTimeout(() => {
//       setmodalhighlighter(true)
//     }, 100);
//     if (ModalVale === 6) {
//       localStorage.setItemString('ShowHeighlights', 'Done');
//       // storage.set('introScreen', false);
//     }
//   }


//   const SetMode = async () => {
//     const value = await localStorage.getItemString('UserMode')
//     setuserMode(value)
//   }

//   // ================ data to set local storage
//   const DataSET = async () => {
//     var datamode = await localStorage.getItemString('select');
//     setApplicationMode(datamode)
//     console.log(ApplicationMode, '...................!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!setApplicationMode!!!!!!!!!!!!!!!!!!!!!!!!......................');
//   }
//   // ================ data to set local storage





//   const renderItem = ({ item }) => {
//     return (

//       <View style={styles.main_VIEW}>
//         <Image resizeMethod='resize' resizeMode='contain' style={styles.main_image} source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.imageurl }}></Image>
//       </View>
//     );
//   };


//   const isCarousel = useRef(null);

//   const _onRefresh = async () => {
//     console.log('_onRefresh', '_onRefresh')
//     setrefresh(true)
//     setTimeout(() => {
//       setrefresh(false)
//     }, 1200);
//   }
//   const backButton = () => {
//     global.dashoard_modal = false
//     setModalVisible(false)
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <SafeAreaView style={styles.SafeAreaView}>
//         <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#d6eef8" />
//         {/* ---------------------------- dashboard  modal start */}

//         <ScrollView showsVerticalScrollIndicator={false} refreshControl={
//           <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
//             tintColor={Colors.themecolor}
//             colors={[Colors.themecolor]} />
//         }>
//           <View>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={global.dashoard_modal}
//               onRequestClose={() => {
//               }} >
//               <View style={styles.modal_view}>
//                 <View style={styles.Help_modal}>
//                   <Text>  </Text>
//                   <Text style={styles.HElp_Text}>Help : Dashboard</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => backButton()} >
//                     <Image style={styles.modal_closeicon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.modal_text}>
//                   <ScrollView>
//                     <Text style={styles.Modal_text}>Kalam earned a degree in aeronautical engineering from the
//                       Madras Institute of Technology and in 1958 joined the Defence Research and Development Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
//                       was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                       and produced in India. Rejoining DRDO in 1982, Kalam plich helped earn him the nickname “ich helped earn him the nickname “ich helped earn him the nickname “
//                       ich helped earn him the nickname “ich helped earn him the nickname “ich helped earn him the nickname “anned the program that produced a number
//                       of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
//                       intermediate-range ballistic missile, which incorporated aspects of theSLV-III and was launched in 1989.</Text>
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//           {/* <<---------------------------- heilighter modal--------------------->> */}
//           {ModalVale == 0 &&
//             <Modal transparent={true} visible={modalhighlighter}>
//               <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
//                 <View style={styles.chat_highlighter}>
//                   <View style={styles.mainWhiteWiew_chat}>
//                     <Text style={styles.CHAT}>{Lang_chg.ChatTxt[config.language]}</Text>

//                     <Text style={styles.chat}>{Lang_chg.ChatwithyourMaven[config.language]}</Text>
//                   </View>
//                   <View style={styles.straightLine}></View>
//                   <View style={styles.redDot}>
//                     <View style={styles.redMainDot}></View></View>
//                 </View>
//                 <View style={[styles.bottomIconView, { marginLeft: mobileW * 20 / 100 }]}>
//                   <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_chat.png')} />
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {ModalVale == 1 &&
//             <Modal transparent={true} visible={modalhighlighter} >
//               <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
//                 <View style={styles.calender_modal}>
//                   <View style={[styles.mainWhiteWiew, { width: mobileW * 60 / 100, height: mobileW * 18 / 100 }]}>
//                     <Text style={styles.CHAT}>{Lang_chg.Calender[config.language]}</Text>
//                     <Text style={styles.chat}>{Lang_chg.CheckyourSchedulehere[config.language]}</Text>
//                   </View>
//                   <View style={[styles.straightLine_calender, { marginLeft: mobileW * 0 / 100 }]}></View>
//                   <View style={[styles.redDot, { marginLeft: mobileW * 30.8 / 100 }]}>
//                     <View style={styles.redMainDot}></View></View>
//                 </View>
//                 <View style={[styles.bottomIconView, { marginLeft: mobileW * 41.5 / 100 }]}>
//                   <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_calendar.png')} />
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {ModalVale == 2 &&
//             <Modal transparent={true} visible={modalhighlighter} >
//               <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//                 <View style={styles.Highlighter_UpskillingView}>
//                   <View style={[styles.mainWhiteWiew, { width: mobileW * 77 / 100, height: mobileW * 26 / 100 }]}>
//                     <Text style={styles.CHAT}>{Lang_chg.UpskillingCoursesTxt[config.language]}</Text>
//                     <Text style={styles.chat}>{Lang_chg.Webringmost[config.language]}</Text>
//                   </View>
//                   <View style={styles.themecolorDOT}></View>
//                   <View style={styles.redDot_View}>
//                     <View style={styles.redMainDot}></View>
//                   </View>
//                 </View>
//                 <View style={[styles.bottomIconView, { marginLeft: mobileW * 62 / 100 }]}>
//                   <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_video.png')} />
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {ModalVale == 3 &&
//             <Modal transparent={true} visible={modalhighlighter}>
//               <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//                 <View style={styles.help_vIeW}>
//                   <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 22 / 100 }]}>
//                     <Text style={styles.CHAT}>{Lang_chg.HelpTxt[config.language]}</Text>
//                     <Text style={styles.chat}>{Lang_chg.Yourappassistancetoprovideyouasmoothexperience[config.language]}</Text>
//                   </View>
//                   <View style={styles.help_lineeee}></View>
//                   <View style={styles.themdottt}>
//                     <View style={styles.redMainDot}></View>
//                   </View>
//                 </View>
//                 <View style={[styles.bottomIconView, { alignSelf: "flex-end" }]} >
//                   <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_info.png')} />
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {ModalVale == 4 &&
//             <Modal transparent={true} visible={modalhighlighter} >
//               <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//                 <View style={styles.mylearner_viewmodal}>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.LearnerCard}>
//                     <View style={styles.TopTwoTab}>
//                       <Image resizeMode='contain' style={styles.TopTabImage} source={require('./Icon/icon_learner_border.png')}></Image>
//                     </View>
//                     {/* <Text style={styles.learner_txt}>{Lang_chg.MyLearnerTxt[config.language]}</Text> */}
//                     <Text style={styles.learner_txt}>{Lang_chg.MyMavenTxt[config.language]}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={{ alignSelf: "center", marginTop: mobileH * 1 / 100 }}>
//                   <View style={styles.redDot_learnerView}>
//                     <View style={styles.redMainDot}></View>
//                   </View>
//                   <View style={[styles.straightLine_learnerView]}></View>
//                   <View style={styles.Learners_view}>
//                     <Text style={styles.CHAT}>{Lang_chg.MyMavenTxt[config.language]}</Text>
//                     <Text style={styles.chat}>{Lang_chg.Findthelistofcurrentandpreviouslearners[config.language]}</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {ModalVale == 5 &&
//             <Modal transparent={true} visible={modalhighlighter} >
//               <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
//                 <View style={styles.session_REQUEST_VIEW}>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.LearnerCard} >
//                     <View style={styles.TopTwoTab}>
//                       <Image resizeMode='contain' style={styles.TopTabImage} source={require('./Icon/icon_session_request_border.png')}></Image>
//                     </View>
//                     <Text style={styles.sessionrequest_txt}>{Lang_chg.MySessionRequest[config.language]}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.sessionrequest_VIEW}>
//                   <View style={[styles.redDot_learnerView, { marginLeft: mobileW * 38 / 100 }]}>
//                     <View style={styles.redMainDot}></View>
//                   </View>
//                   <View style={[styles.straightLine_Session, { marginLeft: mobileW * 3 / 100 }]}></View>
//                   <View style={styles.Learners_session}>
//                     <Text style={styles.CHAT}>{Lang_chg.MyLearningRequestTxt[config.language]}</Text>
//                     <Text style={styles.chat}>{Lang_chg.Findthelistofallmylearningyouhaverequested[config.language]}</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {ModalVale == 6 &&
//             <Modal transparent={true} visible={modalhighlighter}>
//               <TouchableOpacity activeOpacity={0.1}
//                 onPress={() => modalChangeFunction()} style={styles.notificationHilither}>
//                 <View style={styles.DOT}>
//                   <View style={styles.redMainDot}></View>
//                 </View>
//                 <View style={styles.notification_line}></View>
//                 <View style={styles.notification_textmanage}>
//                   <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 23 / 100 }]}>
//                     <Text style={styles.CHAT}>{Lang_chg.NotificationTxt[config.language]}</Text>
//                     <Text style={styles.chat}>{Lang_chg.Getinstantnotificationabouteachactivityhere[config.language]}</Text>
//                   </View>
//                 </View>
//                 <View style={[styles.bottomIconView, {
//                   top: mobileW * 0 / 100, width: mobileW * 8 / 100, height: mobileW * 8 / 100,
//                   marginTop: mobileW * 3.5 / 100, backgroundColor: Colors.white_color,
//                   borderRadius: mobileW * 2 / 100, right: mobileW * 4 / 100
//                 }]}>
//                   <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_notification.png")}></Image>
//                 </View>
//               </TouchableOpacity>
//             </Modal>}

//           {/* <<---------------------------- heilighter modal--------------------->> */}
//           <View>
//             <Modal animationType="slide" transparent={true}
//               visible={ModalVisible_Gif}
//               onRequestClose={() => { setModalVisible_Gif(!ModalVisible_Gif); }} >
//               <View style={styles.GIF_modal}>
//                 <Image style={styles.GIF_Images} resizeMode='contain'
//                  source={require("./Icon/neighcoach_loader.gif")}></Image>
                  
//               </View>
//             </Modal>
//           </View>

//           {/* -------------- HEADER -------------- */}
//           <View style={styles.Header}>


//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               {/* onPress={() => navigation.navigate('Search')} */}
//               <TouchableOpacity onPress={() => navigation.navigate('Search')} activeOpacity={0.8} style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100, backgroundColor: Colors.white_color, alignItems: 'center', justifyContent: 'center', borderRadius: mobileW * 2 / 100, marginRight: mobileW * 2 / 100 }}>
//                 <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
//               </TouchableOpacity>
//               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')} style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100, backgroundColor: Colors.white_color, alignItems: 'center', justifyContent: 'center', borderRadius: mobileW * 2 / 100, }}>
//                 <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/notifications.png")}></Image>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={{ width: mobileW, height: mobileH * 17 / 100, backgroundColor: '#d6eef8', borderBottomLeftRadius: mobileW * 4 / 100, borderBottomRightRadius: mobileW * 4 / 100, paddingLeft: mobileW * 4 / 100, paddingRight: mobileW * 4 / 100 }}>


//             <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: mobileW * 3 / 100 }} onPress={() => navigation.navigate("MyMavenProfile")}>
//               <View>
//                 <View style={{ flexDirection: "row" }}>
//                   <Text style={{ fontSize: mobileW * 4.5 / 100, color: Colors.black_color, fontFamily: Font.FontBold }}>{Lang_chg.Hi[config.language]}</Text>
//                   <Text style={{ fontSize: mobileW * 4.5 / 100, color: Colors.black_color, fontFamily: Font.FontBold, marginHorizontal: mobileW * 1 / 100 }}>Arman {userMode == 'maven' ? (Lang_chg.MavennTxt[config.language]) : (Lang_chg.LearnerrTxt[config.language])}</Text>
//                 </View>
//                 <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.WelcometoMavenow[config.language]}</Text>
//                 {/* <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray,fontFamily:Font.FontRegular }}>Welcome to Mavenow</Text> */}
//               </View>
//               <View style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100, backgroundColor: Colors.white_color, alignItems: 'center', justifyContent: 'center', borderRadius: mobileW * 2 / 100, }}>
//                 {userMode == 'maven' ?

//                   <Image style={styles.MAVENICON} resizeMode='contain'
//                     source={require("./Icon/icon_maven.png")}></Image> :
//                   <Image style={styles.MAVENICON} resizeMode='contain'
//                     source={require('./Icon/icon_student.png')}></Image>}

//               </View>
//             </TouchableOpacity>
//           </View>


//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: mobileW * -12 / 100, }}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.LearnerCard}>
//               <View style={styles.TopTwoTab}>
//                 {userMode == 'maven' ? <Image resizeMode='contain' style={styles.TopTabImage}
//                   source={require('./Icon/icon_learner_border.png')}></Image> : <Image resizeMode='contain' style={styles.TopTabImage}
//                     source={require('./Icon/icon_maven_border.png')}></Image>}
//               </View>
//               <Text style={styles.learner_txt}>{userMode == 'maven' ? Lang_chg.MyLearnerTxt[config.language] : Lang_chg.MyMavenxt[config.language]}</Text>
//               {/* <Text style={styles.learner_txt}>My Maven (s)</Text> */}
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.LearnerCard}>
//               <View style={styles.TopTwoTab}>
//                 {userMode == 'maven' ? <Image resizeMode='contain' style={styles.TopTabImage}
//                   source={require('./Icon/icon_session_request_border.png')}></Image> : <Image resizeMode='contain' style={styles.TopTabImage}
//                     source={require('./Icon/icon_learning_request_border.png')}></Image>}
//               </View>
//               <Text style={styles.sessionrequest_txt}>{userMode == 'maven' ? Lang_chg.MySessionRequestTxt[config.language] : Lang_chg.MyLearningRequestTxt[config.language]}</Text>
//               {/* <Text style={styles.sessionrequest_txt}>{"My Session\nRequest"}</Text> */}
//             </TouchableOpacity>
//           </View>

//           {/* -------------- HEADER -------------- */}

//           <View style={{ margin: mobileW * 4 / 100, marginBottom: mobileW * 18 / 100, }}>

//             {/*  ++++++++++++++++++++++ Recommended Learner +++++++++++++++++++++ */}
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: mobileW * 1 / 100 }}>
//               <Text style={styles.automation_text}>{userMode == "maven" ? Lang_chg.LearnerRecommendedTxt[config.language] : Lang_chg.MavenRecommendedTxt[config.language]}</Text>
//               <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Viewall')}>
//                 <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium }}>{Lang_chg.ViewAllTxt[config.language]}</Text>
//               </TouchableOpacity>
//             </View>

//             {userMode == "maven" ?
//               <View style={styles.flatListmanage_view}>
//                 <FlatList
//                   data={Learner}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   renderItem={({ item, index }) =>
//                     <TouchableOpacity activeOpacity={0.8} style={styles.learnarTesting}>
//                       <View style={{ height: mobileW * 10 / 100, backgroundColor: Colors.themecolor, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100, borderColor: Colors.themecolor }}></View>
//                       <View style={{ alignItems: 'center', }}>
//                         <Image resizeMode='contain' style={styles.api_image} source={item.image}></Image>
//                       </View>
//                       <Text style={styles.name}>{item.name}</Text>
//                       <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, alignSelf: 'center', color: Colors.black_color }}>{Lang_chg.Coursename[config.language]}</Text>
//                       {/* <View style={styles.Self_VIEW}></View> */}
//                       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: mobileW * 1 / 100, margin: mobileW * 0.6 / 100, }}>
//                         <View style={styles.manageVIEW}>
//                           {/* <Text style={styles.skills_text}>Skiills:{trimText(item.skill, 6)}</Text> */}
//                           <Text style={styles.skills_text}>{Lang_chg.SkillsTxt[config.language]}: </Text>
//                           <Text style={styles.skills_textdata}>{item.skill}</Text>
//                         </View>
//                         <View style={styles.manageVIEW}>
//                           {/* <Text style={styles.skills_text}>Skiills:{trimText(item.skill, 6)}</Text> */}
//                           <Text style={styles.skills_text}>{Lang_chg.LevelTxt[config.language]}:</Text>
//                           <Text style={styles.skills_textdata}>{item.category}</Text>
//                         </View>
//                       </View>

//                       {/* <Text style={styles.skills_textdata}>Category:{trimText(item.category, 3)}</Text> */}
//                     </TouchableOpacity>} />
//               </View> : <View style={styles.FlatList_View}>
//                 <FlatList
//                   data={MavenTesting}
//                   showsHorizontalScrollIndicator={false}
//                   renderItem={({ item, index }) =>
//                     <View>

//                       <View style={styles.recommendedMaven}>
//                         <View style={{ flexDirection: 'row' }}>

//                           <View style={{ width: mobileW * 22 / 100, height: mobileW * 20 / 100, alignItems: 'center', justifyContent: 'center' }}>
//                             <Image resizeMode='contain' style={styles.Api_image} source={item.image}></Image>

//                           </View>

//                           <View style={styles.skilltitle_view}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: mobileW * 65 / 100, }}>
//                               <Text style={styles.title_text}>{item.title}</Text>
//                               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerSuport')} style={styles.askAnithingButton}>
//                                 <Text style={styles.Ask_text}>{Lang_chg.AskAnythingTxt[config.language]}</Text>
//                               </TouchableOpacity>
//                             </View>
//                             <View style={styles.Manage_View}>
//                               <Text style={styles.text}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                               <Text numberOfLines={1} style={styles.supportTeamData}>{item.skills}</Text>
//                             </View>

//                             <View style={[styles.Manage_View]}>
//                               <Text style={styles.text}>{Lang_chg.LevelTxt[config.language]}</Text>
//                               <Text numberOfLines={1} style={styles.supportTeamData}>{item.level}</Text>
//                             </View>


//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   } />
//               </View>}


//             {/*  +++++++++++++++++++++++++++++++++++++++++++++++++++++ Sliders +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//             <View style={styles.Carousel_view}>
//               <Carousel
//                 ref={isCarousel}
//                 data={slider}
//                 renderItem={renderItem}
//                 layout={'default'}
//                 layoutCardOffset={18}
//                 sliderWidth={mobileW}
//                 scrollPosition={1000}
//                 // pagingEnabled
//                 autoplay
//                 loop
//                 itemWidth={mobileW * 83 / 100}
//                 onSnapToItem={index => { setIndex(index) }}
//                 scrollAnimationDuration={1000} />
//               <View style={styles.Pagination_view}>
//                 <Pagination
//                   dotsLength={slider.length}
//                   activeDotIndex={index}
//                   carouselRef={isCarousel}
//                   dotStyle={{
//                     width: 15,
//                     height: 5,
//                     borderRadius: 3,
//                     marginHorizontal: -8,
//                     backgroundColor: Colors.themecolor,
//                   }}
//                   tappableDots={true}
//                   inactiveDotStyle={{
//                     backgroundColor: 'black',
//                     // Define styles for inactive dots here
//                   }}
//                   inactiveDotOpacity={0.4}
//                   inactiveDotScale={0.6} />
//               </View>
//             </View>


//             <Text style={styles.upskillingCourses_TEXT}>{Lang_chg.FreeUpskillingCoursesTxt[config.language]}</Text>
//             <View style={{ marginTop: mobileW * 3 / 100, marginLeft: mobileW * -2 / 100 }}>
//               <FlatList
//                 data={upskillingCourses}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item, index }) =>
//                   <View style={styles.flatList_View}>
//                     <TouchableOpacity
//                       activeOpacity={0.8}
//                       onPress={() => navigation.navigate('UpskillingCourses', { videourl: item.file_path, videoid: item.id })} >
//                       <ImageBackground
//                         imageStyle={styles.image}
//                         style={styles.Background_Image}
//                         resizeMode="contain"
//                         source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
//                         <Image resizeMode='contain' style={styles.play_button} source={require('./Icon/icon_play_button.png')}></Image>
//                       </ImageBackground>
//                     </TouchableOpacity>
//                     <View style={styles.name_discriptionview}>
//                       <Text style={styles.apiname}>{item.name}</Text>
//                       <Text numberOfLines={2}
//                         style={styles.discripsion_text}>{item.description}</Text>
//                     </View>
//                   </View>
//                 } />
//             </View>

//             {/* {userMode != 'maven' ?
//               <View>
//                 <Text style={styles.Recomented_txt}>Recommended Learner</Text>
//                 <View style={styles.recommendedMavenView}>
//                   <Image style={styles.student_icon} source={require('./Icon/icon_student.png')}></Image>
//                   <Text style={styles.static_text}>We will suggest you the Learner(s) as per your teaching skills.</Text>
//                 </View>
//               </View>
//               :null } */}

//             <Text style={styles.Expert_talk}>{Lang_chg.ExpertTalkTxt[config.language]}</Text>
//             <View style={{ marginLeft: mobileW * -2 / 100 }}>
//               <FlatList
//                 data={upskillingCourses}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item, index }) =>
//                   <View style={styles.background_VIEW}>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('YouTubePlayer')}>
//                       <ImageBackground imageStyle={styles.ImageBackground}
//                         style={styles.dianamic_IMAGE}
//                         resizeMode="contain"
//                         source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
//                         <Image resizeMode='contain' style={styles.youtube_icon} source={require('./Icon/icon_youtube.png')}></Image>
//                       </ImageBackground>
//                     </TouchableOpacity>
//                     <View style={{ marginHorizontal: mobileW * 2 / 100 }}>
//                       <Text style={styles.api_text}>{item.name}</Text>
//                       <Text style={styles.discripsion_text}>{trimText(item.description, 45)}</Text>
//                     </View>
//                   </View>} />
//             </View>
//           </View>
//         </ScrollView>

//         <HideWithKeyboard>
//           <Footer
//             activepage='userMaven'
//             usertype={1}
//             footerpage={[
//               { name: Lang_chg.Footerhome[config.language], countshow: false, image: require('./Icon/menu.png'), activeimage: require('./Icon/menu.png') },
//               { name: Lang_chg.chat[config.language], countshow: false, image: require('./Icon/chat1.png'), activeimage: require('./Icon/icon_chat.png') },
//               // { name:'Chat', countshow: false, image: require('./Icon/chat1.png'), activeimage: require('./Icon/icon_chat.png') },
//               { name: Lang_chg.Schedule[config.language], countshow: false, image: require('./Icon/calander1.png'), activeimage: require('./Icon/calander1.png') },
//               { name: Lang_chg.Video[config.language], countshow: false, image: require('./Icon/video1.png'), activeimage: require('./Icon/video1.png') },
//               { name: Lang_chg.info[config.language], countshow: false, image: require('./Icon/about.png'), activeimage: require('./Icon/about.png') },
//             ]}
//             navigation={navigation}
//             imagestyle1={{ width: mobileW * 6 / 100, height: mobileW * 5.5 / 100, backgroundColor: Colors.whiteColor, countcolor: 'black', countbackground: 'black', }}
//           />
//         </HideWithKeyboard>
//       </SafeAreaView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flatListmanage_view: {
//     marginTop: mobileW * 2 / 100,
//     marginLeft: mobileW * -1 / 100
//   },
//   name_discriptionview: {
//     padding: mobileW * 1 / 100,
//     paddingTop: mobileW * 3 / 100,
//     paddingLeft: mobileW * 3 / 100
//   },
//   notification_textmanage: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     marginLeft: mobileW * 32 / 100
//   },
//   MAVENICON:
//   {
//     width: mobileW * 10 / 100,
//     height: mobileW * 10 / 100,
//     borderRadius: mobileW * 4 / 100
//   },
//   themdottt: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: "flex-end",
//     marginRight: mobileW * 7.5 / 100
//   },
//   manageVIEW: {
//     flexDirection: 'row',
//     marginHorizontal: mobileW * 1 / 100,
//     width: mobileW * 18 / 100
//   },
//   background_VIEW: {
//     backgroundColor: Colors.white_color,
//     alignItems: 'center',
//     flexDirection: 'row',
//     width: mobileW * 65 / 100,
//     marginHorizontal: mobileW * 2 / 100,
//     borderRadius: mobileW * 2 / 100,
//     // marginTop: mobileW * 2 / 100,
//     marginBottom: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   dianamic_IMAGE: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 20 / 100,
//     height: mobileW * 20 / 100,
//     borderRadius: mobileW * 1 / 100
//   },
//   Self_VIEW: {
//     width: mobileW * 21 / 100,
//     height: mobileW * 0.2 / 100,
//     backgroundColor: Colors.gray
//   },
//   name: {
//     fontSize: mobileW * 3 / 100,
//     color: Colors.themecolor,
//     alignSelf: 'center',
//     fontFamily: Font.FontMedium,
//     marginTop: mobileW * 2 / 100
//   },
//   Header: {
//     backgroundColor: '#d6eef8',
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingLeft: mobileW * 4 / 100,
//     paddingRight: mobileW * 4 / 100
//   },
//   NamedNodeMap: {
//     alignSelf: "flex-end",
//     marginRight: mobileW * 2 / 100
//   },
//   backIcon: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 25 / 100,
//     tintColor: Colors.white_color,
//     borderRadius: mobileW * 4 / 100,
//     marginHorizontal: mobileW * 5 / 100,
//     // backgroundColor: "red"
//   },
//   SearchIcon: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.themecolor
//   },
//   upskillingCourses_TEXT: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontMedium
//   },
//   ImageBackground: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 20 / 100,
//     height: mobileW * 20 / 100,
//     borderRadius: mobileW * 1 / 100
//   },
//   LearnerCard: {
//     width: mobileW * 35 / 100,
//     height: mobileW * 30 / 100,
//     padding: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color,
//     marginHorizontal: mobileW * 1.5 / 100,
//     borderRadius: mobileW * 5 / 100,
//     elevation: 5,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     alignItems: 'center',
//     // justifyContent:'center'
//   },
//   calender_modal: {
//     marginTop: mobileH * 75 / 100,
//     marginLeft: mobileW * 19 / 100
//   },
//   play_button: {
//     tintColor: Colors.themecolor,
//     marginTop: mobileW * 23 / 100,
//     marginLeft: mobileW * 4 / 100,
//     backgroundColor: Colors.white_color,
//     width: mobileW * 7 / 100,
//     height: mobileW * 7 / 100,
//     borderRadius: mobileW * 5 / 100
//   },
//   learnarTesting: {
//     width: mobileW * 40 / 100,
//     marginHorizontal: mobileW * 1 / 100,
//     paddingBottom: mobileW * 2 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 1,
//     marginBottom: 2,
//     borderRadius: mobileW * 2 / 100,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   Modal_text: {
//     textAlign: "center",
//     color: Colors.gray,
//     color: Colors.blackColor,
//     fontSize: mobileW * 3.5 / 100,
//     fontFamily: Font.FontRegular
//   },
//   themecolorDOT: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 13.5 / 100,
//     alignSelf: "flex-end",
//     marginRight: mobileW * 27.5 / 100
//   },
//   recommendedLearner: {
//     width: mobileW * 92 / 100,
//     height: mobileW * 20 / 100,
//     borderRadius: mobileW * 2 / 100,
//     marginTop: mobileW * 2 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 5,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     padding: mobileW * 5 / 100,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   SafeAreaView: {
//     flex: 1,
//     // backgroundColor:"#f5f6fa"
//     backgroundColor: Colors.white_color
//   },
//   GIF_modal: {
//     flex: 1,
//     backgroundColor: '#00000060',
//     justifyContent: 'center',
//     alignItems: "center"
//   },
//   GIF_Images: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100,
//     alignSelf: "center"
//   },
//   Header_view: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: mobileW * 1 / 100
//   },
//   Carousel_view: {
//     marginTop: mobileH * 0.5 / 100,
//     alignSelf: 'center',
//     height: mobileW * 43 / 100,
//   },
//   Header_touchable: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: mobileW * 3 / 100,
//   },
//   help_lineeee: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 13.5 / 100,
//     alignSelf: "flex-end",
//     marginRight: mobileW * 9 / 100
//   },
//   recommendedMaven: {
//     width: mobileW * 92 / 100,
//     height: mobileW * 25 / 100,
//     borderRadius: mobileW * 2 / 100,
//     marginTop: mobileW * 2 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     padding: mobileW * 2 / 100,
//   },
//   mylearner_viewmodal: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: mobileW * 37 / 100,
//     marginRight: mobileW * 38 / 100
//   },
//   askAnithingButton: {
//     marginBottom: mobileW * 2 / 100,
//     width: mobileW * 31 / 100,
//     justifyContent: 'center',
//     // marginHorizontal: mobileW * 8 / 100,
//     alignItems: 'center',
//     borderRadius: mobileW * 2 / 100,
//     height: mobileW * 9 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   supportTeamData: {
//     fontSize: mobileW * 3 / 100,
//     color: Colors.gray,
//     fontFamily: Font.FontRegular,
//     marginHorizontal: mobileW * 1.5 / 100
//   },
//   backIcon: {
//     width: mobileW * 8.5 / 100,
//     height: mobileW * 8.5 / 100,
//     tintColor: Colors.white_color,
//     marginTop: mobileW * 2 / 100
//   },
//   redDot_View: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: "flex-end",
//     marginRight: mobileW * 26 / 100
//   },
//   redDot_View_help: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: "flex-end",
//     marginTop: mobileW * 8 / 100,
//     marginRight: mobileW * -1 / 100
//   },
//   notification_line: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 8 / 100,
//     alignSelf: "flex-end",
//     marginRight: mobileW * 4.5 / 100,
//   },
//   learner_txt: {
//     fontSize: mobileW *3.5 / 100,
//     color: Colors.black_color,
//     textAlign: 'center',
//     marginTop: mobileW * 0.5 / 100,
//     fontFamily: Font.FontSemiBold
//   },
//   Highlighter_UpskillingView: {
//     marginTop: mobileH * 70 / 100,
//     marginLeft: mobileW * 20 / 100
//   },
//   sessionrequest_txt: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     textAlign: 'center',
//     marginTop: mobileW * 0.5 / 100,
//     fontFamily: Font.FontSemiBold
//   },
//   modal_closeicon: {
//     width: mobileW * 5.20 / 100,
//     height: mobileW * 5.20 / 100,
//     tintColor: Colors.whiteColor
//   },
//   apiname: {
//     fontSize: mobileW * 3.1 / 100,
//     color: Colors.black_color,
//     marginTop: mobileW * 2 / 100,
//     fontFamily: Font.FontSemiBold
//   },

//   session_REQUEST_VIEW: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: mobileW * 37 / 100,
//     justifyContent: 'center',
//     marginLeft: mobileW * 38 / 100
//   },
//   skills_text: {
//     fontSize: mobileW * 2.7 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontMedium,
//     width: mobileW * 10 / 100,
//     // margin: mobileW * 0.3 / 100
//   },
//   skills_textdata: {
//     fontSize: mobileW * 2.5 / 100,
//     color: Colors.gray,
//     width: mobileW * 9 / 100,
//     fontFamily: Font.FontRegular
//   },
//   sessionrequest_VIEW: {
//     alignSelf: "flex-end",
//     marginTop: mobileH * 1 / 100,
//     marginRight: mobileW * 2 / 100
//   },
//   image: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 44 / 100,
//     height: mobileW * 27 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100
//     // borderRadius: mobileW * 2 / 100
//   },
//   HElp_Text: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4 / 100,
//     fontFamily: Font.FontMedium
//   },
//   chat_highlighter: {
//     marginTop: mobileH * 69 / 100,
//     marginLeft: mobileW * 5 / 100
//   },
//   api_image: {
//     width: mobileW * 10 / 100,
//     height: mobileW * 10 / 100,
//     borderRadius: mobileW * 5 / 100,
//     marginTop: mobileW * -7 / 100,
//     borderWidth: 1,
//     borderColor: Colors.white_color,
//     backgroundColor: Colors.gray,
//     padding: 5
//   },
//   TopTwoTab: {
//     width: mobileW * 14 / 100,
//     height: mobileW * 13 / 100,
//     backgroundColor: "#eef8fc",
//     // backgroundColor: Colors.DashBosrdView,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 1 / 100,
//     // marginTop:mobileW*3/100
//   },
//   TopTabImage: {
//     width: mobileW * 7.5 / 100,
//     height: mobileW * 7.5 / 100,
//     alignSelf: 'center'
//   },
//   Api_image: {
//     width: mobileW * 12 / 100,
//     height: mobileW * 12 / 100
//   },
//   main_VIEW: {
//     width: mobileW * 88 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: Colors.border_color,
//     alignSelf: 'center'
//   },
//   recommendedMavenView: {
//     width: '100%',
//     backgroundColor: Colors.whiteColor,
//     elevation: 2,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     marginTop: mobileW * 2 / 100,
//     borderRadius: mobileW * 2 / 100,
//     height: mobileW * 18 / 100,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     flexDirection: 'row'
//   },
//   Background_Image: {
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     width: mobileW * 45 / 100,
//     height: mobileW * 27 / 100,
//     borderRadius: mobileW * 2 / 100,
//   },
//   automation_text: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontMedium
//   },
//   ModalViewBox: {
//     backgroundColor: '#00000060',
//     flex: 1,
//     paddingRight: mobileW * 1 / 100,
//   },
//   notificationHilither: {
//     backgroundColor: '#00000060',
//     flex: 1,
//     paddingRight: mobileW * 3 / 100,
//   },
//   slider: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     //   backgroundColor: 'pink'
//   },
//   main_image: {
//     // width: mobileW * 93 / 100,
//     // height: mobileW * 39 / 100
//     width: mobileW * 85 / 100,
//     height: mobileW * 40 / 100,
//     borderRadius: mobileW * 2 / 100
//   },
//   bottomIconView: {
//     backgroundColor: 'white',
//     bottom: Platform.OS == 'android' ? 0 : mobileH * 2 / 100,
//     marginLeft: mobileW * 10 / 100,
//     position: 'absolute',
//     width: mobileW * 20 / 100,
//     height: mobileW * 13 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     alignItems: "center",
//     justifyContent: 'center'
//   },
//   straightLine: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 16 / 100,
//     marginLeft: mobileW * 25 / 100
//   },
//   straightLine_calender: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: Colors.white_color,
//     height: mobileW * 13.5 / 100,
//     alignSelf: "center",
//     marginRight: mobileW * 15 / 100
//   },
//   Pagination_view: {
//     position: 'absolute',
//     alignSelf: 'center',
//     marginTop: mobileW * 27 / 100
//   },
//   Help_VIEW: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 9 / 100,
//     alignSelf: "flex-end",
//     marginRight: mobileW * 4.5 / 100,
//   },
//   HEPL_MODALVIEW: {
//     marginTop: mobileH * 75 / 100,
//     marginLeft: mobileW * 30 / 100
//   },
//   straightLine_Session: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 22 / 100,
//     alignSelf: 'flex-end',
//     marginRight: mobileW * 31.7 / 100
//     // marginLeft: mobileW * 7 / 100
//   },
//   flatList_View: {
//     width: mobileW * 44 / 100,
//     marginHorizontal: mobileW * 2 / 100,
//     marginBottom: mobileW * 2 / 100,
//     borderRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   modal_text: {
//     backgroundColor: Colors.whiteColor,
//     width: mobileW * 85 / 100,
//     elevation: mobileW * 1 / 100,
//     padding: mobileW * 3 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100
//   },
//   DOT: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: "flex-end",
//     marginTop: mobileW * 12 / 100,
//     marginRight: mobileW * 3 / 100
//   },
//   straightLine_learnerView: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 15 / 100,
//     marginLeft: mobileW * 25 / 100
//   },
//   redDot: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: mobileW * 23.5 / 100
//   },
//   redDot_session: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignSelf: "flex-end",
//     marginRight: mobileW * 28 / 100
//   },
//   static_text: {
//     width: mobileW * 65 / 100,
//     fontSize: mobileW * 3.7 / 100,
//     color: Colors.gray
//   },
//   redDot_learnerView: {
//     width: mobileW * 3.6 / 100,
//     backgroundColor: "white",
//     borderRadius: mobileW * 2.5 / 100,
//     height: mobileW * 3.6 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: mobileW * 23.5 / 100
//   },
//   help_vIeW: {
//     marginTop: mobileH * 72 / 100,
//     marginLeft: mobileW * 30 / 100
//   },
//   Help_modal: {
//     width: mobileW * 85 / 100,
//     backgroundColor: Colors.themecolor,
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: mobileW * 3 / 100
//   },
//   discripsion_text: {
//     fontSize: mobileW * 2.5 / 100,
//     color: Colors.gray,
//     marginTop: mobileW * 0.5 / 100,
//     width: mobileW * 40 / 100,
//     fontFamily: Font.FontMedium
//   },
//   bottomtabImage: {
//     width: mobileW * 5.5 / 100,
//     height: mobileW * 5.5 / 100,
//     tintColor: Colors.orange
//   },
//   redMainDot: {
//     width: mobileW * 2.2 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 1.1 / 100,
//     height: mobileW * 2.2 / 100,
//     alignSelf: "center"
//   },
//   title_text: {
//     fontSize: mobileW * 3.3 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontMedium,
//     marginTop: mobileW * 2 / 100
//   },
//   chatData: {
//     fontSize: mobileW * 3.8 / 100,
//     marginTop: mobileW * 2 / 100,
//     color: Colors.grayText
//   },
//   chat: {
//     fontSize: mobileW * 3.2 / 100,
//     color: Colors.black_color,
//     textAlign: "center",
//     fontFamily: Font.FontRegular,
//     padding: mobileW * 2 / 100
//   },
//   mainWhiteWiew: {
//     backgroundColor: "white",
//     width: mobileW * 93 / 100,
//     height: mobileW * 38 / 100,
//     borderRadius: mobileW * 3 / 100,
//     justifyContent: 'center',
//     paddingHorizontal: mobileW * 3 / 100,
//     paddingVertical: mobileW * 1 / 100,
//   },
//   mainWhiteWiew_chat: {
//     backgroundColor: "white",
//     width: mobileW * 83 / 100,
//     height: mobileW * 27 / 100,
//     borderRadius: mobileW * 3 / 100,
//     justifyContent: 'center',
//     paddingVertical: mobileW * 1 / 100,
//   },
//   Learners_view: {
//     backgroundColor: "white",
//     width: mobileW * 72 / 100,
//     height: mobileW * 23 / 100,
//     borderRadius: mobileW * 3 / 100,
//     justifyContent: 'center',
//     paddingHorizontal: mobileW * 3 / 100,
//     marginRight: mobileW * 10 / 100,
//   },
//   Learners_session: {
//     backgroundColor: "white",
//     width: mobileW * 72 / 100,
//     height: mobileW * 28 / 100,
//     borderRadius: mobileW * 3 / 100,
//     justifyContent: "center"
//   },
//   api_text: {
//     fontSize: mobileW * 2.8 / 100,
//     color: Colors.black_color,
//     marginTop: mobileW * 0.8 / 100,
//     width: mobileW * 40 / 100,
//     fontFamily: Font.FontSemiBold
//   },
//   modal_view: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: '#00000060'
//   },
//   categary_text: {
//     color: Colors.gray,
//     fontSize: mobileW * 3 / 100
//   },
//   CHAT: {
//     fontSize: mobileW * 4.3 / 100,
//     fontFamily: Font.FontMedium,
//     color: Colors.blackColor,
//     alignSelf: "center",
//     marginTop: mobileW * 1.6 / 100
//   },
//   text: {
//     color: Colors.black_color,
//     fontSize: mobileW * 3.3 / 100,
//     fontFamily: Font.FontMedium
//   },
//   youtube_icon: {
//     width: mobileW * 8 / 100,
//     height: mobileW * 8 / 100
//   },
//   Expert_talk: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     marginTop: mobileW * 2 / 100,
//     fontFamily: Font.FontMedium

//   },
//   Ask_text: {
//     color: Colors.white_color,
//     fontFamily: Font.FontSemiBold,
//     fontSize: mobileW * 3.5 / 100
//   },
//   Manage_View: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   FlatList_View: {
//     marginTop: mobileW * 1 / 100,
//     // marginBottom: mobileW * 5 / 100,
//   },
//   student_icon: {
//     width: mobileW * 10 / 100,
//     height: mobileW * 10 / 100,
//   },
//   Recomented_txt: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontMedium,
//     marginTop: mobileW * 2 / 100
//   }
// })















































// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import React from 'react';
// import {Text, View, Dimensions, Image} from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// export const SLIDER_WIDTH = Dimensions.get('window').width + 20;
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);

// const data = [
//   {
//     id: 1,
//     name: 'React JS',
//     url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
//   },
//   {
//     id: 2,
//     name: 'JavaScript',
//     url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
//   },
//   {
//     id: 3,
//     name: 'Node JS',
//     url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
//   },
// ];

// const renderItem = ({item}) => {
//   return (
//     <View
//       style={{
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 20,
//         alignItems: 'center',
//         backgroundColor: 'white',
//       }}>
//       <Image resizeMode='contain' source={{uri: item.url}} style={{width: 200, height: 200}} />
//       <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
//         {item.name}
//       </Text>
//     </View>
//   );
// };

// const Homepage = () => {
//   return (
//     <View style={{marginVertical: 10}}>
//       <Carousel
//         data={data}
//         renderItem={renderItem}
//         autoplay
//         loop
//         sliderWidth={SLIDER_WIDTH}
//         itemWidth={ITEM_WIDTH}
//       />
//     </View>
//   );
// };
// export default Homepage;

