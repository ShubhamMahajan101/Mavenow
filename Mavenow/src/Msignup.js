import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList ,TextInput} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
// import { Stack, TextInput, } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import axios from "axios"
import { color } from 'react-native-reanimated';
import { colors } from 'react-native-elements';
// import firebase from './App/Firebase/firebaseConfig
import {SignUpUser} from './App/Firebase/SignUp';
import {Firebase} from './App/Firebase/firebaseConfig';
import {AddUser} from './App/Firebase/Users'
import Language from './Language';
const Msignup = ({ navigation }) => {

  

  const [isEnabled, setIsEnabled] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false);
  const [validationmodal, setvalidationmodal] = useState(false);
  const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [mobile_number, setValue] = useState('');
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [BLockstatus,setBLockstatus] =useState(false)
  const [language, setlanguage] = useState('Select language*');
  const [languageId, setlanguageId] = useState('Select language');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [languages, setlanguages] = useState('Select Language*');
  const [DeviceId, setDeviceId] = useState('');
  const [validation, setvalidation] = useState('');
  const [checked, setChecked] = useState('current')
  const[toggle,settogle]=useState('toggle');
  const phoneInput = useRef(null);
  const [BothMode,setBothMode] =useState('');
  const [image,setimage] = useState('')


  const SetMode = async (data) => {
    if (data == 'maven') {
      global.togalemode = "maven"
      console.log(data,"===========>");
      await localStorage.setItemString('UserMode', data)
      setIsEnabled('maven')
    } else {
      global.togalemode = "learner"
      console.log(data,"<========");
      await localStorage.setItemString('UserMode', data)
      setIsEnabled('learner')
    }

  }

// ================ set  mode maven or learner ==========
{/* <TouchableOpacity onPress={() => SetMode('learner')} style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0 / 100, backgroundColor: isEnabled == "learner" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.white_color : Colors.gray }} /> */}
              // <TouchableOpacity onPress={() => SetMode('maven') } style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0/ 100, backgroundColor: isEnabled == "maven" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.gray : Colors.white_color }} />


// const SetSelect = async(data) =>{
//   if(data=='maven'){
//     global.togalemode = "maven"
//    await localStorage.SetSelect('UserMode',data)
//    SetSelect('maven')
//   }else{
//     global.togalemode = "learner"
//    await localStorage.SetSelect('UserMode',data)
//    SetSelect('learner')
//    }
//    }


//  await localStorage.setItemString('select', select);



          
useEffect(() => {
TogetDeviceId()
    apiCalling();
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

  }, []);

    const TogetDeviceId = async () => {
    var uniqueId = await DeviceInfo.getUniqueId();
    setDeviceId(uniqueId)
    console.log('uniqueId=======>>>>>>', uniqueId);
  }
                                      

  // ============ Api Calling to get Languages ===============
  const apiCalling = () => {
    axios.get('https://mavenow.com:8001/user/GetLanguages')
      .then(res => {
        const nameList = res.data.result;
        // const imageArray = nameList.result;
        console.log('---------->', nameList)
            // for (let i=0;i<=languages.length;i++){
            //   nameList[0].toggle=true;
            //   setlanguages(nameList)
            //   console.log(setlanguages,'setlanguages===============');
            // }

        setlanguages(nameList)
        console.log('nameList',nameList);
      //    })
      // .catch(function (error) {
      //   console.log('---------->', error);
   }); }

  // ===========================================0=============
  const setSelectedIndex1 = (item ,index) => {
console.log('-----------------',item);
    for(let i=0;i<=languages.length;i++){
      if(item.code=="en"){
        config.language = 0
        setlanguage('English') 
      } if(item.code=="hi"){
        config.language = 1
        setlanguage('हिंदी') 
      }if(item.code=="es"){
        config.language = 2
       setlanguage('española') 
      }
      if(item.code=="nl"){
        config.language = 3
        setlanguage('Nederlands') 
      }
      if(item.code=="fr"){
        config.language = 4
        setlanguage('française') 
      }
      if(item.code=="th"){
        config.language = 5
        setlanguage('แบบไทย') 
      }
      if(item.code=="ar"){
        config.language = 6
        setlanguage('التايلاندية') 
      }
      if(item.code=="zh"){
        config.language = 7
        setlanguage('泰国') 
      }
    }
    languages.forEach((elem) => {
      elem.toggle = false
      if (elem.id === item.id) {
        elem.toggle = true
        // setlanguage(elem.name)
        setlanguageId(elem.id)  } })

    setlanguages([...languages]);
  }; 

  // await localStorage.setItemObject('dataTOSend', dataTOSend);

 const _loginBtn = async() => {
  // await localStorage.setItemString('select', select);
console.log('Before validation');


    //=====================All Fields Check================
    if (isEnabled == '') {
      msgProvider.toast(msgText.selectMode[config.language], 'center')
      return false
    }
    if (fullname.length <= 0) {
      msgProvider.toast(msgText.accountHolderName[config.language], 'center')
      return false
    }

    if (fullname.length <= 2) {
      msgProvider.toast(msgText.firstNameMinLength[config.language], 'center')
      return false
    }
    //===========email============================
    if (email.length <= 0) {
      msgProvider.toast(msgText.emptyEmail[config.language], 'center')
      setEmail('NA')
      return false
    }
    var reg = config.emailvalidation;
    if (reg.test(email) !== true) {
      msgProvider.toast(msgText.validEmail[config.language], 'center')
      setEmail('NA')
      return false
    }
    //======================================mobile============================
    if (mobile_number.length <=9) {
      msgProvider.toast(msgText.emptyMobile[config.language], 'center')
      return false
    }
    if (language.length <= 0) {
      msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
      return false
    }



    if (mobile_number.length > 13) {
      msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
      return false
    }
    // var mobilevalidation = config.mobilevalidation;
    // if (mobilevalidation.test(mobile_number) !== true) {
    //   msgProvider.toast(msgText.validMobile[config.language], 'center')
    //   return false
    // }
  
    if (language == 'Select language*') {
      msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
      return false
    }
    if (shouldShow == false) {
      msgProvider.toast(msgText.acceptTerms[config.language], 'center')
      return false
    }




    
    setModalVisible_Gif(true)

    setTimeout(() => {
      navigation.navigate('VerificationCode')
      setModalVisible_Gif(false)

    }, 2000);

    SignUPtoFIrebase()
return false;
    // setModalVisible_Gif(true)
  console.log('After validation');
  var dataTOSendToNextPage = {
      // fullName: fullname,
      email: email,
      mobile: mobile_number,
      countryCode: countryCode,
      userType: isUserType,
      firebaseToken: "",
      deviceId: DeviceId,
      lcid: languageId,
      fullname:fullname
    }

    var dataTOSend = {
      mobileNo: mobile_number,
      countryCode: countryCode,
      email: email,
      // fullName: fullname
    }

    let config12 = {
      method: 'post',
      maxBodyLength: Infinity,
      url: config.baseURL + 'registration/otp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: dataTOSend
    };

    axios.request(config12)
      .then(async (response) => {
        console.log('-------------------------- sign up screen>>', response.data);
        // var user_arr = response.data;
        var otpsuccesses = response.data.ErrorCode;
        console.log("otpsuccesses====================================", otpsuccesses);
        var ErrorMessage = response.data.ErrorMessage;
        if (otpsuccesses == 200) {
          setModalVisible_Gif(false)
          await localStorage.setItemObject('dataTOSend', dataTOSend);
          var userId = response.data.registrationOTP._id
          console.log('userId------>>>sign up screen ', userId);
          // navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false })
          SignUPtoFIrebase(dataTOSendToNextPage)
          navigation.navigate('VerificationCode', {mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false})
        }
        else {
          setTimeout(() => {
            msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
            return false;
           }, 2000);
        }
        })
       .catch((error) => {
        console.log(error);
          }); }

                                                        // =========     sign up to firebase   =============                      
            const  SignUPtoFIrebase = async () => {
            SignUpUser(email, '123456',)
           .then(async (res) => {
            // const user_Data =res.data
            // // console.log(user_Data,".... user_Data....");
            // await AsyncStorage.setItem('user_Data', user_Data);
            console.log('res sign up screen datA  =========================>', res);
             console.log('----->res.user.uid ==========>',res.user.uid);
            // console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!undefinesd',res.user.uid);
              // var userUID = Firebase.auth().currentUser.uid;
              var userUID = res.user.uid;
              var checkTocken = await AsyncStorage.getItem('fcmTocken')
              // var userfcmToken = Firebase.auth().currentUser.Token;

              console.log("userfcmToken",checkTocken);
              // AddUser(name, email, '', userUID,fcmToken).o
              console.log('name', email, userUID,'fcmToken',);
              // await AsyncStorage.setItem('userName',fullname)
              AddUser(fullname, email, userUID, checkTocken,mobile_number,onlineStatus,BLockstatus);
              const uid = res.user.uid;
              // const fcmToken = Firebase.auth().currentUser.fcmToken;
              
              console.log('............ uid .........',uid);
              await AsyncStorage.setItem('UID', uid);
              await AsyncStorage.setItem('UserName', fullname);
                 
              //  await AsyncStorage.setItem('Token', fcmToken);
                navigation.navigate('VerificationCode', { mobile_number: mobile_number,  isLoginScreen: false ,BLockstatus:false })
              .then(async () => {
                    //navigation.navigate('VerificationCode', {mobile_number: mobile_number, dataTOSend: dataTOSend, isLoginScreen: false})
                      // this.setState({ loader: false });
                      // await AsyncStorage.setItem('UID', userUID);
                      // this.props.navigation.navigate('Dashboard');
                  }).
                  catch((error) => {
                      alert(error);
                      })
                      console.log(userUID);
                      })
                 }
                 
  return (
             <View style={{ flex: 1, backgroundColor:Colors.white_color }}>

      <SafeAreaView style={styles.SafeAreaView}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
              <View style={{width:mobileW, height:mobileW*15/100, justifyContent:'center', paddingHorizontal:mobileW*6/100}}>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
             <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
             </TouchableOpacity>
              </View>
              {/* -------------------------------------  gif modal */}
              <View>
              <Modal animationType="slide"
               transparent={true}
              visible={ModalVisible_Gif}
              onRequestClose={() => {
              setModalVisible_Gif(!ModalVisible_Gif);}}>
              <View style={styles.GIF_modal}>
              <Image style={styles.GIF_Images} source={require("./Icon/neighcoach_loader.gif")}></Image>
              </View>
              </Modal>
              </View>


             {/*  modaL  */}
                        <View>
                        <Modal
                        animationType="slide"
                         transparent={true}
                         visible={modalVisible1}
                         onRequestClose={() => {
                         setModalVisible1(!modalVisible1); }}>       
                         <View style={styles.language_modal}>
                         <View style={styles.modalHeader}>
                         <Text style={styles.ChooseLanguageText}>{Lang_chg.ChooseyourlanguageTxt[config.language]}</Text>
                         </View>
                         <View style={styles.languageDataStyle}>

                     <FlatList
                      data={languages}
                      numColumns={2}
                       renderItem={({ item ,index}) =>
                      <View style={{ paddingVertical: mobileW * 3 / 100, alignSelf: "center",marginTop:mobileW*0.5/100 }}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedIndex1(item)} style={styles.languageText}>
                      <Text style={styles.lan_name}>{item.lan_name}</Text>
                      <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', }}>
                      <View style={{ width: mobileW * 22 / 100, alignSelf: "center",}}>
                     
                      <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular }}>{item.name}</Text>
                      </View>
                   <TouchableOpacity activeOpacity={0.8}onPress={() => setSelectedIndex1(item)} style={[{ borderColor: item.toggle ? Colors.themecolor : Colors.gray },styles.redioButtonBorder]}>
                      <View  style={[{ backgroundColor: item.toggle ? Colors.themecolor : Colors.white_color, },styles.redioButtonbackground]}></View>
                      </TouchableOpacity>
                      </View>
                      </TouchableOpacity>
                      </View>} />
                       <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={styles.modaldone_txt}>
                       <Text style={styles.Done_text}>{Lang_chg.DONETxt[config.language]}</Text>
                    </TouchableOpacity>
                    </View>
                   
                    </View>
                    </Modal>
                    </View>
          
                       <ScrollView>
             
                <View style={{margin:mobileW*6/100, }}>

                <Text style={styles.loginText}>{Lang_chg.SignUpTxt[config.language]}</Text>
                <Text style={styles.topText}>{Lang_chg.SwitchProfileTxt[config.language]}</Text>

                
                 {/* Radio buton ====================== */}
                <View style={styles.maven_view}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => SetMode("maven")}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.RadioBtn, { borderColor: global.togalemode === 'maven' ? Colors.themecolor : Colors.themecolor }]}>
                 <View style={{width: mobileW * 3 / 100, height: mobileW * 3 / 100, backgroundColor: global.togalemode === 'maven' ? Colors.themecolor :'#F5F5F5',borderRadius: mobileW * 10 / 100,}}>
                </View>
                </View>
                <Text style={styles.maven_txt}>{Lang_chg.MavenTxt[config.language]}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => SetMode("learner")}>
                <View style={styles.learner_view}>
                <View style={[styles.RadioBtn, { borderColor: global.togalemode === 'learner' ? Colors.themecolor : Colors.themecolor}]}>
                <View style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, backgroundColor: global.togalemode === 'learner' ? Colors.themecolor :'#F5F5F5', borderRadius: mobileW * 10 / 100 }}>
                </View>
                </View>
                <Text style={styles.maven_txt}>{Lang_chg.LearnerTxt[config.language]}</Text>
                </View>
                </TouchableOpacity>
                 </View>

              {global.togalemode === 'learner' ?
              <Text style={styles.RadioBtn_txt}>{Lang_chg.LearnerGuidanceTxt[config.language]}</Text> 
                          :
              <Text style={styles.RadioBtn_txt}>{Lang_chg.MentorGuideTxt[config.language]}</Text>
              }

             <View style={[styles.textinput_view,{marginTop:mobileW*7/100}]}>
             <TextInput
             placeholderTextColor={Colors.gray}
             fontSize={mobileW*3.3/100}
             placeholder ={Lang_chg.FullName[config.language]}
             paddingHorizontal={mobileW*5/100}
        
             fontFamily={Font.FontRegular}
             onChangeText={(txt) => setFullname(txt)} 
             style={styles.inputContainerStyle}>
             </TextInput>
               </View>
               <View style={styles.textinput_view}>
                {/* <TextInput  
                   placeholderTextColor={Colors.gray}
                color={Colors.themecolor}
               fontFamily={Font.FontRegular}
                // onChangeText={(newEmail) => { setEmail(newEmail) }}
                label="Email*" variant="outlined"
                onChangeText={(newEmail) => { setEmail(newEmail) }}label={Lang_chg.Email[config.language]}  variant="outlined"
                inputContainerStyle  ={{width:mobileW*87/100,height:mobileW*13.2/100,backgroundColor:'#FAFAFA',borderColor:Colors.l,borderWidth:mobileW*-0.1/100, fontSize:mobileW*3/100, borderRadius:mobileW*1/100}}
                 trailing={props => (<Text></Text>)}/> */}
            <TextInput
             placeholderTextColor={Colors.gray}
             fontSize={mobileW*3.3/100}
             placeholder ={Lang_chg.Email[config.language]}
             paddingHorizontal={mobileW*5/100}
             color={colors.gray}
             fontFamily={Font.FontRegular}
             onChangeText={(newEmail) => setEmail(newEmail)} 
             style={styles.inputContainerStyle}>
             </TextInput>


               </View>
              {/* ================== Phone ====================== */}
            <PhoneInput
              ref={phoneInput}
              defaultCode="IN"
              layout="first"
              withShadow
              containerStyle={styles.containerstyle}
              fontFamily={Font.FontRegular}
              textContainerStyle={styles.textContainerStyle} onChangeText={(text) => {
              setValue(text); }}
              onChangeFormattedText={(text) => {
              setFormattedValue(text);
               setCountryCode(phoneInput.current?.getCountryCode() ||'');}}/>
           
              <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible1(true)}style={styles.containerstyle}>
              
               <Text style={styles.selectLanguage}>{language}</Text>
               </TouchableOpacity>
             
               <TouchableOpacity activeOpacity={0.8} onPress={() => {_loginBtn()}} style={styles.LoginView}>
               <Text style={styles.signup_txt}>{Lang_chg.SIGNUPbtnTxt[config.language]}</Text>
               </TouchableOpacity>
               <View style={{ flexDirection: 'row', marginTop: mobileW * 5 / 100, alignItems: "center" }}>
               <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
               {shouldShow ? (                                                                                
               <Image style={styles.right_image} source={require("./Icon/right.png")}></Image>) :
               <Image style={styles.square_image} source={require("./Icon/square.png")}></Image>}
               </TouchableOpacity>

               <View style={styles.Terms_VIEW}>

               <Text style={styles.agreed_txt}>{Lang_chg.IagreedtoTxt[config.language]}</Text>
               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Terms')}>
               <Text style={styles.Terms_TExt}>{Lang_chg.Termsandconditions[config.language]}</Text>
               </TouchableOpacity>
               </View>
               </View>
                
              </View>
              </ScrollView>
              </SafeAreaView>
              </View>
              )}
export default Msignup
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainerStyle:{
    color:Colors.gray,
    borderColor:'#E7E8EA',
    backgroundColor:'#FAFAFA',
  width:mobileW*88/100,
  height:mobileW*13.2/100,
  borderRadius:mobileW*1/100,
  borderWidth:mobileW*0.3/100,
  },
  backIcon: {
    width: mobileW * 7/ 100,
    height: mobileW * 6.5/ 100,
  },
  backIcon_: {
    width: mobileW * 6/ 100,
    height: mobileW * 6/ 100,
    tintColor:Colors.black_color,
       },
  learner_view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: mobileW * 5 / 100
  },
  lan_name: {
    color: Colors.gray,
    alignSelf:'flex-start',
    fontFamily:Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  mavenowLogo: {
    alignSelf: 'center',
    marginTop:mobileW*14/100,
    width: mobileW * 70 / 100,
    height: mobileW * 18 / 100,
  },
  loginText: {
    color: Colors.black_color,
    fontFamily:Font.FontMedium,
    fontSize: mobileW * 4.5 / 100,
  },
  maven_view: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: mobileW * 5 / 100,
  },
  cardView: {
    width: mobileW,
    height: mobileH * 85 / 100,
    padding: mobileW * 7.5 / 100,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: mobileW * 10 / 100
  },
  topText: {
    color:'#9B9B9B',
    fontFamily:Font.FontRegular,
    fontSize:mobileW*3.4/100,
  },
  RadioBtn: {
    alignItems:"center",
    justifyContent:'center',
    width: mobileW * 5 / 100,
    height:mobileW * 5 / 100,
    borderRadius:mobileW * 10 / 100,
    borderWidth:mobileW * 0.40 / 100,
  },
  containerstyle: {
    color:Colors.gray ,
    borderColor:'#E7E8EA',
    backgroundColor:'#FAFAFA',
    fontFamily:Font.FontRegular,
    width:mobileW*88/100,
    height:mobileW*13.2/100,
    borderRadius:mobileW*1/100,
    borderWidth:mobileW*0.3/100,
    marginTop: mobileW * 2 / 100,  
  },
  textContainerStyle:{ 
    paddingVertical: 0, 
    paddingHorizontal: 0, 
    borderColor:Colors.gray ,
    backgroundColor:'#FAFAFA',
    fontFamily:Font.FontRegular, 
    borderWidth:mobileW*0.01/100,
  },
  language_modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000096'
  },
  selectLanguage:{
    padding:mobileW*2/100,
    marginTop:mobileW*1/100,
    fontSize:mobileW*3.3/100,
    color:Colors.gray,
    fontFamily:Font.FontRegular
  },
  LoginView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: mobileW * 12.5 / 100,
    marginTop: mobileW * 7 / 100,
    borderRadius: mobileW * 1.5/ 100,
    backgroundColor: Colors.themecolor,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  GIF_modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center', 
    backgroundColor: '#00000090',
  },
  GIF_Images: {
    alignSelf: "center",
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100,
  },
  redioButtonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    marginTop: mobileW * -3 / 100,
    borderRadius: mobileW * 5 / 100,
    borderWidth: mobileW * 0.55 / 100,
  },
  redioButtonbackground: {
    width: mobileW * 3 / 100,
    height: mobileW * 3 / 100,
    borderRadius: mobileW * 5 / 100,
  },
  modalHeader: {
    width: mobileW * 85 / 100,
    height: mobileW * 12 / 100,
    backgroundColor: Colors.white_color,
  },
  ChooseLanguageText: {
    color: Colors.black_color,
    fontFamily:Font.FontMedium,
    padding:mobileW*3/100,
    fontSize: mobileW * 4/ 100,
  },
  languageDataStyle: {
    backgroundColor: Colors.white_color,
    width: mobileW * 85 / 100,
    paddingBottom:mobileW*2/100,
    elevation: mobileW * 2 / 100,
    paddingHorizontal:mobileW*3/100,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100
  },
  languageText: {
    borderColor: Colors.gray,
    backgroundColor: Colors.white_color,
    padding:mobileW*3.5/100,
    width: mobileW * 35 / 100,
    height: mobileW * 20 / 100,
    borderRadius: mobileW * 1 / 100,
    elevation: mobileW * 0.45 / 100,
    borderWidth: mobileW * 0.1 / 100,
    marginHorizontal: mobileW * 2.3 / 100,
  },
  maven_txt: { 
    color: Colors.black_color ,
    fontFamily:Font.FontRegular,
    fontSize:mobileW*3.5/100,
    marginHorizontal: mobileW * 2 / 100, 
  },
  RadioBtn_txt: { 
    color: '#9B9B9B',
    fontFamily:Font.FontRegular,
    fontSize: mobileW * 3 / 100, 
    marginTop: mobileW * 2 / 100, 
  },
  signup_txt: { 
    color: Colors.white_color,
    fontFamily:Font.FontSemiBold ,
    fontSize: mobileW * 4 / 100, 
  },
  Terms_TExt: {
    color: Colors.themecolor,
    fontFamily:Font.FontMedium,
    fontSize: mobileW * 3.2 / 100,
    marginTop: mobileW * 0.3 / 100,
    marginHorizontal:mobileW*1/100,
  },
  square_image: {
    borderColor:'#E7E8EA',
    tintColor: Colors.gray,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderWidth: mobileW * 0.1 / 100,
    borderRadius: mobileW * 0.8 / 100,
  },
  Top_view: { 
    width: mobileW, 
    height: mobileH * 20 / 100, 
    padding: mobileW * 3 / 100, 
  },
  Terms_VIEW: { 
    flexDirection: 'row', 
    alignItems: "center" ,
    marginHorizontal: mobileW * 2 / 100, 
  },
  agreed_txt: { 
    color: Colors.black_color ,
    fontFamily:Font.FontRegular,
    fontSize: mobileW * 3.4 / 100, 
  },
  Done_text: {
    alignSelf: "center",
    color: Colors.white_color,
    fontFamily:Font.FontMedium,
    fontSize: mobileW * 4.5 / 100,
  },
  right_image: {
    alignSelf: 'center',
    tintColor: Colors.white_color,
    backgroundColor: Colors.themecolor,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 1 / 100
  },
  textinput_view: { 
    marginTop: mobileW * 3 / 100,
  },
  Learner_text: { 
    color: Colors.black_color ,
    marginHorizontal: mobileW * 2 / 100, 
  },
  modaldone_txt: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.themecolor,
    marginTop:mobileW*3/100,
    width: mobileW * 78 / 100,
    height: mobileW * 11 / 100,
    marginBottom:mobileW*3/100,
    borderRadius: mobileW * 1 / 100,
  },
  SafeAreaView: { 
    flex: 0, 
    backgroundColor: Colors.white_color 
  }
})
















// import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList ,} from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Colors } from './Provider/Colorsfont';
// import PhoneInput from 'react-native-phone-number-input';
// import { Stack, TextInput, } from "@react-native-material/core";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import NetInfo from '@react-native-community/netinfo';
// import DeviceInfo from 'react-native-device-info';
// import axios from "axios"
// import { color } from 'react-native-reanimated';
// import { colors } from 'react-native-elements';
// // import firebase from './App/Firebase/firebaseConfig
// import {SignUpUser} from './App/Firebase/SignUp';
// import {Firebase} from './App/Firebase/firebaseConfig';
// import {AddUser} from './App/Firebase/Users'
// const Msignup = ({ navigation }) => {

//   const [select, SetSelect] = useState('Maven')
//   console.log(SetSelect,'.....................................SetSelect...........');
//   const [modalVisible1, setModalVisible1] = useState(false);
//   const [validationmodal, setvalidationmodal] = useState(false);
//   const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
//   const [shouldShow, setShouldShow] = useState(false);
//   const [mobile_number, setValue] = useState('');
//   const [language, setlanguage] = useState('');
//   const [languageId, setlanguageId] = useState('Select anguage');
//   const [countryCode, setCountryCode] = useState('');
//   const [formattedValue, setFormattedValue] = useState('');
//   const [fullname, setFullname] = useState('')
//   const [email, setEmail] = useState('')
//   const [languages, setlanguages] = useState('');
//   const [DeviceId, setDeviceId] = useState('');
//   const [validation, setvalidation] = useState('');
//   const [checked, setChecked] = useState('current')
//   const[toggle,settogle]=useState('toggle');
//   const phoneInput = useRef(null);
//   const [BothMode,setBothMode] =useState('');


//             console.log('=====================!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>', select);



// // ================ set  mode maven or learner ==========
// {/* <TouchableOpacity onPress={() => SetMode('learner')} style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0 / 100, backgroundColor: isEnabled == "learner" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.white_color : Colors.gray }} /> */}
//               // <TouchableOpacity onPress={() => SetMode('maven') } style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0/ 100, backgroundColor: isEnabled == "maven" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.gray : Colors.white_color }} />


// // const SetSelect = async(data) =>{
// //   if(data=='maven'){
// //     global.togalemode = "maven"
// //    await localStorage.SetSelect('UserMode',data)
// //    SetSelect('maven')
// //   }else{
// //     global.togalemode = "learner"
// //    await localStorage.SetSelect('UserMode',data)
// //    SetSelect('learner')
// //    }
// //    }


// //  await localStorage.setItemString('select', select);



//           // =====================================================
// useEffect(() => {
// TogetDeviceId()
//     apiCalling();
//      const unsubscribe = NetInfo.addEventListener((state) => {
//       if (state.isConnected == false) {
//         alert(
//           "Please check your internet connection",
//         );
//       }
//     });
//     return () => {
//  unsubscribe();
//     };

//   }, []);

// const TogetDeviceId = async () => {
//     var uniqueId = await DeviceInfo.getUniqueId();
//     setDeviceId(uniqueId)
//     console.log('uniqueId=======>>>>>>', uniqueId);
//   }
//                                         //  =======================================> toSetMode <=======================================
                                                       
//                                        //  =======================================> toSetMode <=======================================

//   // ============ Api Calling to get Languages ===============
//   const apiCalling = () => {
//     axios.get('https://mavenow.com:8001/user/GetLanguages')
//       .then(res => {
//         const nameList = res.data.result;
//         // const imageArray = nameList.result;
//         console.log('---------->!! namelist --> !!', nameList)
//         // for(let i=0;i<=languages.length;i++){
//         //   nameList[0].toggle = true
//         //   setlanguage((nameList[0].name))
//         //   config.language = 0

//         // }
//         // setlanguages([...nameList]);
// setlanguages(nameList)
//          })
//       .catch(function (error) {
//         console.log('---------->', error);
//       }); }

//   // ========================================================
//   const setSelectedIndex1 = (item ,index) => {
// console.log('-----------------',item);
//     for(let i=0;i<=languages.length;i++){
//       if(item.code=="en"){
//         config.language = 0
//       } if(item.code=="hi"){
//         config.language = 1
//       }if(item.code=="es"){
//         config.language = 2
//       }
//       if(item.code=="nl"){
//         config.language = 3
//       }
//       if(item.code=="fr"){
//         config.language = 4
//       }
//       if(item.code=="th"){
//         config.language = 5
//       }
//       if(item.code=="ar"){
//         config.language = 6
//       }
//       if(item.code=="zh"){
//         config.language = 7
//       }
//     }
//     languages.forEach((elem) => {
//       elem.toggle = false
//       if (elem.id === item.id) {
//         elem.toggle = true
//         setlanguage(elem.name)
//         setlanguageId(elem.id)  } })
//     setlanguages([...languages]);
//   }; 

//   // await localStorage.setItemObject('dataTOSend', dataTOSend);

//  const _loginBtn = async() => {
//   await localStorage.setItemString('select', select);
// console.log('Before validation');
//  if (shouldShow == false) {
//       msgProvider.toast(msgText.acceptTerms[config.language], 'center')
//       return false
//     }
//     // ======================== Validations for Signup ==================
//     // {fullname.length==""?Colors.red:Colors.themecolor}
//     // if (fullname.length <= 0?Colors.red:Colors.themecolor && email.length <= 0 && mobile_number.length <= 0) {
//     //   msgProvider.toast(msgText.Sign_In_or_Login_error_msg[config.language], 'center')
//     //   return false
//     // }
//     //=====================All Fields Check================

//     if (fullname.length <= 0) {
//       msgProvider.toast(msgText.accountHolderName[config.language], 'center')
//       return false
//     }

//     if (fullname.length <= 2) {
//       msgProvider.toast(msgText.firstNameMinLength[config.language], 'center')
//       return false
//     }
//     //===========email============================
//     if (email.length <= 0) {
//       msgProvider.toast(msgText.emptyEmail[config.language], 'center')
//       setEmail('NA')
//       return false
//     }
//     var reg = config.emailvalidation;
//     if (reg.test(email) !== true) {
//       msgProvider.toast(msgText.validEmail[config.language], 'center')
//       setEmail('NA')
//       return false
//     }
//     //======================================mobile============================
//     if (mobile_number.length <= 9) {
//       msgProvider.toast(msgText.emptyMobile[config.language], 'center')
//       return false
//     }
//     if (language.length <= 0) {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }
//     if (mobile_number.length > 13) {
//       msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
//       return false
//     }
//     var mobilevalidation = config.mobilevalidation;
//     if (mobilevalidation.test(mobile_number) !== true) {
//       msgProvider.toast(msgText.validMobile[config.language], 'center')
//       return false
//     }
  
//     if (language == 'Select language') {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }



//     if (select == "Maven") {
//       var isUserType = 1;
//     } else {
//       var isUserType = 2;
//     }


//     setModalVisible_Gif(true)
//   console.log('After validation');
//   var dataTOSendToNextPage = {
//       fullName: fullname,
//       email: email,
//       mobile: mobile_number,
//       countryCode: countryCode,
//       userType: isUserType,
//       firebaseToken: "",
//       deviceId: DeviceId,
//       lcid: languageId,
//       fullname:fullname
//     }

//     var dataTOSend = {
//       mobileNo: mobile_number,
//       countryCode: countryCode,
//       email: email,
//       fullName: fullname
//     }

//     let config12 = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: config.baseURL + 'registration/otp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataTOSend
//     };

//        axios.request(config12)
//        .then(async (response) => {
//         console.log('-------------------------- sign up screen>>', response.data);
//         // var user_arr = response.data;
//         var otpsuccesses = response.data.ErrorCode;
//         console.log("otpsuccesses====================================", otpsuccesses);
//         var ErrorMessage = response.data.ErrorMessage;
//         if (otpsuccesses == 200) {
//           setModalVisible_Gif(false)
//           await localStorage.setItemObject('dataTOSend', dataTOSend);
//           var userId = response.data.registrationOTP._id
//           console.log('userId------>>>sign up screen ', userId);
//           // navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false })
//           SignUPtoFIrebase(dataTOSendToNextPage)
//           navigation.navigate('VerificationCode',{mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false})
//         }
//         else {
//           setTimeout(() => {
//             msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
//             return false;
//            }, 2000);
//         }
//         })
//        .catch((error) => {
//         console.log(error);
//           }); }

//                                                         // =========     sign up to firebase   =============                      
//             const  SignUPtoFIrebase = async (dataTOSendToNextPage) => {
//             SignUpUser(email, '123456',)
//            .then(async (res) => {
//             console.log('res sign up screen datA  =========================>', res);
//      console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!undefinesd',res.user.uid);
//             // console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!undefinesd',res.user.uid);
//               // var userUID = Firebase.auth().currentUser.uid;
//               var userUID = res.user.uid;
//               // var userfcmToken = Firebase.auth().currentUser.Token;
//               // AddUser(name, email, '', userUID,fcmToken).o
//               console.log('name', email, userUID,'fcmToken',);
//               AddUser(fullname, email, userUID,'fcmToken',mobile_number);
//               const uid = res.user.uid;
//               // const fcmToken = Firebase.auth().currentUser.fcmToken;
              
//               console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
//               await AsyncStorage.setItem('UID', uid);
                 
//               //  await AsyncStorage.setItem('Token', fcmToken);
//                 navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false })
//               .then(async () => {
//                     //navigation.navigate('VerificationCode', {mobile_number: mobile_number, dataTOSend: dataTOSend, isLoginScreen: false})
//                       // this.setState({ loader: false });
//                       // await AsyncStorage.setItem('UID', userUID);
//                       // this.props.navigation.navigate('Dashboard');
//                   }).
//                   catch((error) => {
//                       alert(error);
//                       })
//                       console.log(userUID);
//                       })
//                  }
//                  // ==================================================================================================================== >>
//   return (
//           <View style={{ flex: 1, backgroundColor: Colors.themecolor}}>
//           <SafeAreaView style={styles.SafeAreaView}>
//           <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
//           <ScrollView>

//           {/* -------------------------------------  gif modal */}
//               <View>
//               <Modal animationType="slide"
//                transparent={true}
//               visible={ModalVisible_Gif}
//               onRequestClose={() => {
//               setModalVisible_Gif(!ModalVisible_Gif);}}>
//               <View style={styles.GIF_modal}>
//               <Image style={styles.GIF_Images} source={require("./Icon/neighcoach_loader.gif")}></Image>
//               </View>
//               </Modal>
//               </View>
//  {/* --------------------------------------------------------------------------------------- modaL ------------------------------------------------------------------------------------- */}
//               <View>
//               <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible1}
//               onRequestClose={() => {
//               setModalVisible1(!modalVisible1); }}>
//               <View style={styles.language_modal}>
//               <View style={styles.modalHeader}>
//               <Text style={styles.ChooseLanguageText}>Choose your language</Text>
//               </View>
//               <View style={styles.languageDataStyle}>

//                      <FlatList
//                       data={languages}
//                       numColumns={2}
//                        renderItem={({ item ,index}) =>
//                       <View style={{ paddingVertical: mobileW * 3 / 100, alignSelf: "center", }} >
//                       <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedIndex1(item)} style={styles.languageText}>
//                       <View style={{ width: mobileW * 22 / 100, alignSelf: "center",  }}>
//                       <Text style={styles.lan_name}>{item.lan_name}</Text>
//                       <Text style={{ color: Colors.black_color, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{item.name}</Text>
//                       </View>

//                           {/* ================= Radio Button ================== */}

//                       <TouchableOpacity activeOpacity={0.8}onPress={() => setSelectedIndex1(item)} style={[{ borderColor: item.toggle ? Colors.themecolor : Colors.gray },styles.redioButtonBorder]}>
//                       <View  style={[{ backgroundColor: item.toggle ? Colors.themecolor : Colors.white_color, },styles.redioButtonbackground]}></View>
//                       </TouchableOpacity>
//                       </TouchableOpacity>
//                       </View>} />
//                        <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={styles.modaldone_txt}>
//                        <Text style={styles.Done_text}>{Lang_chg.DoneTxt[config.language]}</Text>
//                     </TouchableOpacity>
//                     </View>
//                     </View>
//                     </Modal>
//                     </View>
//            {/* ================== MODEL ==================== */}
//             <View style={styles.Top_view}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//             <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
//             </TouchableOpacity>
//             <Image style={styles.mavenowLogo} resizeMode='contain' source={require("./Icon/new_logo_mavenow.png")}></Image>
//             <View style={{ alignItems: 'center',}}>
//             <Text style={styles.loginText}>{Lang_chg.SignUpTxt[config.language]}</Text>
//             </View>
//             </View>
//             <View style={styles.cardView}>
//             <View>

//              <Text style={styles.topText}>{Lang_chg.SwitchProfileTxt[config.language]}</Text>

//             </View>

//             {/*======================= Radio buton ====================== */}
//                 <View style={styles.maven_view}>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Maven')}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <View style={[styles.RadioBtn, { borderColor: select === 'Maven' ? Colors.themecolor : Colors.themecolor }]}>
//                  <View style={{width: mobileW * 3 / 100, height: mobileW * 3 / 100, backgroundColor: select === 'Maven' ? Colors.themecolor : Colors.white_color,borderRadius: mobileW * 10 / 100,}}>
//                 </View>
//                 </View>
//                 {/* <Text style={styles.maven_txt}>Maven</Text> */}
//                 <Text style={styles.maven_txt}>{Lang_chg.MavenTxt[config.language]}</Text>
//                 </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Learner')}>
//                 <View style={styles.learner_view}>
//                 <View style={[styles.RadioBtn, { borderColor: select === 'Learner' ? Colors.themecolor : Colors.themecolor }]}>
//                 <View style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, backgroundColor: select === 'Learner' ? Colors.themecolor : Colors.white_color, borderRadius: mobileW * 10 / 100 }}>
//                 </View>
//                 </View>
//                {/* <Text style={styles.Learner_text}>Learner</Text> */}
//                <Text style={styles.maven_txt}>{Lang_chg.LearnerTxt[config.language]}</Text>
//                </View>
//                </TouchableOpacity>
//                 </View>

//               {select === 'Learner' ?
//               <Text style={styles.RadioBtn_txt}>{Lang_chg.LearnerGuidanceTxt[config.language]}</Text> :
//               <Text style={styles.RadioBtn_txt}>{Lang_chg.MentorGuideTxt[config.language]}</Text>
//               }

//                <View style={styles.textinput_view}>


//               <TextInput style={{}}
// fontFamily={Font.FontRegular}
//              onChangeText={(txt) => setFullname(txt)}   
//               color={Colors.themecolor}label={Lang_chg.FullName[config.language]} variant="outlined"
//              trailing={props =>(<Text></Text>)}/>
//                </View>
//                <View style={styles.textinput_view}>
//                <TextInput color={Colors.themecolor}
//                fontFamily={Font.FontRegular}
//                 // onChangeText={(newEmail) => { setEmail(newEmail) }}label="Email*" variant="outlined"
//                 onChangeText={(newEmail) => { setEmail(newEmail) }}label={Lang_chg.Email[config.language]}  variant="outlined"
//                  trailing={props => (<Text></Text>)}/>
//                </View>
//               {/* ================== Phone ====================== */}
//             <PhoneInput
//               ref={phoneInput}
//               defaultCode="IN"
//               layout="first"
//               withShadow
//               containerStyle={styles.containerstyle}
//               fontFamily={Font.FontRegular}
//               textContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0, fontFamily:Font.FontRegular, backgroundColor: Colors.white_color,  borderRadius: mobileW * 1 / 100,}} onChangeText={(text) => {
//               setValue(text); }}
//               onChangeFormattedText={(text) => {
//               setFormattedValue(text);
//                setCountryCode(phoneInput.current?.getCountryCode() ||'');}}/>
           
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible1(true)}style={{ marginTop: mobileW * 2 / 100,}}>
//               <TextInput value={language}  placeholderTextColor={"black"} onChangeText={(newEmail) => { setlanguage(newEmail) }}

//                editable={false} placeholder={Lang_chg.ChooselanguageTxt[config.language]}   variant="outlined" trailing={props => (<Text></Text>)} />

//                </TouchableOpacity>
//                <View style={{ flexDirection: 'row', marginTop: mobileW * 5 / 100, alignItems: "center" }}>
//                <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
//                {shouldShow ? (                                                                                
//                <Image style={styles.right_image} source={require("./Icon/right.png")}></Image>) :
//                <Image style={styles.square_image} source={require("./Icon/square.png")}></Image>}
//                </TouchableOpacity>

//                <View style={styles.Terms_VIEW}>
//                <Text style={styles.agreed_txt}>{Lang_chg.IagreedtoTxt[config.language]}</Text>
//                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Terms')}>
//                {/* <Text style={styles.Terms_TExt}>Terms and Conditions</Text> */}
//                <Text style={styles.Terms_TExt}>{Lang_chg.Termsandconditions[config.language]}</Text>
//                </TouchableOpacity>
//                </View>

//                </View>
//                <TouchableOpacity activeOpacity={0.8} onPress={() => _loginBtn()} style={styles.LoginView}>
//                <Text style={styles.signup_txt}>{Lang_chg.SIGNUPbtnTxt[config.language]}</Text>
//                </TouchableOpacity>
//                </View>
//                </ScrollView>
//                </SafeAreaView>
//               </View>
//               )}
// export default Msignup
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   backIcon: {
//     width: mobileW * 10/ 100,
//     height: mobileW * 10 / 100,
//     tintColor: Colors.white_color
//   },
//   learner_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: mobileW * 5 / 100
//   },
//   lan_name: {
//     color: Colors.black_color,
//     fontSize: mobileW * 4 / 100,
//     fontFamily:Font.FontRegular
//   },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 18 / 100,
//     alignSelf: 'center',
//     marginTop:mobileW*-5/100
//   },
//   loginText: {
//     fontSize: mobileW * 4.5 / 100,
//     color: Colors.black_color,
//     fontFamily:Font.FontMedium,
//     marginTop: mobileW * 1 / 100
//   },
//   maven_view: {
//     flexDirection: "row",
//     marginTop: mobileW * 5 / 100,
//     alignItems: "center"
//   },
//   cardView: {
//     width: mobileW,
//     height: mobileH * 85 / 100,
//     backgroundColor: Colors.whiteColor,
//     padding: mobileW * 7.5 / 100,
//     borderTopLeftRadius: mobileW * 10 / 100
//   },
//   topText: {
//     fontSize: mobileW * 3.4/ 100,
//     color: Colors.black_color,
// fontFamily:Font.FontSemiBold
//   },
//   RadioBtn: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     borderRadius: mobileW * 10 / 100,
//     borderWidth: mobileW * 0.40 / 100,
//     justifyContent: 'center',
//     alignItems: "center"
//   },
//   phoneView: {
//     justifyContent: 'center',
//     height: mobileW * 13 / 100,
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileW * 10 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: Colors.gray,
//     borderWidth: mobileW * 0.55,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   containerstyle: {
//     width: mobileW * 85 / 100,
//     height: mobileW * 15 / 100,
//     backgroundColor: Colors.white_color ,
//     marginTop: mobileW * 2 / 100,
//     borderRadius: mobileW * 1 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: Colors.gray,
//     borderWidth: 0.80,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     fontFamily:Font.FontRegular
//   },
//   language_modal: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     backgroundColor: '#00000096'
//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 13 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileW * 10 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
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
//   redioButtonBorder: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     borderRadius: mobileW * 5 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: mobileW * 0.40 / 100,
//     // marginTop: mobileW * 5 / 100,
//     // margin: mobileW * 2 / 100
//   },
//   redioButtonbackground: {
//     width: mobileW * 3 / 100,
//     height: mobileW * 3 / 100,
//     borderRadius: mobileW * 5 / 100,
//   },
//   modalHeader: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 85 / 100,
//     height: mobileW * 12 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     justifyContent: 'center'
//   },
//   ChooseLanguageText: {
//     alignSelf: 'center',
//     color: Colors.whiteColor,
//     fontSize: mobileW * 3.5 / 100,
//     fontFamily:Font.FontMedium
//   },
//   languageDataStyle: {
//     backgroundColor: Colors.white_color,
//     width: mobileW * 85 / 100,
//     // height: mobileH * 53/ 100,
//     elevation: mobileW * 2 / 100,
//     paddingHorizontal:mobileW*3/100,
//     paddingBottom:mobileW*2/100,
//     // padding: mobileW * 3 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100
//   },
//   languageText: {
//     backgroundColor: Colors.whiteColor,
//     padding:mobileW*3/100,
//     flexDirection: "row",
//     borderRadius: mobileW * 1 / 100,
//     marginHorizontal: mobileW * 2.3 / 100,
//     alignItems:'center',
//     width: mobileW * 35 / 100,
//     justifyContent: "space-between",
//     height: mobileW * 18 / 100,
//     borderWidth: mobileW * 0.24 / 100,
//     borderColor: Colors.gray,
//     elevation: mobileW * 0.45 / 100
//   },
//   maven_txt: { 
//     marginHorizontal: mobileW * 2 / 100, 
//     color: Colors.black_color ,
//     fontFamily:Font.FontRegular
//   },
//   RadioBtn_txt: { 
//     fontSize: mobileW * 2.8 / 100, 
//     marginTop: mobileW * 3 / 100, 
//     color: Colors.gray,
//     fontFamily:Font.FontRegular
//   },
//   signup_txt: { 
//     fontSize: mobileW * 4 / 100, 
//     color: Colors.white_color,
//     fontFamily:Font.FontMedium 
//   },
//   Terms_TExt: {
//     color: Colors.themecolor,
//     fontSize: mobileW * 2.9 / 100,
//     marginTop: mobileW * 0.8 / 100,
//     textDecorationLine: "underline",
//     fontFamily:Font.FontMedium
//   },
//   square_image: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.gray,
//     borderWidth: mobileW * 0.5 / 100,
//     borderColor: Colors.gray,
//     borderRadius: mobileW * 0.8 / 100
//   },
//   Top_view: { 
//     width: mobileW, 
//     height: mobileH * 20 / 100, 
//     padding: mobileW * 3 / 100, 
//   },
//   Terms_VIEW: { 
//     flexDirection: 'row', 
//     marginHorizontal: mobileW * 2 / 100, 
//     alignItems: "center" 
//   },
//   agreed_txt: { 
//     fontSize: mobileW * 2.8 / 100, 
//     color: Colors.gray ,
//     fontFamily:Font.FontRegular
//   },
//   Done_text: {
//     alignSelf: "center",
//     color: Colors.white_color,
//     fontSize: mobileW * 4.5 / 100,
//     fontFamily:Font.FontMedium
//   },
//   right_image: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     backgroundColor: Colors.themecolor,
//     alignSelf: 'center',
//     tintColor: Colors.white_color,
//     borderRadius: mobileW * 1 / 100
//   },
//   textinput_view: { 
//     marginTop: mobileW * 2 / 100, 
 
//   },
//   Learner_text: { 
//     marginHorizontal: mobileW * 2 / 100, 
//     color: Colors.black_color 
//   },
//   modaldone_txt: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 78 / 100,
//     height: mobileW * 11 / 100,
//     borderRadius: mobileW * 1 / 100,
//     alignSelf: "center",
//     justifyContent: "center",
//   },
//   SafeAreaView: { 
//     flex: 0, 
//     backgroundColor: Colors.themecolor 
//   }
// })





// ----------------------------------------------- New design sign up screen  2nd screen ..---------------------------------




// import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList ,} from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Colors } from './Provider/Colorsfont';
// import PhoneInput from 'react-native-phone-number-input';
// import { Stack, TextInput, } from "@react-native-material/core";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import NetInfo from '@react-native-community/netinfo';
// import DeviceInfo from 'react-native-device-info';
// import axios from "axios"
// import { color } from 'react-native-reanimated';
// import { colors } from 'react-native-elements';
// // import firebase from './App/Firebase/firebaseConfig
// import {SignUpUser} from './App/Firebase/SignUp';
// import {Firebase} from './App/Firebase/firebaseConfig';
// import {AddUser} from './App/Firebase/Users'
// const Msignup = ({ navigation }) => {

//   const [select, SetSelect] = useState('Maven')
//   console.log(SetSelect,'.....................................SetSelect...........');
//   const [modalVisible1, setModalVisible1] = useState(false);
//   const [validationmodal, setvalidationmodal] = useState(false);
//   const [ModalVisible_Gif, setModalVisible_Gif] = useState(false);
//   const [shouldShow, setShouldShow] = useState(false);
//   const [mobile_number, setValue] = useState('');
//   const [language, setlanguage] = useState('');
//   const [languageId, setlanguageId] = useState('Select anguage');
//   const [countryCode, setCountryCode] = useState('');
//   const [formattedValue, setFormattedValue] = useState('');
//   const [fullname, setFullname] = useState('')
//   const [email, setEmail] = useState('')
//   const [languages, setlanguages] = useState('');
//   const [DeviceId, setDeviceId] = useState('');
//   const [validation, setvalidation] = useState('');
//   const [checked, setChecked] = useState('current')
//   const[toggle,settogle]=useState('toggle');
//   const phoneInput = useRef(null);
//   const [BothMode,setBothMode] =useState('');

// console.log('=====================!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>', select);



// // ================ set  mode maven or learner ==========
// {/* <TouchableOpacity onPress={() => SetMode('learner')} style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0 / 100, backgroundColor: isEnabled == "learner" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.white_color : Colors.gray }} /> */}
//               // <TouchableOpacity onPress={() => SetMode('maven') } style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5/ 100, borderRadius: mobileW * 3 / 100, borderWidth: mobileW * 0.0/ 100, backgroundColor: isEnabled == "maven" ? Colors.themecolor : Colors.white_color, borderColor: isEnabled == "maven" ? Colors.gray : Colors.white_color }} />


// // const SetSelect = async(data) =>{
// //   if(data=='maven'){
// //     global.togalemode = "maven"
// //    await localStorage.SetSelect('UserMode',data)
// //    SetSelect('maven')
// //   }else{
// //     global.togalemode = "learner"
// //    await localStorage.SetSelect('UserMode',data)
// //    SetSelect('learner')
// //    }
// //    }


// //  await localStorage.setItemString('select', select);



//           // =====================================================
// useEffect(() => {
// TogetDeviceId()
//     apiCalling();
//      const unsubscribe = NetInfo.addEventListener((state) => {
//       if (state.isConnected == false) {
//         alert(
//           "Please check your internet connection",
//         );
//       }
//     });
//     return () => {
//  unsubscribe();
//     };

//   }, []);

// const TogetDeviceId = async () => {
//     var uniqueId = await DeviceInfo.getUniqueId();
//     setDeviceId(uniqueId)
//     console.log('uniqueId=======>>>>>>', uniqueId);
//   }
//                                         //  =======================================> toSetMode <=======================================
                                                       
//                                        //  =======================================> toSetMode <=======================================

//   // ============ Api Calling to get Languages ===============
//   const apiCalling = () => {
//     axios.get('https://mavenow.com:8001/user/GetLanguages')
//       .then(res => {
//         const nameList = res.data.result;
//         // const imageArray = nameList.result;
//         console.log('---------->', nameList)
//             for (let i=0;i<=languages.length;i++){
//               nameList[0].toggle=true;
//               setlanguages(nameList)
//               console.log(setlanguages,'setlanguages===============');
//             }

//         setlanguages(nameList)
//          })
//       .catch(function (error) {
//         console.log('---------->', error);
//       }); }

//   // ===========================================0=============
//   const setSelectedIndex1 = (item ,index) => {
// console.log('-----------------',item);
//     for(let i=0;i<=languages.length;i++){
//       if(item.code=="en"){
//         config.language = 0
//       } if(item.code=="hi"){
//         config.language = 1
//       }if(item.code=="es"){
//         config.language = 2
//       }
//       if(item.code=="nl"){
//         config.language = 3
//       }
//       if(item.code=="fr"){
//         config.language = 4
//       }
//       if(item.code=="th"){
//         config.language = 5
//       }
//       if(item.code=="ar"){
//         config.language = 6
//       }
//       if(item.code=="zh"){
//         config.language = 7
//       }
//     }
//     languages.forEach((elem) => {
//       elem.toggle = false
//       if (elem.id === item.id) {
//         elem.toggle = true
//         setlanguage(elem.name)
//         setlanguageId(elem.id)  } })
//     setlanguages([...languages]);
//   }; 

//   // await localStorage.setItemObject('dataTOSend', dataTOSend);

//  const _loginBtn = async() => {
//   await localStorage.setItemString('select', select);
// console.log('Before validation');
//  if (shouldShow == false) {
//       msgProvider.toast(msgText.acceptTerms[config.language], 'center')
//       return false
//     }
//     // ======================== Validations for Signup ==================
//     // {fullname.length==""?Colors.red:Colors.themecolor}
//     // if (fullname.length <= 0?Colors.red:Colors.themecolor && email.length <= 0 && mobile_number.length <= 0) {
//     //   msgProvider.toast(msgText.Sign_In_or_Login_error_msg[config.language], 'center')
//     //   return false
//     // }
//     //=====================All Fields Check================

//     if (fullname.length <= 0) {
//       msgProvider.toast(msgText.accountHolderName[config.language], 'center')
//       return false
//     }

//     if (fullname.length <= 2) {
//       msgProvider.toast(msgText.firstNameMinLength[config.language], 'center')
//       return false
//     }
//     //===========email============================
//     if (email.length <= 0) {
//       msgProvider.toast(msgText.emptyEmail[config.language], 'center')
//       setEmail('NA')
//       return false
//     }
//     var reg = config.emailvalidation;
//     if (reg.test(email) !== true) {
//       msgProvider.toast(msgText.validEmail[config.language], 'center')
//       setEmail('NA')
//       return false
//     }
//     //======================================mobile============================
//     if (mobile_number.length <= 9) {
//       msgProvider.toast(msgText.emptyMobile[config.language], 'center')
//       return false
//     }
//     if (language.length <= 0) {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }
//     if (mobile_number.length > 13) {
//       msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
//       return false
//     }
//     var mobilevalidation = config.mobilevalidation;
//     if (mobilevalidation.test(mobile_number) !== true) {
//       msgProvider.toast(msgText.validMobile[config.language], 'center')
//       return false
//     }
  
//     if (language == 'Select language') {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }



//     if (select == "Maven") {
//       var isUserType = 1;
//     } else {
//       var isUserType = 2;
//     }


//     setModalVisible_Gif(true)
//   console.log('After validation');
//   var dataTOSendToNextPage = {
//       fullName: fullname,
//       email: email,
//       mobile: mobile_number,
//       countryCode: countryCode,
//       userType: isUserType,
//       firebaseToken: "",
//       deviceId: DeviceId,
//       lcid: languageId,
//       fullname:fullname
//     }

//     var dataTOSend = {
//       mobileNo: mobile_number,
//       countryCode: countryCode,
//       email: email,
//       fullName: fullname
//     }

//     let config12 = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: config.baseURL + 'registration/otp',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: dataTOSend
//     };

//     axios.request(config12)
//       .then(async (response) => {
//         console.log('-------------------------- sign up screen>>', response.data);
//         // var user_arr = response.data;
//         var otpsuccesses = response.data.ErrorCode;
//         console.log("otpsuccesses====================================", otpsuccesses);
//         var ErrorMessage = response.data.ErrorMessage;
//         if (otpsuccesses == 200) {
//           setModalVisible_Gif(false)
//           await localStorage.setItemObject('dataTOSend', dataTOSend);
//           var userId = response.data.registrationOTP._id
//           console.log('userId------>>>sign up screen ', userId);
//           // navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false })
//           SignUPtoFIrebase(dataTOSendToNextPage)
//           navigation.navigate('VerificationCode', {mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false})
//         }
//         else {
//           setTimeout(() => {
//             msgProvider.alert(msgTitle.information[config.language], ErrorMessage, false);
//             return false;
//            }, 2000);
//         }
//         })
//        .catch((error) => {
//         console.log(error);
//           }); }

//                                                         // =========     sign up to firebase   =============                      
//             const  SignUPtoFIrebase = async (dataTOSendToNextPage) => {
//             SignUpUser(email, '123456',)
//            .then(async (res) => {
//             console.log('res sign up screen datA  =========================>', res);
//      console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!undefinesd',res.user.uid);
//             // console.log('----->!!!!res.user.uid!!!!!!!!!!!!!!!!!!!!!undefinesd',res.user.uid);
//               // var userUID = Firebase.auth().currentUser.uid;
//               var userUID = res.user.uid;
//               // var userfcmToken = Firebase.auth().currentUser.Token;
//               // AddUser(name, email, '', userUID,fcmToken).o
//               console.log('name', email, userUID,'fcmToken',);
//               AddUser(fullname, email, userUID,'fcmToken',mobile_number);
//               const uid = res.user.uid;
//               // const fcmToken = Firebase.auth().currentUser.fcmToken;
              
//               console.log('==================uid !!!!!!!!!!!!!!!!!!! hey find me i am here',uid);
//               await AsyncStorage.setItem('UID', uid);
                 
//               //  await AsyncStorage.setItem('Token', fcmToken);
//                 navigation.navigate('VerificationCode', { mobile_number: mobile_number, dataTOSend: dataTOSendToNextPage, isLoginScreen: false })
//               .then(async () => {
//                     //navigation.navigate('VerificationCode', {mobile_number: mobile_number, dataTOSend: dataTOSend, isLoginScreen: false})
//                       // this.setState({ loader: false });
//                       // await AsyncStorage.setItem('UID', userUID);
//                       // this.props.navigation.navigate('Dashboard');
//                   }).
//                   catch((error) => {
//                       alert(error);
//                       })
//                       console.log(userUID);
//                       })
//                  }
//                  // ==================================================================================================================== >>
//   return (
//              <View style={{ flex: 1, }}>
//               {/* -------------------------------------  gif modal */}
//               <View>
//               <Modal animationType="slide"
//                transparent={true}
//               visible={ModalVisible_Gif}
//               onRequestClose={() => {
//               setModalVisible_Gif(!ModalVisible_Gif);}}>
//               <View style={styles.GIF_modal}>
//               <Image style={styles.GIF_Images} source={require("./Icon/neighcoach_loader.gif")}></Image>
//               </View>
//               </Modal>
//               </View>


//              {/* --------------------------------------------------------------------------------------- modaL ------------------------------------------------------------------------------------- */}
//                        <View>
//                         <Modal
//                         animationType="slide"
//                          transparent={true}
//                          visible={modalVisible1}
//                          onRequestClose={() => {
//                          setModalVisible1(!modalVisible1); }}>       
//                          <View style={styles.language_modal}>
//                          <View style={styles.modalHeader}>
//                          <Text style={styles.ChooseLanguageText}>{Lang_chg.ChooseyourlanguageTxt[config.language]}</Text>
//                          </View>
//                          <View style={styles.languageDataStyle}>

//                      <FlatList
//                       data={languages}
//                       numColumns={2}
//                        renderItem={({ item ,index}) =>
//                       <View style={{ paddingVertical: mobileW * 3 / 100, alignSelf: "center",marginTop:mobileW*0.5/100 }} >
//                       <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedIndex1(item)} style={styles.languageText}>
//                       <Text style={styles.lan_name}>{item.lan_name}</Text>
//                       <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', }}>
//                       <View style={{ width: mobileW * 22 / 100, alignSelf: "center",  }}>
                     
//                       <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular }}>{item.name}</Text>
//                       </View>
//                    <TouchableOpacity activeOpacity={0.8}onPress={() => setSelectedIndex1(item)} style={[{ borderColor: item.toggle ? Colors.themecolor : Colors.gray },styles.redioButtonBorder]}>
//                       <View  style={[{ backgroundColor: item.toggle ? Colors.themecolor : Colors.white_color, },styles.redioButtonbackground]}></View>
//                       </TouchableOpacity>
//                       </View>
//                       </TouchableOpacity>
//                       </View>} />
//                        <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={styles.modaldone_txt}>
//                        <Text style={styles.Done_text}>{Lang_chg.DONETxt[config.language]}</Text>
//                     </TouchableOpacity>
//                     </View>
                   
//                     </View>
//                     </Modal>
//                     </View>
          
//                        <ScrollView>
//                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//                  <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
//                  </TouchableOpacity>
//                  <Image style={styles.mavenowLogo} resizeMode='contain'source={require("./Icon/new_logo_blue_mavenow.png")}></Image>
//                  <View style={{padding:mobileW*6/100}}>
//                 <Text style={styles.loginText}>{Lang_chg.SignUpTxt[config.language]}</Text>
//                 <Text style={styles.topText}>{Lang_chg.SwitchProfileTxt[config.language]}</Text>
//                  {/*======================= Radio buton ====================== */}
//                 <View style={styles.maven_view}>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Maven')}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <View style={[styles.RadioBtn, { borderColor: select === 'Maven' ? Colors.themecolor : Colors.themecolor }]}>
//                  <View style={{width: mobileW * 3 / 100, height: mobileW * 3 / 100, backgroundColor: select === 'Maven' ? Colors.themecolor : Colors.white_color,borderRadius: mobileW * 10 / 100,}}>
//                 </View>
//                 </View>
//                              {/*<Text style={styles.maven_txt}>Maven</Text>*/}
//                         <Text style={styles.maven_txt}>{Lang_chg.MavenTxt[config.language]}</Text>
//                 </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Learner')}>
//                 <View style={styles.learner_view}>
//                 <View style={[styles.RadioBtn, { borderColor: select === 'Learner' ? Colors.themecolor : Colors.themecolor}]}>
//                 <View style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, backgroundColor: select === 'Learner' ? Colors.themecolor : Colors.white_color, borderRadius: mobileW * 10 / 100 }}>
//                 </View>
//                 </View>
//                 {/* <Text style={styles.Learner_text}>Learner</Text> */}
//                 <Text style={styles.maven_txt}>{Lang_chg.LearnerTxt[config.language]}</Text>
//                 </View>
//                 </TouchableOpacity>
//                  </View>

//               {select === 'Learner' ?
//               <Text style={styles.RadioBtn_txt}>{Lang_chg.LearnerGuidanceTxt[config.language]}</Text> :
//               <Text style={styles.RadioBtn_txt}>{Lang_chg.MentorGuideTxt[config.language]}</Text>
//               }

//                <View style={styles.textinput_view}>
//              <TextInput style={{}}
//              fontFamily={Font.FontRegular}
//              onChangeText={(txt) => setFullname(txt)}   
//               // color={fullname==""? Colors.red:Colors.themecolor}label={Lang_chg.FullName[config.language]} variant="outlined"
//            color={Colors.themecolor}label={Lang_chg.FullName[config.language]} variant="outlined"
//              trailing={props =>(<Text></Text>)}/>
//                </View>
//                <View style={styles.textinput_view}>
//                <TextInput  
//                 color={Colors.themecolor}
//                fontFamily={Font.FontRegular}
//                 // onChangeText={(newEmail) => { setEmail(newEmail) }}label="Email*" variant="outlined"
//                 onChangeText={(newEmail) => { setEmail(newEmail) }}label={Lang_chg.Email[config.language]}  variant="outlined"
//                  trailing={props => (<Text></Text>)}/>
//                </View>
//               {/* ================== Phone ====================== */}
//             <PhoneInput
//               ref={phoneInput}
//               defaultCode="IN"
//               layout="first"
//               withShadow
//               containerStyle={styles.containerstyle}
//               fontFamily={Font.FontRegular}
//               textContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0, fontFamily:Font.FontRegular, backgroundColor: Colors.white_color,  borderRadius: mobileW * 1 / 100,}} onChangeText={(text) => {
//               setValue(text); }}
//               onChangeFormattedText={(text) => {
//               setFormattedValue(text);
//                setCountryCode(phoneInput.current?.getCountryCode() ||'');}}/>
           
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible1(true)}style={{ marginTop: mobileW * 2 / 100,backgroundColor:Colors.white_color,borderRadius:mobileW*1/100,borderWidth:mobileW*0.2/100,borderColor:Colors.gray,height:mobileW*12.5/100 }}>
//                 <Text style={{padding:mobileW*2/100,marginTop:mobileW*1/100,color:Colors.black_color}}>{Lang_chg.lamguagename[config.language]}</Text>
//                 {/* <Text style={{padding:mobileW*2/100,marginTop:mobileW*1/100}}>English</Text> */}
//               {/* <TextInput value={language}  placeholderTextColor={"black"} onChangeText={(newEmail) => { setlanguage(newEmail) }}

//                editable={false} placeholder={Lang_chg.ChooselanguageTxt[config.language]}   variant="outlined" trailing={props => (<Text></Text>)} /> */}

//                </TouchableOpacity>
//                <View style={{ flexDirection: 'row', marginTop: mobileW * 5 / 100, alignItems: "center" }}>
//                <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
//                {shouldShow ? (                                                                                
//                <Image style={styles.right_image} source={require("./Icon/right.png")}></Image>) :
//                <Image style={styles.square_image} source={require("./Icon/square.png")}></Image>}
//                </TouchableOpacity>

//                <View style={styles.Terms_VIEW}>
//                <Text style={styles.agreed_txt}>{Lang_chg.IagreedtoTxt[config.language]}</Text>
//                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Terms')}>
//                {/* <Text style={styles.Terms_TExt}>Terms and Conditions</Text> */}
//                <Text style={styles.Terms_TExt}>{Lang_chg.Termsandconditions[config.language]}</Text>
//                </TouchableOpacity>
//                </View>
//                </View>
//                <TouchableOpacity activeOpacity={0.8} onPress={() => _loginBtn()} style={styles.LoginView}>
//                <Text style={styles.signup_txt}>{Lang_chg.SIGNUPbtnTxt[config.language]}</Text>
//                </TouchableOpacity>
//               </View>
//               </ScrollView>
//               </View>
//               )}
// export default Msignup
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   backIcon: {
//     width: mobileW * 10/ 100,
//     height: mobileW * 10 / 100,
//     marginTop:mobileW*1.5/100

//   },
//   learner_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: mobileW * 5 / 100
//   },
//   lan_name: {
//     color: Colors.gray,
//     fontSize: mobileW * 4 / 100,
//     fontFamily:Font.FontMedium,
//     alignSelf:'flex-start'
//   },
//   mavenowLogo: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 18 / 100,
//     alignSelf: 'center',
//     marginTop:mobileW*14/100
//   },
//   loginText: {
//     fontSize: mobileW * 4.5 / 100,
//     color: Colors.black_color,
//     fontFamily:Font.FontBold,
//     marginTop: mobileW * 1 / 100
//   },
//   maven_view: {
//     flexDirection: "row",
//     marginTop: mobileW * 5 / 100,
//     alignItems: "center"
//   },
//   cardView: {
//     width: mobileW,
//     height: mobileH * 85 / 100,
//     backgroundColor: Colors.whiteColor,
//     padding: mobileW * 7.5 / 100,
//     borderTopLeftRadius: mobileW * 10 / 100
//   },
//   topText: {
//     fontSize: mobileW * 3.5/ 100,
//     color: Colors.black_color,
// fontFamily:Font.FontRegular,
// marginTop:mobileW*2/100
//   },
//   RadioBtn: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     borderRadius: mobileW * 10 / 100,
//     borderWidth: mobileW * 0.40 / 100,
//     justifyContent: 'center',
//     alignItems: "center"
//   },
//   phoneView: {
//     justifyContent: 'center',
//     height: mobileW * 13 / 100,
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileW * 10 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: Colors.gray,
//     borderWidth: mobileW * 0.55,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   containerstyle: {
//     width: mobileW * 87.5 / 100,
//     height: mobileW * 15 / 100,
//     backgroundColor: Colors.white_color ,
//     marginTop: mobileW * 2 / 100,
//     borderRadius: mobileW * 1 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: Colors.gray,
//     borderWidth: 0.80,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     fontFamily:Font.FontRegular
//   },
//   language_modal: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     backgroundColor: '#00000096'
//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 12.5 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 1/ 100,
//     marginTop: mobileW * 10 / 100,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
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
//   redioButtonBorder: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     borderRadius: mobileW * 5 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: mobileW * 0.55 / 100,
//     marginTop: mobileW * -3 / 100,
//     // margin: mobileW * 2 / 100
//   },
//   redioButtonbackground: {
//     width: mobileW * 3 / 100,
//     height: mobileW * 3 / 100,
//     borderRadius: mobileW * 5 / 100,
//     // borderColor:Colors.redColor
//   },
//   modalHeader: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 85 / 100,
//     height: mobileW * 12 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     justifyContent: 'center',
//     // marginBottom:mobileW*2/100
//   },
//   ChooseLanguageText: {
//     alignSelf: 'center',
//     color: Colors.white_color,
//     fontSize: mobileW * 4.3
//      / 100,
//     fontFamily:Font.FontMedium
//   },
//   languageDataStyle: {
//     backgroundColor: Colors.white_color,
//     width: mobileW * 85 / 100,
//     // height: mobileH * 53/ 100,
//     elevation: mobileW * 2 / 100,
//     paddingHorizontal:mobileW*3/100,
//     paddingBottom:mobileW*2/100,
//     // padding: mobileW * 3 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100

//   },
//   languageText: {
//     backgroundColor: Colors.white_color,
//     padding:mobileW*3.5/100,
//     // flexDirection: "row",
//     borderRadius: mobileW * 1 / 100,
//     marginHorizontal: mobileW * 2.3 / 100,
//     // alignItems:'center',
//     width: mobileW * 35 / 100,
    
//     // justifyContent: "space-between",
//     height: mobileW * 20 / 100,
//     borderWidth: mobileW * 0.1 / 100,
//     borderColor: Colors.gray,
//     elevation: mobileW * 0.45 / 100
//   },
//   maven_txt: { 
//     marginHorizontal: mobileW * 2 / 100, 
//     color: Colors.black_color ,
//     fontFamily:Font.FontRegular
//   },
//   RadioBtn_txt: { 
//     fontSize: mobileW * 2.8 / 100, 
//     marginTop: mobileW * 3 / 100, 
//     color: Colors.gray,
//     fontFamily:Font.FontRegular
//   },
//   signup_txt: { 
//     fontSize: mobileW * 4.5 / 100, 
//     color: Colors.white_color,
//     fontFamily:Font.FontMedium 
//   },
//   Terms_TExt: {
//     color: Colors.themecolor,
//     fontSize: mobileW * 3.2 / 100,
//     marginTop: mobileW * 0.3 / 100,
//     textDecorationLine: "underline",
//     fontFamily:Font.FontRegular,
//     marginHorizontal:mobileW*1/100
//   },
//   square_image: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.gray,
//     borderWidth: mobileW * 0.5 / 100,
//     borderColor: Colors.gray,
//     borderRadius: mobileW * 0.8 / 100
//   },
//   Top_view: { 
//     width: mobileW, 
//     height: mobileH * 20 / 100, 
//     padding: mobileW * 3 / 100, 
//   },
//   Terms_VIEW: { 
//     flexDirection: 'row', 
//     marginHorizontal: mobileW * 2 / 100, 
//     alignItems: "center" 
//   },
//   agreed_txt: { 
//     fontSize: mobileW * 3.2 / 100, 
//     color: Colors.black_color ,
//     fontFamily:Font.FontRegular
//   },
//   Done_text: {
//     alignSelf: "center",
//     color: Colors.white_color,
//     fontSize: mobileW * 4.5 / 100,
//     fontFamily:Font.FontMedium
//   },
//   right_image: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     backgroundColor: Colors.themecolor,
//     alignSelf: 'center',
//     tintColor: Colors.white_color,
//     borderRadius: mobileW * 1 / 100
//   },
//   textinput_view: { 
//     marginTop: mobileW * 2 / 100, 
 
//   },
//   Learner_text: { 
//     marginHorizontal: mobileW * 2 / 100, 
//     color: Colors.black_color 
//   },
//   modaldone_txt: {
//     backgroundColor: Colors.themecolor,
//     marginTop:mobileW*3/100,
//     marginBottom:mobileW*3/100,
//     width: mobileW * 78 / 100,
//     height: mobileW * 11 / 100,
//     borderRadius: mobileW * 1 / 100,
//     alignSelf: "center",
//     justifyContent: "center",
//   },
//   SafeAreaView: { 
//     flex: 0, 
//     backgroundColor: Colors.themecolor 
//   }
// })


