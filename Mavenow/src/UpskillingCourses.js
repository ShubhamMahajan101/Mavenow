import { Modal, Alert, ScrollView, TextInput, BackHandler, TouchableNativeFeedback, StatusBar, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Colors, Font } from './Provider/Colorsfont';
import { SafeAreaView } from 'react-native-safe-area-context'
import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import VideoPlayer from 'react-native-video-player';
import YoutubePlayer from "react-native-youtube-iframe";
import Video from 'react-native-video';
import axios from 'axios';
import { log } from 'react-native-reanimated';
import HTMLView from 'react-native-htmlview';
import { Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';

Icon.loadFont();
let overlayTimer;
let Timer;
const Top_DATA = [
  {
    id: 1,
    name: "Work Stress Management",
    Emotional: "Emotional intelligence",
    Professional: "Professional Growth",
    Critical: "Critical Thinking and Problem Solving",
    Effective: "Effective Speaking",
    Public: "Public Speaking",
    Personality: "Personality Development",
    Time: "Time Management",
  },
]
const video_DATA = [
  {
    id: 1,
    uri: "https://www.youtube.com/watch?v=yAoLSRbwxL8",
    // uri: "https://www.youtube.com/watch?v=pcnhuON4wE8&list=PL8Ne7xEh7jl-c5jzXS-XTkRAKC-rq51rv&index=8",
  },
]
const DATA = [
  {
    id: 1,
    mavenow_text: "The CEO of renowned IT company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional learners  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional.",
  },
]

const completed_DATA = [
  {
    id: 1,
    Login_data: "The platform is a driving force in every professional’s life. It serves Professional Learners with instant solutions, mentorship, free upskilling courses, and expert sessions on different topics leading them towards their desired career growth. And on the other hand, Mavens get the privilege to pass their experiences and knowledge to other professionals The platform is a driving force in every professional’s life. It serves Professional Learners with instant solutions, mentorship, free upskiThe platform is a driving force in every professional’s life. It serves Professional Learners with instant solutions, mentorship, free upskiThe platform is a driving force in every professional’s life. It serves Professional Learners with instant solutions, mentorship, free upskiThe platform is a driving force in every professional’s life. It serves Professional Learners with instant solutions, mentorship, free upskiThe platform is a driving force in every professional’s life. It serves Professional Learners with instant solutions, mentorship, free upski.",
    Login: "LOGIN"

  },
]

// ========================================================================== Contact us data
const history_DATA = [
  {
    id: 1,
    mobile: '+9685748596',
    Email: 'admin@gmail.com',
    uri: "https://bit.ly/3CEctkI",
  },
  {
    id: 1,
    mobile: '+9685748596',
    Email: 'admin@gmail.com',
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 1,
    mobile: '+9685748596',
    Email: 'admin@gmail.com',
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 1,
    mobile: '+9685748596',
    Email: 'admin@gmail.com',
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
]

export default function UpskillingCourses({ navigation, route }) {
  // ==========================================================
  const [checked, setChecked] = useState(route.params.videourl)
  const [checked_videoid, setchecked_videoid] = useState(route.params.playvideoid)
  // const [checked_video, setChecked_video] = useState('')
  const [show, setShow] = useState('')
  const [DiscData, setDiscData] = useState('');
  const [header_Data, setheader_Data] = useState([]);
  const [vid_intro, setvid_intro] = useState('');
  const [discription, setDiscription] = useState('');
  const [playing, setPlaying] = useState(false);
  const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false);
  const [refresh, setrefresh] = useState(false);
  // ----------- Video Player State -------------
  let lastTap = null;
  const [Fullscreen, setFullscreen] = useState(false);
  const [paused, setpaused] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setduration] = useState(0.1);
  const [overlay, setoverlay] = useState(false);
  const playerRef = useRef();
  // --------------- here is a route params data ---------------
  const playvideo = route.params.videourl
  const playvideoid = route.params.videoid
  console.log("Video id is ", playvideoid);
  console.log("Video Url is ", playvideo);
  // ---------------------------------------------------------------   A P I  D A T A   ------------------------------------------------------------------
  useEffect(() => {
    // const email = values.email.replace(/\s+/g, ' ');

    setModalVisible_gifloader(true)

    apicalling()
    // setChecked_video('')
    if (playvideo != "-") {
      setShow(true)
    }
    else {
      setShow(false)
    }
    console.log('checked-------', checked);
  }, [])


  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }

  const apicalling = () => {
    var data = JSON.stringify({
      "skip": 6,
      "categoryIds": ["20", "7"],
      "skillIds": ["20", "7", "25", "24"],
      "studentid": 655,
      "showeveryone": 1
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://mavenow.com:8001/course/GetHighligthVideoListWithCourse?logid=848',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        var getdata = response.data.GetHighligthVideoListWithCourse
        var data = getdata;
        setTimeout(() => {
          // setmodalVisible_gif(true)
          console.log('1 sec.');
        }, 100);
        for (let i = 0; i < data.length; i++) {
          console.log(data[0]);
          setDiscData(data[0])

        }
        setheader_Data(getdata)
        setModalVisible_gifloader(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---------------  FOR LOOP ---------------
  const data_To_be_Set = (id) => {
    var data = header_Data;
    for (let i = 0; i < data.length; i++) {


      console.log(data[i]);
      if (id == data[i].id) {
        console.log('=======>.', data[i].id);
        setShow(false)
        setDiscription('')
        setvid_intro('')
        //  setModalVisible_gifloader(true)
        setDiscData(data[i])

        // setChecked('')
        // setShow('')
        // setvid_intro('')
        // setDiscription('')
        // setChecked_video('')
      }
      else {
        // setModalVisible_gifloader(true)
        console.log("Nodata");
      }
    }
  }

  console.log('================>', checked);

  const allvar_toset = (item) => {

    console.log("+++++++++", item);
    setShow(true),
      setChecked(item.file_path),
      setchecked_videoid(item.content_id),
      setvid_intro(item.title),
      setDiscription(item.description)
  }
  // ==========================================================
  const trimNewLines = (detaildescription) => {
    if (!detaildescription) return;
    return detaildescription.replace(/(\r\n|\n|\r)/gm, '');
  }
  const trimNewLinescourse = (coursefacility) => {
    if (!coursefacility) return;
    return coursefacility.replace(/(\r\n|\n|\r)/gm, '');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])

  const backAction = () => {
    // navigation.goBack();
    return true;
  }

  const FullscreenToggle = () => {
    if (Fullscreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false)
      navigation.setOptions({ headerShown: false });
      setFullscreen(false)
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true)
      navigation.setOptions({ headerShown: false });
      setFullscreen(true);
    }
  }

  const handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(Timer);
      doubleTapCallback();
    } else {
      lastTap = now;
      Timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  }

  const ShowHideOverlay = () => {
    handleDoubleTap(() => {
    }, () => {
      setoverlay(true)
      overlayTimer = setTimeout(() => setoverlay(false), 5000);
    })
  }
  const backward = () => {
    playerRef.current.seek(currentTime - 10);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setoverlay(false), 3000);
  }
  const forward = () => {
    playerRef.current.seek(currentTime + 10);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setoverlay(false), 3000);
  }
  const onslide = (slide) => {
    playerRef.current.seek(slide * duration);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setoverlay(false), 3000);
  }
  const getTime = (t) => {
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return min + ':' + sec;
  }
  const load = ({ duration }) => {
    console.log('duration------', duration);
    setduration(duration);
  }
  const progress = ({ currentTime }) => {
    setcurrentTime(currentTime);
  }

  console.log('checked videoPath===================', checked);
  console.log('checked_videoid===================', checked_videoid);
  // ====================================================================
  return (



    <View style={{ flex: 1, }}>




      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_gifloader}
        onRequestClose={() => {
          setModalVisible_gifloader(!modalVisible_gifloader);
        }}>
        <View style={styles.GIFVIEW}>
          <Image style={styles.GIF} source={require("./Icon/neighcoach_loader.gif")}></Image>
        </View>
      </Modal>
      {DiscData != "" ?


        <SafeAreaView style={styles.SafeAreaView}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />


          <View style={styles.Header}>

            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} >
              <Image style={styles.backIcon_top} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={styles.Main_text}>{Lang_chg.UpskillingCoursesTxt[config.language]}</Text>
            <Text style={styles.Main_text}> </Text>

          </View>


          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>

            {header_Data != "" &&
              <View >
                <FlatList
                  horizontal={true}
                  data={header_Data}
                  renderItem={({ item, index }) =>
                    <View>
                      <View style={styles.header_dataview}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { data_To_be_Set(item.id) }}
                          style={{
                            height: mobileW * 13 / 100, backgroundColor: 'gree',
                            backgroundColor: Colors.white_color, justifyContent: 'center', alignItems: 'center', padding: mobileW * 2 / 100
                          }}>
                          <Text style={{ color: item.id === DiscData.id ? Colors.themecolor : Colors.gray, fontSize: mobileW * 3 / 100, fontFamily: Font.FontSemiBold }}>{item.name}</Text>
                        </TouchableOpacity>

                      </View>
                      <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.2 / 100, marginBottom: mobileW * 8 / 100, backgroundColor: item.id === DiscData.id ? Colors.themecolor : Colors.white_color }}></View>
                    </View>
                  }
                  keyExtractor={item => item.id} />
              </View>}

          </ScrollView>



          {/* <View>
        </View> */}
          {/* //  =================== Video Player =================== // */}

          <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]} />
          }>
            {show != false ?
              <View style={Fullscreen ? styles.fullscreenVideo : styles.video}>
                <Video
                  // source={{ uri:"https://youtu.be/_Wz72hRAG38" }}
                  // source={{ uri:"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1" }}

                  source={{ uri: "https://media.geeksforgeeks.org/wp-content/uploads/20210314115545/sample-video.mp4" }}
                  style={{ ...StyleSheet.absoluteFill }}
                  ref={playerRef}
                  paused={paused}
                  repeat={true}
                  videoId={{ id: checked_videoid }}
                  onLoad={load}
                  onProgress={progress}
                  resizeMode={"cover"}
                  rate={1.0} />
                <View style={styles.overlay}>
                  {overlay ?
                    <View style={{
                      ...styles.overlaySet,
                      backgroundColor: '#0006',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => backward()} style={{ width: mobileW * 12 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={styles.playerIcon} resizeMode='contain' source={require("./Icon/replay-10.png")}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setpaused(!paused)} style={styles.playTouchable}>
                        <Image style={styles.playerIcon} resizeMode='contain' source={paused ? require("./Icon/play.png") : require("./Icon/pause.png")}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => forward()} style={styles.forward_touchable}>
                        <Image style={styles.playerIcon} resizeMode='contain' source={require("./Icon/forward-10.png")}></Image>
                      </TouchableOpacity>
                      <View style={styles.sliderCont}>
                        <View style={{ ...styles.timer, alignItems: 'center' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: Colors.whiteColor }}>{getTime(currentTime)} / {getTime(duration)}</Text>
                          </View>
                          <TouchableOpacity activeOpacity={0.8} onPress={() => FullscreenToggle()} style={{ margin: 5 }}>
                            {/* <Image style={styles.playerIcon} resizeMode='contain' source={Fullscreen ? require("./Icon/full-screen--v2.png") : require("./Icon/exitFullScreen.png")}></Image> */}
                          </TouchableOpacity>
                        </View>
                        <Slider
                          style={{ margin: 5 }}
                          maximumTrackTintColor={Colors.whiteColor}
                          minimumTrackTintColor={Colors.themecolor}
                          thumbTintColor={Colors.whiteColor}
                          value={currentTime / duration}
                          onValueChange={onslide}
                        />
                      </View>
                    </View>
                    :
                    <View style={styles.overlaySet}>
                      <TouchableNativeFeedback onPress={ShowHideOverlay}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
                    </View>
                  }
                </View>
              </View>
              :
              <Image style={styles.api_image} resizeMode="stretch" source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + DiscData.logo }} />
            }
            {/* ------------ Condition for Full Screen Video Player ------------ */}
            {Fullscreen == false &&
              <ScrollView>
                {discription != '' &&
                  <View style={styles.videodiscription_intro}>
                    <Text style={styles.video_introo}>{vid_intro}</Text>
                    <Text style={styles.__Discription}>{discription}</Text>
                  </View>}

                <View>

                  <FlatList
                    data={DiscData.Course_Content}
                    renderItem={({ item, index }) =>
                      <View>
                        <FlatList
                          data={item.course_contenttopics}
                          renderItem={({ item, index }) =>
                            <View>
                              <View style={{ paddingHorizontal: mobileW * 2 / 100, paddingVertical: mobileW * 1 / 100, }}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { allvar_toset(item) }} style={{ backgroundColor: Colors.white_color, elevation: mobileW * 0.10 / 100, padding: mobileW * 2.5 / 100, borderRadius: mobileW * 2 / 100 }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Image style={styles.video_image} resizeMode='cover' source={{ uri: 'https://mavenow.com/mavenow_webservices/codework/' + item.topic_thumbnail }} />
                                    <View style={styles.titleduration_txt}>
                                      <Text style={{ color: checked != item.file_path ? Colors.blackColor : Colors.themecolor, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium }}>{item.title}</Text>
                                      <Text numberOfLines={2} style={styles.discription_txt}>{item.description}</Text>
                                      <Text style={styles.duration_txt}>Duration: {item.duration}</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          } />
                      </View>

                    } />


                </View>
                {/* .............................................. html data   ................................................. */}
                {DiscData.detaildescription != '' &&
                  <View style={{ padding: mobileW * 2.8 / 100 }}>
                    <Text style={{ color: Colors.blackColor, marginTop: mobileW * 1 / 100, fontFamily: Font.FontMedium, fontSize: mobileW * 4.2 / 100 }}>{Lang_chg.Description[config.language]}</Text>
                    <HTMLView value={`${trimNewLines(DiscData.detaildescription)}`}
                      paragraphBreak={false}
                      stylesheet={htmlStyles} />
                    <Text style={{ color: Colors.blackColor, marginTop: mobileW * 1 / 100, fontFamily: Font.FontMedium, fontSize: mobileW * 4.2 / 100 }}>{Lang_chg.Thiscourseincludes[config.language]}</Text>
                    <HTMLView value={`${trimNewLinescourse(DiscData.coursefacility)}`}
                      paragraphBreak={false}
                      stylesheet={htmlStyles} />
                  </View>
                }
                {/* -------------------------------------------------- html data -------------------------------------------------                       */}
              </ScrollView>}
          </ScrollView>

        </SafeAreaView>
        :
        null
      }
    </View>


  )
}
const htmlStyles = StyleSheet.create({
  ul: {
    margin: 0,
    padding: 0,
    color: Colors.black_color,
    fontSize: mobileW * 3.9 / 100,
    fontFamily: Font.FontRegular
  },
  p: {
    marginBottom: 0,
    paddingBottom: 0,
    color: Colors.black_color,
    fontSize: mobileW * 3.9 / 100,
    fontFamily: Font.FontRegular,
    padding: mobileW * 2 / 100
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video_introo: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.blackColor,
    fontFamily: Font.FontMedium
  },
  __Discription: {
    fontSize: mobileW * 3 / 100,
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    marginTop: mobileW * 1 / 100
  },
  playTouchable: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forward_touchable: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleduration_txt: {
    justifyContent: 'space-between',
    paddingVertical: mobileW * 0.5 / 100,
    paddingHorizontal: mobileW * 2.5 / 100,

    width: mobileW * 65 / 100
  },
  headerview_: {
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: mobileW * 2.5 / 100,
    // marginBottom:mobileW*2/100,
    // marginHorizontal:mobileW*-3/100
  },
  GIFVIEW: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
  },
  staticdiscription_txt: {
    color: Colors.black_color,
    padding: mobileW * 0.5 / 100
  },
  backIcon: {
    width: mobileW * 3 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color,
    resizeMode: "cover"
  },
  backIcon_top: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
    // resizeMode:"cover"
  },
  playerIcon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.white_color
  },
  flatlistCard: {
    width: mobileW * 96 / 100,
    alignSelf: 'center',
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 5 / 100,
    backgroundColor: Colors.white_color,

    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    // shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  videodiscription_intro: {
    paddingHorizontal: mobileW * 2 / 100,
    paddingVertical: mobileW * 1 / 100,
    marginTop: mobileW * 2 / 100
  },
  imageCard: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.6 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mavenImage: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.themecolor
  },
  flatlistFootar: {
    backgroundColor: Colors.themecolor,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: mobileW * 0 / 100,
    marginTop: mobileW * 2 / 100,
    height: mobileW * 7 / 100
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  video_txt: {
    color: Colors.blackColor,
    textAlign: "justify",
    fontSize: mobileW * 3 / 100,
    textAlign: "justify"
  },
  video_txt1: {
    color: Colors.blackColor,
    textAlign: "justify",
    fontSize: mobileW * 3 / 100,
    textAlign: "justify",
    fontFamily: Font.FontMedium
  },
  htmml_txt: {
    color: Colors.red,
    fontSize: mobileW * 5 / 100,
    marginTop: mobileW * -2 / 100
  },
  GIF: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  duration_txt: {
    color: Colors.gray,
    fontSize: mobileW * 2.8 / 100,
    fontFamily: Font.FontRegular,
    alignSelf: 'flex-end'
  },
  discription_txt: {
    color: Colors.gray,
    textAlign: "justify",
    width: mobileW * 60 / 100,
    fontSize: mobileW * 2.8 / 100,
    fontFamily: Font.FontRegular
  },
  api_image: {
    width: mobileW * 100 / 100,
    height: mobileW * 43 / 100
  },
  video_image: {
    width: mobileW * 26 / 100,
    height: mobileW * 22 / 100,
    borderRadius: mobileW * 1 / 100
  },
  header_dataview: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: mobileW * 50 / 100,
    // padding: mobileW * 1 / 100 ,
    // marginTop:mobileW*0/100,
    // marginHorizontal:mobileW*2/100,
    // backgroundColor:'red'

  },
  Main_text: {
    color: Colors.black_color,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontSemiBold
  },
  video: {
    width: mobileW,
    height: mobileW * .6,
    backgroundColor: 'black'
  },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: mobileW * 10 / 100
  },
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
})



