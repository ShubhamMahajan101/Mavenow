import { View, StatusBar, TextInput, Text, StyleSheet, Button, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useCallback, useEffect, use } from 'react'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
import { useIsFocused } from '@react-navigation/native';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, Currentltlg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import CountryPicker from "rn-country-picker";
import NetInfo from '@react-native-community/netinfo';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import LinkedInModal from '@smuxx/react-native-linkedin';
import { UpdateOnlineStatus } from './App/Firebase/Users';
import { UpdateDivecToken } from './App/Firebase/Users';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from 'react-native-elements';
import { LoginUser } from './App/Firebase/LoginUser';
import { Firebase } from './App/Firebase/firebaseConfig';
import { AddUser } from './App/Firebase/Users'
import { string } from 'yup';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [mobile_number, setValue1] = useState('');
  const [userInfo, setuserInfo] = useState({});
  const isLogin = userInfo.name;
  const [latitude, setlatitude] = useState(config.latitude)
  const [longitude, setlongitude] = useState(config.longitude)
  const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false);
  const [Valid_mail, setValid_mail] = useState('')
  // console.log('Tokan', isLogin)
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected == false) {
        alert(
          "Please check your internet connection",
        );
      }
    });
    return () => {

      unsubscribe();
    };
  }, [isFocused]);




  const Item = () => (
    <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 7 / 100 }} source={require('./Icon/Linkdinlogo.png')}></Image>
  );

  // ===================facebook sdk
  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setuserInfo({})
    // alert('Unable to Login with Google Account')
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start(); ``
  };

  const loginWithFacebook = () => {
    console.log(loginWithFacebook, "loginWithFacebook step 1------------------------> ");
    //  alert('Unable to Login with Google Account')
    LoginManager.logInWithPermissions(['public_profile']).then(

      login => {
        if (login.isCancelled) {
          console.log('Login cancelled step 2----------------------------------->');
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

  const onPressButton = () => {
    isLogin
      ? logoutWithFacebook()
      : loginWithFacebook();
    // alert('Unable to Login with Google Account')
  }

  // ================google login===============================================
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  // const signIn = async () => {
  //   alert('Unable to Login with Google Account') 
  // }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log("userInfo111");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // this.setState({ userInfo });       
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("userInfo222");
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("userInfo333");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("userInfo444");
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };



  try {
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  } catch (err) {
    console.error('play services are not available');
  }

  const _loginBtn = () => {

    // storeData()
    // if (isNaN(mobile_number) || mobile_number === '') {
    if (isNaN(mobile_number) != true) {

      if (mobile_number.length <= 0) {
        setModalVisible(true);
        // msgProvider.toast(msgText.emptyEmail[config.language], 'center')
        // setEmail('NA')
        return false
      }
      if (mobile_number.length <= 9) {
        // msgProvider.toast(msgText.emptyMobile[config.language], 'center')
        setModalVisible(true);
        return false
      }
      var reg = config.emailvalidation;
      if (reg.test(mobile_number) === true) {
        setModalVisible(true);
        return false
      }
    }
    else {
      if (mobile_number.length <= 9) {
        msgProvider.toast(msgText.validEmail[config.language], 'center')
        // setModalVisible(true);
        return false
      }
    }
    setModalVisible_gifloader(true)
    setTimeout(() => {
      LogintoFirebase()
      navigation.navigate("VerificationCode")

      setModalVisible_gifloader(false)


    }, 500);
      
  }

  const [countryCode, setCountryCode] = useState("91");
  const selectedValue = (value) => {
    setCountryCode(value);
  };

  const storeData = async () => {
    await AsyncStorage.setItem('userlocal_Data', mobile_number)
    var check_Localdata = await AsyncStorage.getItem('userlocal_Data')
    console.log(check_Localdata, "check_Localdata....");
  }



  const clearLocalStorage = async (check_Localdata) => {
    try {
      await AsyncStorage.clear(check_Localdata);
      console.log('Local storage data cleared successfully');
    } catch (error) {
      console.error('Error clearing local storage data:', error);
    }
  };



  // ====> firebase login
    const LogintoFirebase = async () => {
   LoginUser(mobile_number, '123456')
      .then(async (res) => {
        console.log('----->login user all Details+++++++++++++++++++', res.user);
        console.log('----->login  screen data', res.user.uid.name);
        const uid = res.user.uid;
        console.log(uid, "uid__________>>");
        await AsyncStorage.setItem('UID', uid);
        UpdateOnlineStatus(uid, true)

        var checkTocken = await AsyncStorage.getItem('fcmTocken')
        UpdateDivecToken(uid, checkTocken)
        // const fcmToken = Firebase.auth().currentUser.fcmToken;
        console.log(' i am here', uid);
       navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: " ", isLoginScreen: true, countryCode: countryCode })
      }).
      catch((err) => {
        alert(err);
      })
  }



  return (
    <View style={styles.Top_View}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <ScrollView>

          <TouchableOpacity style={styles.mavenow_Logo} activeOpacity={0.8}>
            <Image style={styles.mavenowLogo} resizeMode='contain' source={require("./Icon/new_logo_blue_mavenow.png")}></Image>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_gifloader}
            onRequestClose={() => { setModalVisible_gifloader(!modalVisible_gifloader); }}>
            <View style={styles.gif_view}>
              <Image style={styles.gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
            </View>
          </Modal>
          <View style={styles.top_TExt}>
            <Text style={styles.loginText}>{Lang_chg.LoginTxt[config.language]}</Text>
            <Text style={styles.topText}>{Lang_chg.LoginAccountTxt[config.language]}</Text>
          </View>

          {/*country picker ===================================== */}
          <View style={styles.phoneView}>
            <CountryPicker
              disable={false}
              animationType={"slide"}
              language="en"
              containerStyle={styles.pickerStyle}
              pickerTitleStyle={styles.pickerTitleStyle}
              selectedCountryTextStyle={styles.selectedCountryTextStyle}
              countryNameTextStyle={styles.countryNameTextStyle}
              pickerTitle={"Country Picker"}
              searchBarPlaceHolder={"Search......"}
              hideCountryFlag={false}
              hideCountryCode={false}
              searchBarStyle={styles.searchBarStyle}
              countryCode={countryCode}
              selectedValue={selectedValue} />

            <TextInput style={styles.input} placeholderTextColor={Colors.gray}
              value={mobile_number} onChangeText={(text) => { setValue1(text) }}
              fontSize={mobileW * 3.3 / 100} placeholder="Email / mobile number" />
          </View>
          {/* ======================================= Login Button */}
          <TouchableOpacity activeOpacity={0.8} onPress={() =>  _loginBtn()} style={styles.LoginView}>
            <Text style={styles.LOGIN_TEXT}>{Lang_chg.LOGINbtnTxt[config.language]}</Text>
          </TouchableOpacity>


          <View style={styles.Signup_navigate} activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
            <Text style={styles.crteate_txt}>{Lang_chg.newAccountTxt[config.language]}</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
              <Text style={styles.click_TEXT}>{Lang_chg.clickhere[config.language]}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom_view}>
            <View style={{ flexDirection: 'row', marginTop: mobileW * 2.4 / 100 }}>
              <View style={[styles.line__, { right: mobileW * 2.2 / 100 }]}></View>
              <Text style={styles.OR_TEXT}>{Lang_chg.OrLoginWith[config.language]}</Text>
              <View style={styles.line__}></View>
            </View>
          </View>
          {/* ================ or text */}

          {/* Socialmedia ===================================== */}
             <View style={styles.socialmediacardView}>
             <View style={styles.socialmediaView}>
              <TouchableOpacity onPress={() => onPressButton()} activeOpacity={0.8} style={styles.facebookCrad}>
              <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/facebook(3).png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signIn()} activeOpacity={0.8} style={styles.googleCard}>
               <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/search.png')}></Image>
              </TouchableOpacity >


              {/* ----------- Linked In Login ---------- */}
              <View style={styles.linkedinCard}>
                <LinkedInModal
                  clientID="78r9l9cv5xw11h"
                  clientSecret="t81o7kUxW0cUn5gU"
                  redirectUri="https://mavenow.com"
                  onSuccess={token => console.log(JSON.stringify(token, null, 2))}
                  renderButton={() => <Item />} />
              </View>


             </View>
             </View>


          {/* ----------- Modal ----------- */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
            }}>
              <View style={styles.gif_VIEW}>
               <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
               </View>
                </Modal>

          {/* ----------- Modal ----------- */}

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.validation_view}>
                <View style={{ backgroundColor: 'white', borderRadius: mobileW * 2 / 100 }}>
                  <View style={styles.modalHeaderView}>
                    <Text style={styles.error_txt}>Error</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{}}>
                      <Image style={styles.close_image}
                        source={require('./Icon/close2.png')}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.underLine}></View>

                  <View style={styles.modalWhiteCard}>

                    <Text style={styles.errorMassege}>{Lang_chg.PleaseInsert[config.language]}</Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)} style={styles.modalButton}>
                      <Text style={styles.Text_OK}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          {/* --------- Modal ----------- */}

        </ScrollView>
      </SafeAreaView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  underLine: {
    width: mobileW * 80 / 100,
    height: mobileW * 0.2 / 100,
    backgroundColor: Colors.gray
  },
  googleCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, },
    backgroundColor: '#FFFFFF',
    width: mobileW * 13 / 100,
    height: mobileW * 13 / 100,
    padding: mobileW * 0 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.1 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: "#E7E8EA",
    justifyContent: "center",
  },
  close_image: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    borderRadius: mobileW * 5 / 100,
    tintColor: Colors.color_orange
  },
  click_TEXT: {
    color: Colors.themecolor,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
    marginHorizontal: mobileW * 1 / 100
  },
  linkedinCard: {
    shadowColor: '#000',
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, },
    width: mobileW * 13 / 100,
    padding: mobileW * 0 / 100,
    height: mobileW * 13 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.1 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: "#E7E8EA",
    justifyContent: "center",
  },
  Top_View: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  mavenow_Logo: {
    marginTop: mobileW * 13 / 100,
  },
  mavenowLogo: {
    alignSelf: 'center',
    width: mobileW * 70 / 100,
    height: mobileW * 14 / 100,
  },
  facebookCrad: {
    shadowColor: '#000',
    shadowOffset: { width: 0, },
    backgroundColor: '#FFFFFF',
    width: mobileW * 13 / 100,
    height: mobileW * 13 / 100,
    padding: mobileW * 0 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.1 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: "#E7E8EA",
    justifyContent: "center",
  },
  line__: {
    alignSelf: "center",
    fontFamily: Font.FontRegular,
    borderColor: Colors.light_grey,
    width: mobileW * 28 / 100,
    height: mobileW * 0.1 / 100,
    borderBottomWidth: mobileW * 0.1 / 100,
  },
  Gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  input: {
    color: Colors.gray,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    borderColor: "#e8edfb",
    shadowOffset: { width: 0, },
    fontFamily: Font.FontRegular,
    width: mobileW * 57 / 100,
    height: mobileW * 12 / 100,
    paddingRight: mobileW * 4 / 100,

  },
  loginText: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4.5 / 100,
  },
  cardView: {
    width: mobileW,
    height: mobileH * 78 / 100,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: mobileW * 10 / 100,
  },
  topText: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.3 / 100,
  },
  gif_view: {
    justifyContent: 'center',
    backgroundColor: '#00000096',
    flex: 1, alignItems: 'center',
  },
  gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  validation_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000060"
  },
  phoneView: {
    marginTop: mobileW * 7 / 100,
    marginLeft: mobileW * 6 / 100,
    marginRight: mobileW * 6 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.3 / 100,
    flexDirection: 'row',
    shadowColor: '#000',
    borderColor: '#E7E8EA',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    backgroundColor: '#FAFAFA',
  },
  LoginView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mobileW * 6 / 100,
    height: mobileW * 12.8 / 100,
    marginLeft: mobileW * 6 / 100,
    marginRight: mobileW * 6 / 100,
    borderRadius: mobileW * 1.2 / 100,
    backgroundColor: Colors.themecolor,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
  },
  socialmediacardView: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: mobileW * 60 / 100,
    padding: mobileW * 2 / 100,
    height: mobileW * 14 / 100,
    marginTop: mobileW * 6 / 100,
  },
  socialmediaView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  modalHeaderView: {
    width: mobileW * 80 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  modalWhiteCard: {
    backgroundColor: Colors.whiteColor,
    width: mobileW * 80 / 100,
    padding: mobileW * 3 / 100,
    elevation: mobileW * 1 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100,
    borderBottomRightRadius: mobileW * 2 / 100,
  },
  errorMassege: {
    textAlign: "center",
    color: Colors.blackColor,
    padding: mobileW * 2 / 100,
    fontSize: mobileW * 3.5 / 100
  },
  modalButton: {
    alignSelf: "center",
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 20 / 100,
    height: mobileW * 8 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
  },
  // *************
  pickerTitleStyle: {
    fontWeight: "bold",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  pickerStyle: {
    width: mobileW * 23 / 100,
    height: mobileW * 12 / 100,
    alignItems: "center",
    justifyContent: 'center',
    fontSize: 16,
    color: "#000",
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
  },
  selectedCountryTextStyle: {
    color: "#000",
    textAlign: "right",
    paddingLeft: mobileW * 1 / 100,
  },
  countryNameTextStyle: {
    color: "#000",
    textAlign: "right",
    paddingLeft: mobileW * 2 / 100,
  },
  searchBarStyle: {
    flex: 1,
  },
  gif_VIEW: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000096'
  },
  social_image: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
  },
  LOGIN_TEXT: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
    fontFamily: Font.FontMedium
  },
  error_txt: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold,
  },
  crteate_txt: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
  },
  header_view: {
    width: mobileW,
    padding: mobileW * 3 / 100,
    height: mobileH * 23.5 / 100,
  },
  SafeAreaView: {
    flex: 0,
    backgroundColor: Colors.white_color
  },
  Text_OK: {
    textAlign: "center",
    color: Colors.white_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3 / 100,
  },
  Signup_navigate: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    marginTop: mobileW * 3.5 / 100,
  },
  OrtxtCard: {
    width: mobileW * 8 / 100,
    height: mobileW * 8 / 100,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 8 / 100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    backgroundColor: Colors.white_color,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  OR_TEXT: {
    color: '#9B9B9B',
    textAlign: "center",
    fontFamily: Font.FontRegular,
    right: mobileW * 1 / 100,
    fontSize: mobileW * 3.2 / 100,
  },
  bottom_view: {
    alignItems: 'center',
    marginTop: mobileW * 2 / 100
  },
  top_TExt: {
    marginTop: mobileW * 14 / 100,
    marginHorizontal: mobileW * 6 / 100
  }
})

export default Login








