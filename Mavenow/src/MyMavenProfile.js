
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, YellowBox, Alert, Modal, FlatList, Linking, TouchableNativeFeedback, Share, RefreshControl, Button } from 'react-native'
import { Stack, TextInput, } from "@react-native-material/core";
import { StatusBar } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont'
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import { Share } from 'react-native';
import axios from "axios"
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from 'react-native-video-player';
import YoutubePlayer from "react-native-youtube-iframe";;
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import LinkedInModal from '@smuxx/react-native-linkedin';
import Video from 'react-native-video';


import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk'
import { colors } from 'react-native-elements';
import { color } from 'react-native-reanimated';
// import { Menu, Divider, Provider } from 'react-native-paper';
// import {  Menu, Provider } from 'react-native-paper'; 
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { tr } from 'date-fns/locale';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function MyMavenProfile({ navigation }) {

  const [name1, setName1] = useState([]);
  const [name, setName] = useState([]);
  const [shouldShow1, SetShouldShow1] = useState("Rating")
  const [shouldShow2, SetShouldShow2] = useState("right")
  const [modalSkill, setModalSkill] = useState(false);
  const [userMode, setuserMode] = useState();
  const [modalVisible_video, setModalVisible_video] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [shareModal, setshareModal] = useState(false)
  const [description, setDescription] = useState(null);

  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [modalVisible_share, setModalVisible_share] = useState(false);
  const [userName, setUserName] = useState()
  // const [modalVisible_loadergif ,setmodalVisible_loadergif] = useState(false);

  // ---------- Dot Popup 
  const [userInfo, setuserInfo] = useState({});
  const isLogin = userInfo.name;
  const [visible, setVisible] = useState(false);

  // +++++++++++++++++++++++ Pop Up Menu ++++++++++++++++

  const menuRef = useRef(null);
  const showMenu = () => {
    menuRef.current.show();
  };

  const hideMenu = () => {
    menuRef.current.hide();
  };

  const handleMenuItemClick = (item) => {
    console.log(`Selected: ${item}`);
    hideMenu();
  };
  // +++++++++++++++++++++++ ***************** ++++++++++++++++

  useEffect(() => {

    userNameHere()

    // setTimeout(() => {
    //   setmodalVisible_loadergif(false)
    // }, 2000);

    // apiCalling();
    apiCalling1();
    SetMode();
  }, [])

  const userNameHere = async () => {
    // const UserName = await AsyncStorage.getItem('UserName')
    const UserName = await AsyncStorage.getItem('UserName');
    console.log("UserName", UserName);
    setUserName(UserName)

  }

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setuserInfo({})
    // alert('Unable to Login with Google Account')
  };


  const loginWithFacebook = () => {
    console.log(loginWithFacebook, "loginWithFacebook step 1------------------------> ");
    //  alert('Unable to Login with Google Account')
    // // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(

      login => {
        if (login.isCancelled) {
          console.log('Login cancelled step 2-----------------------------------');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            console.log("accessToken", accessToken);
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );

  };

  const SetMode = async (data) => {
    const value = await localStorage.getItemString('UserMode')
    console.log("============================================================>", value);
    setuserMode(value)
  }
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


  const apiCalling1 = () => {
    axios.get('https://mavenow.com:8001/userrequest/getUserClassesByRating?userId=848&TypeofRequest=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDIxMzE2Nn0.ASnHQya29LrSAqN6ff2DCam56LZRA_71X2oM6JUyJM8')
      .then(res => {
        const nameList = res.data.result;
        // const imageArray = nameList.result;
        console.log(' 2nd api  data my  maven profile screen==============second>', nameList)

        setName1(nameList)

        setTimeout(() => {
          // setModalVisible3(false)
        }, 1500);
        // setCategory(nameList.category)
      })
      .catch(function (error) {
        console.log('---------->', error);
      });

  }

  //   const signIn = async () => {
  //   alert('Unable to Login with Google Account')
  // }
  // const Item = () => (
    // <View style={{ backgroundColor: "white", width: mobileW * 5 / 100, height: mobileW * 5 / 100, borderRadius: mobileW * 3 / 100 }}>
      {/* <Text style={{ textAlign: 'center', color: Colors.themecolor, fontWeight: '600' }}>in</Text> */}
    {/* </View> */}
    // <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 7 / 100 }} source={require('./Icon/Linkdinlogo.png')}></Image>
  // );

  const Item = () => (
  <View style={{ backgroundColor: "white", width: mobileW * 5 / 100, height: mobileW * 5 / 100, borderRadius: mobileW * 3 / 100 }}>
     <Text style={{ textAlign: 'center', color: Colors.themecolor, fontWeight: '800' }}>in</Text> 
     </View> 
  );
  const signIn = () => {
    console.log(' facebook signIn ');
    isLogin
      ? logoutWithFacebook()
      : loginWithFacebook();
    // alert('Unable to Login with Google Account')
  }



// const tweetNow =()=>{
//   alert(' you  are Unable to login')
 
// }

const tweetNow = () => {
    let twitterParameters = [];
    // if (twitterShareURL)
    //   twitterParameters.push('url=' + encodeURI(twitterShareURL));
    // if (tweetContent)
    //   twitterParameters.push('text=' + encodeURI(tweetContent));
    // if (twitterViaAccount)
    //   twitterParameters.push('via=' + encodeURI(twitterViaAccount));
    const url ='https://twitter.com/intent/tweet?' + twitterParameters.join('&');
    Linking.openURL(url)
      .then((data) => {
        console.log(data,'Twitter login data ');
        alert('Twitter Opened');
      })
      .catch(() => {
        alert('Something went wrong');
      });
  };
 const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      //   //     const result = await Share.share({
      //   //       message: Platform.OS === "android" ?
      //   //         'https://play.google.com/store/search?q=trulinco&c=apps' :
      //   //         "https://apps.apple.com/in/app/trulinco/id1583020135",
      //   //     });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch {
      Alert.alert(error.message);
    }
  };


  const crome_url = "https://www.mavenow.com/mavenow_webservices/codework/cards/index.html?username=Vinay&rating=0&joindate=11/07/2022&aboutme=hi&skills=As%20a%20student%20skill%20Kotlin(basic)&completeclasses=8&userimage=https://mavenow.com/mavenow_webservices/codework/U&userId=848"
  const loadInBrowser = () => {
    Linking.openURL(crome_url).catch(err => console.error("Couldn't load page", err));
  };


  



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
    //  <View style={{ flex: 1, backgroundColor:Colors.white_color }}>
    //  <View style={{ flex: 1, backgroundColor:"green"}}>
    <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />

        <ScrollView
          refreshControl={
          <RefreshControl 
          colors={[Colors.themecolor]}
         refreshing={refreshing} onRefresh={onRefresh} />
          }>

        {/* ====> YOUTUBE PLAYER MODAL  */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_video}
            onRequestClose={() => {
              setModalVisible_video(!modalVisible_video);
            }}>
            <View style={{ flex: 1, backgroundColor: "#00000060", alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ marginLeft: mobileW * 80 / 100 }} activeOpacity={0.8} onPress={() => setModalVisible_video(!modalVisible_video)} >
                <Image tintColor={Colors.themecolor} style={styles.backIcon_video} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
              </TouchableOpacity>
              <YoutubePlayer
                height={mobileH * 35 / 100} width={mobileW * 90 / 100}
                play={playing}
                videoId={"27WN1UKKphA"}
                onChangeState={onStateChange} />
            </View>
          </Modal>
        </View>


        {/* ================ GIF MODAL */}
        {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_loadergif} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000060' }}>
              <Image style={styles.GIF} source={require("./Icon/neighcoach_loader.gif")}></Image>
            </View>
          </Modal> */}



        {/* ====> YOUTUBE PLAYER MODAL  */}


        {/* ====> about text modal */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.ModelCard}>
                <View style={styles.ModelHeader}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : profile</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}>
                    <Image style={styles.backIcon_edit} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular }}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
        {/* // =======>  about text modal  */}



        {/* ====> Header */}
        <View>



          <View style={styles.Header}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
              </TouchableOpacity>
            </View>
            <Text style={styles.HeaderName}>{userMode == 'maven' ? Lang_chg.MavenProfileTxt[config.language] : Lang_chg.LearnerProfileTxt[config.language]}</Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 2 / 100 }} onPress={() => setModalVisible(true)}>
                <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: Colors.black_color }}
                  source={require("./Icon/about.png")}></Image>
              </TouchableOpacity>
              {/* <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => navigation.navigate('UpdateMavenn_Profile', {}, )}> */}

              <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100, }} onPress={showMenu}>
                <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: Colors.black_color, }}
                  source={require("./Icon/dots.png")}></Image>
              </TouchableOpacity>
            </View>
          </View>

          {/* ========= Popup Menu =========  */}

          <View style={{ alignSelf: 'flex-end', }}>
            <Menu ref={menuRef} >
              <MenuItem onPress={() => handleMenuItemClick(navigation.navigate('UpdateMavenn_Profile', { userkeyword: 2 }))}>
                <Text style={{color:Colors.dark_gray, fontSize:mobileW*3.5/100, fontFamily:Font.FontMedium}}>{Lang_chg.EditProfile[config.language]}</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => handleMenuItemClick(setModalVisible_share(true), setVisible(false))} style={{}}>
                <Text style={{color:Colors.dark_gray, fontSize:mobileW*3.5/100, fontFamily:Font.FontMedium}}>{Lang_chg.ShareTxt[config.language]}</Text>
              </MenuItem>
              {/* <MenuDivider /> */}
              {/* <MenuItem onPress={() => handleMenuItemClick('Cancel')}>Cancel</MenuItem> */}
            </Menu>
          </View>


        </View>


        {/* ======> Maven/Learner Profile*/}
        <TouchableOpacity style={{ width: mobileW * 92 / 100, flexDirection: 'row', alignItems: 'center', margin: mobileW * 4 / 100, }} activeOpacity={0.8} onPress={() => setVisible(false)}>

          <View>
            <Image resizeMode='contain' style={{ width: mobileW * 18 / 100, height: mobileW * 18 / 100, borderRadius: mobileW * 9 / 100 }} source={require('./Icon/12.jpg')}></Image>
          </View>
          <View style={{ marginHorizontal: mobileW * 2 / 100, width: mobileW * 70 / 100, }}>
            <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{userName}</Text>
            <Text style={{ fontSize: mobileW * 3 / 100, marginTop: mobileW * -1 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>{Lang_chg.JoinDateTxt[config.language]}Mar 21 2023</Text>
            {/* <View style={{flexDirection:'row', width:mobileW*20/100, justifyContent:'space-between'}}>
              <TouchableOpacity activeOpacity={0.8}>
              <Image style={styles.star_image} resizeMode='contain' source={require("./Icon/rating_full.gif")} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
              <Image style={styles.star_image} resizeMode='contain' source={require("./Icon/rating_full.gif")} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
              <Image style={styles.star_image} resizeMode='contain' source={require("./Icon/rating_full.gif")} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
              <Image style={styles.star_image} resizeMode='contain' source={require("./Icon/rating_full.gif")} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
              <Image style={styles.star_image} resizeMode='contain' source={require("./Icon/rating_full.gif")} />
              </TouchableOpacity>
              </View> */}
            <View style={styles.customRatingBarStyle}>

              {maxRating.map((item, key) => {
                return (
                  <TouchableOpacity activeOpacity={0.7}
                    key={item}
                    onPress={() => setDefaultRating(item)}>
                    <Image resizeMode='contain'
                      style={styles.starImageStyle}
                      source={
                        item <= defaultRating
                          ?
                          // <Image style={styles.star_imageratting} resizeMode='contain' source={require("./Icon/rating_full.gif")} />
                          require("./Icon/rating_full.gif")

                          :
                          require('./Icon/star.png')
                        // <Image style={styles.star_ratting} resizeMode='contain' source={require('./Icon/star.png')} />

                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(false)}>
          {/* ++++++ Session Details ++++++++++++*/}
          <View style={{ flexDirection: 'row', width: mobileW * 92 / 100, marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, marginTop: mobileW * 3 / 100, }}>
            <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 23 / 100, alignItems: 'center' }} onPress={() => navigation.navigate('Badges')}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.AchievementTxt[config.language]}</Text>
            </TouchableOpacity>
            <View style={{ width: mobileW * 23 / 100, alignItems: 'center' }}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.SessionCompletedTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 23 / 100, alignItems: 'center' }}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.ActiveSessionTxt[config.language]}</Text>
            </View>
            {userMode == 'maven' ?
              <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 23 / 100, alignItems: 'center' }} onPress={() => navigation.navigate('MyLearners')}>
                <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.LearnersTxt[config.language]}</Text>
              </TouchableOpacity> :
              <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 23 / 100, alignItems: 'center' }} onPress={() => navigation.navigate('MyLearners')}>
                <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, textAlign: 'center' }}>250</Text>
                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.MavensTxt[config.language]}</Text>
              </TouchableOpacity>}
          </View>

          {/* +++++++++++++++++++++ Skills +++++++++++++++++++ */}
          <Text style={styles.SkillsTxt}>{Lang_chg.SkillsTxt[config.language]}</Text>

          <View style={{ marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, marginBottom: mobileW * 3 / 100 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>React</Text>
                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.gray, marginTop: mobileW * 1 / 100 }}>Android</Text>
                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.gray, marginTop: mobileW * 1 / 100 }}>Flutter</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_video(true)} style={styles.youTubeView}>
                <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }} resizeMode='contain' source={require("./Icon/youtube.png")} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalSkill(true)} style={{ width: mobileW * 19 / 100, }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium, marginTop: mobileW * 1 / 100 }}>{Lang_chg.seemoreTxt[config.language]}</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Button  +++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('Rating')}>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Rating' ? Colors.themecolor : Colors.gray }}>{Lang_chg.RatingReviewTxt[config.language]}</Text>

            </View>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Rating' ? Colors.themecolor : Colors.light_grey }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('About')}>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Rating' ? Colors.gray : Colors.themecolor }}>{Lang_chg.AboutMeTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Rating' ? Colors.light_grey : Colors.themecolor }}></View>
          </TouchableOpacity>
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Rating & Review Data  +++++++++++++++++++++++++++++++++++++++++++++++ */}

        {shouldShow1 == 'Rating' &&
          <View>
            {name1 != '' ?
              <ScrollView style={{}} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                  colors={[Colors.themecolor]}
                  refreshing={refreshing} onRefresh={onRefresh} />
              }>
                <View style={{ marginTop: mobileW * 1 / 100, paddingBottom: mobileH * 60 / 100 }}>
                  <FlatList
                    data={name1}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.8} style={styles.flatlistCard}
                        onPress={() => navigation.navigate('AutomationTesingScreen', { item: item })}>
                        <View style={{ flexDirection: "row", alignItems: 'center', }}>
                          <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.OverallRatingTxt[config.language]}</Text>
                          </View>
                          <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                            {/* <Text style={{fontSize:mobileW*3/100,fontFamily:Font.FontRegular,color:Colors.gray, }}>Overall Rating</Text> */}
                            <View style={{ flexDirection: 'row', width: mobileW * 20 / 100, justifyContent: 'space-between' }}>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.star_image} resizeMode='contain'
                                  source={require("./Icon/rating_full.gif")} />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.star_image} resizeMode='contain'
                                  source={require("./Icon/rating_full.gif")} />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.star_image} resizeMode='contain'
                                  source={require("./Icon/rating_full.gif")} />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.star_image} resizeMode='contain'
                                  source={require("./Icon/rating_full.gif")} />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.star_image} resizeMode='contain'
                                  source={require("./Icon/rating_full.gif")} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                          <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.ClassNameTxt[config.language]}</Text>
                          </View>
                          <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.className}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                          <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]}</Text>
                          </View>
                          <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                          <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]}</Text>
                          </View>
                          <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                            <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    } />
                </View>
              </ScrollView> :
              <View style={{ alignItems: 'center', marginTop: mobileH * 20 / 100 }}>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
              </View>
            }
          </View>}

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ About Me Data  +++++++++++++++++++++++++++++++++++++++++++++++ */}


        {shouldShow1 == 'About' &&
          <View>
            {shouldShow2 == "right" ?
              <View style={styles.textInputView}>

                <TextInput
                  color={Colors.themecolor}
                  editable={false}
                  marginLeft={mobileW * -4 / 100}
                  marginBottom={mobileW * -4 / 100}
                  backgroundColor={Colors.white_color}
                  fontSize={mobileW * 3 / 100}
                  fontFamily={Font.FontMedium}
                  value={name.note} style={styles.textInput} placeholder={Lang_chg.aboutyourselfTxt[config.language]} />
                <TouchableOpacity onPress={() => SetShouldShow2('write')}>
                  <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.blackColor }} resizeMode='contain'
                    source={require("./Icon/ic_edit.png")}></Image>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.textInputView}>

                <TextInput
                  style={styles.input}
                  multiline
                  fontFamily={Font.FontMedium}
                  color={Colors.themecolor}
                  fontSize={mobileW * 3 / 100}
                  marginLeft={mobileW * -4 / 100}
                  marginBottom={mobileW * -4 / 100}
                  backgroundColor={Colors.white_color}
                  placeholder={Lang_chg.aboutyourselfTxt[config.language]}
                  value={name} />
                <View style={{ position: 'absolute', left: mobileW * 85 / 100 }}>
                  <TouchableOpacity onPress={() => SetShouldShow2('right')} style={styles.chackicon}>
                    <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.whiteColor }} source={require("./Icon/check.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        }



        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ See More Skills Modal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSkill}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060', }}>
              <View style={styles.skillCard}>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>React</Text>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular, marginTop: mobileW * 2 / 100 }}>Android</Text>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular, marginTop: mobileW * 2 / 100 }}>Flutter</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.OkayBtn} onPress={() => setModalSkill(!modalSkill)}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, }}>{Lang_chg.OkayTxt[config.language]}</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>
        </View>

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Memu Modal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/* <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={shareModal}
          >
            <View style={{ flex: 1, alignItems:'flex-end',  backgroundColor: '#00000060' }}>
              <View style={{ width: mobileW * 30 / 100, padding: mobileW * 4 / 100, marginTop:mobileW*2/100, marginRight:mobileW*2/100, borderRadius: mobileW * 2 / 100, backgroundColor: Colors.white_color, alignItems: 'center', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_share(true)}>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{Lang_chg.ShareTxt[config.language]}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpdateMavenn_Profile', {}, )}>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular, marginTop: mobileW * 2 / 100 }}>{Lang_chg.EditTxt[config.language]}</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular, marginTop: mobileW * 2 / 100 }}>Flutter</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.OkayBtn} onPress={() => setshareModal(!shareModal)}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, }}>{Lang_chg.OkayTxt[config.language]}</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>
        </View> */}


        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Share Modal +++++++++++++++++++++++++++++++++++++++++++ */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_share}
            onRequestClose={() => {
              setModalVisible_share(!modalVisible_share);
            }}>
            <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ borderRadius: mobileW * 4 / 100, borderBottomEndRadius: mobileW * 4 / 100 }} >
                <View style={styles.CardBlueHeader}>
                  <Image style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignSelf: "flex-end", marginRight: mobileW * 3 / 100 }}
                    resizeMode='contain' source={require("./Icon/new_logo_mavenow.png")}></Image>
                </View>
                <View style={styles.MavenWhiteCard}>
                  <View style={{ flexDirection: "row", }}>
                    <View style={styles.imageCard2}>
                      <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
                    </View>
                    <View>
                      <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: mobileW * 2 / 100 }}>
                        <Text style={{ color: Colors.blackColor, fontSize: mobileW * 5 / 100, fontFamily: Font.FontMedium, }}>{userName}</Text>
                        
                        {userMode == 'maven' ?
                         <Text style={{ color: Colors.themecolor, fontSize: mobileW * 5 / 100, fontFamily: Font.FontMedium, marginHorizontal: mobileW * 2 / 100 }}>{Lang_chg.MavennTxt[config.language]}</Text>
                           :
                          <Text style={{ color: Colors.themecolor, fontSize: mobileW * 5 / 100, fontFamily: Font.FontMedium, marginHorizontal: mobileW * 2 / 100 }}>{Lang_chg.LearnerTxt[config.language]}</Text>
                        }
                       
                      </View>
                      <View style={{ flexDirection: "row", }}>
                        <TouchableOpacity activeOpacity={0.8}>
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{ padding: mobileW * 5 / 100 }}>
                    <Text style={{ color: Colors.blackColor, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.AboutTxt[config.language]}</Text>
                    <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, }}>Hii</Text>
                    {/* <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>{details.studentAboutMe}</Text> */}
                    <View style={{ marginTop: mobileW * 1 / 100 }}>
                      <Text style={{ color: Colors.blackColor, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.joiningDateTxt[config.language]}</Text>
                      <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, }}>May 09,2023</Text>
                      {/* <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>{details.createdOn}</Text> */}
                      {/* <Text style={{color:Colors.themecolor,}}>{item.Date}</Text> */}
                    </View>
                    <View style={{ marginTop: mobileW * 2 / 100 }} >
                      <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.SkillsTxt[config.language]}</Text>
                      <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, fontFamily: Font.FontMedium, }}>As a student skill {name}</Text>
                      {/* {details.teachingskills.replace(/,/g, " ")} */}
                    </View>
                    <View style={{ marginTop: mobileW * 3 / 100 }}>
                      <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.CompletedsesssionTxt[config.language]}</Text>
                      <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, }}>0 Session</Text>
                      {/* <Text style={{color:Colors.themecolor}}>{item.session}</Text> */}

                    </View>
                  </View>
                  <View style={styles.modalBottomTabe}>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", }}>
                      <View style={{ flexDirection: "row", alignItems: 'center'}}>

                       
                      <View style={{marginHorizontal:mobileW*2/100}}>
                       <LinkedInModal
                       clientID="78r9l9cv5xw11h"
                       clientSecret="t81o7kUxW0cUn5gU"
                       redirectUri="https://mavenow.com"
                       onSuccess={token => console.log(JSON.stringify(token, null, 2))}
                       renderButton={() => <Item />} />
                       </View> 


                       <TouchableOpacity activeOpacity={0.8} style={styles.faceBookicon} onPress={() => signIn()} >
                       <Image resizeMode='contain' style={styles.faceBook_image} source={require("./Icon/facebook_icon.png")}></Image>
                        </TouchableOpacity>


                       

                       
                  {/* <View style={{backgroundColor:Colors.whiteColor,borderRadius:mobileW*4/100,width:mobileW*5/100,height:mobileW*5/100}}>
                    <Text style={{color:Colors.themecolor,textAlign:'center'}}>in</Text>
                  </View> */}
                        {/* <TouchableOpacity activeOpacity={0.8} style={styles.faceBookicon} onPress={() => signIn()} >
                            <Image resizeMode='contain' style={styles.faceBook_image}
                              source={require("./Icon/facebook_icon.png")}></Image>
                          </TouchableOpacity> */}

                        {/* <TouchableOpacity activeOpacity={0.8} style={styles.linkedinIconView} onPress={() => signIn()}> */}
                        {/* <TouchableOpacity activeOpacity={0.8} style={styles.linkedinIconView} >
                          <Image resizeMode='contain' style={styles.linkedinIcon}
                            source={require("./Icon/linkedin1.png")}></Image>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => onPressButton()}>
                        <LinkedInModal
                            clientID="77bdw3u6uborp2"
                            clientSecret="7m7uDmHOcZeiS4Sq"
                            redirectUri="https://www.linkedin.com/developers/apps/verification/92b99669-9ea9-4a4f-af27-bd3d14731354"
                            onSuccess={token => console.log(JSON.stringify(token, null, 2))}
                            renderButton={() => <Item />} />
             
             
             
             </TouchableOpacity> */}
                     
               
           


                        {/* <TouchableOpacity activeOpacity={0.8} style={styles.faceBookicon} onPress={() => signIn()}> */}
                        <TouchableOpacity activeOpacity={0.8}  style={styles.faceBookicon} onPress={()=>tweetNow()} >
                          <Image resizeMode='contain' style={styles.linkedinIcon} source={require("./Icon/twitter.png")}></Image>
                        </TouchableOpacity>
                      </View>
                      {/* <Image resizeMode='contain' style={styles.linkedin_Icon}
                            source={require("./Icon/earth.png")}></Image> */}
                      <TouchableOpacity onPress={() => loadInBrowser()} activeOpacity={0.8}>
                        <Text style={styles.www_text}>www.mavenow.com</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.Text}>{Lang_chg.shareprofileTxt[config.language]}</Text>
                  <View style={styles.manage_view}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.cancelBtn} onPress={() => setModalVisible_share(!modalVisible_share)}>
                      <View>
                        <Text style={styles.Cancel_text}>{Lang_chg.CancelTxt[config.language]}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.shareBtn}
                      onPress={() => onShare()}
                    >
                      <View>

                        {/* <Text style={styles.Cancel_text}>Share</Text> */}

                        <Text style={styles.share_text}>{Lang_chg.ShareTxt[config.language]}</Text>

                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          </Modal>
        </View>
        </ScrollView>

      </SafeAreaView>

      {/* </View> */}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    padding: mobileW * 4 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  backIcon_edit: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange,
  },
  flatlistCard: {
    borderColor: '#E7E8EA',
    width: mobileW * 92 / 100,
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  ModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color
  },
  ModelCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  modalBottomTabe: {
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    height: mobileW * 11 / 100,
    borderBottomLeftRadius: mobileW * 3 / 100,
    borderBottomRightRadius: mobileW * 3 / 100,
  },
  HeaderName: {
    color: Colors.blackColor,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 4 / 100,
    marginHorizontal: mobileW * 3 / 100,
  },
  star_image: {
    tintColor: Colors.gray,
    width: mobileW * 3.7 / 100,
    height: mobileW * 3.7 / 100,
  },
  star_imageratting: {
    width: mobileW * 3.7 / 100,
    height: mobileW * 3.7 / 100,
    tintColor: Colors.themecolor
  },
  star_ratting: {
    tintColor: Colors.red,
    width: mobileW * 3.7 / 100,
    height: mobileW * 3.7 / 100,
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: mobileW * 2 / 100,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
  },
  input: {
    width: mobileW * 92 / 100,
    height: mobileW * 10 / 100,
    backgroundColor: Colors.white_color,
  },
  chackicon: {
    alignItems: "center",
    justifyContent: "center",
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    borderRadius: mobileW * 4 / 100,
    backgroundColor: Colors.themecolor,
  },
  skillCard: {
    alignItems: 'center',
    width: mobileW * 92 / 100,
    padding: mobileW * 4 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  backIcon_video: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    borderRadius: mobileW * 3.5 / 100,
    tintColor: Colors.whiteColor,
    backgroundColor: Colors.themecolor,
  },
  starImageStyle: {
    resizeMode: 'contain',
    tintColor: Colors.gray,
    width: mobileW * 3.7 / 100,
    height: mobileW * 3.7 / 100,
    marginRight: mobileW * 0.5 / 100,
  },
  SkillsTxt: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 1 / 100,
    marginLeft: mobileW * 4 / 100,
    fontSize: mobileW * 3.8 / 100,
    marginRight: mobileW * 4 / 100,
  },
  youTubeView: {
    alignItems: 'center',
    borderColor: '#FAFAFA',
    justifyContent: 'center',
    width: mobileW * 22 / 100,
    height: mobileW * 22 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.5 / 100,
  },
  textInput: {
    width: mobileW * 84 / 100,
    height: mobileW * 10 / 100,
    borderBottomWidth: mobileW * 1 / 100,
    borderBottomColor: Colors.white_color,
  },
  OkayBtn: {
    shadowColor: '#000',
    alignItems: 'center',
    borderColor: "#e8edfb",
    justifyContent: 'center',
    elevation: 1,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    width: mobileW * 18 / 100,
    height: mobileW * 7 / 100,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.themecolor,
  },
  faceBookicon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 4 / 100,
    marginHorizontal: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  linkedinIconView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 4 / 100,
    backgroundColor: Colors.white_color,
    
  },
  linkedinIcon: {
    width: mobileW * 3 / 100,
    height: mobileW * 3 / 100,
    tintColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
  },
  cancelBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.themecolor,
    backgroundColor: Colors.themecolor,
    width: mobileW * 28 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  shareBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
    width: mobileW * 28 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  MavenWhiteCard: {
    textAlign: "center",
    width: mobileW * 98 / 100,
    elevation: mobileW * 4 / 100,
    marginTop: mobileW * -3 / 100,
    borderRadius: mobileW * 0 / 100,
    borderRadius: mobileW * 4 / 100,
    backgroundColor: Colors.whiteColor,
  },
  faceBook_image: {
    width: mobileW * 3.5 / 100,
    height: mobileW * 3.5 / 100,
    borderRadius: mobileW * 4 / 100,
    tintColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
  },
  manage_view: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    padding: mobileW * 4 / 100
  },
  www_text: {
    color: Colors.white_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3.5 / 100,
    marginRight: mobileW * 3 / 100
  },
  Text: {
    alignSelf: "center",
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    marginTop: mobileW * 5 / 100,
    fontSize: mobileW * 3 / 100,
  },
  imageIcon2: {
    width: mobileW * 20 / 100,
    height: mobileW * 20 / 100,
    tintColor: Colors.themecolor,
    borderRadius: mobileW * 6 / 100
  },
  CardBlueHeader: {
    justifyContent: 'center',
    width: mobileW * 98 / 100,
    height: mobileW * 25 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
    backgroundColor: Colors.themecolor,
  },
  imageCard2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 25 / 100,
    height: mobileW * 25 / 100,
    elevation: mobileW * 2 / 100,
    marginLeft: mobileW * 5 / 100,
    marginTop: mobileW * -10 / 100,
    borderRadius: mobileW * 15 / 100,
    marginHorizontal: mobileW * 5 / 100,
    backgroundColor: Colors.white_color,
  },
  share_text: {
    color: Colors.themecolor,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3 / 100,
  },
  Cancel_text: {
    color: Colors.whiteColor,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3 / 100,
  },
  customRatingBarStyle: {
    flexDirection: 'row',
    right: mobileW * 2 / 100,
    paddingLeft: mobileW * 2 / 100,
    paddingRight: mobileW * 2 / 100,
  },
})
