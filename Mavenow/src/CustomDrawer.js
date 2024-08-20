import { View, Modal, Alert, ScrollView, Text, Image, Dimensions, ImageBackground, StyleSheet, Switch, TouchableOpacity, BackHandler } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { Colors } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { Share } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateOnlineStatus } from './App/Firebase/Users';

//  import UserMaven from './UserMaven';
// global.userMode = ''

const CustomDrawer = ({ navigation, props }) => {
  const initial ='learner'
  const [isEnabled, setIsEnabled] = useState(initial === 'learner');
  // console.log(isEnabled,"------------------ccustom drawer!!!!!!!!!!!! > ");
  const [isEnabled1, setIsEnabled1] = useState('active1');
  const [text, setText] = useState('');
  const [ModalVisible_loguot, setModalVisible_loguot] = useState(false);
  const [getUser_Mode,setgetUser_Mode] = useState('')
  console.log(getUser_Mode,'===========> getUser_Mode ===============> getUser_Mode =================> ');


   //  clear local storage data
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  global.MyVar = 'https://aboutreact.com';

  const logOut = async () => {
    onlinStatus(false)
    await localStorage.removeItem('UID');
    // await clearAsyncStorage("");
    navigation.navigate('Login')
    
}


  // const [modalVisible_loadergif, setModalVisible_loadergif] = useState(false);



  useEffect(() => {
    getMode()
    // setTimeout(() => {
      setModalVisible_loguot(false)
    // }, 1000);

    // setTimeout(() => {
    //   setModalVisible_loadergif(false)
    //   }, 1000);
    //   SetMode();
    // setIsEnabled('learner');
    // setIsEnabled('maven');
    console.log('i am here in calling');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);



  const getMode = async()=> {
    var user_Mode = await localStorage.getItemString('UserMode')
    setgetUser_Mode(user_Mode)
    console.log(user_Mode,'=============> user_Mode ==========> user_Mode ===============> ');
  
   }

  const SetMode = async (data) => {
    if (data == 'maven') {
      global.togalemode = "maven"
      console.log(data,"======>");
      await localStorage.setItemString('UserMode', data)
      setIsEnabled('maven')
    } else {
      global.togalemode = "learner"
      console.log(data,"<<======");
      await localStorage.setItemString('UserMode', data)
      setIsEnabled('learner')
    }

    // const value = await localStorage.getItemObject('user_arr');
    // console.log("Hello Maven  ==============================================================", value.userType);
    //  setuserMode(value)
  }

  const backAction = () => {

    // BackHandler.exitApp()
  };
  const onShare = async () => {
    console.log("sssss")
    try {
      const result = await Share.share({
        message: Platform.OS === "android" ?
          'https://play.google.com/store/search?q=trulinco&c=apps' :
          "https://apps.apple.com/in/app/trulinco/id1583020135",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        
      }
    } catch (error) {
      alert(error.message);
    }
  };

   const onlinStatus =async () =>{
var uid =await AsyncStorage.getItem('UID'); 
UpdateOnlineStatus(uid,false)
   }
  
  // const fcmToken = Firebase.auth().currentUser.fcmToken;
  // console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);Y
  

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color, width: "100%" }}>




      <ImageBackground resizeMode='stretch' style={styles.BACKGROUND_TOP_IMAGE} source={require('./Icon/drawer_img.png')}>
         <View style={styles.imageCard2}>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyMavenProfile')}>
            {global.togalemode == 'learner' ?
              <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_student.png')}></Image> :
              <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
            }
          </TouchableOpacity>
        </View>

        {/* { isEnabled=='learner'?
             <View> <Text>Maven</Text> </View>
                  :
             <View><Text>Learner</Text></View>} */}

        {global.togalemode == 'learner' ?
          <Text style={styles.welcome_text}>{Lang_chg.WelcomeLearnerTxt[config.language]}</Text>
          :
          <Text style={styles.welcome_text}>{Lang_chg.WelcomeMavenTxt[config.language]}</Text>}
      </ImageBackground>

      <View style={styles.containerstyle_radio}>
        <View style={styles.containerstyle}>

          {/* <View style={{ flexDirection: "row", alignSelf: 'center', alignItems: 'center' }}> */}
          {global.togalemode == 'learner' ?
            <View style={styles.togglebuttonview}>
              <Image style={styles.maven_image} resizeMode='contain' source={require('./Icon/icon_student.png')}></Image>

              <Text style={{ left: mobileW * 3 / 100, fontSize: mobileW * 3.3 / 100, color: isEnabled == "learner" ? Colors.black_color : Colors.gray, textAlign: 'center', fontFamily: Font.FontMedium }}>{Lang_chg.LearnerModeTxt[config.language]}</Text>

            </View>
            :
           <View style={styles.togglebuttonview}>
           <Image style={styles.maven_image} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
           <Text style={{ left: mobileW * 3 / 100, fontSize: mobileW * 3.3 / 100, color: isEnabled == "maven" ? Colors.black_color : Colors.gray, textAlign: 'center', fontFamily: Font.FontMedium }}>{Lang_chg.MavenModeTxt[config.language]}</Text>
           </View>
          }

          <View style={styles.TOGGLE}>
            <View style={{ width: mobileW * 8 / 100, height: mobileW * 4 / 100, borderColor: "#E7E8EA", borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.2 / 100, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E7E8EA" }}>

              <TouchableOpacity
                //  hitSlop={{top: 10, bottom: 10, left: 25, right: 25,backgroundColor:"red"}} 
                onPress={() => SetMode('learner')}
                style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.7 / 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0 / 100, backgroundColor: global.togalemode == "learner" ? '#FFFFFF' : "#E7E8EA", borderColor: global.togalemode == "maven" ? Colors.gray : Colors.white_color, }} />
              <TouchableOpacity
                // hitSlop={{top: 10, bottom: 10, left: 25, right: 25,backgroundColor:"red"}}
                onPress={() => SetMode('maven')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.7 / 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0 / 100, backgroundColor: global.togalemode == "maven" ? '#FFFFFF' : "#E7E8EA", borderColor: isEnabled == "maven" ? Colors.white_color : Colors.gray }} />

            </View>
          </View>

        </View>

        {isEnabled == 'maven' &&
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginBottom: mobileW * 1 / 100, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.maven_image} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
              <Text style={styles.teach_text}>{Lang_chg.AvailableTeachTxt[config.language]}</Text>
            </View>
            <View style={styles.ToggleButton_view}>
              <View style={{ width: mobileW * 8 / 100, height: mobileW * 4 / 100, borderColor: isEnabled1 == "active1" ? Colors.gray : Colors.green, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.25 / 100, flexDirection: "row", justifyContent: "space-between", }}>
                <TouchableOpacity onPress={() => setIsEnabled1('active1')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0 / 100, backgroundColor: isEnabled1 == "active1" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled1 == "disactive1" ? Colors.white_color : Colors.gray }} />
                <TouchableOpacity onPress={() => setIsEnabled1('disactive1')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0 / 100, backgroundColor: isEnabled1 == "disactive1" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled1 == "disactive1" ? Colors.gray : Colors.white_color }} />
              </View>
            </View>
          </View>}

      </View>






      <View style={styles.underline_}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.drawer_style}>
            <Image resizeMode='contain' style={styles.Drawer_img} source={require('./Icon/home.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.HomeTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} >
          <View style={styles.drawer_style}>
            <Image resizeMode='contain' style={styles.Drawer_img} source={require('./Icon/requestt.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.RequestTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Chat')} >
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/chat.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.ChatTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Notification')} >
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/notification.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.NotificationTxt[config.language]}</Text>

          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        {isEnabled === 'maven' ?

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Wallet')}>
            <View style={styles.drawer_style}>
              <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/wallet.png')}></Image>
              <Text style={styles.drawer_txt}>{Lang_chg.WalletTxt[config.language]}</Text>
            </View>
          </TouchableOpacity>

          :

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Refund')}>
            <View style={styles.drawer_style}>
              <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/wallet.png')}></Image>
              <Text style={styles.drawer_txt}>{Lang_chg.RefundTxt[config.language]}</Text>
            </View>
          </TouchableOpacity>}
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Help')} >
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/help.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.HelpTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('History')}>
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/history.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.HistoryTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Feedback')}>
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/feedbacvkk.pmg.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.FeedbackTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={()=>onShare()}>
          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require("./Icon/share.png")}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.ShareTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Language'),closeDrawer()} } > */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Language'), navigation.dispatch(DrawerActions.closeDrawer()) }}>

          <View style={styles.drawer_style}>
            <Image resizeMode="stretch" style={styles.Drawer_img} source={require('./Icon/language.png')}></Image>
            <Text style={styles.drawer_txt}>{Lang_chg.LanguageTxt[config.language]}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.drawer_underline}></View> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(true)} style={styles.drawer_style}>
          <Image resizeMode='contain' style={styles.Drawer_img} source={require('./Icon/logout.png')}></Image>
          <Text style={styles.drawer_txt}>{Lang_chg.LogoutTxt[config.language]}</Text>
        </TouchableOpacity>
      </ScrollView>
      <View>

        <Modal animationType="slide" transparent={true}
          visible={ModalVisible_loguot}
          onRequestClose={() => {
            setModalVisible_loguot(!ModalVisible_loguot);
          }}>
          <View style={styles.modal_view}>
            <View style={styles.Modal}>
              <View style={styles.ModalHeader}>
                <Text style={styles.logout_text}>{Lang_chg.LogoutTxt[config.language]}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(!ModalVisible_loguot)} >
                  <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

              <ScrollView>

                  <View style={styles.logout_view}>
                  <Text style={styles.ask_text}>{Lang_chg.sureLogoutTxt[config.language]}</Text>
                  <View style={{ flexDirection: 'row', marginTop: mobileW * 3 / 100 }}>
                    <TouchableOpacity onPress={() => {logOut(),navigation.dispatch(DrawerActions.closeDrawer()), setModalVisible_loguot(!ModalVisible_loguot)}} activeOpacity={0.8} style={styles.yes_button}>
                      <Text style={styles.yes_text}>{Lang_chg.YesTxt[config.language]}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loguot(!ModalVisible_loguot)} style={[styles.yes_button, { backgroundColor: Colors.white_color }]}>
                      <Text style={[styles.yes_text, { color: Colors.themecolor }]}>{Lang_chg.NoTxt[config.language]}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
export default CustomDrawer
const styles = StyleSheet.create({
  imageIcon2: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 8 / 100,
    tintColor: Colors.themecolor,
    // marginHorizontal: mobileW * 2 / 100,
  },
  welcome_text: {
    color: Colors.white_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.3 / 100,
    marginTop: mobileW * 2 / 100,
  },
  underline_: {
    width: "100%",
    borderColor: "#E7E8EA",
    height: mobileW * 0.2 / 100,
    borderWidth: mobileW * 0.1 / 100
  },
  GIF: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  logout_icon: {
    width: mobileW * 6.5 / 100,
    height: mobileW * 6.5 / 100,
    tintColor: Colors.lightgray
  },
  togglebuttonview: {
    flexDirection: "row",
    alignItems: 'center',
    width: mobileW * 54 / 100,
  },
  logout_view: {
    alignItems: 'center',
    padding: mobileW * 3 / 100
  },
  history___icon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.light_grey
  },
  ToggleButton_view: {
    alignItems: 'center',
    justifyContent: 'center',
    //  width: mobileW * 13 / 100,
    //  height: mobileW * 6 / 100, 
  },
  yes_button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.themecolor,
    width: mobileW * 15 / 100,
    height: mobileW * 7 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  BACKGROUND_TOP_IMAGE: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    height: mobileH * 18 / 100,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    //  backgroundColor:'transparent',
    //  backgroundColor:'#121A23',
    // opacity: 0.5,
  },
  maven_image: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  TOGGLE: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 13 / 100,
    height: mobileW * 6 / 100,
  },
  yes_text: {
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 3.8 / 100,
  },
  teach_text: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
    marginHorizontal: mobileW * 1.5 / 100,
  },
  mavenmode_view: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 25 / 100,
  },
  ask_text: {
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
  },
  userMode: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.4 / 100,
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  drawer_image: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.light_grey
  },
  imageCard2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 14 / 100,
    height: mobileW * 14 / 100,
    borderRadius: mobileW * 11 / 100,
    borderWidth: mobileW * 0.1 / 100,
    borderColor: Colors.white_color,
  },
  logout_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  containerstyle2: {
    width: mobileW * 78 / 100,
    height: mobileW * 14 / 100,
    elevation: mobileW * 2 / 100,
    marginTop: mobileW * 1 / 100,
    shadowColor: '#000',
    justifyContent: "center",
    borderColor: Colors.gray,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    backgroundColor: Colors.white_color,
  },
  ImageIcon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.light_grey
  },
  containerstyle: {
    width: "100%",
    alignSelf: "center",
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
    height: mobileW * 13 / 100,
    padding: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    // backgroundColor: Colors.bgcolor,
    // elevation: mobileW * 0.6 / 100,
    // shadowColor: '#000',
    // borderColor: Colors.gray,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, },
    // shadowOpacity: 0.1,
  },
  containerstyle_radio: {
    width: "100%",
    shadowColor: '#000',
    borderColor: Colors.gray,
    backgroundColor: Colors.bgcolor,
    padding: mobileW * 2 / 100,
    elevation: mobileW * 0.6 / 100,
    // borderRadius: mobileW * 1 / 100,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, },
    // shadowOpacity: 0.1,
  },
  ModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  Modal: {
    elevation: 5,
    alignSelf: 'center',
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  drawer_style: {
    flexDirection: "row",
    alignItems: "center",
    padding: mobileW * 3.5 / 100,
    marginTop: mobileW * -2 / 100
  },
  drawer_underline: {
    width: mobileW * 79 / 100,
    height: mobileW * 0.2 / 100,
    marginLeft: mobileW * 3 / 100,
    backgroundColor: Colors.light_grey,
  },
  drawer_txt: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.1 / 100,
    marginHorizontal: mobileW * 4.7 / 100,
  },
  Drawer_img: {
    tintColor: Colors.gray,
    width: mobileW * 4.5 / 100,
    height: mobileW * 4.5 / 100,
  },
})


