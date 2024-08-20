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
  //  S T A T E ----------
  const refTimer = useRef();
  const [timerEnd, setTimerEnd] = useState(false);
  const [OTP, setOTP] = useState('');
  const [DeviceId, setDeviceId] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false);


  const _VerifyOtp = () => {
   if (OTP.length <= 0) {
      msgProvider.toast(msgText.emptyotp[config.language], 'center')
      return false
    }
    if (OTP.length > 4) {
      msgProvider.toast(msgText.Invalid[config.language], 'center')
      return false
    }

    setModalVisible1(true)


    setTimeout(() => {
      navigation.navigate('UserMaven')
      setModalVisible1(false)
    }, 1000);
    clear_Data()

  }

  const timerCallbackFunc = (timerFlag) => {
    setTimeout(() => {
      setTimerEnd(timerFlag);
    }, 1000);
    setTimerEnd(timerFlag);
    console.warn('You can alert the user by letting him know that Timer is out.',);
  };
  //  ------------------------- >-->!-->! resend otp 

  const resend_otp = () => {
    // msgProvider.toast(msgText.resendotp[config.language],'center')
    setTimerEnd(false); refTimer.current.resetTimer();
  }
  const clear_Data = () => {
    setOTP("")
  }


  return (

    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.header_View}>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>
          </View>


        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: mobileW * 12 / 100 }}>
          <Text style={styles.loginText}>{Lang_chg.VerificationCodeTxt[config.language]}</Text>
          <Text style={styles.topText}>{Lang_chg.typeCodeTxt[config.language]}</Text>
        </View>
        {/* ===========>  OTP VERIFICATION  */}
        <View style={{ alignItems: "center", }}>
          <OTPInputView
            style={styles.otp_view}
            pinCount={4}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => setOTP(code))} />
        </View>
        {/* =========> VERIFY OTP Button  */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => { _VerifyOtp() }} style={styles.LoginView}>
          <Text style={styles.verifyotp_text}>{Lang_chg.VerifyOtpBtn[config.language]}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center', display: timerEnd ? 'none' : 'flex' }}>
          <Text style={styles.remaining_text}>{Lang_chg.RemainingTxt[config.language]} </Text>

          {/* > Time CountDownTimer */}
          <View>
            <CountDownTimer
              ref={refTimer}
              timestamp={30}
              timerCallback={timerCallbackFunc}
              containerStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 35, color: "black" }} textStyle={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.25, }} />
          </View>
        </View>
        <View style={{ display: timerEnd ? 'flex' : 'none', marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', }}>
          <TouchableOpacity onPress={() => { resend_otp() }}>

            <Text style={styles.resendotp_txt}>{Lang_chg.ResendOtpTxt[config.language]}</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => { setModalVisible1(!modalVisible1); }}>
          <View style={styles.gif_view}>
            <Image style={styles.gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
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
  header_View: {
    width: mobileW,
    justifyContent: 'center',
    height: mobileW * 15 / 100,
    paddingHorizontal: mobileW * 6 / 100,
  },
  otp_view: {
    width: '75%',
    height: mobileW * 30 / 100,
  },
  verifyotp_text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold
  },
  backIcon: {
    width: mobileW * 3 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  gif_view: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000096'
  },
  gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  mavenowLogo: {
    alignSelf: 'center',
    width: mobileW * 70 / 100,
    height: mobileW * 18 / 100,
    marginTop: mobileW * 3 / 100,
  },
  loginText: {
    alignSelf: "center",
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 4.2 / 100,

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
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3 / 100
  },
  topText: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
  },
  LoginView: {
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOffset: { width: 0, },
    width: mobileW * 88 / 100,
    height: mobileW * 12.6 / 100,
    borderRadius: mobileW * 1 / 100, 
  },
  underlineStyleBase: {
    width: mobileW * 13 / 100,
    fontSize: mobileW * 5 / 100,
    height: mobileW * 12.8 / 100,
    borderRadius: mobileW * 3 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontBold,
    backgroundColor: '#EFF2F1',
    fontFamily: Font.FontRegular,
  },
  underlineStyleHighLighted: {
    // borderColor: Colors.themecolor,
    // elevation:5, backgroundColor:"white"
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  backicon_touch: {
    width: mobileW, 
    height: "23%",
    padding: mobileW * 3 / 100,
  },
  resendotp_txt: {
    color: Colors.themecolor,
    fontFamily:Font.FontMedium,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
    marginTop: mobileW * 0.7 / 100,
  },

})






