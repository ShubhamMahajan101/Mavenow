
import { View, StatusBar, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, Currentltlg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import CountryPicker from "rn-country-picker";
import NetInfo from '@react-native-community/netinfo';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import LinkedInModal from '@smuxx/react-native-linkedin';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from 'react-native-elements';
import { LoginUser } from './App/Firebase/LoginUser';
import { Firebase } from './App/Firebase/firebaseConfig';
const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [mobile_number, setValue1] = useState('');
  const [userInfo, setuserInfo] = useState({});
  const isLogin = userInfo.name;
  const [latitude, setlatitude] = useState(config.latitude)
  const [longitude, setlongitude] = useState(config.longitude)
  const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false);

  console.log('Tokan', isLogin)


  useEffect(() => {
    // getcurrentlatlogn()

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected == false) {
        alert(
          "Please check your internet connection",
        );
      }
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  const Item = () => (
    <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 7 / 100 }} source={require('./Icon/Linkdinlogo.png')}></Image>
  );

  // ===================facebook sdk=====================================
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
          // this.setState({userInfo: user});
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
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

  const onPressButton = () => {
    isLogin
      ? logoutWithFacebook()
      : loginWithFacebook();
    // alert('Unable to Login with Google Account')
  }


  // ================google login===============================================
// ===================Comment by me Start ==========================================
  // GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //   webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   hostedDomain: '', // specifies a hosted domain restriction
  //   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  //   forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  //   accountName: '', // [Android] specifies an account name on the device that should be used
  //   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // });
// ===================Comment by me End ==========================================
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



  // try {
  //   GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // google services are available
  // } catch (err) {
  //   console.error('play services are not available');
  // }

  //-----------------function for get current location--------
  // const  getcurrentlatlogn = async () => {
  //     // setModalVisible1(true); 
  //     let data = await Currentltlg.requestLocation()
  //     let latitude = data.coords.latitude;
  //     let longitude = data.coords.longitude;
  //         setlatitude(latitude)
  //         setlongitude(longitude)
  //     // if (props.address_arr != 'NA') {
  //     //     // this.setState({ latitude: latitude, longitude: longitude })
  //     //     setlatitude(latitude)
  //     //     setlongitude(longitude)
  //     //     config.latitude = latitude;
  //     //     config.longitude = longitude;
  //     //     console.log('----------------->>>',latitude);
  //     //     console.log('----------------->>>',longitude);
  //     // }
  //     // else {
  //     //   setlatitude(latitude)
  //     //   setlongitude(longitude)
  //     //     // this.setState({ latitude: latitude, longitude: longitude })
  //     //     config.latitude = latitude;
  //     //     config.longitude = longitude;
  //     // }


  //     consolepro.consolelog('latitude splash', latitude)
  //     consolepro.consolelog('longitude splash', longitude)
  // }

  // ==========================likidin sdk========================

  const _loginBtn = () => {


    //  if (mobile_number.length <= 0) {
    //      msgProvider.toast(msgText.emptyMobile[config.language], 'center')
    //      return false
    //    }
    //    if (mobile_number.length < 7) {
    //      msgProvider.toast(msgText.mobileMinLength[config.language], 'center')
    //      return false
    //    }
    //    if (mobile_number.length > 15) {
    //      msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
    //      return false
    //    }


    if (mobile_number.length <= 9) {
      setModalVisible(true);
      return false
    }
    // ************************
    setModalVisible_gifloader(true)
    setTimeout(() => {
      navigation.navigate("VerificationCode")
      setModalVisible_gifloader(false)
    }, 1000);

    // ************

    // setModalVisible1(true);

    // var data = JSON.stringify({
    //   countryCode: countryCode,
    //   emailMobile: mobile_number
    // });

    // var config1 = {
    //   method: 'post',
    //   url: config.baseURL + 'user/loginotp',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // };

    // axios(config1)
    //   .then(async (response) => {
    //     console.log('response is arriwal =======================', response.data)
    //     console.log((response.data));
    //     var user_arr = response.data.data;
    //     var IsScucceded = response.data.ErrorCode;
    //     var ErrorMessage = response.data.ErrorMessage;
    //     console.log('------------ userrr_arrauy', user_arr)
    //     if (IsScucceded == 200) {
    //       setModalVisible1(false);
    //       // await localStorage.setItemObject('user_arr', user_arr);
    //       //  alert(ErrorMessage)
    //       setTimeout(() => {
    //         // LogintoFirebase()
    //         navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: " ", isLoginScreen: true, countryCode: countryCode })
    //       }, 1000);
    //     }
    //     else {
    //       setModalVisible1(false);
    //       alert(ErrorMessage)
    //       // msgProvider.toast(msgText.ErrorMessage[config1.language], 'center')
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error)
    //     setModalVisible1(false);
    //     console.log('i am in errror ');
    //   });
  }

  const [countryCode, setCountryCode] = useState("91");
  const selectedValue = (value) => {
    setCountryCode(value);
  };


  // const LogintoFirebase = async () => {
  // LoginUser(mobile_number,'123456')
  // .then(async (res) => {
  // //  console.log('---res-->',res);
  // console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!',res.user.uid);
  // // const uid = Firebase.auth().currentUser.uid;
  // const uid = res.user.uid;
  // // const fcmToken = Firebase.auth().currentUser.fcmToken;
  // console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
  // await AsyncStorage.setItem('UID', uid);

  // //  await AsyncStorage.setItem('Token', fcmToken);
  //  navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
  // // navigation.navigate('Dashboard');
  // }).
  // catch((err) => {
  // alert(err);
  // })
  // } 

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

          {/* ======================================= country picker ===================================== */}
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
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.gray}
              onChangeText={(text) => {
                setValue1(text);
              }}
              fontSize={mobileW * 3.3 / 100}
              placeholder="Email / mobile number" />
          </View>
          {/* ======================================= Login Button ===================================== */}

          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {LogintoFirebase()}} style={styles.LoginView}> */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => { _loginBtn() }} style={styles.LoginView}>
            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {LogintoFirebase()}} style={styles.LoginView}> */}
            <Text style={styles.LOGIN_TEXT}>{Lang_chg.LOGINbtnTxt[config.language]}</Text>
          </TouchableOpacity>


          <View style={styles.Signup_navigate} activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
            <Text style={styles.crteate_txt}>{Lang_chg.newAccountTxt[config.language]}</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
              <Text style={styles.click_TEXT}>{Lang_chg.clickhere[config.language]}</Text>
            </TouchableOpacity>
          </View>
          {/* ================ or text */}
          <View style={styles.bottom_view}>

            <View style={{ flexDirection: 'row', marginTop: mobileW * 2.4 / 100 }}>
              <View style={[styles.line__, { right: mobileW * 2.2 / 100 }]}></View>
              {/* <Text style={styles.OR_TEXT}>{Lang_chg.ORTxt[config.language]}</Text> */}
              <Text style={styles.OR_TEXT}>{Lang_chg.OrLoginWith[config.language]}</Text>
              <View style={styles.line__}></View>
            </View>



          </View>
          {/* ================ or text */}

          {/* ======================================= Socialmedia ===================================== */}
          <View style={styles.socialmediacardView}>
            <View style={styles.socialmediaView}>
              <TouchableOpacity onPress={() => onPressButton()} activeOpacity={0.8} style={{
                shadowColor: '#000',
                borderWidth: mobileW * 0.1 / 100,
                // shadowOpacity: 0.1,
                shadowOffset: { width: 0, },
                // shadowOpacity: 0.1,
                backgroundColor: '#FFFFFF',
                padding: mobileW * 0 / 100,
                borderRadius: mobileW * 3 / 100,
                width: mobileW * 13 / 100,
                height: mobileW * 13 / 100,
                alignSelf: 'center',
                justifyContent: "center",
                alignItems: 'center',
                borderColor: "#E7E8EA"

              }} >
                <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/facebook(3).png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signIn()} activeOpacity={0.8} style={{
                shadowColor: '#000',
                borderWidth: mobileW * 0.1 / 100,
                // shadowOpacity: 0.1,
                shadowOffset: { width: 0, },
                // shadowOpacity: 0.1,
                backgroundColor: '#FFFFFF',
                padding: mobileW * 0 / 100,
                borderRadius: mobileW * 3 / 100,
                width: mobileW * 13 / 100,
                height: mobileW * 13 / 100,
                alignSelf: 'center',
                justifyContent: "center",
                alignItems: 'center',
                borderColor: "#E7E8EA"
              }}>

                <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/search.png')}></Image>
              </TouchableOpacity >
              {/* ----------- Linked In Login ---------- */}
              <View style={{
                shadowColor: '#000',
                borderWidth: mobileW * 0.1 / 100,
                // shadowOpacity: 0.1,
                shadowOffset: { width: 0, },
                // shadowOpacity: 0.1,
                backgroundColor: '#FFFFFF',
                padding: mobileW * 0 / 100,
                borderRadius: mobileW * 3 / 100,
                width: mobileW * 13 / 100,
                height: mobileW * 13 / 100,
                alignSelf: 'center',
                justifyContent: "center",
                alignItems: 'center',
                borderColor: "#E7E8EA"
              }}>
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
                      <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, borderRadius: mobileW * 5 / 100, tintColor: Colors.color_orange }}
                        source={require('./Icon/close2.png')}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: mobileW * 80 / 100, height: mobileW * 0.2 / 100, backgroundColor: Colors.gray, }}></View>

                  <View style={styles.modalWhiteCard}>
                    <Text style={styles.errorMassege}>Please Insert Email/mobile number.</Text>
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
  click_TEXT: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.themecolor,
    fontFamily: Font.FontRegular,
    marginHorizontal: mobileW * 1 / 100
  },
  Top_View: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  mavenow_Logo: {
    marginTop: mobileW * 13 / 100,
  },
  mavenowLogo: {
    width: mobileW * 70 / 100,
    height: mobileW * 14 / 100,
    alignSelf: 'center',
  },
  line__: {
    borderBottomWidth: mobileW * 0.1 / 100,
    borderColor: Colors.light_grey,
    width: mobileW * 28 / 100,
    height: mobileW * 0.1 / 100,
    alignSelf: "center",
    fontFamily: Font.FontRegular
  },
  Gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  input: {
    height: mobileW * 12 / 100,
    color: Colors.gray,
    width: mobileW * 57 / 100,
    paddingRight: mobileW * 4 / 100,
    fontFamily: Font.FontRegular,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    //     BL =  #121A23
    // White =  #FFFFFF
    // Gray =  #9B9B9B
    // BR =  #EFF2F1
    // BR2 =  #E7E8EA
    // Blue=  #00959E
    // BG =  #FAFAFA
  },
  loginText: {
    fontSize: mobileW * 4.5 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontMedium
  },
  cardView: {
    width: mobileW,
    height: mobileH * 78 / 100,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: mobileW * 10 / 100,
  },
  topText: {
    fontSize: mobileW * 3.3 / 100,
    color: Colors.gray,
    fontFamily: Font.FontRegular
  },
  gif_view: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000096'
  },
  gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  validation_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060"
  },
  phoneView: {
    marginLeft: mobileW * 6 / 100,
    marginRight: mobileW * 6 / 100,
    borderRadius: mobileW * 1 / 100,
    flexDirection: 'row',
    marginTop: mobileW * 7 / 100,
    shadowColor: '#000',
    borderColor: '#E7E8EA',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    backgroundColor: '#FAFAFA',
    borderWidth: mobileW * 0.3 / 100
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: mobileW * 6 / 100,
    marginRight: mobileW * 6 / 100,
    height: mobileW * 12.8 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 1.2 / 100,
    marginTop: mobileW * 6 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  socialmediacardView: {
    width: mobileW * 60 / 100,
    height: mobileW * 14 / 100,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 6 / 100,
  },
  socialmediaView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  modalHeaderView: {
    backgroundColor: Colors.white_color,
    width: mobileW * 80 / 100,
    flexDirection: 'row',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalWhiteCard: {
    backgroundColor: Colors.whiteColor,
    elevation: mobileW * 1 / 100,
    padding: mobileW * 3 / 100,
    width: mobileW * 80 / 100,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100,
  },
  errorMassege: {
    textAlign: "center",
    color: Colors.blackColor,
    padding: mobileW * 2 / 100,
    fontSize: mobileW * 3.5 / 100
  },
  modalButton: {
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    width: mobileW * 20 / 100,
    height: mobileW * 8 / 100,
    alignSelf: "center",
    justifyContent: 'center',
    marginTop: mobileW * 2 / 100
  },
  // *************
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    fontWeight: "bold",
  },
  pickerStyle: {
    height: mobileW * 12 / 100,
    width: mobileW * 23 / 100,
    alignItems: "center",
    justifyContent: 'center',
    fontSize: 16,
    color: "#000",
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  selectedCountryTextStyle: {
    paddingLeft: mobileW * 1 / 100,
    color: "#000",
    textAlign: "right",
  },
  countryNameTextStyle: {
    paddingLeft: mobileW * 2 / 100,
    color: "#000",
    textAlign: "right",
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
    color: Colors.black_color,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontSemiBold
  },
  crteate_txt: {
    color: Colors.black_color,
    fontSize: mobileW * 3.2 / 100,
    fontFamily: Font.FontRegular
  },
  header_view: {
    width: mobileW,
    height: mobileH * 23.5 / 100,
    padding: mobileW * 3 / 100
  },
  SafeAreaView: {
    flex: 0,
    backgroundColor: Colors.white_color
  },
  Text_OK: {
    color: Colors.white_color,
    fontSize: mobileW * 3 / 100,
    textAlign: "center",
    fontFamily: Font.FontMedium
  },
  Signup_navigate: {
    alignItems: 'center',
    marginTop: mobileW * 3.5 / 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  OrtxtCard: {
    width: mobileW * 8 / 100,
    height: mobileW * 8 / 100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    backgroundColor: Colors.white_color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 8 / 100,
    elevation: 1,
    marginTop: mobileW * 5 / 100
  },
  OR_TEXT: {
    color: '#9B9B9B',
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
    textAlign: "center",
    right: mobileW * 1 / 100,
    //     BL =  #121A23
    // White =  #FFFFFF
    // Gray =  #9B9B9B
    // BR =  #EFF2F1
    // BR2 =  #E7E8EA
    // Blue=  #00959E
    // BG =  #FAFAFA
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


// import { View, StatusBar, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert,ScrollView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import React, { useState, useRef, useCallback, useEffect } from 'react'
// import { Colors } from './Provider/Colorsfont';
// import PhoneInput from 'react-native-phone-number-input';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage,Currentltlg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import CountryPicker from "rn-country-picker";
// import NetInfo from '@react-native-community/netinfo';
// import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk'
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
// import LinkedInModal from '@smuxx/react-native-linkedin';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { colors } from 'react-native-elements';
// import {LoginUser} from './App/Firebase/LoginUser';
// import {Firebase} from './App/Firebase/firebaseConfig';
// const Login = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible1, setModalVisible1] = useState(false);
//   const [mobile_number, setValue1] = useState('');
//   const [userInfo, setuserInfo] = useState({});
//   const isLogin = userInfo.name;
//   const [latitude,setlatitude] = useState(config.latitude)
//   const [longitude,setlongitude] = useState(config.longitude)

//   console.log('Tokan',isLogin)


//   useEffect(() => {
//     // getcurrentlatlogn()

//     const unsubscribe = NetInfo.addEventListener((state) => {
//       if (state.isConnected == false) {
//         alert(
//           "Please check your internet connection",
//         );
//       }
//     });
//     return () => {
//       // Unsubscribe to network state updates
//       unsubscribe();
//     };
//   }, []);

//   const Item = () => (
//     <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100}} source={require('./Icon/linkedin.png')}></Image>
//   );

//   // ===================facebook sdk=====================================
//   const  logoutWithFacebook = () => {
//      LoginManager.logOut();
//      setuserInfo({})
//     // alert('Unable to Login with Google Account')
//   };

//   const getInfoFromToken = token => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id,name,first_name,last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       { token, parameters: PROFILE_REQUEST_PARAMS },
//       (error, user) => {
//         if (error) {
//           console.log('login info has error: ' + error);
//         } else {
//           // this.setState({userInfo: user});
//           console.log('result:', user);
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   const loginWithFacebook = () => {
//     console.log(loginWithFacebook,"loginWithFacebook step 1------------------------> ");
//     //  alert('Unable to Login with Google Account')
//     LoginManager.logInWithPermissions(['public_profile']).then(

//       login => {
//         if (login.isCancelled) {
//           console.log('Login cancelled step 2-----------------------------------');
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//             const accessToken = data.accessToken.toString();
//             console.log("accessToken",accessToken);
//             getInfoFromToken(accessToken);
//           });
//         }
//       },
//       error => {
//         console.log('Login fail with error: ' + error);
//       },
//     );

//   };

//   const onPressButton = () => {
//     isLogin
//       ? logoutWithFacebook()
//       : loginWithFacebook();
//     // alert('Unable to Login with Google Account')
//   }

//   // ================google login===============================================
//   GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     hostedDomain: '', // specifies a hosted domain restriction
//     loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//     forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
//     accountName: '', // [Android] specifies an account name on the device that should be used
//     iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   });

//   // const signIn = async () => {
//   //   alert('Unable to Login with Google Account')
//   // }

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       console.log("userInfo111");
//       const userInfo = await GoogleSignin.signIn();
//       console.log(userInfo);
//       // this.setState({ userInfo });
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log("userInfo222");
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log("userInfo333");
//         // operation (f.e. sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log("userInfo444");
//         // play services not available or outdated
//       } else {
//         // some other error happened
//       }
//     }
//   };



//   try {
//     GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // google services are available
//   } catch (err) {
//     console.error('play services are not available');
//   }

//   //-----------------function for get current location--------
//   // const  getcurrentlatlogn = async () => {
//   //     // setModalVisible1(true);
//   //     let data = await Currentltlg.requestLocation()
//   //     let latitude = data.coords.latitude;
//   //     let longitude = data.coords.longitude;
//   //         setlatitude(latitude)
//   //         setlongitude(longitude)
//   //     // if (props.address_arr != 'NA') {
//   //     //     // this.setState({ latitude: latitude, longitude: longitude })
//   //     //     setlatitude(latitude)
//   //     //     setlongitude(longitude)
//   //     //     config.latitude = latitude;
//   //     //     config.longitude = longitude;
//   //     //     console.log('----------------->>>',latitude);
//   //     //     console.log('----------------->>>',longitude);
//   //     // }
//   //     // else {
//   //     //   setlatitude(latitude)
//   //     //   setlongitude(longitude)
//   //     //     // this.setState({ latitude: latitude, longitude: longitude })
//   //     //     config.latitude = latitude;
//   //     //     config.longitude = longitude;
//   //     // }


//   //     consolepro.consolelog('latitude splash', latitude)
//   //     consolepro.consolelog('longitude splash', longitude)
//   // }

//   // ==========================likidin sdk========================

//   const _loginBtn = () => {


//     //  if (mobile_number.length <= 0) {
//     //      msgProvider.toast(msgText.emptyMobile[config.language], 'center')
//     //      return false
//     //    }
//     //    if (mobile_number.length < 7) {
//     //      msgProvider.toast(msgText.mobileMinLength[config.language], 'center')
//     //      return false
//     //    }
//     //    if (mobile_number.length > 15) {
//     //      msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
//     //      return false
//     //    }


//     if (mobile_number.length <= 9) {
//       setModalVisible(true);
//       return false
//     }

//     setModalVisible1(true);

//     var data = JSON.stringify({
//       countryCode: countryCode,
//       emailMobile: mobile_number
//      });

//     var config1 = {
//       method: 'post',
//       url: config.baseURL + 'user/loginotp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };

//     axios(config1)
//       .then(async (response) => {
//         console.log('response is arriwal =======================', response.data)
//         console.log((response.data));
//         var user_arr = response.data.data;
//         var IsScucceded = response.data.ErrorCode;
//         var ErrorMessage = response.data.ErrorMessage;
//         console.log('------------ userrr_arrauy', user_arr)
//         if (IsScucceded == 200) {
//            setModalVisible1(false);
//           // await localStorage.setItemObject('user_arr', user_arr);
//           //  alert(ErrorMessage)
//           setTimeout(() => {
//             // LogintoFirebase()
//             navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
//           }, 1000);
//         }
//         else {
//           setModalVisible1(false);
//           alert(ErrorMessage)
//           // msgProvider.toast(msgText.ErrorMessage[config1.language], 'center')
//         }
//       })
//       .catch((error)=> {
//         alert(error)
//         setModalVisible1(false);
//         console.log('i am in errror ');
//       });
//   }

//   const [countryCode, setCountryCode] = useState("91");
//   const selectedValue = (value) => {
//     setCountryCode(value);
//   };


// // const LogintoFirebase = async () => {
// // LoginUser(mobile_number,'123456')
// // .then(async (res) => {
// // //  console.log('---res-->',res);
// // console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!',res.user.uid);
// // // const uid = Firebase.auth().currentUser.uid;
// // const uid = res.user.uid;
// // // const fcmToken = Firebase.auth().currentUser.fcmToken;
// // console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
// // await AsyncStorage.setItem('UID', uid);

// // //  await AsyncStorage.setItem('Token', fcmToken);
// //  navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
// // // navigation.navigate('Dashboard');
// // }).
// // catch((err) => {
// // alert(err);
// // })
// // }

//   return (
//         <View style={styles.Top_View}>
//         {/* <KeyboardAwareScroll> */}
//         <SafeAreaView style={styles.SafeAreaView}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
//         <ScrollView>
//                 {/* ------------------> header <---------------- */}
//                <View style={styles.header_view}>
//                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//                <Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/bk.png")}></Image>
//                </TouchableOpacity>
//                {/* onPress={() => navigation.navigate('Chatbots')} */}
//                 <TouchableOpacity style={styles.mavenow_Logo} activeOpacity={0.8}>
//                 <Image style={styles.mavenowLogo} resizeMode='contain'source={require("./Icon/new_logo_mavenow.png")}></Image>
//                 </TouchableOpacity>
//                 <View style={{ alignItems: 'center' ,marginTop: mobileW * 4 / 100 }}>
//                 <Text style={styles.loginText}>{Lang_chg.LoginTxt[config.language]}</Text>
//                 </View>
//                 </View>
//                {/* ------------------> header <---------------- */}
//                <View style={styles.cardView}>
//                <Text style={styles.topText}>{Lang_chg.LoginAccountTxt[config.language]}</Text>
//                {/* <Text style={styles.topText}>LoginAccountTxtt</Text> */}

//             {/* ======================================= country picker ===================================== */}
//             <View style={styles.phoneView}>
//             <CountryPicker
//                 disable={false}
//                 animationType={"slide"}
//                 language="en"
//                 containerStyle={styles.pickerStyle}
//                 pickerTitleStyle={styles.pickerTitleStyle}
//                 selectedCountryTextStyle={styles.selectedCountryTextStyle}
//                 countryNameTextStyle={styles.countryNameTextStyle}
//                 pickerTitle={"Country Picker"}
//                 searchBarPlaceHolder={"Search......"}
//                 hideCountryFlag={false}
//                 hideCountryCode={false}
//                 searchBarStyle={styles.searchBarStyle}
//                 countryCode={countryCode}
//                 selectedValue={selectedValue}/>
//               <TextInput
//                 style={styles.input}
//                 placeholderTextColor={Colors.gray}
//                 onChangeText={(text) => {
//                   setValue1(text);
//                 }}
//                 placeholder="Email / mobile number"/>
//             </View>
//             {/* ======================================= Login Button ===================================== */}

//             {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {LogintoFirebase()}} style={styles.LoginView}> */}
//             <TouchableOpacity activeOpacity={0.8} onPress={() => { _loginBtn() }} style={styles.LoginView}>
//             {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {LogintoFirebase()}} style={styles.LoginView}> */}
//             <Text style={styles.LOGIN_TEXT}>{Lang_chg.LOGINbtnTxt[config.language]}</Text>
//             </TouchableOpacity>

//             {/* ======================================= Socialmedia ===================================== */}
//               <View style={styles.socialmediacardView}>
//               <View style={styles.socialmediaView}>
//               <TouchableOpacity onPress={() => onPressButton()} activeOpacity={0.8}>
//               <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/facebook.png')}></Image>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => signIn()} activeOpacity={0.8}>
//               <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/icon_google.png')}></Image>
//               </TouchableOpacity>
//                 {/* ----------- Linked In Login ---------- */}
//                 <LinkedInModal
//                   clientID="78r9l9cv5xw11h"
//                   clientSecret="t81o7kUxW0cUn5gU"
//                   redirectUri="https://mavenow.com"
//                   onSuccess={token => console.log(JSON.stringify(token, null, 2))}
//                   renderButton={() => <Item />} />
//               </View>
//               </View>
//               <View style={styles.bottom_view}>
//               <Text style={styles.OR_TEXT}>{Lang_chg.ORTxt[config.language]}</Text>
//               <TouchableOpacity style={styles.Signup_navigate} activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
//               <Text style={styles.crteate_txt}>{Lang_chg.newAccountTxt[config.language]}</Text>
//               </TouchableOpacity>
//               </View>

//       {/* ----------- Modal ----------- */}
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible1}
//               onRequestClose={() => {
//               setModalVisible1(!modalVisible1); }}>
//                  <View style={styles.gif_VIEW}>
//                  <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>

//               </View>
//               </Modal>
//               </View>
//       {/* ----------- Modal ----------- */}

//             <View>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={() => {
//                 setModalVisible(!modalVisible);
//               }}>
//                <View style={styles.validation_view}>
//                 <View style={styles.modalHeaderView}>
//                 <Text style={styles.error_txt}>Error</Text>
//                 </View>
//                 <View style={styles.modalWhiteCard}>
//                  <Text style={styles.errorMassege}>Please Insert Email/mobile number.</Text>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)} style={styles.modalButton}>
//                 <Text style={styles.Text_OK}>OK</Text>
//                 </TouchableOpacity>
//                 </View>
//                 </View>
//                 </Modal>
//                 </View>
//                 {/* --------- Modal ----------- */}

//                </ScrollView>
//              </SafeAreaView>
//       {/* </KeyboardAwareScroll> */}
//     </View>

//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   Top_View:{ flex: 1,
//      backgroundColor: Colors.themecolor
//      },
//   backIcon: {
//     width: mobileW * 10 / 100,
//     height: mobileW * 10/ 100,
//     tintColor: Colors.white_color,
//     margin:mobileW*-2/100
//   },
//   mavenow_Logo:{
//      marginTop: mobileW * 1 / 100
// },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 18 / 100,
//     alignSelf: 'center',
//   },
//   Gif_image:{ width: mobileW * 25 / 100,
//    height: mobileW * 12 / 100
//    },
//   input: {
//     height: mobileW * 12.8/ 100,
//     color: Colors.black_color,
//     width: mobileW * 57 / 100,
//     backgroundColor: Colors.white_color,
//     borderTopRightRadius: mobileW * 2 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     paddingRight: mobileW * 4 / 100,
//     fontFamily:Font.FontRegular,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   loginText: {
//     fontSize: mobileW *  5 / 100,
//     color: Colors.black_color,
//     fontWeight: '500',
//     // marginTop: mobileW * 1 / 100
//   },
//   cardView: {
//     width: mobileW,
//     height: mobileH * 78 / 100,
//     backgroundColor: Colors.whiteColor,
//     // paddingLeft: mobileW * 6.5/ 100,
//     // paddingRight: mobileW * 6.5/ 100,
//     borderTopLeftRadius: mobileW * 10 / 100,
//   },
//   topText: {
//     alignSelf: 'center',
//     fontSize: mobileW * 3.4/ 100,
//     color: Colors.gray,
//     marginTop: mobileW * 3/ 100,
//   fontFamily:Font.FontMedium
//  },

//   validation_view:{
//     flex:1,
//     justifyContent:"center",
//     alignItems:"center",
//     backgroundColor:"#00000090"
//   },

//   phoneView: {
//     backgroundColor: Colors.white_color,
//     marginLeft:mobileW*6.5/100,
//     marginRight:mobileW*6.5/100,
//     borderRadius: mobileW * 3/ 100,
//     flexDirection: 'row',
//     marginTop: mobileW * 10 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     // borderColor: "#e8edfb",
//      borderColor: Colors.lightgray,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     borderWidth:mobileW*0.4/100

//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft:mobileW*6.5/100,
//     marginRight:mobileW*6.5/100,
//     height: mobileW * 12.8/ 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileW * 10 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 0,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   socialmediacardView: {
//     width: mobileW * 60 / 100,
//     height: mobileW * 14 / 100,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     padding: mobileW * 2 / 100,
//     marginTop: mobileW * 5 / 100,
//   },
//   socialmediaView: {
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   modalHeaderView: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 80/ 100,
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalWhiteCard: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 1 / 100,
//     padding: mobileW * 3 / 100,
//     width: mobileW * 80 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100,
//   },
//   errorMassege: {
//     textAlign: "center",
//     color: Colors.blackColor,
//     padding: mobileW * 2 / 100,
//     fontSize: mobileW * 3.5 / 100
//   },
//   modalButton: {
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 2 / 100,
//     width: mobileW * 20 / 100,
//     height: mobileW * 8 / 100,
//     alignSelf: "center",
//     justifyContent: 'center',
//     marginTop: mobileW * 2 / 100
//   },
//   // *************
//   pickerTitleStyle: {
//     justifyContent: "center",
//     flexDirection: "row",
//     alignSelf: "center",
//     fontWeight: "bold",
//   },
//   pickerStyle: {
//     height: mobileW * 14/ 100,
//     width: mobileW * 23 / 100,
//     alignItems: "center",
//     justifyContent: 'center',
//     backgroundColor: "white",
//     // borderTopLeftRadius: mobileW * 2 / 100,
//     // borderBottomLeftRadius: mobileW * 2 / 100,
//     fontSize: 16,
//     color: "#000",
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     borderRadius:mobileW*4/100

//   },
//   selectedCountryTextStyle: {
//     paddingLeft: mobileW * 1 / 100,
//     // color: "#000",
//     color: "#000",
//     textAlign: "right",
//   },
//   countryNameTextStyle: {
//     paddingLeft: mobileW * 2 / 100,
//     color: "#000",
//     textAlign: "right",
//   },
//   searchBarStyle: {
//     flex: 1,
//   },
//   gif_VIEW:{ flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//      backgroundColor: '#00000096'
//      },
//   social_image:{
//     width: mobileW * 9 / 100,
//    height: mobileW * 9 / 100,
//   },
//   LOGIN_TEXT:{
//      fontSize: mobileW * 4.6 / 100,
//       color: Colors.white_color,
//        fontFamily:Font.FontMedium},
//   error_txt:{
//     color: Colors.white_color,
//     fontSize: mobileW * 4 / 100,
// fontFamily:Font.FontSemiBold
//    },
//   crteate_txt:{
//     color: Colors.themecolor,
//     fontSize: mobileW *3.4 / 100 ,
//     fontFamily:Font.FontMedium
//   },
//   header_view:{
//     width: mobileW,
//     height: mobileH * 23.5 / 100,
//      padding: mobileW * 3 / 100
//     },
//   SafeAreaView:{
//     flex: 0,
//     backgroundColor: Colors.themecolor
//   },
//   Text_OK:{
//     color: Colors.white_color,
//     fontSize: mobileW * 3 / 100,
//     textAlign: "center" ,
//     fontFamily:Font.FontMedium
//   },
//   Signup_navigate:{
//     alignItems: 'center',
//     marginTop: mobileW * 2 / 100
//   },
//   OR_TEXT:{
//     color: Colors.gray,
//     fontFamily:Font.FontMedium,
//     fontSize: mobileW * 3.5 / 100
//   },
//   bottom_view:{
//     alignItems: 'center',
//     marginTop: mobileW * 2 / 100
//   },
// })

// export default Login




// ===============/ 2 nd
// import { View, StatusBar, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import React, { useState, useRef, useCallback, useEffect } from 'react'
// import { Colors } from './Provider/Colorsfont';
// import PhoneInput from 'react-native-phone-number-input';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, Currentltlg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import CountryPicker from "rn-country-picker";
// import NetInfo from '@react-native-community/netinfo';
// import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk'
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
// import LinkedInModal from '@smuxx/react-native-linkedin';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { colors } from 'react-native-elements';
// import { LoginUser } from './App/Firebase/LoginUser';
// import { Firebase } from './App/Firebase/firebaseConfig';
// const Login = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible1, setModalVisible1] = useState(false);
//   const [mobile_number, setValue1] = useState('');
//   const [userInfo, setuserInfo] = useState({});
//   const isLogin = userInfo.name;
//   const [latitude, setlatitude] = useState(config.latitude)
//   const [longitude, setlongitude] = useState(config.longitude)

//   console.log('Tokan', isLogin)


//   useEffect(() => {
//     // getcurrentlatlogn()

//     const unsubscribe = NetInfo.addEventListener((state) => {
//       if (state.isConnected == false) {
//         alert(
//           "Please check your internet connection",
//         );
//       }
//     });
//     return () => {
//       // Unsubscribe to network state updates
//       unsubscribe();
//     };
//   }, []);

//   const Item = () => (
//     <Image resizeMode='contain' style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100 }} source={require('./Icon/Linkdinlogo.png')}></Image>
//   );

//   // ===================facebook sdk=====================================
//   const logoutWithFacebook = () => {
//     LoginManager.logOut();
//     setuserInfo({})
//     // alert('Unable to Login with Google Account')
//   };

//   const getInfoFromToken = token => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id,name,first_name,last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       { token, parameters: PROFILE_REQUEST_PARAMS },
//       (error, user) => {
//         if (error) {
//           console.log('login info has error: ' + error);
//         } else {
//           // this.setState({userInfo: user});
//           console.log('result:', user);
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   const loginWithFacebook = () => {
//     console.log(loginWithFacebook, "loginWithFacebook step 1------------------------> ");
//     //  alert('Unable to Login with Google Account')
//     // // Attempt a login using the Facebook login dialog asking for default permissions.
//     LoginManager.logInWithPermissions(['public_profile']).then(

//       login => {
//         if (login.isCancelled) {
//           console.log('Login cancelled step 2-----------------------------------');
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//             const accessToken = data.accessToken.toString();
//             console.log("accessToken", accessToken);
//             getInfoFromToken(accessToken);
//           });
//         }
//       },
//       error => {
//         console.log('Login fail with error: ' + error);
//       },
//     );

//   };

//   const onPressButton = () => {
//     isLogin
//       ? logoutWithFacebook()
//       : loginWithFacebook();
//     // alert('Unable to Login with Google Account')
//   }

//   // ================google login===============================================
//   GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     hostedDomain: '', // specifies a hosted domain restriction
//     loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//     forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
//     accountName: '', // [Android] specifies an account name on the device that should be used
//     iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   });

//   // const signIn = async () => {
//   //   alert('Unable to Login with Google Account')
//   // }

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       console.log("userInfo111");
//       const userInfo = await GoogleSignin.signIn();
//       console.log(userInfo);
//       // this.setState({ userInfo });
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log("userInfo222");
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log("userInfo333");
//         // operation (f.e. sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log("userInfo444");
//         // play services not available or outdated
//       } else {
//         // some other error happened
//       }
//     }
//   };



//   try {
//     GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // google services are available
//   } catch (err) {
//     console.error('play services are not available');
//   }

//   //-----------------function for get current location--------
//   // const  getcurrentlatlogn = async () => {
//   //     // setModalVisible1(true);
//   //     let data = await Currentltlg.requestLocation()
//   //     let latitude = data.coords.latitude;
//   //     let longitude = data.coords.longitude;
//   //         setlatitude(latitude)
//   //         setlongitude(longitude)
//   //     // if (props.address_arr != 'NA') {
//   //     //     // this.setState({ latitude: latitude, longitude: longitude })
//   //     //     setlatitude(latitude)
//   //     //     setlongitude(longitude)
//   //     //     config.latitude = latitude;
//   //     //     config.longitude = longitude;
//   //     //     console.log('----------------->>>',latitude);
//   //     //     console.log('----------------->>>',longitude);
//   //     // }
//   //     // else {
//   //     //   setlatitude(latitude)
//   //     //   setlongitude(longitude)
//   //     //     // this.setState({ latitude: latitude, longitude: longitude })
//   //     //     config.latitude = latitude;
//   //     //     config.longitude = longitude;
//   //     // }


//   //     consolepro.consolelog('latitude splash', latitude)
//   //     consolepro.consolelog('longitude splash', longitude)
//   // }

//   // ==========================likidin sdk========================

//   const _loginBtn = () => {


//     //  if (mobile_number.length <= 0) {
//     //      msgProvider.toast(msgText.emptyMobile[config.language], 'center')
//     //      return false
//     //    }
//     //    if (mobile_number.length < 7) {
//     //      msgProvider.toast(msgText.mobileMinLength[config.language], 'center')
//     //      return false
//     //    }
//     //    if (mobile_number.length > 15) {
//     //      msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
//     //      return false
//     //    }


//     if (mobile_number.length <= 9) {
//       setModalVisible(true);
//       return false
//     }

//     setModalVisible1(true);

//     var data = JSON.stringify({
//       countryCode: countryCode,
//       emailMobile: mobile_number
//     });

//     var config1 = {
//       method: 'post',
//       url: config.baseURL + 'user/loginotp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };

//     axios(config1)
//       .then(async (response) => {
//         console.log('response is arriwal =======================', response.data)
//         console.log((response.data));
//         var user_arr = response.data.data;
//         var IsScucceded = response.data.ErrorCode;
//         var ErrorMessage = response.data.ErrorMessage;
//         console.log('------------ userrr_arrauy', user_arr)
//         if (IsScucceded == 200) {
//           setModalVisible1(false);
//           // await localStorage.setItemObject('user_arr', user_arr);
//           //  alert(ErrorMessage)
//           setTimeout(() => {
//             // LogintoFirebase()
//             navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: " ", isLoginScreen: true, countryCode: countryCode })
//           }, 1000);
//         }
//         else {
//           setModalVisible1(false);
//           alert(ErrorMessage)
//           // msgProvider.toast(msgText.ErrorMessage[config1.language], 'center')
//         }
//       })
//       .catch((error) => {
//         alert(error)
//         setModalVisible1(false);
//         console.log('i am in errror ');
//       });
//   }

//   const [countryCode, setCountryCode] = useState("91");
//   const selectedValue = (value) => {
//     setCountryCode(value);
//   };


//   // const LogintoFirebase = async () => {
//   // LoginUser(mobile_number,'123456')
//   // .then(async (res) => {
//   // //  console.log('---res-->',res);
//   // console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!',res.user.uid);
//   // // const uid = Firebase.auth().currentUser.uid;
//   // const uid = res.user.uid;
//   // // const fcmToken = Firebase.auth().currentUser.fcmToken;
//   // console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
//   // await AsyncStorage.setItem('UID', uid);

//   // //  await AsyncStorage.setItem('Token', fcmToken);
//   //  navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
//   // // navigation.navigate('Dashboard');
//   // }).
//   // catch((err) => {
//   // alert(err);
//   // })
//   // }

//   return (
//     <View style={styles.Top_View}>
//       <ScrollView>
//         <TouchableOpacity style={styles.mavenow_Logo} activeOpacity={0.8}>
//           <Image style={styles.mavenowLogo} resizeMode='contain' source={require("./Icon/new_logo_blue_mavenow.png")}></Image>
//         </TouchableOpacity>
//         <View style={styles.top_TExt}>
//           <Text style={styles.loginText}>{Lang_chg.LoginTxt[config.language]}</Text>
//           <Text style={styles.topText}>{Lang_chg.LoginAccountTxt[config.language]}</Text>
//         </View>

//         {/* ======================================= country picker ===================================== */}
//         <View style={styles.phoneView}>
//           <CountryPicker
//             disable={false}
//             animationType={"slide"}
//             language="en"
//             containerStyle={styles.pickerStyle}
//             pickerTitleStyle={styles.pickerTitleStyle}
//             selectedCountryTextStyle={styles.selectedCountryTextStyle}
//             countryNameTextStyle={styles.countryNameTextStyle}
//             pickerTitle={"Country Picker"}
//             searchBarPlaceHolder={"Search......"}
//             hideCountryFlag={false}
//             hideCountryCode={false}
//             searchBarStyle={styles.searchBarStyle}
//             countryCode={countryCode}
//             selectedValue={selectedValue} />
//           <TextInput
//             style={styles.input}
//             placeholderTextColor={Colors.gray}
//             onChangeText={(text) => {
//               setValue1(text);
//             }}
//             placeholder="Email / mobile number" />
//         </View>
//         {/* ======================================= Login Button ===================================== */}

//         {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {LogintoFirebase()}} style={styles.LoginView}> */}
//         <TouchableOpacity activeOpacity={0.8} onPress={() => { _loginBtn() }} style={styles.LoginView}>
//           {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {LogintoFirebase()}} style={styles.LoginView}> */}
//           <Text style={styles.LOGIN_TEXT}>{Lang_chg.LOGINbtnTxt[config.language]}</Text>
//         </TouchableOpacity>

//         {/* ======================================= Socialmedia ===================================== */}
//         <View style={styles.socialmediacardView}>
//           <View style={styles.socialmediaView}>
//             <TouchableOpacity onPress={() => onPressButton()} activeOpacity={0.8}>
//               <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/Facebooklogo.png')}></Image>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => signIn()} activeOpacity={0.8}>
//               <Image resizeMode='contain' style={styles.social_image} source={require('./Icon/Googlelogo.png')}></Image>
//             </TouchableOpacity>
//             {/* ----------- Linked In Login ---------- */}
//             <LinkedInModal
//               clientID="78r9l9cv5xw11h"
//               clientSecret="t81o7kUxW0cUn5gU"
//               redirectUri="https://mavenow.com"
//               onSuccess={token => console.log(JSON.stringify(token, null, 2))}
//               renderButton={() => <Item />} />
//           </View>
//         </View>
//         <View style={styles.bottom_view}>

//           <View style={{ flexDirection: 'row' }}>
//             <View style={styles.line__}></View>
//             <View style={styles.OrtxtCard}>
//               <Text style={styles.OR_TEXT}>{Lang_chg.ORTxt[config.language]}</Text>
//             </View>
//             <View style={styles.line__}></View>
//           </View>


//           <View style={styles.Signup_navigate} activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
//             <Text style={styles.crteate_txt}>{Lang_chg.newAccountTxt[config.language]}</Text>
//             <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Msignup')}>
//               <Text style={styles.click_TEXT}>{Lang_chg.clickhere[config.language]}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* ----------- Modal ----------- */}
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible1}
//           onRequestClose={() => {
//             setModalVisible1(!modalVisible1);
//           }}>
//           <View style={styles.gif_VIEW}>
//             <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>

//           </View>
//         </Modal>

//         {/* ----------- Modal ----------- */}

//         <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               setModalVisible(!modalVisible);
//             }}>
//             <View style={styles.validation_view}>
//               <View style={styles.modalHeaderView}>
//                 <Text style={styles.error_txt}>Error</Text>
//               </View>
//               <View style={styles.modalWhiteCard}>
//                 <Text style={styles.errorMassege}>Please Insert Email/mobile number.</Text>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)} style={styles.modalButton}>
//                   <Text style={styles.Text_OK}>OK</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </View>
//         {/* --------- Modal ----------- */}

//       </ScrollView>


//     </View>

//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   click_TEXT: {
//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontMedium,
//     marginHorizontal: mobileW * 1 / 100
//   },
//   Top_View: {
//     flex: 1,
//   },

//   mavenow_Logo: {
//     marginTop: mobileW * 35 / 100,
//   },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 14 / 100,
//     alignSelf: 'center',
//     // tintColor:Colors.themecolor
//   },
//   line__: {
//     borderBottomWidth: mobileW * 0.1 / 100,
//     borderColor: Colors.light_grey,
//     marginTop:mobileW*5/100,
//     width: mobileW * 28 / 100,
//     height: mobileW * 0.1 / 100,
//     alignSelf: "center",
//     fontFamily: Font.FontRegular

//   },
//   Gif_image: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100
//   },
//   input: {
//     height: mobileW * 12.8 / 100,
//     color: Colors.gray,
//     width: mobileW * 57 / 100,
//     // backgroundColor: Colors.white_color,
//     // borderTopRightRadius: mobileW * 2 / 100,
//     // borderBottomRightRadius: mobileW * 2 / 100,
//     paddingRight: mobileW * 4 / 100,
//     fontFamily: Font.FontRegular,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,

//   },
//   loginText: {
//     fontSize: mobileW * 4.5 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontBold
//     // marginTop: mobileW * 1 / 100
//   },
//   cardView: {
//     width: mobileW,
//     height: mobileH * 78 / 100,
//     backgroundColor: Colors.whiteColor,
//     borderTopLeftRadius: mobileW * 10 / 100,
//   },
//   topText: {

//     fontSize: mobileW * 3.5 / 100,
//     color: Colors.dark,
//     marginTop: mobileW * 1.5 / 100,
//     fontFamily: Font.FontRegular
//   },

//   validation_view: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#00000090"
//   },

//   phoneView: {
//     // backgroundColor: Colors.white_color,
//     marginLeft: mobileW * 7.5 / 100,
//     marginRight: mobileW * 7.5 / 100,
//     borderRadius: mobileW * 0 / 100,
//     flexDirection: 'row',
//     marginTop: mobileW * 6 / 100,
//     // elevation: 1,
//     shadowColor: '#000',
//     // borderColor: "#e8edfb",
//     //  borderColor: Colors.lightgray,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     borderBottomWidth: mobileW * 0.1 / 100,
//     borderColor: Colors.gray
//     // borderWidth:mobileW*0.4/100

//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: mobileW * 6.5 / 100,
//     marginRight: mobileW * 6.5 / 100,
//     height: mobileW * 12.8 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 1 / 100,
//     marginTop: mobileW * 8 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 0,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   socialmediacardView: {
//     width: mobileW * 60 / 100,
//     height: mobileW * 14 / 100,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     padding: mobileW * 2 / 100,
//     marginTop: mobileW * 2 / 100,
//   },
//   socialmediaView: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly'
//   },
//   modalHeaderView: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 80 / 100,
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalWhiteCard: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 1 / 100,
//     padding: mobileW * 3 / 100,
//     width: mobileW * 80 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100,
//   },
//   errorMassege: {
//     textAlign: "center",
//     color: Colors.blackColor,
//     padding: mobileW * 2 / 100,
//     fontSize: mobileW * 3.5 / 100
//   },
//   modalButton: {
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 2 / 100,
//     width: mobileW * 20 / 100,
//     height: mobileW * 8 / 100,
//     alignSelf: "center",
//     justifyContent: 'center',
//     marginTop: mobileW * 2 / 100
//   },
//   // *************
//   pickerTitleStyle: {
//     justifyContent: "center",
//     flexDirection: "row",
//     alignSelf: "center",
//     fontWeight: "bold",
//   },
//   pickerStyle: {
//     height: mobileW * 14 / 100,
//     width: mobileW * 23 / 100,
//     alignItems: "center",
//     justifyContent: 'center',
//     // backgroundColor: "red",
//     // borderTopLeftRadius: mobileW * 2 / 100,
//     // borderBottomLeftRadius: mobileW * 2 / 100,
//     fontSize: 16,
//     color: "#000",
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     // borderRadius:mobileW*4/100

//   },
//   selectedCountryTextStyle: {
//     paddingLeft: mobileW * 1 / 100,
//     // color: "#000",
//     color: "#000",
//     textAlign: "right",
//   },
//   countryNameTextStyle: {
//     paddingLeft: mobileW * 2 / 100,
//     color: "#000",
//     textAlign: "right",
//   },
//   searchBarStyle: {
//     flex: 1,
//   },
//   gif_VIEW: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00000096'
//   },
//   social_image: {
//     width: mobileW * 10 / 100,
//     height: mobileW * 10 / 100,
//   },
//   LOGIN_TEXT: {
//     fontSize: mobileW * 4.3 / 100,
//     color: Colors.white_color,
//     fontFamily: Font.FontSemiBold
//   },
//   error_txt: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4 / 100,
//     fontFamily: Font.FontSemiBold
//   },
//   crteate_txt: {
//     color: Colors.gray,
//     fontSize: mobileW * 3.4 / 100,
//     fontFamily: Font.FontRegular
//   },
//   header_view: {
//     width: mobileW,
//     height: mobileH * 23.5 / 100,
//     padding: mobileW * 3 / 100
//   },
//   SafeAreaView: {
//     flex: 0,
//     backgroundColor: Colors.themecolor
//   },
//   Text_OK: {
//     color: Colors.white_color,
//     fontSize: mobileW * 3 / 100,
//     textAlign: "center",
//     fontFamily: Font.FontMedium
//   },
//   Signup_navigate: {
//     alignItems: 'center',
//     marginTop: mobileW * 7 / 100,
//     flexDirection: "row"
//   },
//   OrtxtCard: {
//     width: mobileW * 8 / 100,
//     height: mobileW * 8 / 100,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     backgroundColor: Colors.white_color,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 8 / 100,
//     elevation: 1,
//     marginTop:mobileW*5/100
//   },
//   OR_TEXT: {
//     color: Colors.gray,
//     fontFamily: Font.FontMedium,
//     fontSize: mobileW * 4 / 100,
//     textAlign: "center",
//     padding: mobileW * 0.1 / 100
//   },
//   bottom_view: {
//     alignItems: 'center',
//     marginTop: mobileW * 2 / 100
//   },
//   top_TExt: {
//     marginTop: mobileW * 17 / 100,
//     marginHorizontal: mobileW * 8 / 100

//   }
// })

// export default Login

