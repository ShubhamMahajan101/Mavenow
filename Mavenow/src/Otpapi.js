// // ====== 3rd without api 
// import { View, Text, StatusBar, Modal, Alert, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors } from './Provider/Colorsfont';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
// import CountDownTimer from 'react-native-countdown-timer-hooks';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { localStorage } from './Provider/utilslib/Utils';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import axios from "axios"
// import { log } from 'react-native-reanimated';
// import { TextInput } from 'react-native-gesture-handler';
// import DeviceInfo from 'react-native-device-info';

//   const VerificationCode = ({ navigation, route }) => {
//  // --------------------------- H E R E  IS  S T A T E ----------
//   const refTimer = useRef();
//   const [timerEnd, setTimerEnd] = useState(false);
//   const [OTP, setOTP] = useState('');
//   const [DeviceId, setDeviceId] = useState('');
//   const [modalVisible1, setModalVisible1] = useState(false);

 

//   // ................................................................................................. POST API .................................................
//   const _VerifyOtp = () => {
//                     // navigation.navigate('UserMaven')

//     if (OTP.length <= 0) {
//       msgProvider.toast(msgText.emptyotp[config.language], 'center')
//       return false
//     }
//     if (OTP.length > 4) {
//       msgProvider.toast(msgText.Invalid[config.language], 'center')
//       return false
//     }
//     setModalVisible1(true)

  
//     setTimeout(() => {
//       navigation.navigate('UserMaven')
//       setModalVisible1(false)
//     }, 2000);

// }

  


//   const timerCallbackFunc = (timerFlag) => {
//     setTimeout(() => {
//       setTimerEnd(timerFlag);
//     }, 1000);
//     setTimerEnd(timerFlag);
//     console.warn( 'You can alert the user by letting him know that Timer is out.',);
//      };
//     //  ------------------------- >-->!-->! resend otp 

//     const resend_otp = () =>{
//       // msgProvider.toast(msgText.resendotp[config.language],'center')
//           setTimerEnd(false); refTimer.current.resetTimer();
//     }
    

// return (

//                 <View style={{ flex: 1, backgroundColor:Colors.white_color}}>
//                 <SafeAreaView style={styles.SafeAreaView}>
//                  <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
//                  <View style={{width:mobileW, height:mobileW*15/100, justifyContent:'center', paddingHorizontal:mobileW*6/100}}>

//                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//                <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
//                </TouchableOpacity>
//                </View>
           
           
//              <View style={{justifyContent:'center',alignSelf:'center',marginTop:mobileW*12/100}}>
//              <Text style={styles.loginText}>{Lang_chg.VerificationCodeTxt[config.language]}</Text>
//              <Text style={styles.topText}>{Lang_chg.typeCodeTxt[config.language]}</Text> 
//              </View>
//              {/* ===========>  OTP VERIFICATION  */}
//              <View style={{   alignItems:"center",}}>
//              <OTPInputView
//               style={styles.otp_view}
//               pinCount={4}
//               autoFocusOnLoad={false}
//               codeInputFieldStyle={styles.underlineStyleBase}
//               codeInputHighlightStyle={styles.underlineStyleHighLighted}
//               onCodeFilled={(code => setOTP(code))}/>
//               </View>
//           {/* =========> VERIFY OTP Button  */}
//           <TouchableOpacity activeOpacity={0.8} onPress={() => { _VerifyOtp() }} style={styles.LoginView}>
//           <Text style={styles.verifyotp_text}>{Lang_chg.VerifyOtpBtn[config.language]}</Text>
//           </TouchableOpacity>
//           <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center', display: timerEnd ? 'none' : 'flex' }}>
//           <Text style={styles.remaining_text}>{Lang_chg.RemainingTxt[config.language]} </Text>

//             {/* ==================> Time CountDownTimer */}
//               <View>
//               <CountDownTimer
//                 ref={refTimer}
//                 timestamp={30}
//                 timerCallback={timerCallbackFunc}
//                 containerStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 35, color: "black" }} textStyle={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.25, }} />
//                 </View>
//                  </View>
//                   <View style={{display: timerEnd ? 'flex' : 'none', marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center',}}>
//                   <TouchableOpacity onPress={() => { resend_otp() }}>
//                   {/* <TouchableOpacity > */}
//                    <Text style={styles.resendotp_txt}>{Lang_chg.ResendOtpTxt[config.language]}</Text>
//                    </TouchableOpacity>
//            </View>
//            <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible1}
//             onRequestClose={() => {setModalVisible1(!modalVisible1);}}>
//             {/* <View style={{ flex: 1, width: mobileW * 88 / 100, height: mobileW * 18 / 100, justifyContent: "center", alignSelf: "center" }}> */}
//             <View style={styles.gif_view}>
//              <Image style={styles.gif_image}source={require("./Icon/neighcoach_loader.gif")}></Image>
//                </View>
//                 </Modal>
                 
//                  </SafeAreaView>
//                  </View>


//   )
//           }

// export default VerificationCode
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   otp_view: {
//     width: '75%',
//     height: mobileW * 30 / 100,

   
//   },
//   verifyotp_text: {
//     fontSize: mobileW * 4 / 100,
//       color: Colors.white_color,
//     fontFamily:Font.FontSemiBold
//   },
//   backIcon: {
//     width: mobileW * 3 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_: {
//     width: mobileW * 6/ 100,
//     height: mobileW * 6/ 100,
// },
//   gif_view: {
//     flex: 1, alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00000096'
//   },
//   gif_image: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100
//   },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 18 / 100,
//     alignSelf: 'center',
//     marginTop:mobileW*3/100,
//   },
//   loginText: {
//     fontSize: mobileW * 4.2/ 100,
//     color: Colors.black_color,
//     fontFamily:Font.FontMedium,
//     marginTop: mobileW * 2 / 100,
//     alignSelf:"center"
//   },
//   cardView: {
//     width: mobileW,
//     height: "77%",
//     backgroundColor: Colors.whiteColor,
//     paddingLeft: mobileW * 8 / 100,
//     paddingRight: mobileW * 8 / 100,
//     borderTopLeftRadius: mobileW * 10 / 100
//   },
//   remaining_text: {
//     color: Colors.gray, 
//     fontFamily:Font.FontRegular,
//     fontSize:mobileW*3/100
//   },
//   topText: {
//     fontSize: mobileW * 3.2/ 100,
//     color: Colors.gray,
//    fontFamily:Font.FontRegular
//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 12.6 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 1 / 100,
//     // marginTop: mobileW * 2 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     width:mobileW*88/100,
//     alignSelf:"center"
//   },
//   underlineStyleBase: {
//     width: mobileW * 13/ 100,
//     height: mobileW * 12.8 / 100,
//     borderRadius: mobileW * 3/ 100,
//     fontFamily:Font.FontRegular,
//     color: Colors.black_color,
//     backgroundColor:'#EFF2F1',
//     fontSize:mobileW*5/100,
//     fontFamily:Font.FontBold,

   
  
    
//     },
//   underlineStyleHighLighted: {
//     // borderColor: Colors.themecolor,
//     // elevation:5, backgroundColor:"white"
//   },
//   SafeAreaView: { 
//     flex: 1, 
//     backgroundColor: Colors.white_color 
//   },
//   backicon_touch: { width: mobileW, height: "23%", padding: mobileW * 3 / 100, },
//   resendotp_txt: { 
//     fontSize: mobileW * 3.5 / 100, 
//     color: Colors.themecolor, 
//     fontWeight: "500", 
//     marginTop: mobileW * 0.7 / 100 ,
//     fontFamily:Font.FontRegular
//   },

// })




// ====== 3rd with api code 
import { View, Text, StatusBar, Modal, Alert, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CountDownTimer from 'react-native-countdown-timer-hooks';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorage } from './Provider/utilslib/Utils';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import axios from "axios"
import { log } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';

  const VerificationCode = ({ navigation, route }) => {
  const user_mobile = route.params.mobile_number
  const dataTOSend = route.params.dataTOSend
  const countryCode = route.params.countryCode

  const isLoginScreen = route.params.isLoginScreen
// {mobile_number:mobile_number, dataTOSend: dataTOSendToNextPage ,isLoginScreen :false }

 console.log(user_mobile, "=======> user_mobilecountryCode ");
 console.log(countryCode, "=======> countryCode ");
  // ----------------------------------------- H E R E  IS  S T A T E -----------------------------------------------------------------
  const refTimer = useRef();
  const [timerEnd, setTimerEnd] = useState(false);
  const [OTP, setOTP] = useState('');
  const [DeviceId, setDeviceId] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false);

  useEffect(() => {
    TogetDeviceId()
    //  _VerifyOtp()

  }, [])
  const TogetDeviceId = async () => {
    var uniqueId = await DeviceInfo.getUniqueId();
    setDeviceId(uniqueId)
    console.log('uniqueId=======>>>>>>', uniqueId);
  }

  // ................................................................................................. POST API .................................................
  const _VerifyOtp = () => {
                    // navigation.navigate('UserMaven')

    if (OTP.length <= 0) {
      msgProvider.toast(msgText.emptyotp[config.language], 'center')
      return false
    }
    if (OTP.length > 4) {
      msgProvider.toast(msgText.Invalid[config.language], 'center')
      return false
    }
    setModalVisible1(true);

    if (isLoginScreen == true) {
      LoginOtpVerify();
    } else {
      SignUPOtpVerify();
    }
  var data = ({
      mobile: user_mobile,
      OTP: OTP
    })
    console.log(data, '-----------------------OTP');
  }

           // ================== login otp verrify ==================    
  const LoginOtpVerify = () => {
    // -------- For Login OTP Verify ---------
    var dataForApi12 = JSON.stringify({
      countryCode: "+91",
      emailMobile: user_mobile,
      firebaseToken: "",
      deviceId: DeviceId,
      otp: OTP})
      console.log('dataForApi12--------', dataForApi12);
       var config1 = {
      method: 'post',
      url: config.baseURL + 'user/loginOtpVerify',
      headers: {
        'Content-Type': 'application/json'
      },
      data: dataForApi12
    };
    axios(config1)
      .then(async (response) => {
        console.log('response=======================> verify screen ', response)
        var user_arr = response.data.loginOtpVerify;
        var ResponseMessage = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;
        console.log('===============user_arr', user_arr);
        setModalVisible1(false);
        if (ResponseMessage == 200) {
          setModalVisible1(false);
          var email = user_arr.email
          await localStorage.setItemObject('user_arr', user_arr);

          msgProvider.toast(msgText.LoginSuccess[config.language],'center')
          await localStorage.setItemObject('user_arr', user_arr);
            setTimeout(() => {
            LogintoFirebase(email)
            navigation.navigate('UserMaven')
             }, 2000);
         } else {
          setModalVisible1(false);
          // alert(ErrorMessage)
        }
      })
      .catch((error) => {
        setModalVisible1(false);

         // it's comment
        // alert(ErrorMessage)
        // console.log('i am in errror ');
      });
  }
  // ------------------------ firebase code ------------
  const LogintoFirebase = async (email) => {
    LoginUser(email,'123456')
    .then(async (res) => {
    //  console.log('---res-->',res);
    console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!',res.user.uid);
    // const uid = Firebase.auth().currentUser.uid;
    const uid = res.user.uid;
    // const fcmToken = Firebase.auth().currentUser.fcmToken;
    console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
    await AsyncStorage.setItem('UID', uid);
       
    //  await AsyncStorage.setItem('Token', fcmToken);
    //  navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
    navigation.navigate('UserMaven')
    // navigation.navigate('Dashboard');
    }).
    catch((err) => {
    alert(err);
    })
    } 
  // ------------------------ firebase code ------------

  // ================= OTP Verify for SignUP User ==================
  const SignUPOtpVerify = () => {
 var data = JSON.stringify({
      otp: OTP,
      mobile: user_mobile
    });
var config1 = {
      method: 'post',
      url: config.baseURL + 'varified/otp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config1)
      .then((response) => {
        console.log('response=======================> verify screen ', response)
        var ResponseMessage = response.data.ErrorCode
        var ErrorMessage = response.data.ErrorMessage
        if (ResponseMessage == 200){
          RegisterUser();
        } else {
          setModalVisible1(false);
          setTimeout(() => {
                     //"==================>  it's comment me ============================> "//
                 msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
                    //"==================>  it's comment me ============================> "//
            return false;
          }, 300);
        }
      })
      .catch((error) => {
        setModalVisible1(false);
        console.log('i am in errror');
      });
  }

  // ===========================================================
  const RegisterUser = () => {
    console.log('------------------------', dataTOSend);

    var config12 = {
      method: 'post',
      url: config.baseURL + 'user/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: dataTOSend
    };

    axios(config12)
        .then((response) => {
        console.log((response));
        var ErrorCode = response.data.ErrorCode;
        var ErrorMessages = response.data.ErrorMessage;
        console.log('response.data======================', response.data);
        if (ErrorCode == 200) {
        setTimeout(() => {
        setModalVisible1(false);
        setTimeout(() => {
  //  msgProvider.alert(msgTitle.information[config.language], ErrorMessages, false);
              navigation.navigate('UserMaven',{datasend:""})
            }, 300);
          }, 1000);
        }
        else {
          setModalVisible1(false);
          setTimeout(() => {
            // msgProvider.alert(msgTitle.information[config.language], ErrorMessages, false);
            // return false;
          }, 300);
        }  })
      .catch((error) => {
        setModalVisible1(false);
        console.log('i am in errror ');
      }); }

  const timerCallbackFunc = (timerFlag) => {
    setTimeout(() => {
      setTimerEnd(timerFlag);
    }, 1000);
    setTimerEnd(timerFlag);
    console.warn( 'You can alert the user by letting him know that Timer is out.',);
     };
    //  ------------------------- >-->!-->! resend otp 
    const resend_otp = () => {
    var data = JSON.stringify({
      countryCode: countryCode,
      emailMobile: user_mobile
    });

    var config1 = {
      method: 'post',
      url: config.baseURL + 'user/loginotp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config1)
      .then((response) => {
        console.log('response is arriwal =======================', response.data)
        console.log((response.data,"response.data---------------------------------------------------->"));
        var user_arr = response.data.data;
        var IsScucceded = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;
        console.log('------------ userrr_arrauy resend otp', user_arr)
        if (IsScucceded == 200) {
          // await localStorage.setItemObject('user_arr', user_arr);
          //  alert(ErrorMessage)
       
        }
        else {
         
          alert(ErrorMessage)
          // msgProvider.toast(msgText.ErrorMessage[config1.language], 'center')
        }
      })
      .catch((error)=> {
        alert(error)
       console.log('i am in errror ');
      });
    msgProvider.toast(msgText.resendotp[config.language],'center')
    setTimerEnd(false); refTimer.current.resetTimer();
    }
return (

             <View style={{ flex: 1, backgroundColor:Colors.white_color}}>
                <SafeAreaView style={styles.SafeAreaView}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
              <View style={{width:mobileW, height:mobileW*15/100, justifyContent:'center', paddingHorizontal:mobileW*6/100}}>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
             <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
             </TouchableOpacity>
              </View>
           
           
             <View style={{justifyContent:'center',alignSelf:'center',marginTop:mobileW*12/100}}>
             <Text style={styles.loginText}>{Lang_chg.VerificationCodeTxt[config.language]}</Text>
             <Text style={styles.topText}>{Lang_chg.typeCodeTxt[config.language]}</Text> 
             </View>
             {/* =======================================  OTP VERIFICATION ===================================== */}
             <View style={{ alignItems: 'center', }}>
             <OTPInputView
              style={styles.otp_view}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code => setOTP(code))}/>
              </View>
          {/* ======================================= VERIFY OTP Button ===================================== */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => { _VerifyOtp() }} style={styles.LoginView}>
          <Text style={styles.verifyotp_text}>{Lang_chg.VerifyOtpBtn[config.language]}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center', display: timerEnd ? 'none' : 'flex' }}>
          <Text style={styles.remaining_text}>{Lang_chg.RemainingTxt[config.language]} </Text>

            {/* ============================Time CountDownTimer=================================== */}
              <View>
              <CountDownTimer
                ref={refTimer}
                timestamp={30}
                timerCallback={timerCallbackFunc}
                containerStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 35, color: "black" }} textStyle={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.25, }} />
                </View>
                 </View>
                  <View style={{display: timerEnd ? 'flex' : 'none', marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center',}}>
                  <TouchableOpacity onPress={() => { resend_otp() }}>
                   <Text style={styles.resendotp_txt}>{Lang_chg.ResendOtpTxt[config.language]}</Text>
                   </TouchableOpacity>
           </View>
           <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {setModalVisible1(!modalVisible1);}}>
            {/* <View style={{ flex: 1, width: mobileW * 88 / 100, height: mobileW * 18 / 100, justifyContent: "center", alignSelf: "center" }}> */}
            <View style={styles.gif_view}>
             <Image style={styles.gif_image}source={require("./Icon/neighcoach_loader.gif")}></Image>

                </View>
                </Modal>
                 
                 </SafeAreaView>
                 </View>


  )
          }

export default VerificationCode
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  otp_view: {
    width: '75%',
    height: mobileW * 30 / 100,
  },
  verifyotp_text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
  fontFamily:Font.FontSemiBold
  },
  backIcon: {
    width: mobileW * 3 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  backIcon_: {
    width: mobileW * 6/ 100,
    height: mobileW * 6/ 100,
    tintColor:Colors.black_color,

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
  mavenowLogo: {
    width: mobileW * 70 / 100,
    height: mobileW * 18 / 100,
    alignSelf: 'center',
    marginTop:mobileW*3/100,
  },
  loginText: {
    fontSize: mobileW * 4.2/ 100,
    color: Colors.black_color,
    fontFamily:Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    alignSelf:"center"
  },
  cardView: {
    width: mobileW,
    height: "77%",
    backgroundColor: Colors.whiteColor,
    paddingLeft: mobileW * 8 / 100,
    paddingRight: mobileW * 8 / 100,
    borderTopLeftRadius: mobileW * 10 / 100
  },
  remaining_text: {
    color: Colors.gray, 
    fontFamily:Font.FontRegular,
    fontSize:mobileW*3/100
  },
  topText: {
    fontSize: mobileW * 3.2/ 100,
    color: Colors.gray,
   fontFamily:Font.FontRegular
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12.6 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 1 / 100,
    // marginTop: mobileW * 2 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    // borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    width:mobileW*88/100,
    alignSelf:"center"
  },
  underlineStyleBase: {
    width: mobileW * 13/ 100,
    height: mobileW * 12.8 / 100,
    // borderWidth: mobileW*0.4/100,
    // borderColor: Colors.themecolor,
    borderRadius: mobileW * 3/ 100,
    // elevation: 3,
    fontFamily:Font.FontRegular,
    color: Colors.black_color,
    // backgroundColor:Colors.lightgray
    // backgroundColor:'#EFF2F1'
    backgroundColor:'#EFF2F1'
    // backgroundColor:Colors.light_grey
//     BL =  #121A23
// White =  #FFFFFF
// Gray =  #9B9B9B
// BR =  #EFF2F1
// BR2 =  #E7E8EA
// Blue=  #00959E
// BG =  #FAFAFA
  },
  underlineStyleHighLighted: {
    // borderColor: Colors.themecolor,
    // elevation:5, backgroundColor:"white"
  },
  SafeAreaView: { 
    flex: 1, 
    backgroundColor: Colors.white_color 
  },
  backicon_touch: { width: mobileW, height: "23%", padding: mobileW * 3 / 100, },
  resendotp_txt: { 
    fontSize: mobileW * 3.5 / 100, 
    color: Colors.themecolor, 
    fontWeight: "500", 
    marginTop: mobileW * 0.7 / 100 
  },

})
// ====== 3rd







// import { View, Text, StatusBar, Modal, Alert, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors } from './Provider/Colorsfont';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
// import CountDownTimer from 'react-native-countdown-timer-hooks';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { localStorage } from './Provider/utilslib/Utils';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import axios from "axios"
// import { log } from 'react-native-reanimated';
// import { TextInput } from 'react-native-gesture-handler';
// import DeviceInfo from 'react-native-device-info';

//   const VerificationCode = ({ navigation, route }) => {
//   const user_mobile = route.params.mobile_number
//   const dataTOSend = route.params.dataTOSend
//   const countryCode = route.params.countryCode

//   const isLoginScreen = route.params.isLoginScreen
// // {mobile_number:mobile_number, dataTOSend: dataTOSendToNextPage ,isLoginScreen :false }

//  console.log(user_mobile, "=======> user_mobilecountryCode ");
//  console.log(countryCode, "=======> countryCode ");
//   // ----------------------------------------- H E R E  IS  S T A T E -----------------------------------------------------------------
//   const refTimer = useRef();
//   const [timerEnd, setTimerEnd] = useState(false);
//   const [OTP, setOTP] = useState('');
//   const [DeviceId, setDeviceId] = useState('');
//   const [modalVisible1, setModalVisible1] = useState(false);

//   useEffect(() => {
//     TogetDeviceId()
//     //  _VerifyOtp()

//   }, [])
//   const TogetDeviceId = async () => {
//     var uniqueId = await DeviceInfo.getUniqueId();
//     setDeviceId(uniqueId)
//     console.log('uniqueId=======>>>>>>', uniqueId);
//   }

//   // ................................................................................................. POST API .................................................
//   const _VerifyOtp = () => {
//                     // navigation.navigate('UserMaven')

//     if (OTP.length <= 0) {
//       msgProvider.toast(msgText.emptyotp[config.language], 'center')
//       return false
//     }
//     if (OTP.length > 4) {
//       msgProvider.toast(msgText.Invalid[config.language], 'center')
//       return false
//     }
//     setModalVisible1(true);

//     if (isLoginScreen == true) {
//       LoginOtpVerify();
//     } else {
//       SignUPOtpVerify();
//     }
//   var data = ({
//       mobile: user_mobile,
//       OTP: OTP
//     })
//     console.log(data, '-----------------------OTP');
//   }

//            // ================== login otp verrify ==================    
//   const LoginOtpVerify = () => {
//     // -------- For Login OTP Verify ---------
//     var dataForApi12 = JSON.stringify({
//       countryCode: "+91",
//       emailMobile: user_mobile,
//       firebaseToken: "",
//       deviceId: DeviceId,
//       otp: OTP})
//       console.log('dataForApi12--------', dataForApi12);
//        var config1 = {
//       method: 'post',
//       url: config.baseURL + 'user/loginOtpVerify',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataForApi12
//     };
//     axios(config1)
//       .then(async (response) => {
//         console.log('response=======================> verify screen ', response)
//         var user_arr = response.data.loginOtpVerify;
//         var ResponseMessage = response.data.ErrorCode;
//         var ErrorMessage = response.data.ErrorMessage;
//         console.log('===============user_arr', user_arr);
//         setModalVisible1(false);
//         if (ResponseMessage == 200) {
//           setModalVisible1(false);
//           var email = user_arr.email
//           await localStorage.setItemObject('user_arr', user_arr);

//           msgProvider.toast(msgText.LoginSuccess[config.language],'center')
//           await localStorage.setItemObject('user_arr', user_arr);
//             setTimeout(() => {
//             LogintoFirebase(email)
//             navigation.navigate('UserMaven')
//              }, 2000);
//          } else {
//           setModalVisible1(false);
//           // alert(ErrorMessage)
//         }
//       })
//       .catch((error) => {
//         setModalVisible1(false);

//          // it's comment
//         // alert(ErrorMessage)
//         // console.log('i am in errror ');
//       });
//   }
//   // ------------------------ firebase code ------------
//   const LogintoFirebase = async (email) => {
//     LoginUser(email,'123456')
//     .then(async (res) => {
//     //  console.log('---res-->',res);
//     console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!',res.user.uid);
//     // const uid = Firebase.auth().currentUser.uid;
//     const uid = res.user.uid;
//     // const fcmToken = Firebase.auth().currentUser.fcmToken;
//     console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
//     await AsyncStorage.setItem('UID', uid);
       
//     //  await AsyncStorage.setItem('Token', fcmToken);
//     //  navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
//     navigation.navigate('UserMaven')
//     // navigation.navigate('Dashboard');
//     }).
//     catch((err) => {
//     alert(err);
//     })
//     } 
//   // ------------------------ firebase code ------------

//   // ================= OTP Verify for SignUP User ==================
//   const SignUPOtpVerify = () => {
//  var data = JSON.stringify({
//       otp: OTP,
//       mobile: user_mobile
//     });
// var config1 = {
//       method: 'post',
//       url: config.baseURL + 'varified/otp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };
//     axios(config1)
//       .then((response) => {
//         console.log('response=======================> verify screen ', response)
//         var ResponseMessage = response.data.ErrorCode
//         var ErrorMessage = response.data.ErrorMessage
//         if (ResponseMessage == 200){
//           RegisterUser();
//         } else {
//           setModalVisible1(false);
//           setTimeout(() => {
//                      //"==================>  it's comment me ============================> "//
//                  msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
//                     //"==================>  it's comment me ============================> "//
//             return false;
//           }, 300);
//         }
//       })
//       .catch((error) => {
//         setModalVisible1(false);
//         console.log('i am in errror');
//       });
//   }

//   // ===========================================================
//   const RegisterUser = () => {
//     console.log('------------------------', dataTOSend);

//     var config12 = {
//       method: 'post',
//       url: config.baseURL + 'user/register',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataTOSend
//     };

//     axios(config12)
//         .then((response) => {
//         console.log((response));
//         var ErrorCode = response.data.ErrorCode;
//         var ErrorMessages = response.data.ErrorMessage;
//         console.log('response.data======================', response.data);
//         if (ErrorCode == 200) {
//         setTimeout(() => {
//         setModalVisible1(false);
//         setTimeout(() => {
//   //  msgProvider.alert(msgTitle.information[config.language], ErrorMessages, false);
//               navigation.navigate('UserMaven')
//             }, 300);
//           }, 1000);
//         }
//         else {
//           setModalVisible1(false);
//           setTimeout(() => {
//             // msgProvider.alert(msgTitle.information[config.language], ErrorMessages, false);
//             // return false;
//           }, 300);
//         }  })
//       .catch((error) => {
//         setModalVisible1(false);
//         console.log('i am in errror ');
//       }); }

//   const timerCallbackFunc = (timerFlag) => {
//     setTimeout(() => {
//       setTimerEnd(timerFlag);
//     }, 1000);
//     setTimerEnd(timerFlag);
//     console.warn( 'You can alert the user by letting him know that Timer is out.',);
//      };
//     //  ------------------------- >-->!-->! resend otp 
//     const resend_otp = () => {
//     var data = JSON.stringify({
//       countryCode: countryCode,
//       emailMobile: user_mobile
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
//       .then((response) => {
//         console.log('response is arriwal =======================', response.data)
//         console.log((response.data,"response.data---------------------------------------------------->"));
//         var user_arr = response.data.data;
//         var IsScucceded = response.data.ErrorCode;
//         var ErrorMessage = response.data.ErrorMessage;
//         console.log('------------ userrr_arrauy resend otp', user_arr)
//         if (IsScucceded == 200) {
//           // await localStorage.setItemObject('user_arr', user_arr);
//           //  alert(ErrorMessage)
       
//         }
//         else {
         
//           alert(ErrorMessage)
//           // msgProvider.toast(msgText.ErrorMessage[config1.language], 'center')
//         }
//       })
//       .catch((error)=> {
//         alert(error)
//        console.log('i am in errror ');
//       });
//     msgProvider.toast(msgText.resendotp[config.language],'center')
//     setTimerEnd(false); refTimer.current.resetTimer();
//     }


//   return (

//            <View style={{ flex: 1, }}>
//            <SafeAreaView style={styles.SafeAreaView}>
//             <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
//             <View style={styles.backicon_touch}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//              <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
//              </TouchableOpacity>
//              <Image style={styles.mavenowLogo} resizeMode='contain' source={require("./Icon/new_logo_mavenow.png")}></Image>
//              <View style={{ alignItems: 'center', }}>
//              <Text style={styles.loginText}>{Lang_chg.VerificationCodeTxt[config.language]}</Text>
//              </View>
//              </View>
//               <View style={styles.cardView}>
//               <Text style={styles.topText}>{Lang_chg.typeCodeTxt[config.language]}</Text>

//           {/* =======================================  OTP VERIFICATION ===================================== */}
//             <View style={{ alignItems: 'center', marginTop: mobileW * 8 / 100, }}>
//             <OTPInputView
//               style={styles.otp_view}
//               pinCount={4}
//               autoFocusOnLoad={false}
//               codeInputFieldStyle={styles.underlineStyleBase}
//               codeInputHighlightStyle={styles.underlineStyleHighLighted}
//               onCodeFilled={(code => setOTP(code))} />
//           </View>
//           {/* ======================================= VERIFY OTP Button ===================================== */}
//           <TouchableOpacity activeOpacity={0.8} onPress={() => { _VerifyOtp() }} style={styles.LoginView}>
//             <Text style={styles.verifyotp_text}>{Lang_chg.VerifyOtpBtn[config.language]}</Text>
//           </TouchableOpacity>
//           <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center', display: timerEnd ? 'none' : 'flex' }}>
//             <Text style={styles.remaining_text}>{Lang_chg.RemainingTxt[config.language]}</Text>

//             {/* ============================Time CountDownTimer=================================== */}
//               <View>
//               <CountDownTimer
//                 ref={refTimer}
//                 timestamp={30}
//                 timerCallback={timerCallbackFunc}
//                 containerStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 35, color: "black" }} textStyle={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.25, }} />
//                 </View>
//                  </View>
//                   <View style={{display: timerEnd ? 'flex' : 'none', marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center',}}>
//                   <TouchableOpacity onPress={() => { resend_otp() }}>
//                    <Text style={styles.resendotp_txt}>{Lang_chg.ResendOtpTxt[config.language]}</Text>
//                    </TouchableOpacity>
//            </View>
//            <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible1}
//             onRequestClose={() => {setModalVisible1(!modalVisible1);}}>
//             {/* <View style={{ flex: 1, width: mobileW * 88 / 100, height: mobileW * 18 / 100, justifyContent: "center", alignSelf: "center" }}> */}
//             <View style={styles.gif_view}>
//              <Image style={styles.gif_image}source={require("./Icon/neighcoach_loader.gif")}></Image>

//                 </View>
//                 </Modal>
//                  </View>
//                  </SafeAreaView>
//                  </View>


//   )
//           }

// export default VerificationCode
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   otp_view: {
//     width: '80%',
//     height: mobileW * 30 / 100,
//   },
//   verifyotp_text: {
//     fontSize: mobileW * 5 / 100,
//     color: Colors.white_color,
//   fontFamily:Font.FontMedium
//   },
//   backIcon: {
//     width: mobileW * 3 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_: {
//     width: mobileW * 9.5/ 100,
//     height: mobileW * 9.5/ 100,
//     tintColor: Colors.white_color
//   },
//   gif_view: {
//     flex: 1, alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00000096'
//   },
//   gif_image: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100
//   },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 18 / 100,
//     alignSelf: 'center',
//     marginTop:mobileW*-2/100
//   },
//   loginText: {
//     fontSize: mobileW * 4.5 / 100,
//     color: Colors.black_color,
//     fontFamily:Font.FontMedium,
//     marginTop: mobileW * 3 / 100
//   },
//   cardView: {
//     width: mobileW,
//     height: "77%",
//     backgroundColor: Colors.whiteColor,
//     paddingLeft: mobileW * 8 / 100,
//     paddingRight: mobileW * 8 / 100,
//     borderTopLeftRadius: mobileW * 10 / 100
//   },
//   remaining_text: {
//     color: 'black', 
//     fontFamily:Font.FontRegular,
//     fontSize:mobileW*3/100
//   },
//   topText: {
//     alignSelf: 'center',
//     fontSize: mobileW * 3.2/ 100,
//     color: Colors.gray,
//     marginTop: mobileW * 4 / 100,
//    fontFamily:Font.FontMedium
//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 12.6 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileW * 5 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   underlineStyleBase: {
//     width: mobileW * 12.5 / 100,
//     height: mobileW * 12.5 / 100,
//     borderWidth: 1,
//     borderColor: Colors.themecolor,
//     borderRadius: mobileW * 1.5/ 100,
//     elevation: 3,
//     fontFamily:Font.FontRegular,
//     color: Colors.black_color,
//     backgroundColor: Colors.white_color

//   },
//   underlineStyleHighLighted: {
//     borderColor: Colors.themecolor,
//     // elevation:5, backgroundColor:"white"
//   },
//   SafeAreaView: { flex: 1, backgroundColor: Colors.themecolor },
//   backicon_touch: { width: mobileW, height: "23%", padding: mobileW * 3 / 100, },
//   resendotp_txt: { fontSize: mobileW * 3.5 / 100, color: Colors.themecolor, fontWeight: "500", marginTop: mobileW * 0.7 / 100 },

// })





// --------------------new design mavenow2 2nd--------------------------------------------------------
// import { View, Text, StatusBar, Modal, Alert, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors } from './Provider/Colorsfont';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
// import CountDownTimer from 'react-native-countdown-timer-hooks';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { localStorage } from './Provider/utilslib/Utils';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import axios from "axios"
// import { log } from 'react-native-reanimated';
// import { TextInput } from 'react-native-gesture-handler';
// import DeviceInfo from 'react-native-device-info';

//   const VerificationCode = ({ navigation, route }) => {
//   const user_mobile = route.params.mobile_number
//   const dataTOSend = route.params.dataTOSend
//   const countryCode = route.params.countryCode

//   const isLoginScreen = route.params.isLoginScreen
// // {mobile_number:mobile_number, dataTOSend: dataTOSendToNextPage ,isLoginScreen :false }

//  console.log(user_mobile, "=======> user_mobilecountryCode ");
//  console.log(countryCode, "=======> countryCode ");
//   // ----------------------------------------- H E R E  IS  S T A T E -----------------------------------------------------------------
//   const refTimer = useRef();
//   const [timerEnd, setTimerEnd] = useState(false);
//   const [OTP, setOTP] = useState('');
//   const [DeviceId, setDeviceId] = useState('');
//   const [modalVisible1, setModalVisible1] = useState(false);

//   useEffect(() => {
//     TogetDeviceId()
//     //  _VerifyOtp()

//   }, [])
//   const TogetDeviceId = async () => {
//     var uniqueId = await DeviceInfo.getUniqueId();
//     setDeviceId(uniqueId)
//     console.log('uniqueId=======>>>>>>', uniqueId);
//   }

//   // ................................................................................................. POST API .................................................
//   const _VerifyOtp = () => {
//                     // navigation.navigate('UserMaven')

//     if (OTP.length <= 0) {
//       msgProvider.toast(msgText.emptyotp[config.language], 'center')
//       return false
//     }
//     if (OTP.length > 4) {
//       msgProvider.toast(msgText.Invalid[config.language], 'center')
//       return false
//     }
//     setModalVisible1(true);

//     if (isLoginScreen == true) {
//       LoginOtpVerify();
//     } else {
//       SignUPOtpVerify();
//     }
//   var data = ({
//       mobile: user_mobile,
//       OTP: OTP
//     })
//     console.log(data, '-----------------------OTP');
//   }

//            // ================== login otp verrify ==================    
//   const LoginOtpVerify = () => {
//     // -------- For Login OTP Verify ---------
//     var dataForApi12 = JSON.stringify({
//       countryCode: "+91",
//       emailMobile: user_mobile,
//       firebaseToken: "",
//       deviceId: DeviceId,
//       otp: OTP})
//       console.log('dataForApi12--------', dataForApi12);
//        var config1 = {
//       method: 'post',
//       url: config.baseURL + 'user/loginOtpVerify',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataForApi12
//     };
//     axios(config1)
//       .then(async (response) => {
//         console.log('response=======================> verify screen ', response)
//         var user_arr = response.data.loginOtpVerify;
//         var ResponseMessage = response.data.ErrorCode;
//         var ErrorMessage = response.data.ErrorMessage;
//         console.log('===============user_arr', user_arr);
//         setModalVisible1(false);
//         if (ResponseMessage == 200) {
//           setModalVisible1(false);
//           var email = user_arr.email
//           await localStorage.setItemObject('user_arr', user_arr);

//           msgProvider.toast(msgText.LoginSuccess[config.language],'center')
//           await localStorage.setItemObject('user_arr', user_arr);
//             setTimeout(() => {
//             LogintoFirebase(email)
//             navigation.navigate('UserMaven')
//              }, 2000);
//          } else {
//           setModalVisible1(false);
//           // alert(ErrorMessage)
//         }
//       })
//       .catch((error) => {
//         setModalVisible1(false);

//          // it's comment
//         // alert(ErrorMessage)
//         // console.log('i am in errror ');
//       });
//   }
//   // ------------------------ firebase code ------------
//   const LogintoFirebase = async (email) => {
//     LoginUser(email,'123456')
//     .then(async (res) => {
//     //  console.log('---res-->',res);
//     console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!',res.user.uid);
//     // const uid = Firebase.auth().currentUser.uid;
//     const uid = res.user.uid;
//     // const fcmToken = Firebase.auth().currentUser.fcmToken;
//     console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
//     await AsyncStorage.setItem('UID', uid);
       
//     //  await AsyncStorage.setItem('Token', fcmToken);
//     //  navigation.navigate('VerificationCode', {mobile_number:mobile_number, dataTOSend: " " ,isLoginScreen : true, countryCode:countryCode })
//     navigation.navigate('UserMaven')
//     // navigation.navigate('Dashboard');
//     }).
//     catch((err) => {
//     alert(err);
//     })
//     } 
//   // ------------------------ firebase code ------------

//   // ================= OTP Verify for SignUP User ==================
//   const SignUPOtpVerify = () => {
//  var data = JSON.stringify({
//       otp: OTP,
//       mobile: user_mobile
//     });
// var config1 = {
//       method: 'post',
//       url: config.baseURL + 'varified/otp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };
//     axios(config1)
//       .then((response) => {
//         console.log('response=======================> verify screen ', response)
//         var ResponseMessage = response.data.ErrorCode
//         var ErrorMessage = response.data.ErrorMessage
//         if (ResponseMessage == 200){
//           RegisterUser();
//         } else {
//           setModalVisible1(false);
//           setTimeout(() => {
//                      //"==================>  it's comment me ============================> "//
//                  msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
//                     //"==================>  it's comment me ============================> "//
//             return false;
//           }, 300);
//         }
//       })
//       .catch((error) => {
//         setModalVisible1(false);
//         console.log('i am in errror');
//       });
//   }

//   // ===========================================================
//   const RegisterUser = () => {
//     console.log('------------------------', dataTOSend);

//     var config12 = {
//       method: 'post',
//       url: config.baseURL + 'user/register',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataTOSend
//     };

//     axios(config12)
//         .then((response) => {
//         console.log((response));
//         var ErrorCode = response.data.ErrorCode;
//         var ErrorMessages = response.data.ErrorMessage;
//         console.log('response.data======================', response.data);
//         if (ErrorCode == 200) {
//         setTimeout(() => {
//         setModalVisible1(false);
//         setTimeout(() => {
//   //  msgProvider.alert(msgTitle.information[config.language], ErrorMessages, false);
//               navigation.navigate('UserMaven',{datasend:""})
//             }, 300);
//           }, 1000);
//         }
//         else {
//           setModalVisible1(false);
//           setTimeout(() => {
//             // msgProvider.alert(msgTitle.information[config.language], ErrorMessages, false);
//             // return false;
//           }, 300);
//         }  })
//       .catch((error) => {
//         setModalVisible1(false);
//         console.log('i am in errror ');
//       }); }

//   const timerCallbackFunc = (timerFlag) => {
//     setTimeout(() => {
//       setTimerEnd(timerFlag);
//     }, 1000);
//     setTimerEnd(timerFlag);
//     console.warn( 'You can alert the user by letting him know that Timer is out.',);
//      };
//     //  ------------------------- >-->!-->! resend otp 
//     const resend_otp = () => {
//     var data = JSON.stringify({
//       countryCode: countryCode,
//       emailMobile: user_mobile
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
//       .then((response) => {
//         console.log('response is arriwal =======================', response.data)
//         console.log((response.data,"response.data---------------------------------------------------->"));
//         var user_arr = response.data.data;
//         var IsScucceded = response.data.ErrorCode;
//         var ErrorMessage = response.data.ErrorMessage;
//         console.log('------------ userrr_arrauy resend otp', user_arr)
//         if (IsScucceded == 200) {
//           // await localStorage.setItemObject('user_arr', user_arr);
//           //  alert(ErrorMessage)
       
//         }
//         else {
         
//           alert(ErrorMessage)
//           // msgProvider.toast(msgText.ErrorMessage[config1.language], 'center')
//         }
//       })
//       .catch((error)=> {
//         alert(error)
//        console.log('i am in errror ');
//       });
//     msgProvider.toast(msgText.resendotp[config.language],'center')
//     setTimerEnd(false); refTimer.current.resetTimer();
//     }
// return (

//              <View style={{ flex: 1,}}>
//              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//              <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
//              </TouchableOpacity>
//              <Image style={styles.mavenowLogo} resizeMode='contain'source={require("./Icon/new_logo_blue_mavenow.png")}></Image>
//              <View style={{marginHorizontal:mobileW*7/100,marginTop:mobileW*3/100}}>
//              <Text style={styles.loginText}>{Lang_chg.VerificationCodeTxt[config.language]}</Text>
//              <Text style={styles.topText}>{Lang_chg.typeCodeTxt[config.language]}</Text>
//              </View>
//              {/* =======================================  OTP VERIFICATION ===================================== */}
//              <View style={{ alignItems: 'center', marginTop: mobileW * 8 / 100,}}>
//              <OTPInputView
//               style={styles.otp_view}
//               pinCount={4}
//               autoFocusOnLoad={false}
//               codeInputFieldStyle={styles.underlineStyleBase}
//               codeInputHighlightStyle={styles.underlineStyleHighLighted}
//               onCodeFilled={(code => setOTP(code))}/>
//               </View>
//           {/* ======================================= VERIFY OTP Button ===================================== */}
//           <TouchableOpacity activeOpacity={0.8} onPress={() => { _VerifyOtp() }} style={styles.LoginView}>
//           <Text style={styles.verifyotp_text}>{Lang_chg.VerifyOtpBtn[config.language]}</Text>
//           </TouchableOpacity>
//           <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center', display: timerEnd ? 'none' : 'flex' }}>
//           <Text style={styles.remaining_text}>{Lang_chg.RemainingTxt[config.language]} </Text>

//             {/* ============================Time CountDownTimer=================================== */}
//               <View>
//               <CountDownTimer
//                 ref={refTimer}
//                 timestamp={30}
//                 timerCallback={timerCallbackFunc}
//                 containerStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 35, color: "black" }} textStyle={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.25, }} />
//                 </View>
//                  </View>
//                   <View style={{display: timerEnd ? 'flex' : 'none', marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center',}}>
//                   <TouchableOpacity onPress={() => { resend_otp() }}>
//                    <Text style={styles.resendotp_txt}>{Lang_chg.ResendOtpTxt[config.language]}</Text>
//                    </TouchableOpacity>
//            </View>
//            <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible1}
//             onRequestClose={() => {setModalVisible1(!modalVisible1);}}>
//             {/* <View style={{ flex: 1, width: mobileW * 88 / 100, height: mobileW * 18 / 100, justifyContent: "center", alignSelf: "center" }}> */}
//             <View style={styles.gif_view}>
//              <Image style={styles.gif_image}source={require("./Icon/neighcoach_loader.gif")}></Image>

//                 </View>
//                 </Modal>
                 
                 
//                  </View>


//   )
//           }

// export default VerificationCode
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   otp_view: {
//     width: '75%',
//     height: mobileW * 30 / 100,
//   },
//   verifyotp_text: {
//     fontSize: mobileW * 4.5 / 100,
//     color: Colors.white_color,
//   fontFamily:Font.FontSemiBold
//   },
//   backIcon: {
//     width: mobileW * 3 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_: {
//     width: mobileW * 9.5/ 100,
//     height: mobileW * 9.5/ 100,
//     marginTop:mobileW*2/100
 
//   },
//   gif_view: {
//     flex: 1, alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00000096'
//   },
//   gif_image: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100
//   },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 18 / 100,
//     alignSelf: 'center',
//     marginTop:mobileW*3/100,
//   },
//   loginText: {
//     fontSize: mobileW * 4.5 / 100,
//     color: Colors.black_color,
//     fontFamily:Font.FontBold,
//     marginTop: mobileW * 3 / 100
//   },
//   cardView: {
//     width: mobileW,
//     height: "77%",
//     backgroundColor: Colors.whiteColor,
//     paddingLeft: mobileW * 8 / 100,
//     paddingRight: mobileW * 8 / 100,
//     borderTopLeftRadius: mobileW * 10 / 100
//   },
//   remaining_text: {
//     color: Colors.black_color, 
//     fontFamily:Font.FontRegular,
//     fontSize:mobileW*3/100
//   },
//   topText: {
    
//     fontSize: mobileW * 3.5/ 100,
//     color: Colors.gray,
//     marginTop: mobileW * 2 / 100,
//    fontFamily:Font.FontRegular
//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 12.6 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileW * 5 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     width:mobileW*88/100,
//     alignSelf:"center"
//   },
//   underlineStyleBase: {
//     width: mobileW * 12.5 / 100,
//     height: mobileW * 12.5 / 100,
//     borderWidth: mobileW*0.4/100,
//     borderColor: Colors.themecolor,
//     borderRadius: mobileW * 1.5/ 100,
//     elevation: 3,
//     fontFamily:Font.FontRegular,
//     color: Colors.black_color,
//     backgroundColor: Colors.white_color

//   },
//   underlineStyleHighLighted: {
//     borderColor: Colors.themecolor,
//     // elevation:5, backgroundColor:"white"
//   },
//   SafeAreaView: { flex: 1, backgroundColor: Colors.themecolor },
//   backicon_touch: { width: mobileW, height: "23%", padding: mobileW * 3 / 100, },
//   resendotp_txt: { fontSize: mobileW * 3.5 / 100, color: Colors.themecolor, fontWeight: "500", marginTop: mobileW * 0.7 / 100 },

// })