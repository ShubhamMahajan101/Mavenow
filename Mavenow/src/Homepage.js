import { StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions, TouchableOpacity, Modal, Image, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserSliderDot from './UserSliderDot';

import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ImageBackground } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++ Learner testing +++++++++++++++++++++++++++++++++++++++++++++++++++++
const Learner = [
  {
    id: 1,
    image: require('./Icon/icon_student.png'),
    name: 'Shubham',
    skill: 'Automation testing [Basic]',
    level: 'Basic',
    category: 'testing',
    title: 'Work Stress Management',
    discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
  },
  {
    id: 2,
    image: require('./Icon/icon_student.png'),
    name: 'Ajaj',
    skill: 'Automation testing [Basic]',
    level: 'Basic',
    category: 'testing',
    title: 'Work Stress Management',
    discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
  },
  {
    id: 3,
    image: require('./Icon/icon_student.png'),
    name: 'Sahil',
    skill: 'Automation testing [Basic]',
    level: 'Basic',
    category: 'testing',
    title: 'Work Stress Management',
    discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
  },
]

// ----------------------------------------------------------------
const MavenTesting = [
  {
    id: 1,
    image: require('./Icon/icon_maven.png'),
    heading: 'Maven(s) Recommended for Automation testing',
    title: 'Support Team',
    skills: 'Automation testing',
    level: 'Basic',
    categary: 'Testing',
  },
  {
    id: 2,
    image: require('./Icon/icon_maven.png'),
    heading: 'Maven(s) Recommended for React',
    title: 'Support Team',
    skills: 'Automation testing',
    level: 'Basic',
    categary: 'Web DeVelopment',
  },
  {
    id: 3,
    image: require('./Icon/icon_maven.png'),
    heading: 'Maven(s) Recommended for React',
    title: 'Support Team',
    skills: 'Automation testing',
    level: 'Basic',
    categary: 'Web DeVelopment',
  },
  {
    id: 4,
    image: require('./Icon/icon_maven.png'),
    heading: 'Maven(s) Recommended for React',
    title: 'Support Team',
    skills: 'Automation testing',
    level: 'Basic',
    categary: 'Web DeVelopment',
  },
  {
    id: 5,
    image: require('./Icon/icon_maven.png'),
    heading: 'Maven(s) Recommended for React',
    title: 'Support Team',
    skills: 'Automation testing',
    level: 'Basic',
    categary: 'Web DeVelopment',
  },
]


export const trimText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export default function Homepage({ navigation }) {
  const [slider, setSlider] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [upskillingCourses, setUpskillingCourses] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
  const [modalVisible, setModalVisible] = useState(global.dashoard_modal);
  const [modalhighlighter, setmodalhighlighter] = useState(true);
  const [ModalVale, setModalVale] = useState(8);
  const [userMode, setuserMode] = useState();
  const isFocused = useIsFocused();
  const [CountForApi, setCountForApi] = useState(0)
  useEffect(() => {
    SetMode();
    // console.log('i am here in Count ', CountForApi);
  })
  useEffect(() => {
    console.log("UserMode==>111");
    if (isFocused) {
      SetMode();
      apiCalling();
      recommendedApi();
      UpskillingCourses();
    }
    SetMode();
    setTimeout(() => {
      setModalVisible_Gif(false)
    }, 2000);


    const ShoWHeighlights = async () => {
      let ShowHeighlights = await localStorage.json.stringify('ShowHeighlights');
      if (ShowHeighlights == null) {
        setModalVale(0)
      } else {
        let OnboardingPageNav = await localStorage.json.stringify('ShowHeighlights');
        if (OnboardingPageNav == 'Done') {
          setModalVale(8)
        }
      }
    }

    ShoWHeighlights()
  }, [isFocused])

  // ------- Continue Calling to update User Mode for Application -------


  // ------------------------------------------
  // const SetMode = async () => {
  //   try {
  //     const value = await AsyncStorage.getItemString('UserMode');
  //     if (value !== null) {
  //       SetMode(value);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // ------------------------------------------

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
        // console.log('Recommende  ====================>',GetData);
        if (ErrorMessage == "successfuly") {

          setRecommendedData(GetData)
          // navigation.navigate('Home')
          // navigation.navigate('Testing')
        } else {
        }

      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }

  // ---------------------------------------------------------------------------------------------------------------- 22-2-2002 -------

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
        console.log("all data", ErrorMessage)
        console.log('upskillingCoursesData  ==================== #>', GetData);
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


  const modalChangeFunction = () => {
    setmodalhighlighter(false)
    setModalVale(ModalVale + 1)

    setTimeout(() => {
      setmodalhighlighter(true)
    }, 100);
    if (ModalVale === 6) {
      localStorage.setItemString('ShowHeighlights', 'Done');
      // storage.set('introScreen', false);
    }
  }


  const SetMode = async () => {
    const value = await localStorage.getItemString('UserMode')
    setuserMode(value)
    console.log("UserMode==>", value);
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.main_VIEW}>
        <Image resizeMethod='resize'
          resizeMode='cover' style={styles.main_image}
          source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.imageurl }}></Image>
      </View>
    );
  };

  const isCarousel = useRef(null);

  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }
  const backButton = () => {
    global.dashoard_modal = false
    setModalVisible(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ---------------------------- dashboard  modal start */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={global.dashoard_modal}
            onRequestClose={() => {
            }} >
            <View style={styles.modal_view}>
              <View style={styles.Help_modal}>
                <Text>  </Text>
                <Text style={styles.HElp_Text}>Help : Dashboard</Text>
                <TouchableOpacity onPress={() => backButton()} >
                  <Image style={styles.modal_closeicon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
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
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={styles.chat_highlighter}>
                <View style={styles.mainWhiteWiew_chat}>
                  <Text style={styles.CHAT}>Chat</Text>
                  <Text style={styles.chat}>Chat with your Maven or Learner here.You can also check your previous conversation and unread message.</Text>
                </View>
                <View style={styles.straightLine}></View>
                <View style={styles.redDot}>
                  <View style={styles.redMainDot}></View></View>
              </View>
              <View style={[styles.bottomIconView, { marginLeft: mobileW * 20 / 100 }]}>
                <Image style={styles.bottomtabImage} source={require('./Icon/icon_chat.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 1 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
              <View style={styles.calender_modal}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 60 / 100, height: mobileW * 18 / 100 }]}>
                  <Text style={styles.CHAT}>Calender</Text>
                  <Text style={styles.chat}>Check your Schedule here.</Text>
                </View>
                <View style={[styles.straightLine_calender, { marginLeft: mobileW * 0 / 100 }]}></View>
                <View style={[styles.redDot, { marginLeft: mobileW * 31.2 / 100 }]}>
                  <View style={styles.redMainDot}></View></View>
              </View>
              <View style={[styles.bottomIconView, { marginLeft: mobileW * 41.5 / 100 }]}>
                <Image style={styles.bottomtabImage} source={require('./Icon/icon_calendar.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 2 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={styles.Highlighter_UpskillingView}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 77 / 100, height: mobileW * 26 / 100 }]}>
                  <Text style={styles.CHAT}>Upskilling Courses</Text>
                  <Text style={styles.chat}>We bring most valuable upskilling courses free of cost to give an edge to your career.Start learning today! </Text>
                </View>
                <View style={styles.themecolorDOT}></View>
                <View style={styles.redDot_View}>
                  <View style={styles.redMainDot}></View>
                </View>
              </View>
              <View style={[styles.bottomIconView, { marginLeft: mobileW * 62 / 100 }]}>
                <Image style={styles.bottomtabImage} source={require('./Icon/icon_video.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 3 &&
          <Modal transparent={true} visible={modalhighlighter}>
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={styles.help_vIeW}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 22 / 100 }]}>
                  <Text style={styles.CHAT}>Help</Text>
                  <Text style={styles.chat}>Your app assistance to provide you a smooth experience.</Text>
                </View>
                <View style={styles.help_lineeee}></View>
                <View style={styles.themdottt}>
                  <View style={styles.redMainDot}></View>
                </View>
              </View>
              <View style={[styles.bottomIconView, { alignSelf: "flex-end" }]} >
                <Image style={styles.bottomtabImage} source={require('./Icon/icon_info.png')} />
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 4 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
              <View style={styles.mylearner_viewmodal}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.LearnerCard}>
                  <View style={styles.TopTwoTab}>
                    <Image resizeMode='contain' style={styles.TopTabImage} source={require('./Icon/icon_learner_border.png')}></Image>
                  </View>
                  <Text style={styles.learner_txt}>My Learner(s)</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignSelf: "center", marginTop: mobileH * 1 / 100 }}>
                <View style={styles.redDot_learnerView}>
                  <View style={styles.redMainDot}></View>
                </View>
                <View style={[styles.straightLine_learnerView]}></View>
                <View style={styles.Learners_view}>
                  <Text style={styles.CHAT}>My learner</Text>
                  <Text style={styles.chat}>Find the list of current and previous learners.</Text>
                </View>
              
              </View>
            </TouchableOpacity>
          </Modal>}

        {ModalVale == 5 &&
          <Modal transparent={true} visible={modalhighlighter} >
            <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
              <View style={styles.session_REQUEST_VIEW}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.LearnerCard} >
                  <View style={styles.TopTwoTab}>
                    <Image resizeMode='contain' style={styles.TopTabImage} source={require('./Icon/icon_session_request_border.png')}></Image>
                  </View>
                  <Text style={styles.sessionrequest_txt}>My Session Request</Text>
                </TouchableOpacity>
                 </View>
                <View style={styles.sessionrequest_VIEW}>
                <View style={[styles.redDot_learnerView, { marginLeft: mobileW * 38 / 100 }]}>
                <View style={styles.redMainDot}></View>
                </View>
                 <View style={[styles.straightLine_Session, { marginLeft: mobileW * 3 / 100 }]}></View>
                 <View style={styles.Learners_session}>
                  <Text style={styles.CHAT}>My Learning Request</Text>
                  <Text style={styles.chat}>Find the list of all my learning you have requested.</Text>
                 </View>
                 </View>
                  </TouchableOpacity>
                   </Modal>}

        {ModalVale == 6 &&
          <Modal transparent={true} visible={modalhighlighter}>
            <TouchableOpacity activeOpacity={0.1}
              onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
              <View style={styles.DOT}>
                <View style={styles.redMainDot}></View>
              </View>
              <View style={styles.notification_line}></View>
              <View style={styles.notification_textmanage}>
                <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 23 / 100 }]}>
                  <Text style={styles.CHAT}>Notification</Text>
                  <Text style={styles.chat}>Get instant notification about each activity here.</Text>
                </View>
              </View>
              <View style={[styles.bottomIconView, {
                top: mobileW * 0 / 100, width: mobileW * 6 / 100, height: mobileW * 7 / 100,
                marginTop: mobileW * 4 / 100, backgroundColor: Colors.themecolor,
                borderRadius: mobileW * 2 / 100, right: mobileW * 2.5 / 100
              }]}>
                <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_notification.png")}></Image>
              </View>
            </TouchableOpacity>
          </Modal>}

        {/* <<---------------------------- heilighter modal--------------------->> */}
        <View>
          <Modal animationType="slide" transparent={true}
            visible={ModalVisible_Gif}
            onRequestClose={() => { setModalVisible_Gif(!ModalVisible_Gif); }} >
            <View style={styles.GIF_modal}>
              <Image style={styles.GIF_Images}
                source={require("./Icon/neighcoach_loader.gif")}></Image>
            </View>
          </Modal>
        </View>

        {/* -------------- HEADER -------------- */}
        <View style={styles.Header}>
          <View style={styles.Header_view}>
           
            {/* {userMode == 'maven' ? */}
              <TouchableOpacity activeOpacity={0.8} style={styles.Header_touchable} onPress={() => { navigation.navigate('MyMavenProfile'), setModalVisible_Gif(true) }}  >
              <Image style={styles.backIcon} resizeMode='contain' source={userMode == 'maven' ? require("./Icon/icon_maven.png") : require("./Icon/icon_student.png")}></Image>
              <Text style={styles.Usermaven_text}> User {userMode == 'maven' ? "Maven" : "Learner"}</Text>
              </TouchableOpacity>
            {/* : */}
            {/*  */}
            {/* <TouchableOpacity activeOpacity={0.8} style={styles.Header_touchable} onPress={() => { navigation.navigate('MyMavenProfile'), setModalVisible_Gif(true) }}  >
                    <Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/icon_student.png")}></Image>
                    <Text style={styles.Usermaven_text}> User Learner {userMode == 'maven' ? ('Maven') : ('Learner')}</Text>
                    </TouchableOpacity> */}
            {/* } */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Search')} style={{ marginRight: mobileW * 3 / 100 }}>
              <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')} style={{ marginRight: mobileW * 2 / 100 }}>
              <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_notification.png")}></Image>
            </TouchableOpacity>
          </View>
        </View>
        {/* -------------- HEADER -------------- */}

        <ScrollView refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
            tintColor={Colors.themecolor}
            colors={[Colors.themecolor]} />
        }>
          <View style={{ padding: mobileW * 4 / 100, marginBottom: mobileW * 15 / 100 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.LearnerCard}>
                <View style={styles.TopTwoTab}>
                  {userMode == 'maven' ? <Image resizeMode='contain' style={styles.TopTabImage}
                    source={require('./Icon/icon_learner_border.png')}></Image> : <Image resizeMode='contain' style={styles.TopTabImage}
                      source={require('./Icon/icon_maven_border.png')}></Image>}
                </View>
                <Text style={styles.learner_txt}>{userMode == 'maven' ? "My Learner(s)" : "My Maven(s)"}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.LearnerCard} >
                <View style={styles.TopTwoTab}>
                  {userMode == 'maven' ? <Image resizeMode='contain' style={styles.TopTabImage}
                    source={require('./Icon/icon_session_request_border.png')}></Image> : <Image resizeMode='contain' style={styles.TopTabImage}
                      source={require('./Icon/icon_learning_request_border.png')}></Image>}
                </View>
                <Text style={styles.sessionrequest_txt}>{userMode == 'maven' ? "My Session\nRequest" : "My Learning\nRequest"}</Text>
              </TouchableOpacity>
            </View>
            {/*  +++++++++++++++++++++++++++++++++++++++++++++++++++++ Sliders +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            <View style={styles.Carousel_view}>
              <Carousel
                ref={isCarousel}
                data={slider}
                renderItem={renderItem}
                sliderWidth={mobileW}
                alignSelf={'center'}
                containerStyle={{padding:mobileW*5/100,backgroundColor:"red"}}
                
                // pagingEnabled
                autoplay
                loop
                itemWidth={mobileW}
                
                onSnapToItem={index => { setIndex(index) }}
                scrollAnimationDuration={1000} />
              <View style={styles.Pagination_view}>
                <Pagination
                  dotsLength={slider.length}
                  activeDotIndex={index}
                  carouselRef={isCarousel}
                  dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 3,
                    marginHorizontal: -8,
                    backgroundColor: Colors.blackColor,
                  }}
                  tappableDots={true}
                  inactiveDotStyle={{
                    backgroundColor: 'black',
                    // Define styles for inactive dots here
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6} />
              </View>
            </View>


            <Text style={styles.upskillingCourses_TEXT}>Free Upskilling Courses</Text>
            <View style={{ marginTop: mobileW * 3 / 100 }}>
              <FlatList
                data={upskillingCourses}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <View style={styles.flatList_View}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('UpskillingCourses', { videourl: item.file_path, videoid: item.id })} >
                      <ImageBackground
                        imageStyle={styles.image}
                        style={styles.Background_Image}
                        resizeMode="contain"
                        source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
                        <Image resizeMode='contain' style={styles.play_button} source={require('./Icon/icon_play_button.png')}></Image>
                      </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.name_discriptionview}>
                      <Text style={styles.apiname}>{item.name}</Text>
                      <Text numberOfLines={2}
                        style={styles.discripsion_text}>{item.description}</Text>
                    </View>
                  </View>
                } />
            </View>

            {userMode == 'maven' ?
              <View>
                <Text style={styles.Recomented_txt}>Recommended Learner</Text>
                <View style={styles.recommendedMavenView}>
                  <Image style={styles.student_icon} source={require('./Icon/icon_student.png')}></Image>
                  <Text style={styles.static_text}>We will suggest you the Learner(s) as per ypur teaching skills.</Text>
                </View>
              </View>
              : <View style={styles.FlatList_View}>
                <FlatList
                  data={MavenTesting}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <View>
                      <Text style={styles.heading_TEXT}>{item.heading}</Text>
                      <View style={styles.recommendedMaven}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image resizeMode='contain' style={styles.Api_image} source={item.image}></Image>
                          <View style={styles.skilltitle_view}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.title_text}>{item.title}</Text>
                              <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.navigate('LearnerSuport')}
                                style={styles.askAnithingButton}>
                                <Text style={styles.Ask_text}>Ask Anything</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.Manage_View}>
                              <Text style={styles.text}>Skills</Text>
                              <Text numberOfLines={1} style={styles.supportTeamData}>{item.skills}</Text>
                            </View>
                            <View style={styles.category_viewww}>
                              <View style={styles.Manage_View}>
                                <Text style={styles.text}>Level</Text>
                                <Text numberOfLines={1} style={styles.supportTeamData}>{item.level}</Text>
                              </View>
                              <View style={styles.Manage_View}>
                                <Text style={styles.categary_text}>  Category</Text>
                                <Text numberOfLines={1} style={styles.supportTeamData}>{item.categary}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  } />
              </View>}

            {/*  ++++++++++++++++++++++ Recommended Learner +++++++++++++++++++++ */}
            <Text style={styles.automation_text}>Learner(s) Recommended for Automation Testing</Text>
            <View style={styles.flatListmanage_view}>
              <FlatList
                data={Learner}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <TouchableOpacity activeOpacity={0.8} style={styles.learnarTesting} >
                    <Image style={styles.api_image} source={item.image}></Image>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.Self_VIEW}></View>
                    <Text style={styles.skills_text}>Skiills:{trimText(item.skill, 6)}</Text>
                    <Text style={styles.skills_text}>Level:{item.level}</Text>
                    <Text style={styles.skills_text}>Category:{trimText(item.category, 3)}</Text>
                  </TouchableOpacity>} />
            </View>

            <Text style={styles.Expert_talk}>Expert Talk</Text>
            <FlatList
              data={upskillingCourses}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <View style={styles.background_VIEW}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('YouTubePlayer')} >
                    <ImageBackground imageStyle={styles.ImageBackground}
                      style={styles.dianamic_IMAGE}
                      resizeMode="contain"
                      source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
                      <Image resizeMode='contain' style={styles.youtube_icon} source={require('./Icon/icon_youtube.png')}></Image>
                    </ImageBackground>
                  </TouchableOpacity>
                  <Text style={styles.api_text}>{item.name}</Text>
                  <Text style={styles.discripsion_text}>{trimText(item.description, 60)}</Text>
                </View>} />


          </View>
        </ScrollView>
        <HideWithKeyboard>
          <Footer
            activepage='userMaven'
            usertype={1}
            footerpage={[
              { name: 'CustomDrawer', countshow: false, image: require('./Icon/icon_menu.png'), activeimage: require('./Icon/icon_menu.png') },
              { name: 'UserChatting', countshow: false, image: require('./Icon/icon_chat.png'), activeimage: require('./Icon/icon_chat.png') },
              { name: 'MySchedule', countshow: false, image: require('./Icon/icon_calendar.png'), activeimage: require('./Icon/icon_calendar.png') },
              { name: 'UpskillingCourses', countshow: false, image: require('./Icon/icon_video.png'), activeimage: require('./Icon/icon_video.png') },
              { name: 'Dashboard', countshow: false, image: require('./Icon/icon_info.png'), activeimage: require('./Icon/icon_info.png') },
            ]}
            navigation={navigation}
            imagestyle1={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100, backgroundColor: Colors.whiteColor, countcolor: 'black', countbackground: 'black' }}
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
  flatListmanage_view: {
    marginTop: mobileW * 3 / 100
  },
  skilltitle_view: {
    marginHorizontal: mobileW * 5 / 100
  },
  category_viewww: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileH * 1 / 100
  },
  name_discriptionview: {
    marginTop: mobileW * 0.5 / 100
  },
  notification_textmanage: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: mobileW * 32 / 100
  },
  themdottt: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end",
    marginRight: mobileW * 7.5 / 100
  },
  background_VIEW: {
    width: mobileW * 45 / 100,
    marginHorizontal: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100
  },
  dianamic_IMAGE: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 45 / 100,
    height: mobileW * 27 / 100,
    borderRadius: mobileW * 2 / 100
  },
  Self_VIEW: {
    width: mobileW * 21 / 100,
    height: mobileW * 0.2 / 100,
    backgroundColor: Colors.gray
  },
  heading_TEXT: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    marginTop: mobileW * 2 / 100
  },
  name: {
    fontSize: mobileW * 3.3 / 100,
    color: Colors.black_color,
    marginTop: mobileW * 3 / 100
  },
  Header: {
    backgroundColor: Colors.themecolor,
    width: mobileW,
    height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  NamedNodeMap: {
    alignSelf: "flex-end",
    marginRight: mobileW * 2 / 100
  },
  backIcon: {
    width: mobileW * 25 / 100,
    height: mobileW * 25 / 100,
    tintColor: Colors.white_color,
    borderRadius: mobileW * 4 / 100,
    marginHorizontal: mobileW * 5 / 100,
    // backgroundColor: "red"
  },
  SearchIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.white_color
  },
  upskillingCourses_TEXT: {
    fontSize: mobileW * 3.7 / 100,
    color: Colors.black_color,
    fontWeight: '500',
  },
  ImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 45 / 100,
    height: mobileW * 27 / 100,
    borderRadius: mobileW * 2 / 100
  },
  LearnerCard: {
    width: mobileW * 29 / 100,
    height: mobileW * 25 / 100,
    padding: mobileW * 1 / 100,
    backgroundColor: Colors.white_color,
    marginHorizontal: mobileW * 1.5 / 100,
    borderRadius: mobileW * 2 / 100,
    elevation: 5,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    alignItems: 'center'
  },
  calender_modal: {
    marginTop: mobileH * 74 / 100,
    marginLeft: mobileW * 19 / 100
  },
  play_button: {
    tintColor: Colors.whiteColor,
    backgroundColor: Colors.themecolor,
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 5 / 100
  },
  learnarTesting: {
    width: mobileW * 25 / 100,
    marginHorizontal: mobileW * 1 / 100,
    paddingTop: mobileW * 5 / 100,
    paddingBottom: mobileW * 5 / 100,
    backgroundColor: Colors.white_color,
    alignItems: 'center',
    elevation: 1,
    borderRadius: mobileW * 1 / 100,
  },
  learnarTesting: {
    width: mobileW * 25 / 100,
    marginHorizontal: mobileW * 1 / 100,
    paddingTop: mobileW * 5 / 100,
    paddingBottom: mobileW * 5 / 100,
    backgroundColor: Colors.white_color,
    alignItems: 'center',
    elevation: 1,
    borderRadius: mobileW * 1 / 100,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  Modal_text: {
    textAlign: "center",
    color: Colors.gray,
    color: Colors.blackColor,
    fontSize: mobileW * 3.5 / 100
  },
  themecolorDOT: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 14.5 / 100,
    alignSelf: "flex-end",
    marginRight: mobileW * 27.5 / 100
  },
  recommendedLearner: {
    width: mobileW * 92 / 100,
    height: mobileW * 20 / 100,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    padding: mobileW * 5 / 100,
    flexDirection: 'row',
    alignItems: 'center'
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  GIF_modal: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center', alignItems: "center"
  },
  GIF_Images: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100,
    alignSelf: "center"
  },
  Header_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: mobileW * 1 / 100
  },
  Carousel_view: {
    marginTop: mobileH * 2 / 100,
    alignSelf: 'center',
    height: mobileW * 43 / 100,
  },
  Header_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: mobileW * 3 / 100
  },
  help_lineeee: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 12.5 / 100,
    alignSelf: "flex-end", marginRight: mobileW * 9 / 100
  },
  recommendedMaven: {
    width: mobileW * 92 / 100,
    height: mobileW * 30 / 100,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    padding: mobileW * 5 / 100,
  },
  mylearner_viewmodal: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: mobileW * 19 / 100,
    marginRight: mobileW * 31 / 100
  },
  askAnithingButton: {
    marginBottom: mobileW * 2 / 100,
    width: mobileW * 30 / 100,
    justifyContent: 'center',
    marginHorizontal: mobileW * 8 / 100,
    alignItems: 'center',
    borderRadius: mobileW * 2 / 100,
    height: mobileW * 7 / 100,
    backgroundColor: Colors.themecolor
  },
  supportTeamData: {
    fontSize: mobileW * 3 / 100,
    color: Colors.black_color,
    fontWeight: '400',
    marginHorizontal: mobileW * 1.5 / 100
  },
  backIcon: {
    width: mobileW * 8.5 / 100,
    height: mobileW * 8.5 / 100,
    tintColor: Colors.white_color,
    marginTop: mobileW * 2 / 100
  },
  redDot_View: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end",
    marginRight: mobileW * 26 / 100
  },
  redDot_View_help: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end",
    marginTop: mobileW * 8 / 100,
    marginRight: mobileW * -1 / 100
  },
  notification_line: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 8 / 100,
    alignSelf: "flex-end",
    marginRight: mobileW * 4.5 / 100,
  },
  learner_txt: {
    fontSize: mobileW * 3.4 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: mobileW * 1 / 100
  },
  Highlighter_UpskillingView: {
    marginTop: mobileH * 71 / 100,
    marginLeft: mobileW * 20 / 100
  },
  sessionrequest_txt: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: mobileW * 1 / 100
  },
  modal_closeicon: {
    width: mobileW * 5.20 / 100,
    height: mobileW * 5.20 / 100,
    tintColor: Colors.whiteColor
  },
  apiname: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    marginTop: mobileW * 0.8 / 100
  },
  Usermaven_text: {
    color: Colors.white_color,
    fontWeight: '500',
    fontSize: mobileW * 5 / 100,
    marginHorizontal: mobileW * 2 / 100
  },
  session_REQUEST_VIEW: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: mobileW * 19 / 100,
    justifyContent: 'center',
    marginLeft: mobileW * 32 / 100
  },
  skills_text: {
    fontSize: mobileW * 2.5 / 100,
    color: Colors.black_color,
  },
  sessionrequest_VIEW: {
    alignSelf: "flex-end",
    marginTop: mobileH * 1 / 100,
    marginRight: mobileW * 2 / 100
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 45 / 100,
    height: mobileW * 27 / 100,
    borderRadius: mobileW * 2 / 100
  },
  HElp_Text: {
    color: Colors.white_color,
    fontSize: mobileW * 4 / 100,
    fontWeight: '600'
  },
  chat_highlighter: {
    marginTop: mobileH * 69 / 100,
    marginLeft: mobileW * 5 / 100
  },
  api_image: {
    width: mobileW * 15 / 100,
    height: mobileW * 15 / 100,
    borderRadius: mobileW * 2 / 100,
  },
  TopTwoTab: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    backgroundColor: Colors.DashBosrdView,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 6 / 100
  },
  TopTabImage: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    alignSelf: 'center'
  },
  Api_image: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100
  },
  main_VIEW: {
    width: mobileW * 93 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light_cyan,
    alignSelf: 'center'
  },
  recommendedMavenView: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    elevation: 2,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
    height: mobileW * 18 / 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  Background_Image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 45 / 100,
    height: mobileW * 27 / 100,
    borderRadius: mobileW * 2 / 100
  },
  automation_text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    marginTop: mobileW * 2 / 100
  },
  ModalViewBox: {
    backgroundColor: '#00000060',
    flex: 1
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'pink'
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 15
  },
  main_image: {
    width: mobileW * 93 / 100,
    height: mobileW * 39 / 100
  },
  bottotabText: {
    fontSize: mobileW * 2.7 / 100,
    color: Colors.orange,
    marginTop: mobileW * 1 / 100
  },
  bottomIconView: {
    backgroundColor: 'white',
    bottom: Platform.OS == 'android' ? 0 : mobileH * 2 / 100,
    marginLeft: mobileW * 10 / 100,
    position: 'absolute',
    width: mobileW * 20 / 100,
    height: mobileW * 13 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    alignItems: "center",
    justifyContent: 'center'
  },
  straightLine: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 16 / 100,
    marginLeft: mobileW * 25 / 100
  },
  straightLine_calender: {
    width: mobileW * 0.6 / 100,
    backgroundColor: Colors.white_color,
    height: mobileW * 13.5 / 100,
    alignSelf: "center",
    marginRight: mobileW * 15 / 100
  },
  Pagination_view: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: mobileW * 27 / 100,
  },
  Help_VIEW: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 9 / 100,
    alignSelf: "flex-end",
    marginRight: mobileW * 4.5 / 100,
  },
  HEPL_MODALVIEW: {
    marginTop: mobileH * 75 / 100,
    marginLeft: mobileW * 30 / 100
  },
  straightLine_Session: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 22 / 100,
    alignSelf: 'flex-end',
    marginRight: mobileW * 31.7 / 100
    // marginLeft: mobileW * 7 / 100
  },
  flatList_View: {
    width: mobileW * 45 / 100,
    marginHorizontal: mobileW * 2 / 100,
  },
  modal_text: {
    backgroundColor: Colors.whiteColor,
    width: mobileW * 85 / 100,
    elevation: mobileW * 1 / 100,
    padding: mobileW * 3 / 100,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100
  },
  DOT: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end",
    marginTop: mobileW * 12 / 100,
    marginRight: mobileW * 3 / 100
  },
  straightLine_learnerView: {
    width: mobileW * 0.6 / 100,
    backgroundColor: "white",
    height: mobileW * 15 / 100,
    marginLeft: mobileW * 25 / 100
  },
  redDot: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: mobileW * 23.5 / 100
  },
  redDot_session: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignSelf: "flex-end",
    marginRight: mobileW * 28 / 100
  },
  static_text: {
    width: mobileW * 65 / 100,
    fontSize: mobileW * 3.5 / 100,
    color: Colors.gray
  },
  redDot_learnerView: {
    width: mobileW * 3.6 / 100,
    backgroundColor: "white",
    borderRadius: mobileW * 2.5 / 100,
    height: mobileW * 3.6 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: mobileW * 23.5 / 100
  },
  help_vIeW: {
    marginTop: mobileH * 74 / 100,
    marginLeft: mobileW * 30 / 100
  },
  Help_modal: {
    width: mobileW * 85 / 100,
    backgroundColor: Colors.themecolor,
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mobileW * 3 / 100
  },
  discripsion_text: {
    fontSize: mobileW * 2.8 / 100,
    color: Colors.gray,
    fontWeight: '400',
    marginTop: mobileW * 0.7 / 100
  },
  bottomtabImage: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    tintColor: Colors.orange
  },
  redMainDot: {
    width: mobileW * 2.2 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 1.1 / 100,
    height: mobileW * 2.2 / 100,
    alignSelf: "center"
  },
  title_text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontWeight: '500'
  },
  chatData: {
    fontSize: mobileW * 3.8 / 100,
    marginTop: mobileW * 2 / 100,
    color: Colors.grayText
  },
  chat: {
    fontSize: mobileW * 3.6 / 100,
    color: Colors.black_color,
    textAlign: "center",
    fontWeight: "400",
    padding: mobileW * 2 / 100
  },
  My_Learnerdata: {
    fontSize: mobileW * 3.8 / 100,
    marginTop: mobileW * 1 / 100,
    color: Colors.blackColor,
    textAlign: "center",
    fontWeight: "500"
  },
  chatorange: {
    color: Colors.orange,
    fontWeight: '800'
  },
  My_Learner: {
    color: Colors.blackColor,
    fontWeight: '500',
    alignSelf: "center",
    fontSize: mobileW * 5 / 100
  },
  mainWhiteWiew: {
    backgroundColor: "white",
    width: mobileW * 93 / 100,
    height: mobileW * 38 / 100,
    borderRadius: mobileW * 3 / 100,
    justifyContent: 'center',
    paddingHorizontal: mobileW * 3 / 100,
    paddingVertical: mobileW * 1 / 100,
  },
  mainWhiteWiew_chat: {
    backgroundColor: "white",
    width: mobileW * 83 / 100,
    height: mobileW * 27 / 100,
    borderRadius: mobileW * 3 / 100,
    justifyContent: 'center',
    paddingVertical: mobileW * 1 / 100,
  },
  Learners_view: {
    backgroundColor: "white",
    width: mobileW * 72 / 100,
    height: mobileW * 23 / 100,
    borderRadius: mobileW * 3 / 100,
    justifyContent: 'center',
    paddingHorizontal: mobileW * 3 / 100,
    marginRight: mobileW * 10 / 100,
  },
  Learners_session: {
    backgroundColor: "white",
    width: mobileW * 72 / 100,
    height: mobileW * 23 / 100,
    borderRadius: mobileW * 3 / 100,
    justifyContent: "center"
  },
  api_text: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    marginTop: mobileW * 0.8 / 100
  },
  modal_view: {
    flex: 1,
    alignSelf: "center",
    padding: mobileW * 8 / 100,


    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#00000060'
  },
  categary_text: {
    color: Colors.gray,
    fontSize: mobileW * 3 / 100
  },
  CHAT: {
    fontSize: mobileW * 5 / 100,
    fontWeight: "500",
    color: Colors.blackColor,
    alignSelf: "center"
  },
  text: {
    color: Colors.gray,
    fontSize: mobileW * 3 / 100
  },
  youtube_icon: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100
  },
  Expert_talk: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    marginTop: mobileW * 2 / 100
  },
  Ask_text: {
    color: Colors.white_color,
    fontWeight: '500',
    fontSize: mobileW * 4 / 100
  },
  Manage_View: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  FlatList_View: {
    marginTop: mobileW * 3 / 100,
    marginBottom: mobileW * 5 / 100,
  },
  UpskillingCourses_txt: {
    fontSize: mobileW * 5 / 100,
    color: Colors.blackColor,
    fontWeight: "500",
    alignSelf: 'center'
  },
  student_icon: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100
  },
  Recomented_txt: {
    fontSize: mobileW * 3.7 / 100,
    color: Colors.black_color,
    fontWeight: '500',
    marginTop: mobileW * 2 / 100
  }
})











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
 
// // +++++++++++++++++++++++++++++++++++++++++++++++++++++ Learner testing +++++++++++++++++++++++++++++++++++++++++++++++++++++
// const Learner = [
//   {
//     id: 1,
//     image: require('./Icon/icon_student.png'),
//     name: 'Shubham',
//     skill: 'Automation testing [Basic]',
//     level: 'Basic',
//     category: 'testing',
//     title: 'Work Stress Management',
//     discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
//   },
//   {
//     id: 2,
//     image: require('./Icon/icon_student.png'),
//     name: 'Ajaj',
//     skill: 'Automation testing [Basic]',
//     level: 'Basic',
//     category: 'testing',
//     title: 'Work Stress Management',
//     discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
//   },
//   {
//     id: 3,
//     image: require('./Icon/icon_student.png'),
//     name: 'Sahil',
//     skill: 'Automation testing [Basic]',
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
//     image: require('./Icon/icon_maven.png'),
//     heading: 'Maven(s) Recommended for Automation testing',
//     title: 'Support Team',
//     skills: 'Automation testing',
//     level: 'Basic',
//     categary: 'Testing',
//   },
//   {
//     id: 2,
//     image: require('./Icon/icon_maven.png'),
//     heading: 'Maven(s) Recommended for React',
//     title: 'Support Team',
//     skills: 'Automation testing',
//     level: 'Basic',
//     categary: 'Web DeVelopment',
//   },
//   {
//     id: 3,
//     image: require('./Icon/icon_maven.png'),
//     heading: 'Maven(s) Recommended for React',
//     title: 'Support Team',
//     skills: 'Automation testing',
//     level: 'Basic',
//     categary: 'Web DeVelopment',
//   },
//   {
//     id: 4,
//     image: require('./Icon/icon_maven.png'),
//     heading: 'Maven(s) Recommended for React',
//     title: 'Support Team',
//     skills: 'Automation testing',
//     level: 'Basic',
//     categary: 'Web DeVelopment',
//   },
//   {
//     id: 5,
//     image: require('./Icon/icon_maven.png'),
//     heading: 'Maven(s) Recommended for React',
//     title: 'Support Team',
//     skills: 'Automation testing',
//     level: 'Basic',
//     categary: 'Web DeVelopment',
//   },
// ]


// export const trimText = (text, length) => {
//   return text.length > length ? text.substring(0, length) + "..." : text;
// }

// export default function UserMaven({ navigation }) {
//   const [slider, setSlider] = useState([]);
//   const [recommendedData, setRecommendedData] = useState([]);
//   const [upskillingCourses, setUpskillingCourses] = useState([]);
//   const [refresh, setrefresh] = useState(false);
//   const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
//   const [modalVisible, setModalVisible] = useState(global.dashoard_modal);
//   const [modalhighlighter, setmodalhighlighter] = useState(true);
//   const [ModalVale, setModalVale] = useState(8);
//   const [userMode, setuserMode] = useState();
//   const isFocused = useIsFocused();
//   const [CountForApi, setCountForApi] = useState(0)
//   useEffect(() => {
//     SetMode();
//     console.log('i am here in Count ', CountForApi);
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
//           setModalVale(8)
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
//     console.log("UserMode==>", value);
//   }

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.main_VIEW}>
//         <Image resizeMethod='resize'
//           resizeMode='cover' style={styles.main_image}
//           source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.imageurl }}></Image>
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
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//         {/* ---------------------------- dashboard  modal start */}
//         <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={global.dashoard_modal}
//             onRequestClose={() => {
//             }} >
//             <View style={styles.modal_view}>
//               <View style={styles.Help_modal}>
//                 <Text>  </Text>
//                 <Text style={styles.HElp_Text}>Help : Dashboard</Text>
//                 <TouchableOpacity onPress={() => backButton()} >
//                   <Image style={styles.modal_closeicon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.modal_text}>
//                 <ScrollView>
//                   <Text style={styles.Modal_text}>Kalam earned a degree in aeronautical engineering from the
//                     Madras Institute of Technology and in 1958 joined the Defence Research and Development Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
//                     was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                     and produced in India. Rejoining DRDO in 1982, Kalam plich helped earn him the nickname “ich helped earn him the nickname “ich helped earn him the nickname “
//                     ich helped earn him the nickname “ich helped earn him the nickname “ich helped earn him the nickname “anned the program that produced a number
//                     of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
//                     intermediate-range ballistic missile, which incorporated aspects of theSLV-III and was launched in 1989.</Text>
//                 </ScrollView>
//               </View>
//             </View>
//           </Modal>
//         </View>
//         {/* <<---------------------------- heilighter modal--------------------->> */}
//         {ModalVale == 0 &&
//           <Modal transparent={true} visible={modalhighlighter}>
//             <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//               <View style={styles.chat_highlighter}>
//                 <View style={styles.mainWhiteWiew_chat}>
//                   <Text style={styles.CHAT}>Chat</Text>
//                   <Text style={styles.chat}>Chat with your Maven or Learner here.You can also check your previous conversation and unread message.</Text>
//                 </View>
//                 <View style={styles.straightLine}></View>
//                 <View style={styles.redDot}>
//                   <View style={styles.redMainDot}></View></View>
//               </View>
//               <View style={[styles.bottomIconView, { marginLeft: mobileW * 20 / 100 }]}>
//                 <Image style={styles.bottomtabImage} source={require('./Icon/icon_chat.png')} />
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {ModalVale == 1 &&
//           <Modal transparent={true} visible={modalhighlighter} >
//             <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
//               <View style={styles.calender_modal}>
//                 <View style={[styles.mainWhiteWiew, { width: mobileW * 60 / 100, height: mobileW * 18 / 100 }]}>
//                   <Text style={styles.CHAT}>Calender</Text>
//                   <Text style={styles.chat}>Check your Schedule here.</Text>
//                 </View>
//                 <View style={[styles.straightLine_calender, { marginLeft: mobileW * 0 / 100 }]}></View>
//                 <View style={[styles.redDot, { marginLeft: mobileW * 31.2 / 100 }]}>
//                   <View style={styles.redMainDot}></View></View>
//               </View>
//               <View style={[styles.bottomIconView, { marginLeft: mobileW * 41.5 / 100 }]}>
//                 <Image style={styles.bottomtabImage} source={require('./Icon/icon_calendar.png')} />
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {ModalVale == 2 &&
//           <Modal transparent={true} visible={modalhighlighter} >
//             <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//               <View style={styles.Highlighter_UpskillingView}>
//                 <View style={[styles.mainWhiteWiew, { width: mobileW * 77 / 100, height: mobileW * 26 / 100 }]}>
//                   <Text style={styles.CHAT}>Upskilling Courses</Text>
//                   <Text style={styles.chat}>We bring most valuable upskilling courses free of cost to give an edge to your career.Start learning today! </Text>
//                 </View>
//                 <View style={styles.themecolorDOT}></View>
//                 <View style={styles.redDot_View}>
//                   <View style={styles.redMainDot}></View>
//                 </View>
//               </View>
//               <View style={[styles.bottomIconView, { marginLeft: mobileW * 62 / 100 }]}>
//                 <Image style={styles.bottomtabImage} source={require('./Icon/icon_video.png')} />
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {ModalVale == 3 &&
//           <Modal transparent={true} visible={modalhighlighter}>
//             <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//               <View style={styles.help_vIeW}>
//                 <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 22 / 100 }]}>
//                   <Text style={styles.CHAT}>Help</Text>
//                   <Text style={styles.chat}>Your app assistance to provide you a smooth experience.</Text>
//                 </View>
//                 <View style={styles.help_lineeee}></View>
//                 <View style={styles.themdottt}>
//                   <View style={styles.redMainDot}></View>
//                 </View>
//               </View>
//               <View style={[styles.bottomIconView, { alignSelf: "flex-end" }]} >
//                 <Image style={styles.bottomtabImage} source={require('./Icon/icon_info.png')} />
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {ModalVale == 4 &&
//           <Modal transparent={true} visible={modalhighlighter} >
//             <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox} >
//               <View style={styles.mylearner_viewmodal}>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.LearnerCard}>
//                   <View style={styles.TopTwoTab}>
//                     <Image resizeMode='contain' style={styles.TopTabImage} source={require('./Icon/icon_learner_border.png')}></Image>
//                   </View>
//                   <Text style={styles.learner_txt}>My Learner(s)</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{ alignSelf: "center", marginTop: mobileH * 1 / 100 }}>
//                 <View style={styles.redDot_learnerView}>
//                   <View style={styles.redMainDot}></View>
//                 </View>
//                 <View style={[styles.straightLine_learnerView]}></View>
//                 <View style={styles.Learners_view}>
//                   <Text style={styles.CHAT}>My learner</Text>
//                   <Text style={styles.chat}>Find the list of current and previous learners.</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {ModalVale == 5 &&
//           <Modal transparent={true} visible={modalhighlighter} >
//             <TouchableOpacity activeOpacity={0.1} onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
//               <View style={styles.session_REQUEST_VIEW}>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.LearnerCard} >
//                   <View style={styles.TopTwoTab}>
//                     <Image resizeMode='contain' style={styles.TopTabImage} source={require('./Icon/icon_session_request_border.png')}></Image>
//                   </View>
//                   <Text style={styles.sessionrequest_txt}>My Session Request</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.sessionrequest_VIEW}>
//                 <View style={[styles.redDot_learnerView, { marginLeft: mobileW * 38 / 100 }]}>
//                   <View style={styles.redMainDot}></View>
//                 </View>
//                 <View style={[styles.straightLine_Session, { marginLeft: mobileW * 3 / 100 }]}></View>
//                 <View style={styles.Learners_session}>
//                   <Text style={styles.CHAT}>My Learning Request</Text>
//                   <Text style={styles.chat}>Find the list of all my learning you have requested.</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {ModalVale == 6 &&
//           <Modal transparent={true} visible={modalhighlighter}>
//             <TouchableOpacity activeOpacity={0.1}
//               onPress={() => modalChangeFunction()} style={styles.ModalViewBox}>
//               <View style={styles.DOT}>
//                 <View style={styles.redMainDot}></View>
//               </View>
//               <View style={styles.notification_line}></View>
//               <View style={styles.notification_textmanage}>
//                 <View style={[styles.mainWhiteWiew, { width: mobileW * 68 / 100, height: mobileW * 23 / 100 }]}>
//                   <Text style={styles.CHAT}>Notification</Text>
//                   <Text style={styles.chat}>Get instant notification about each activity here.</Text>
//                 </View>
//               </View>
//               <View style={[styles.bottomIconView, {
//                 top: mobileW * 0 / 100, width: mobileW * 6 / 100, height: mobileW * 7 / 100,
//                 marginTop: mobileW * 4 / 100, backgroundColor: Colors.themecolor,
//                 borderRadius: mobileW * 2 / 100, right: mobileW * 2.5 / 100
//               }]}>
//                 <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_notification.png")}></Image>
//               </View>
//             </TouchableOpacity>
//           </Modal>}

//         {/* <<---------------------------- heilighter modal--------------------->> */}
//         <View>
//           <Modal animationType="slide" transparent={true}
//             visible={ModalVisible_Gif}
//             onRequestClose={() => { setModalVisible_Gif(!ModalVisible_Gif); }} >
//             <View style={styles.GIF_modal}>
//               <Image style={styles.GIF_Images}
//                 source={require("./Icon/neighcoach_loader.gif")}></Image>
//             </View>
//           </Modal>
//         </View>

//         {/* -------------- HEADER -------------- */}
//         <View style={styles.Header}>
//           <View style={styles.Header_view}>
//             {/* {userMode == 'maven' ? */}
//             <TouchableOpacity activeOpacity={0.8} style={styles.Header_touchable} onPress={() => { navigation.navigate('MyMavenProfile'), setModalVisible_Gif(true) }}  >
//               <Image style={styles.backIcon} resizeMode='contain' source={userMode == 'maven' ? require("./Icon/icon_maven.png") : require("./Icon/icon_student.png")}></Image>
//               <Text style={styles.Usermaven_text}> User {userMode == 'maven' ? "Maven" : "Learner"}</Text>
//             </TouchableOpacity>
//             {/* : */}
//             {/*  */}
//             {/* <TouchableOpacity activeOpacity={0.8} style={styles.Header_touchable} onPress={() => { navigation.navigate('MyMavenProfile'), setModalVisible_Gif(true) }}  >
//                     <Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/icon_student.png")}></Image>
//                     <Text style={styles.Usermaven_text}> User Learner {userMode == 'maven' ? ('Maven') : ('Learner')}</Text> 
//                     </TouchableOpacity> */}
//             {/* } */}
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Search')} style={{ marginRight: mobileW * 3 / 100 }}>
//               <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')} style={{ marginRight: mobileW * 2 / 100 }}>
//               <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_notification.png")}></Image>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* -------------- HEADER -------------- */}

//         <ScrollView refreshControl={
//           <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
//             tintColor={Colors.themecolor}
//             colors={[Colors.themecolor]} />
//         }>
//           <View style={{ padding: mobileW * 4 / 100, marginBottom: mobileW * 15 / 100 }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
//               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={styles.LearnerCard}>
//                 <View style={styles.TopTwoTab}>
//                   {userMode == 'maven' ? <Image resizeMode='contain' style={styles.TopTabImage}
//                     source={require('./Icon/icon_learner_border.png')}></Image> : <Image resizeMode='contain' style={styles.TopTabImage}
//                       source={require('./Icon/icon_maven_border.png')}></Image>}
//                 </View>
//                 <Text style={styles.learner_txt}>{userMode == 'maven' ? "My Learner(s)" : "My Maven(s)"}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={styles.LearnerCard} >
//                 <View style={styles.TopTwoTab}>
//                   {userMode == 'maven' ? <Image resizeMode='contain' style={styles.TopTabImage}
//                     source={require('./Icon/icon_session_request_border.png')}></Image> : <Image resizeMode='contain' style={styles.TopTabImage}
//                       source={require('./Icon/icon_learning_request_border.png')}></Image>}
//                 </View>
//                 <Text style={styles.sessionrequest_txt}>{userMode == 'maven' ? "My Session\nRequest" : "My Learning\nRequest"}</Text>
//               </TouchableOpacity>
//             </View>
//             {/*  +++++++++++++++++++++++++++++++++++++++++++++++++++++ Sliders +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
//             <View style={styles.Carousel_view}>
//               <Carousel
//                 ref={isCarousel}
//                 data={slider}
//                 renderItem={renderItem}
//                 sliderWidth={mobileW}
//                 alignSelf={'center'}

//                 pagingEnabled
//                 autoplay
//                 loop
//                 itemWidth={mobileW}
//                 onSnapToItem={index => { setIndex(index) }}
//                 scrollAnimationDuration={1000} />
//               <View style={styles.Pagination_view}>
//                 <Pagination
//                   dotsLength={slider.length}
//                   activeDotIndex={index}
//                   carouselRef={isCarousel}
//                   dotStyle={{
//                     width: 5,
//                     height: 5,
//                     borderRadius: 3,
//                     marginHorizontal: -8,
//                     backgroundColor: Colors.blackColor,
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


//             <Text style={styles.upskillingCourses_TEXT}>Free Upskilling Courses</Text>
//             <View style={{ marginTop: mobileW * 3 / 100 }}>
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

//             {userMode == 'maven' ?
//               <View>
//                 <Text style={styles.Recomented_txt}>Recommended Learner</Text>
//                 <View style={styles.recommendedMavenView}>
//                   <Image style={styles.student_icon} source={require('./Icon/icon_student.png')}></Image>
//                   <Text style={styles.static_text}>We will suggest you the Learner(s) as per ypur teaching skills.</Text>
//                 </View>
//               </View>
//               : <View style={styles.FlatList_View}>
//                 <FlatList
//                   data={MavenTesting}
//                   showsHorizontalScrollIndicator={false}
//                   renderItem={({ item, index }) =>
//                     <View>
//                       <Text style={styles.heading_TEXT}>{item.heading}</Text>
//                       <View style={styles.recommendedMaven}>
//                         <View style={{ flexDirection: 'row' }}>
//                           <Image resizeMode='contain' style={styles.Api_image} source={item.image}></Image>
//                           <View style={styles.skilltitle_view}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                               <Text style={styles.title_text}>{item.title}</Text>
//                               <TouchableOpacity activeOpacity={0.8}
//                                 onPress={() => navigation.navigate('LearnerSuport')}
//                                 style={styles.askAnithingButton}>
//                                 <Text style={styles.Ask_text}>Ask Anything</Text>
//                               </TouchableOpacity>
//                             </View>
//                             <View style={styles.Manage_View}>
//                               <Text style={styles.text}>Skills</Text>
//                               <Text numberOfLines={1} style={styles.supportTeamData}>{item.skills}</Text>
//                             </View>
//                             <View style={styles.category_viewww}>
//                               <View style={styles.Manage_View}>
//                                 <Text style={styles.text}>Level</Text>
//                                 <Text numberOfLines={1} style={styles.supportTeamData}>{item.level}</Text>
//                               </View>
//                               <View style={styles.Manage_View}>
//                                 <Text style={styles.categary_text}>  Category</Text>
//                                 <Text numberOfLines={1} style={styles.supportTeamData}>{item.categary}</Text>
//                               </View>
//                             </View>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   } />
//               </View>}

//             {/*  ++++++++++++++++++++++ Recommended Learner +++++++++++++++++++++ */}
//             <Text style={styles.automation_text}>Learner(s) Recommended for Automation Testing</Text>
//             <View style={styles.flatListmanage_view}>
//               <FlatList
//                 data={Learner}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item, index }) =>
//                   <TouchableOpacity activeOpacity={0.8} style={styles.learnarTesting} >
//                     <Image style={styles.api_image} source={item.image}></Image>
//                     <Text style={styles.name}>{item.name}</Text>
//                     <View style={styles.Self_VIEW}></View>
//                     <Text style={styles.skills_text}>Skiills:{trimText(item.skill, 6)}</Text>
//                     <Text style={styles.skills_text}>Level:{item.level}</Text>
//                     <Text style={styles.skills_text}>Category:{trimText(item.category, 3)}</Text>
//                   </TouchableOpacity>} />
//             </View>

//             <Text style={styles.Expert_talk}>Expert Talk</Text>
//             <FlatList
//               data={upskillingCourses}
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               renderItem={({ item, index }) =>
//                 <View style={styles.background_VIEW}>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('YouTubePlayer')} >
//                     <ImageBackground imageStyle={styles.ImageBackground}
//                       style={styles.dianamic_IMAGE}
//                       resizeMode="contain"
//                       source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.logo }}>
//                       <Image resizeMode='contain' style={styles.youtube_icon} source={require('./Icon/icon_youtube.png')}></Image>
//                     </ImageBackground>
//                   </TouchableOpacity>
//                   <Text style={styles.api_text}>{item.name}</Text>
//                   <Text style={styles.discripsion_text}>{trimText(item.description, 60)}</Text>
//                 </View>} />


//           </View>
//         </ScrollView>
//         <HideWithKeyboard>
//           <Footer
//             activepage='userMaven'
//             usertype={1}
//             footerpage={[
//               { name: 'CustomDrawer', countshow: false, image: require('./Icon/icon_menu.png'), activeimage: require('./Icon/icon_menu.png') },
//               { name: 'UserChatting', countshow: false, image: require('./Icon/icon_chat.png'), activeimage: require('./Icon/icon_chat.png') },
//               { name: 'MySchedule', countshow: false, image: require('./Icon/icon_calendar.png'), activeimage: require('./Icon/icon_calendar.png') },
//               { name: 'UpskillingCourses', countshow: false, image: require('./Icon/icon_video.png'), activeimage: require('./Icon/icon_video.png') },
//               { name: 'Dashboard', countshow: false, image: require('./Icon/icon_info.png'), activeimage: require('./Icon/icon_info.png') },
//             ]}
//             navigation={navigation}
//             imagestyle1={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100, backgroundColor: Colors.whiteColor, countcolor: 'black', countbackground: 'black' }}
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
//     marginTop: mobileW * 3 / 100
//   },
//   skilltitle_view: {
//     marginHorizontal: mobileW * 5 / 100
//   },
//   category_viewww: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: mobileH * 1 / 100
//   },
//   name_discriptionview: {
//     marginTop: mobileW * 0.5 / 100
//   },
//   notification_textmanage: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     marginLeft: mobileW * 32 / 100
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
//   background_VIEW: {
//     width: mobileW * 45 / 100,
//     marginHorizontal: mobileW * 2 / 100,
//     marginTop: mobileW * 2 / 100
//   },
//   dianamic_IMAGE: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 45 / 100,
//     height: mobileW * 27 / 100,
//     borderRadius: mobileW * 2 / 100
//   },
//   Self_VIEW: {
//     width: mobileW * 21 / 100,
//     height: mobileW * 0.2 / 100,
//     backgroundColor: Colors.gray
//   },
//   heading_TEXT: {
//     fontSize: mobileW * 4 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     marginTop: mobileW * 2 / 100
//   },
//   name: {
//     fontSize: mobileW * 3.3 / 100,
//     color: Colors.black_color,
//     marginTop: mobileW * 3 / 100
//   },
//   Header: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
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
//     tintColor: Colors.white_color
//   },
//   upskillingCourses_TEXT: {
//     fontSize: mobileW * 3.7 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//   },
//   ImageBackground: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 45 / 100,
//     height: mobileW * 27 / 100,
//     borderRadius: mobileW * 2 / 100
//   },
//   LearnerCard: {
//     width: mobileW * 29 / 100,
//     height: mobileW * 25 / 100,
//     padding: mobileW * 1 / 100,
//     backgroundColor: Colors.white_color,
//     marginHorizontal: mobileW * 1.5 / 100,
//     borderRadius: mobileW * 2 / 100,
//     elevation: 5,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     alignItems: 'center'
//   },
//   calender_modal: {
//     marginTop: mobileH * 74 / 100,
//     marginLeft: mobileW * 19 / 100
//   },
//   play_button: {
//     tintColor: Colors.whiteColor,
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 10 / 100,
//     height: mobileW * 10 / 100,
//     borderRadius: mobileW * 5 / 100
//   },
//   learnarTesting: {
//     width: mobileW * 25 / 100,
//     marginHorizontal: mobileW * 1 / 100,
//     paddingTop: mobileW * 5 / 100,
//     paddingBottom: mobileW * 5 / 100,
//     backgroundColor: Colors.white_color,
//     alignItems: 'center',
//     elevation: 1,
//     borderRadius: mobileW * 1 / 100,
//   },
//   learnarTesting: {
//     width: mobileW * 25 / 100,
//     marginHorizontal: mobileW * 1 / 100,
//     paddingTop: mobileW * 5 / 100,
//     paddingBottom: mobileW * 5 / 100,
//     backgroundColor: Colors.white_color,
//     alignItems: 'center',
//     elevation: 1,
//     borderRadius: mobileW * 1 / 100,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   Modal_text: {
//     textAlign: "center",
//     color: Colors.gray,
//     color: Colors.blackColor,
//     fontSize: mobileW * 3.5 / 100
//   },
//   themecolorDOT: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 14.5 / 100,
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
//     backgroundColor: Colors.white_color
//   },
//   GIF_modal: {
//     flex: 1,
//     backgroundColor: '#00000090',
//     justifyContent: 'center', alignItems: "center"
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
//     marginTop: mobileH * 2 / 100,
//     alignSelf: 'center',
//     height: mobileW * 43 / 100,
//   },
//   Header_touchable: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: mobileW * 3 / 100
//   },
//   help_lineeee: {
//     width: mobileW * 0.6 / 100,
//     backgroundColor: "white",
//     height: mobileW * 12.5 / 100,
//     alignSelf: "flex-end", marginRight: mobileW * 9 / 100
//   },
//   recommendedMaven: {
//     width: mobileW * 92 / 100,
//     height: mobileW * 30 / 100,
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
//     padding: mobileW * 5 / 100,
//   },
//   mylearner_viewmodal: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: mobileW * 19 / 100,
//     marginRight: mobileW * 31 / 100
//   },
//   askAnithingButton: {
//     marginBottom: mobileW * 2 / 100,
//     width: mobileW * 30 / 100,
//     justifyContent: 'center',
//     marginHorizontal: mobileW * 8 / 100,
//     alignItems: 'center',
//     borderRadius: mobileW * 2 / 100,
//     height: mobileW * 7 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   supportTeamData: {
//     fontSize: mobileW * 3 / 100,
//     color: Colors.black_color,
//     fontWeight: '400',
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
//     fontSize: mobileW * 3.4 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     textAlign: 'center',
//     marginTop: mobileW * 1 / 100
//   },
//   Highlighter_UpskillingView: {
//     marginTop: mobileH * 71 / 100,
//     marginLeft: mobileW * 20 / 100
//   },
//   sessionrequest_txt: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     textAlign: 'center',
//     marginTop: mobileW * 1 / 100
//   },
//   modal_closeicon: {
//     width: mobileW * 5.20 / 100,
//     height: mobileW * 5.20 / 100,
//     tintColor: Colors.whiteColor
//   },
//   apiname: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     marginTop: mobileW * 0.8 / 100
//   },
//   Usermaven_text: {
//     color: Colors.white_color,
//     fontWeight: '500',
//     fontSize: mobileW * 5 / 100,
//     marginHorizontal: mobileW * 2 / 100
//   },
//   session_REQUEST_VIEW: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: mobileW * 19 / 100,
//     justifyContent: 'center',
//     marginLeft: mobileW * 32 / 100
//   },
//   skills_text: {
//     fontSize: mobileW * 2.5 / 100,
//     color: Colors.black_color,
//   },
//   sessionrequest_VIEW: {
//     alignSelf: "flex-end",
//     marginTop: mobileH * 1 / 100,
//     marginRight: mobileW * 2 / 100
//   },
//   image: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 45 / 100,
//     height: mobileW * 27 / 100,
//     borderRadius: mobileW * 2 / 100
//   },
//   HElp_Text: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4 / 100,
//     fontWeight: '600'
//   },
//   chat_highlighter: {
//     marginTop: mobileH * 69 / 100,
//     marginLeft: mobileW * 5 / 100
//   },
//   api_image: {
//     width: mobileW * 15 / 100,
//     height: mobileW * 15 / 100,
//     borderRadius: mobileW * 2 / 100,
//   },
//   TopTwoTab: {
//     width: mobileW * 12 / 100,
//     height: mobileW * 12 / 100,
//     backgroundColor: Colors.DashBosrdView,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 6 / 100
//   },
//   TopTabImage: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     alignSelf: 'center'
//   },
//   Api_image: {
//     width: mobileW * 12 / 100,
//     height: mobileW * 12 / 100
//   },
//   main_VIEW: {
//     width: mobileW * 93 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.light_cyan,
//     alignSelf: 'center'
//   },
//   recommendedMavenView: {
//     width: '100%',
//     backgroundColor: Colors.whiteColor,
//     elevation: 2,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
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
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 45 / 100,
//     height: mobileW * 27 / 100,
//     borderRadius: mobileW * 2 / 100
//   },
//   automation_text: {
//     fontSize: mobileW * 4 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     marginTop: mobileW * 2 / 100
//   },
//   ModalViewBox: {
//     backgroundColor: '#00000060',
//     flex: 1
//   },
//   slider: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     //   backgroundColor: 'pink'
//   },
//   dotContainer: {
//     backgroundColor: 'transparent',
//     position: 'absolute',
//     bottom: 15
//   },
//   main_image: {
//     width: mobileW * 93 / 100,
//     height: mobileW * 39 / 100
//   },
//   bottotabText: {
//     fontSize: mobileW * 2.7 / 100,
//     color: Colors.orange,
//     marginTop: mobileW * 1 / 100
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
//     width: mobileW * 45 / 100,
//     marginHorizontal: mobileW * 2 / 100,
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
//     fontSize: mobileW * 3.5 / 100,
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
//     marginTop: mobileH * 74 / 100,
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
//     fontSize: mobileW * 2.8 / 100,
//     color: Colors.gray,
//     fontWeight: '400',
//     marginTop: mobileW * 0.7 / 100
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
//     fontSize: mobileW * 4 / 100,
//     color: Colors.black_color,
//     fontWeight: '500'
//   },
//   chatData: {
//     fontSize: mobileW * 3.8 / 100,
//     marginTop: mobileW * 2 / 100,
//     color: Colors.grayText
//   },
//   chat: {
//     fontSize: mobileW * 3.6 / 100,
//     color: Colors.black_color,
//     textAlign: "center",
//     fontWeight: "400",
//     padding: mobileW * 2 / 100
//   },
//   My_Learnerdata: {
//     fontSize: mobileW * 3.8 / 100,
//     marginTop: mobileW * 1 / 100,
//     color: Colors.blackColor,
//     textAlign: "center",
//     fontWeight: "500"
//   },
//   chatorange: {
//     color: Colors.orange,
//     fontWeight: '800'
//   },
//   My_Learner: {
//     color: Colors.blackColor,
//     fontWeight: '500',
//     alignSelf: "center",
//     fontSize: mobileW * 5 / 100
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
//     height: mobileW * 23 / 100,
//     borderRadius: mobileW * 3 / 100,
//     justifyContent: "center"
//   },
//   api_text: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     marginTop: mobileW * 0.8 / 100
//   },
//   modal_view: {
//     flex: 1,
//     alignSelf: "center",
//     padding: mobileW * 8 / 100,


//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: '#00000090'
//   },
//   categary_text: {
//     color: Colors.gray,
//     fontSize: mobileW * 3 / 100
//   },
//   CHAT: {
//     fontSize: mobileW * 5 / 100,
//     fontWeight: "500",
//     color: Colors.blackColor,
//     alignSelf: "center"
//   },
//   text: {
//     color: Colors.gray,
//     fontSize: mobileW * 3 / 100
//   },
//   youtube_icon: {
//     width: mobileW * 12 / 100,
//     height: mobileW * 12 / 100
//   },
//   Expert_talk: {
//     fontSize: mobileW * 4 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     marginTop: mobileW * 2 / 100
//   },
//   Ask_text: {
//     color: Colors.white_color,
//     fontWeight: '500',
//     fontSize: mobileW * 4 / 100
//   },
//   Manage_View: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   FlatList_View: {
//     marginTop: mobileW * 3 / 100,
//     marginBottom: mobileW * 5 / 100,
//   },
//   UpskillingCourses_txt: {
//     fontSize: mobileW * 5 / 100,
//     color: Colors.blackColor,
//     fontWeight: "500",
//     alignSelf: 'center'
//   },
//   student_icon: {
//     width: mobileW * 10 / 100,
//     height: mobileW * 10 / 100
//   },
//   Recomented_txt: {
//     fontSize: mobileW * 3.7 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     marginTop: mobileW * 2 / 100
//   }
// })