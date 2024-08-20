import { StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions, TouchableOpacity, Modal, Image, StyleSheet, Alert } from 'react-native'
import React, { useContext, useCallback, useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSliderDot from './UserSliderDot';
import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ImageBackground } from 'react-native';
import firebase from 'firebase';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { fonts } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import Context from '../src/Components/context';
import { set } from 'date-fns';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
// const SLIDER_WIDTH = Dimensions.get('window').width + 20;
//  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);


const Learner = [
  {
    id: 1,
    image: require('./Icon/12.jpg'),
    name: 'Shubham Mahajan',
    skill: 'Kotlin',
    level: 'Basic',
    category: 'testing',
    title: 'Work Stress Management',
  },
  {
    id: 2,
    image: require('./Icon/11.jpg'),
    name: 'Ishina Choudhary',
    skill: 'Kotlin',
    level: 'Basic',
    category: 'testing',
    title: 'Work Stress Management',
  },
  {
    id: 3,
    image: require('./Icon/15.jpg'),
    name: 'Sahil',
    skill: 'Kotlin',
    level: 'Basic',
    category: 'testing',
    title: 'Work Stress Management',
  },
]

// ----------------------------------------------------------------
const MavenTesting = [
  {
    id: 1,
    image: require('./Icon/icon_student.png'),
    heading: 'Maven(s) Recommended for Automation testing',
    title: 'Support Team',
    skills: 'Automation testing',
    level: 'Basic',
    categary: 'Testing',
  },

]

const CompanyData = [
  {
    id: 1,
    Company_Logo: require('./Icon/16.png'),
    company: 'Tata Consultancy  services',
  },
  {
    id: 2,
    Company_Logo: require('./Icon/17.png'),
    company: 'infosys',
  },
  {
    id: 3,
    Company_Logo: require('./Icon/18.jpg'),
    company: 'InfoBeans',
  },

]


export const trimText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

 export default function UserMaven({ navigation, route }) {
  const context = useContext(Context)
  console.log('Modal Open using context =======>>>>', context.tasks[0]);
  const [slider, setSlider] = useState([]);
  const [ModalVisible_GifModal, setModalVisible_GifModal] = useState(false)
  const [job, setJob] = useState(CompanyData);
  const [recommendedData, setRecommendedData] = useState([]);
  const [upskillingCourses, setUpskillingCourses] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
  const [modalVisible, setModalVisible] = useState(context.tasks[0]);
  const [modalhighlighter, setmodalhighlighter] = useState(false);
  const [ModalVale, setModalVale] = useState(0);
  const [userMode, setuserMode] = useState();
  const isFocused = useIsFocused();
  const [ApplicationMode, setApplicationMode] = useState();
  console.log(setApplicationMode, 'setApplicationMode.......................');
  const [CountForApi, setCountForApi] = useState(0)
  const [loggedInUserName, setLoggedInUserName] = useState('')

  useEffect(() => {
    LoggedInUser()
    if (isFocused) {
      apiCalling();
      recommendedApi();
      UpskillingCourses();
    }
  }, [isFocused])
 
  const modalChangeFunction = async () => {
    setmodalhighlighter(false)
    setModalVale(ModalVale + 1)
    setTimeout(() => {
      setmodalhighlighter(true)
    }, 1000);
    if (ModalVale === 6 ) {
      console.log(' modal change function ===================>');
      await localStorage.setItemString('ShowHeighlights', 'Done');
       }
       get_ID()
       }

  const [Highlighter_data,setHighlihter_data] = useState('')
  console.log(Highlighter_data,' ============ > Highlihter_data inner state side ');

    const get_ID = async() => {
    const highlighter_DATa = await AsyncStorage.getItem('ShowHeighlights');
    console.log(highlighter_DATa,'highlighter_DATa========highlighter_DATa _____ get storage data ');
    setHighlihter_data(highlighter_DATa)
   highlighter_Value()
    }

    const highlighter_Value = ()=>{
      if(Highlighter_data == '')
      {
        setmodalhighlighter(true)
       }
       else
       {
        setmodalhighlighter(false)
       }
    }
  

  const ShoWHeighlights = async () => {
    const ShowHeighlights = await localStorage.getItemString('ShowHeighlights');
    console.log(ShowHeighlights, 'ShowHeighlights -- > localstorage data ');
    if (ShowHeighlights == null) {
      setTimeout(() => {
        setmodalhighlighter(true)
        setModalVale(0)
      }, 500);

    } else {
      let OnboardingPageNav = await localStorage.getItemString('ShowHeighlights');
      if (OnboardingPageNav == 'Done') {
        setmodalhighlighter(false)
        setModalVale(9)
      }
    }
  }

const apiCalling = () => {
    axios.post('https://mavenow.com:8001/SettingImage/getSettingImage', {
      imagetype: "Slider",
      type: "App"
    })
      .then(function (data) {
        var GetData = data.data.getSettingImage
        var ErrorMessage = data.data.ErrorMessage
        console.log("all data", ErrorMessage)
        console.log('Sliders  all images data =====================>', GetData);
        if (ErrorMessage == "successfuly") {
          setSlider(GetData)
        } else {
        }
      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }
  const recommendedApi = () => {
    axios.post('https://mavenow.com:8001/course/GetAllRecommendedCourses', {
      userid: "848",
      usertype: "1"
    })
      .then(function (data) {
        var GetData = data.data.GetAllRecommendedCourses
        console.log("Recommended data here==", GetData);
        var ErrorMessage = data.data.ErrorMessage
        console.log("all data", ErrorMessage)
        if (ErrorMessage == "successfuly") {
          setRecommendedData(GetData)
        } else {
        }
      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }
  const UpskillingCourses = () => {
    axios.post('https://mavenow.com:8001/course/GethiglightVideosForApp?logid=848', {
      "skip": 1,
      "categoryIds": [
        "20",
        "7"
      ],
      "skillIds": [
        "249",
        "53",
        "54"
      ],
      "studentid": 655,
      "showeveryone": 1
    })
      .then(function (data) {
        var GetData = data.data.GethiglightVideosForApp
        var ErrorMessage = data.data.ErrorMessage
        if (ErrorMessage == "getting successfuly") {
          setUpskillingCourses(GetData)
        } else {
        }
      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }

  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  // ====================youtube player===================================
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX
            },
          },
        },
      ],
      {
        useNativeDriver: false
      },
    )(event)
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
    
    // const highlighter_DATa = await AsyncStorage.getItem('ShowHeighlights');
    // console.log(highlighter_DATa,"uid SPLash screen_________________");
  



  const SetMode = async () => {
    const value = await localStorage.getItemString('UserMode')
    console.log("***********==========================************==========================*****", value);
    setuserMode(value)
  }

  // ================ data to set local storage 
  const DataSET = async () => {
    var datamode = await localStorage.getItemString('select');
    setApplicationMode(datamode)
    console.log(ApplicationMode, '...........!!!!!!!!!!!!!!!!!setApplicationMode!!!!!!!!!!!!!!!!!!!.........');
  }

 const isCarousel = useRef(null);
 const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }
  const backButton = () => {
    // global.dashoard_modal = false
    // setModalVisible(false)
    context.deleteTask(false)
  }



  const LoggedInUser = async () => {
    try {
      const datasnapshot = await new Promise((resolve, reject) => {
        firebase.database().ref('users').on("value", (snapshot) => {
          resolve(snapshot);
        }, (error) => {
          reject(error);
        });
      });

      console.log('datasnapshot------', datasnapshot.val());
      const uuid = await AsyncStorage.getItem('UID');

      datasnapshot.forEach((child) => {
        if (child.val().uuid === uuid) {
          console.log('User Name Here:', child.val().name);
          setLoggedInUserName(child.val().name);
          AsyncStorage.setItem('UserName', child.val().name);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ---------------------------- dashboard  modal start */}


        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={context.tasks[0] == undefined ? false : true}
            onRequestClose={() => {
            }} >
            <View style={styles.modal_view}>
              <View style={styles.Help_modal}>
                <Text style={styles.HElp_Text}>Help : Dashboard</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => backButton()} >
                  <Image style={styles.modal_closeicon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
              <View style={styles.modal_text}>
                <ScrollView>
                  <Text style={styles.Modal_text}>Kalam earned a degree in aeronautical engineering from the
                    Madras Institute of Technology and in 1958 joined the Defence Research and Development Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                    was project director of the SLV-III, the first satellite launch vehicle that was both designed
                    and produced in India. Rejoining DRDO in 1982, Kalam plich helped earn him the nickname “ich helped earn him the nickname “ich helped earn him the nickname “
                    ich helped earn him the nickname “ich helped earn him the nickname “ich helped earn him the nickname “anned the program that produced a number
                    of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
                    intermediate-range ballistic missile, which incorporated aspects of theSLV-III and was launched in 1989.</Text>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* <<---------------------------- heilighter modal--------------------->> */}
        {ModalVale == 0 &&
          <Modal transparent={true} visible={modalhighlighter}>
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
              <View style={styles.chat_highlighter}>
                <View style={styles.mainWhiteWiew_chat}>
                  <Text style={styles.CHAT}>{Lang_chg.ChatTxt[config.language]}</Text>

                  <Text style={styles.chat}>{Lang_chg.ChatwithyourMaven[config.language]}</Text>
                </View>
                <View style={styles.straightLine}></View>
                <View style={styles.redDot}>
                  <View style={styles.redMainDot}></View></View>
              </View>
              <View style={[styles.bottomIconView, { marginLeft: mobileW * 20 / 100 }]}>
                <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_chat.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 1 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
              <View style={styles.calender_modal}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 60 / 100, height: mobileW * 18 / 100 }]}>
                  <Text style={styles.CHAT}>{Lang_chg.Calender[config.language]}</Text>
                  <Text style={styles.chat}>{Lang_chg.CheckyourSchedulehere[config.language]}</Text>
                </View>
                <View style={[styles.straightLine_calender, { marginLeft: mobileW * 0 / 100 }]}></View>
                <View style={[styles.redDot, { marginLeft: mobileW * 30.8 / 100 }]}>
                  <View style={styles.redMainDot}></View></View>
              </View>
              <View style={[styles.bottomIconView, { marginLeft: mobileW * 41.5 / 100 }]}>
                <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_calendar.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 2 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={styles.Highlighter_UpskillingView}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 77 / 100, height: mobileW * 26 / 100 }]}>
                  <Text style={styles.CHAT}>{Lang_chg.UpskillingCoursesTxt[config.language]}</Text>
                  <Text style={styles.chat}>{Lang_chg.Webringmost[config.language]}</Text>
                </View>
                <View style={styles.themecolorDOT}></View>
                <View style={styles.redDot_View}>
                  <View style={styles.redMainDot}></View>
                </View>
              </View>
              <View style={[styles.bottomIconView, { marginLeft: mobileW * 62 / 100 }]}>
                <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_video.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 3 &&
          <Modal transparent={true} visible={modalhighlighter}>
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={styles.help_vIeW}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 22 / 100 }]}>
                  <Text style={styles.CHAT}>{Lang_chg.HelpTxt[config.language]}</Text>
                  <Text style={styles.chat}>{Lang_chg.Yourappassistancetoprovideyouasmoothexperience[config.language]}</Text>
                </View>
                <View style={styles.help_lineeee}></View>
                <View style={styles.themdottt}>
                  <View style={styles.redMainDot}></View>
                </View>
              </View>
              <View style={[styles.bottomIconView, { alignSelf: "flex-end" }]} >
                <Image style={styles.bottomtabImage} resizeMode='contain' source={require('./Icon/icon_info.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 4 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={{ marginTop: mobileW * 19 / 100, marginLeft: mobileW * 4 / 100 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  setModalVisible_Gif(true)
                  setTimeout(() => {
                    navigation.navigate('MyLearners')
                    // setModalVisible_Gif(false)
                  }, 2000);
                }} style={styles.mavenHeilighterCard}>

                  <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, }} source={require('./Icon/icon_learner_border.png')}></Image>
                  <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginHorizontal: mobileW * 2 / 100 }}>{Lang_chg.MyMavenTxt[config.language]}</Text>

                  {/* <Text style={styles.learner_txt}>{Lang_chg.MyLearnerTxt[config.language]}</Text> */}

                </TouchableOpacity>
              </View>
              <View style={{ alignSelf: "center", marginTop: mobileH * 1 / 100 }}>
                <View style={styles.redDot_learnerView}>
                  <View style={styles.redMainDot}></View>
                </View>
                <View style={[styles.straightLine_learnerView]}></View>
                <View style={styles.Learners_view}>
                  <Text style={styles.CHAT}>{Lang_chg.MyMavenTxt[config.language]}</Text>
                  <Text style={styles.chat}>{Lang_chg.Findthelistofcurrentandpreviouslearners[config.language]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 5 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
              <View style={{ marginTop: mobileW * 19 / 100, marginLeft: mobileW * 51 / 100 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.mavenHeilighterCard} >

                  <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, }} source={require('./Icon/icon_session_request_border.png')}></Image>

                  <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginHorizontal: mobileW * 2 / 100 }}>{Lang_chg.MySessionRequest[config.language]}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sessionrequest_VIEW}>
                <View style={[styles.redDot_learnerView, { marginLeft: mobileW * 38 / 100 }]}>
                  <View style={styles.redMainDot}></View>
                </View>
                <View style={[styles.straightLine_Session, { marginLeft: mobileW * 3 / 100 }]}></View>
                <View style={styles.Learners_session}>
                  <Text style={styles.CHAT}>{Lang_chg.MyLearningRequestTxt[config.language]}</Text>
                  <Text style={styles.chat}>{Lang_chg.Findthelistofallmylearningyouhaverequested[config.language]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 6 &&
          <Modal transparent={true} visible={modalhighlighter}>
            <TouchableOpacity activeOpacity={0.1}
              onPress={() => modalChangeFunction()} style={styles.notificationHilither}>
              <View style={styles.DOT}>
                <View style={styles.redMainDot}></View>
              </View>
              <View style={styles.notification_line}></View>
              <View style={styles.notification_textmanage}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 23 / 100 }]}>
                  <Text style={styles.CHAT}>{Lang_chg.NotificationTxt[config.language]}</Text>
                  <Text style={styles.chat}>{Lang_chg.Getinstantnotificationabouteachactivityhere[config.language]}</Text>
                </View>
              </View>
              <View style={[styles.bottomIconView, {
                top: mobileW * 0 / 100, width: mobileW * 8 / 100, height: mobileW * 8 / 100,
                marginTop: mobileW * 3.5 / 100, backgroundColor: Colors.white_color,
                borderRadius: mobileW * 2 / 100, right: mobileW * 4 / 100
              }]}>
                <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_notification.png")}></Image>
              </View>
            </TouchableOpacity>
          </Modal>}

        {/* <<---------------------------- heilighter modal--------------------->> */}
        <View>
          <Modal animationType="slide" transparent={true}
            visible={ModalVisible_Gif}
            onRequestClose={() => { setModalVisible_Gif(!ModalVisible_Gif); }}>
            <View style={styles.GIF_modal}>
              <Image style={styles.GIF_Images} resizeMode='contain' source={require("./Icon/neighcoach_loader.gif")}></Image>

            </View>
          </Modal>
        </View>

        <View>
          <Modal animationType="slide" transparent={true}
            visible={ModalVisible_GifModal}
            onRequestClose={() => { setModalVisible_GifModal(!ModalVisible_GifModal); }} >
            <View style={[styles.GIF_modal,]}>
              <Image style={{ width: mobileW * 30 / 100, height: mobileW * 20 / 100, alignSelf: "center" }} resizeMode='contain' source={require("./Icon/neighcoach_loader.gif")}></Image>
            </View>
          </Modal>
        </View>

        {/* -------------- HEADER -------------- */}

        <View style={{ width: mobileW, height: mobileW * 15 / 100, justifyContent: 'center', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: mobileW * 4 / 100 }}>
            {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('MyMavenProfile')} style={{flexDirection:'row', alignItems:'center'}}> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              setModalVisible_GifModal(true)
              setTimeout(() => {
                navigation.navigate('MyMavenProfile')
                setModalVisible_GifModal(false)
              }, 1000)
            }} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image resizeMode='contain' style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, backgroundColor: Colors.themecolor, borderRadius: mobileW * 5 / 100 }}
                source={require("./Icon/11.jpg")}></Image>

              <View style={{ marginHorizontal: mobileW * 2 / 100 }}>
                <Text style={styles.loginuserName}>{loggedInUserName}</Text>
                <Text style={{ fontSize: mobileW * 2.5 / 100, marginTop: mobileW * -1 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }}>{Lang_chg.GoodtoseeyouMaven[config.language]}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }} >
              {/* <TouchableOpacity activeOpacity={0.8} onPress={() =>{
  setModalVisible_GifModal(true)
  setTimeout(() => {
    navigation.navigate('Search')
    setModalVisible_GifModal(false)
  }, 1000)}}> */}
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
                <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: Colors.black_color, marginHorizontal: mobileW * 3 / 100 }}
                  resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')}>
                {/* <TouchableOpacity activeOpacity={0.8} onPress={() =>{
  setModalVisible_GifModal(true)
  setTimeout(() => {
    navigation.navigate('Notification')
    setModalVisible_GifModal(false)
  }, 1000)}}> */}
                <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: Colors.black_color, }}
                  resizeMode='contain' source={require("./Icon/notifications.png")}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
            tintColor={Colors.themecolor}
            colors={[Colors.themecolor]} />
        }>
          <View style={{ marginBottom: mobileW * 18 / 100 }}>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ My Maven / Learner Button +++++++++++++++++++++++++++++ */}


            <View style={{ margin: mobileW * 4 / 100, flexDirection: 'row', justifyContent: 'space-between', }}>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.ButtonCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: Colors.white_color }} resizeMode='contain' source={require("./Icon/Leaner_request.png")}></Image>
                  <Text style={{ fontSize: mobileW * 2.7 / 100, marginHorizontal: mobileW * 2 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>{global.togalemode == 'maven' ? Lang_chg.MyLearnerTxt[config.language] : Lang_chg.MyMavenxt[config.language]}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={[styles.ButtonCard, { backgroundColor: Colors.whiteColor, }]}>



                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <Image style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/request_larner.png")}></Image>
                  <Text style={{ fontSize: mobileW * 2.6 / 100, marginHorizontal: mobileW * 2 / 100, color: Colors.gray, width: mobileW * 30 / 100, textAlign: 'center', fontFamily: Font.FontMedium }}>{global.togalemode == 'maven' ? Lang_chg.MySessionRequestTxt[config.language] : Lang_chg.MyLearningRequestTxt[config.language]}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* -------------- HEADER -------------- */}

            <View style={{ flexDirection: 'row', marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, marginTop: mobileW * 2 / 100, justifyContent: 'space-between', alignItems: 'center', }}>
              <Text style={styles.automation_text}>{Lang_chg.JobsTxt[config.language]}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Job')}>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium }}>{Lang_chg.ViewAllTxt[config.language]}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: mobileW * 2 / 100, marginLeft: mobileW * 4 / 100, }}>
              <FlatList
                data={job}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <TouchableOpacity onPress={() => navigation.navigate('Jobapply', { item: item })} activeOpacity={0.8} style={styles.jobCardView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <View style={styles.companyLogo}>
                        <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100, }} source={item.Company_Logo}></Image>
                      </View>
                      <Text style={styles.companyName}>{item.company}</Text>
                    </View>
                  </TouchableOpacity>} />
            </View>

            <View style={{ marginLeft: mobileW * 4 / 100, marginTop: mobileW * 3 / 100, }}>
              <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <View style={{ marginRight: mobileW * 2 / 100 }}>
                    <Image resizeMethod='resize' resizeMode='contain' style={styles.main_image} source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.imageurl }}></Image>
                  </View>
                } />
            </View>

            {/*  ++++++++++++++++++++++ Recommended Learner +++++++++++++++++++++ */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: mobileW * 4 / 100, marginTop: mobileW * 3 / 100 }}>
              <Text style={styles.automation_text}>{global.togalemode == "maven" ? Lang_chg.LearnerRecommendedTxt[config.language] : Lang_chg.MavenRecommendedTxt[config.language]}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Viewall')}>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium }}>{Lang_chg.ViewAllTxt[config.language]}</Text>
              </TouchableOpacity>
            </View>

            {global.togalemode == "maven" ?
              <View style={styles.flatListmanage_view}>
                <FlatList
                  data={Learner}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity activeOpacity={0.8} style={styles.learnarTesting}>
                      {/* <View style={{ height: mobileW * 10 / 100, backgroundColor: Colors.themecolor, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100, borderColor: Colors.themecolor }}></View> */}
                      <View style={{ alignItems: 'center', }}>
                        <Image resizeMode='contain' style={styles.api_image} source={item.image}></Image>
                      </View>
                      <Text style={styles.name}>{item.name}</Text>
                      {/* <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, alignSelf: 'center', color: Colors.black_color }}>{Lang_chg.Coursename[config.language]}</Text> */}
                      {/* <View style={styles.Self_VIEW}></View> */}
                      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: mobileW * -1 / 100, margin: mobileW * 0.6 / 100, }}>
                        <View style={styles.manageVIEW}>
                          {/* <Text style={styles.skills_text}>Skiills:{trimText(item.skill, 6)}</Text> */}
                          <Text style={styles.skills_text}>{Lang_chg.SkillsTxt[config.language]}</Text>
                          <Text style={styles.skills_textdata}>{item.skill}</Text>
                        </View>
                        <View style={styles.manageVIEW}>
                          {/* <Text style={styles.skills_text}>Skiills:{trimText(item.skill, 6)}</Text> */}
                          <Text style={styles.skills_text}>{Lang_chg.LevelTxt[config.language]}</Text>
                          <Text style={styles.skills_textdata}>{item.category}</Text>
                        </View>
                      </View>

                      {/* <Text style={styles.skills_textdata}>Category:{trimText(item.category, 3)}</Text> */}
                    </TouchableOpacity>} />
              </View> : <View style={styles.FlatList_View}>
                <FlatList
                  data={MavenTesting}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <View>

                      <View style={styles.recommendedMaven}>
                        <View style={{ flexDirection: 'row' }}>

                          <View style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100, alignItems: 'center', justifyContent: 'center' }}>
                            <Image resizeMode='contain' style={styles.Api_image} source={item.image}></Image>

                          </View>

                          <View style={styles.skilltitle_view}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: mobileW * 73 / 100 }}>
                              <Text style={styles.title_text}>{item.title}</Text>
                              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerSuport')} style={styles.askAnithingButton}>
                                <Text style={styles.Ask_text}>{Lang_chg.AskAnythingTxt[config.language]}</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.Manage_View}>
                              <Text style={styles.text}>{Lang_chg.SkillsTxt[config.language]} </Text>
                              <Text numberOfLines={1} style={styles.supportTeamData}>{item.skills}</Text>
                            </View>

                            <View style={[styles.Manage_View]}>
                              <Text style={styles.text}>{Lang_chg.LevelTxt[config.language]} </Text>
                              <Text numberOfLines={1} style={styles.supportTeamData}>{item.level}</Text>
                            </View>


                          </View>
                        </View>
                      </View>
                    </View>
                  } />
              </View>}

            <Text style={styles.upskillingCourses_TEXT}>{Lang_chg.FreeUpskillingCoursesTxt[config.language]}</Text>




            <View style={{ marginLeft: mobileW * 4 / 100, marginTop: mobileW * 2 / 100, }}>
              <FlatList
                data={upskillingCourses}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <View style={styles.flatList_View}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpskillingCourses', { videourl: item.file_path, videoid: item.id })}>
                      <ImageBackground imageStyle={styles.image} style={styles.Background_Image} resizeMode="contain"
                        source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
                        <Image resizeMode='contain' style={styles.play_button} source={require('./Icon/icon_play_button.png')}></Image>
                      </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.name_discriptionview}>
                      <Text style={styles.apiname}>{item.name}</Text>
                      <Text numberOfLines={2} style={styles.discripsion_text}>{item.description}</Text>
                    </View>
                  </View>} />
            </View>
            <Text style={styles.Expert_talk}>{Lang_chg.ExpertTalkTxt[config.language]}</Text>
            <View style={styles.flatlistData_View}>
              <FlatList
                data={upskillingCourses}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <View style={styles.background_VIEW}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('YouTubePlayer')}>
                      <ImageBackground imageStyle={styles.ImageBackground} style={styles.dianamic_IMAGE} resizeMode="contain"
                        source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
                        <Image resizeMode='contain' style={styles.youtube_icon} source={require('./Icon/icon_youtube.png')}></Image>
                      </ImageBackground>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: mobileW * 2 / 100 }}>
                      <Text style={styles.api_text}>{item.name}</Text>
                      <Text style={styles.ExpertTalkDiscripstion}>{trimText(item.description, 45)}</Text>
                    </View>
                  </View>} />
            </View>






          </View>

        </ScrollView>

        <HideWithKeyboard>
          <Footer
            activepage='UserMaven'
            usertype={1}
            footerpage={[
              { name: Lang_chg.Footerhome[config.language], countshow: false, image: require('./Icon/menu_new.png'), activeimage: require('./Icon/menu_new.png') },
              { name: Lang_chg.chat[config.language], countshow: false, image: require('./Icon/chat_new.png'), activeimage: require('./Icon/chat_new.png') },
              // { name:'Chat', countshow: false, image: require('./Icon/chat1.png'), activeimage: require('./Icon/icon_chat.png') },
              { name: Lang_chg.Schedule[config.language], countshow: false, image: require('./Icon/icon_calendar.png'), activeimage: require('./Icon/icon_calendar.png') },
              { name: Lang_chg.Video[config.language], countshow: false, image: require('./Icon/video_new.png'), activeimage: require('./Icon/video_new.png') },
              { name: Lang_chg.info[config.language], countshow: false, image: require('./Icon/info_new.png'), activeimage: require('./Icon/info_new.png') },
            ]}
            navigation={navigation}
            imagestyle1={{ width: mobileW * 6 / 100, height: mobileW * 5.5 / 100, backgroundColor: Colors.whiteColor, countcolor: 'black', countbackground: 'black', }}
          />
        </HideWithKeyboard>
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistData_View:{ 
    marginTop: mobileW * 2 / 100 ,
    marginLeft: mobileW * 4 / 100, 
},
  loginuserName:{ 
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3.2 / 100,
 },
  flatListmanage_view: {
    marginLeft: mobileW * 4 / 100,
  },
  name_discriptionview: {
    padding: mobileW * 1 / 100,
  },
  notification_textmanage: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: mobileW * 33 / 100
  },
  ButtonCard: {
    borderColor: '#E7E8EA',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 45 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 8 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  themdottt: {
    alignItems: 'center',
    alignSelf: "flex-end",
    justifyContent: 'center',
    backgroundColor: "white",
    width: mobileW * 3.6 / 100,
    height: mobileW * 3.6 / 100,
    marginRight: mobileW * 7.5 / 100,
    borderRadius: mobileW * 2.5 / 100,
  },
  manageVIEW: {
    flexDirection: 'row',
    margin: 2,
    width: mobileW * 17 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  background_VIEW: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: "#e8edfb",
    width: mobileW * 65 / 100,
    padding: mobileW * 2 / 100,
    marginRight: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
    marginBottom: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
    backgroundColor: Colors.white_color,
  },
  dianamic_IMAGE: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 20 / 100,
    height: mobileW * 20 / 100,
    borderRadius: mobileW * 1 / 100
  },
  name: {
    color: '#121A23',
    alignSelf: 'center',
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 2.5 / 100,
  },
  Header: {
    width: mobileW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#d6eef8',
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100
  },
  NamedNodeMap: {
    alignSelf: "flex-end",
    marginRight: mobileW * 2 / 100
  },
  backIcon: {
    tintColor: Colors.white_color,
    width: mobileW * 25 / 100,
    height: mobileW * 25 / 100,
    borderRadius: mobileW * 4 / 100,
    marginHorizontal: mobileW * 5 / 100,
  },
  SearchIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.themecolor
  },
  upskillingCourses_TEXT: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 4 / 100,
    marginLeft: mobileW * 4 / 100,
    fontSize: mobileW * 3.2 / 100,
    marginRight: mobileW * 4 / 100,
  },
  ImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 19 / 100,
    height: mobileW * 19 / 100,
    borderRadius: mobileW * 2 / 100
  },
  calender_modal: {
    marginTop: mobileH * 75 / 100,
    marginLeft: mobileW * 19 / 100
  },
  play_button: {
    tintColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    marginTop: mobileW * 15.5 / 100,
    marginLeft: mobileW * 2.5 / 100,
    borderRadius: mobileW * 5 / 100,
  },
  jobCardView: {
    elevation: 0.2,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    width: mobileW * 42 / 100,
    padding: mobileW * 2 / 100,
    marginRight: mobileW * 1 / 100,
    borderRadius: mobileW * 2 / 100,
    marginBottom: mobileW * 1 / 100,
    backgroundColor: Colors.white_color,
  },
  learnarTesting: {
    width: mobileW * 40 / 100,
    padding: mobileW * 1 / 100,
    marginTop: mobileW * 0.1 / 100,
    marginRight: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginBottom: mobileW * 0.5 / 100,
    borderColor: "#e8edfb",
    backgroundColor: Colors.white_color,
  },
  Modal_text: {
    color: Colors.gray,
    textAlign: "center",
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
  },
  themecolorDOT: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    width: mobileW * 0.6 / 100,
    height: mobileW * 13.5 / 100,
    marginRight: mobileW * 27.5 / 100
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  GIF_modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  GIF_Images: {
    alignSelf: "center",
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100,
  },
  help_lineeee: {
    width: mobileW * 0.6 / 100,
    height: mobileW * 13.5 / 100,
    marginRight: mobileW * 9 / 100,
    alignSelf: "flex-end",
    backgroundColor: "white",
  },
  recommendedMaven: {
    width: mobileW * 92 / 100,
    height: mobileW * 25 / 100,
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderColor: "#e8edfb",
    backgroundColor: Colors.white_color,
  },
  askAnithingButton: {
    height: mobileW * 6 / 100,
    width: mobileW * 26 / 100,
    marginBottom: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themecolor
  },
  supportTeamData: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 2.5 / 100,
    marginHorizontal: mobileW * 1.5 / 100
  },
  backIcon: {
    width: mobileW * 8.5 / 100,
    height: mobileW * 8.5 / 100,
    marginTop: mobileW * 2 / 100,
    tintColor: Colors.white_color,
  },
  redDot_View: {
    width: mobileW * 3.6 / 100,
    height: mobileW * 3.6 / 100,
    marginRight: mobileW * 26 / 100,
    borderRadius: mobileW * 2.5 / 100,
    alignItems: 'center',
    alignSelf: "flex-end",
    backgroundColor: "white",
    justifyContent: 'center',
  },
  notification_line: {
    alignSelf: "flex-end",
    backgroundColor: Colors.white_color,
    height: mobileW * 8 / 100,
    width: mobileW * 0.6 / 100,
    marginRight: mobileW * 4.5 / 100,
  },
  companyName:{ 
    width: mobileW * 22 / 100, 
    fontSize: mobileW * 2.3 / 100, 
    marginHorizontal: mobileW * 2 / 100, 
    color: Colors.black_color, 
    fontFamily: Font.FontMedium 
  },
  companyLogo:{ 
    backgroundColor: '#FAFAFA', 
    width: mobileW * 10 / 100, 
    height: mobileW * 10 / 100, 
    borderRadius: mobileW * 1 / 100, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  learner_txt: {
    textAlign: 'center',
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 3.5 / 100,
    marginTop: mobileW * 0.5 / 100,
  },
  Highlighter_UpskillingView: {
    marginTop: mobileH * 70 / 100,
    marginLeft: mobileW * 20 / 100
  },
  modal_closeicon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  apiname: {
    fontSize: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold
  },
  skills_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    width: mobileW * 9.7 / 100,
    fontSize: mobileW * 2.5 / 100,

  },
  skills_textdata: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    width: mobileW * 8.8 / 100,
    fontSize: mobileW * 2.5 / 100,
  },
  sessionrequest_VIEW: {
    alignSelf: "flex-end",
    marginTop: mobileH * 1 / 100,
    marginRight: mobileW * 2 / 100
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    height: mobileW * 18 / 100,
    width: mobileW * 28.5 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color
  },
  HElp_Text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  chat_highlighter: {
    marginTop: mobileH * 69 / 100,
    marginLeft: mobileW * 5 / 100
  },
  api_image: {
    padding: 5,
    borderWidth: 1,
    width: mobileW * 15 / 100,
    height: mobileW * 15 / 100,
    borderRadius: mobileW * 8 / 100,
    backgroundColor: Colors.gray,
  },
  mavenHeilighterCard: {
    width: mobileW * 45 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 6 / 100,
    backgroundColor: Colors.white_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Api_image: {
    width: mobileW * 8 / 100,
    height: mobileW * 8 / 100
  },
  Background_Image: {
    width: mobileW * 28 / 100,
    margin: mobileW * 1 / 100,
    height: mobileW * 18 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color
  },
  automation_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3.2 / 100,
  },
  ModalViewBox: {
    flex: 1,
    backgroundColor: '#00000060',
    paddingRight: mobileW * 1 / 100,
  },
  notificationHilither: {
    flex: 1,
    backgroundColor: '#00000060',
    paddingRight: mobileW * 3 / 100,
  },
  slider: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_image: {
    width: mobileW * 38 / 100,
    height: mobileW * 20 / 100,
    borderRadius: mobileW * 2 / 100
  },
  bottomIconView: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'white',
    width: mobileW * 20 / 100,
    height: mobileW * 13 / 100,
    marginLeft: mobileW * 10 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    bottom: Platform.OS == 'android' ? 0 : mobileH * 2 / 100,
  },
  straightLine: {
    backgroundColor: "white",
    width: mobileW * 0.6 / 100,
    height: mobileW * 16 / 100,
    marginLeft: mobileW * 25 / 100
  },
  straightLine_calender: {
    alignSelf: "center",
    backgroundColor: Colors.white_color,
    width: mobileW * 0.6 / 100,
    height: mobileW * 13.5 / 100,
    marginRight: mobileW * 15 / 100,
  },
  straightLine_Session: {
    alignSelf: 'flex-end',
    backgroundColor: "white",
    width: mobileW * 0.6 / 100,
    height: mobileW * 18 / 100,
    marginRight: mobileW * 31.7 / 100
  },
  flatList_View: {
    width: mobileW * 31 / 100,
    marginRight: mobileW * 2 / 100,
    marginBottom: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderColor: '#E7E8EA',
    backgroundColor: Colors.white_color,
  },
  modal_text: {
    backgroundColor: Colors.whiteColor,
    width: mobileW * 90 / 100,
    padding: mobileW * 3 / 100,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100
  },
  DOT: {
    alignItems: 'center',
    alignSelf: "flex-end",
    justifyContent: 'center',
    backgroundColor: "white",
    width: mobileW * 3.6 / 100,
    height: mobileW * 3.6 / 100,
    marginTop: mobileW * 12 / 100,
    marginRight: mobileW * 3 / 100,
    borderRadius: mobileW * 2.5 / 100,
  },
  straightLine_learnerView: {
    backgroundColor: "white",
    width: mobileW * 0.6 / 100,
    height: mobileW * 15 / 100,
    marginLeft: mobileW * 25 / 100
  },
  redDot: {
    alignItems: 'center',
    backgroundColor: "white",
    justifyContent: 'center',
    width: mobileW * 3.6 / 100,
    height: mobileW * 3.6 / 100,
    borderRadius: mobileW * 2.5 / 100,
    marginLeft: mobileW * 23.5 / 100
  },
  redDot_session: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    width: mobileW * 3.6 / 100,
    height: mobileW * 3.6 / 100,
    marginRight: mobileW * 28 / 100,
    borderRadius: mobileW * 2.5 / 100,
  },
  static_text: {
    width: mobileW * 65 / 100,
    fontSize: mobileW * 3.7 / 100,
    color: Colors.gray
  },
  redDot_learnerView: {
    width: mobileW * 3.6 / 100,
    height: mobileW * 3.6 / 100,
    marginLeft: mobileW * 23.5 / 100,
    borderRadius: mobileW * 2.5 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
  },
  help_vIeW: {
    marginTop: mobileH * 72 / 100,
    marginLeft: mobileW * 30 / 100
  },
  Help_modal: {
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  discripsion_text: {
    color: Colors.gray,
    fontFamily: Font.FontMedium,
    width: mobileW * 25 / 100,
    fontSize: mobileW * 2 / 100,
    marginTop: mobileW * 0.5 / 100,
  },
  ExpertTalkDiscripstion: {
    color: Colors.gray,
    fontFamily: Font.FontMedium,
    width: mobileW * 38 / 100,
    fontSize: mobileW * 2.5 / 100,
    marginTop: mobileW * 0.5 / 100,
  },
  bottomtabImage: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    tintColor: Colors.orange
  },
  redMainDot: {
    alignSelf: "center",
    backgroundColor: Colors.themecolor,
    width: mobileW * 2.2 / 100,
    height: mobileW * 2.2 / 100,
    borderRadius: mobileW * 1.1 / 100,
  },
  title_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 2.8 / 100,
  },
  chatData: {
    color: Colors.grayText,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.8 / 100,
  },
  chat: {
    padding: mobileW * 2 / 100,
    fontSize: mobileW * 3.2 / 100,
    textAlign: "center",
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
  },
  mainWhiteWiew: {
    backgroundColor: "white",
    justifyContent: 'center',
    width: mobileW * 93 / 100,
    height: mobileW * 38 / 100,
    borderRadius: mobileW * 3 / 100,
    paddingVertical: mobileW * 1 / 100,
    paddingHorizontal: mobileW * 3 / 100,
  },
  mainWhiteWiew_chat: {
    backgroundColor: "white",
    justifyContent: 'center',
    width: mobileW * 83 / 100,
    height: mobileW * 27 / 100,
    borderRadius: mobileW * 3 / 100,
    paddingVertical: mobileW * 1 / 100,
  },
  Learners_view: {
    backgroundColor: "white",
    justifyContent: 'center',
    width: mobileW * 72 / 100,
    height: mobileW * 23 / 100,
    marginRight: mobileW * 10 / 100,
    borderRadius: mobileW * 3 / 100,
    paddingHorizontal: mobileW * 3 / 100,
  },
  Learners_session: {
    backgroundColor: "white",
    justifyContent: "center",
    width: mobileW * 72 / 100,
    height: mobileW * 28 / 100,
    borderRadius: mobileW * 3 / 100,
  },
  api_text: {
    width: mobileW * 40 / 100,
    fontSize: mobileW * 2.5 / 100,
    marginTop: mobileW * 0.8 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold
  },
  modal_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#00000060'
  },
  CHAT: {
    alignSelf: "center",
    color: Colors.blackColor,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4.3 / 100,
    marginTop: mobileW * 1.6 / 100
  },
  text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 2.8 / 100,
  },
  youtube_icon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100
  },
  Expert_talk: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.2 / 100,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
  },
  Ask_text: {
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 3 / 100
  },
  Manage_View: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatList_View: {
    marginLeft: mobileW * 4 / 100,
  },
})
