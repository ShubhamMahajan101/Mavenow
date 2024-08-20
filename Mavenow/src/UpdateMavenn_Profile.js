import { View, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Button, Alert, Modal,RefreshControl,TextInput} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
// import { Stack, TextInput, } from "@react-native-material/core";
import ImagePicker from 'react-native-image-crop-picker'
// import { localStorage } from './Provider/localStorageProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { RadioButton } from 'react-native-paper'; 
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
import VideoRecorder from 'react-native-beautiful-video-recorder'
import { AddUser } from './App/Firebase/Users';
import { UpdateUserImage } from './App/Firebase/Users';
const UpdateMavenn_Profile = ({ navigation, route }) => {
  // const [filePath, setFilePath] = useState({});
  const [refresh, setrefresh] = useState(false);
  const [select, SetSelect] = useState('Maven')
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const phoneInput = useRef(null);
  const [image, setimage] = useState();
  console.log(image,'================================ vimage =============================');
  const [full_name, setfull_name] = useState();
  const [firstname, setFirstname] = useState('');
  const [userMode, setuserMode] = useState('');
  // const [mobile, setValue] = useState('');
  // const [MOBILE, setMOBILE] = useState('');
  const [email, setEmail] = useState('');
  const [EMAIL, setEMAIl] = useState('');
  // const [GENDER, setGENDER] = useState('');
  const [DOB, setDOB] = useState('');
  const [selecteddate, setselecteddate] = useState('');
  const [selecteddateforval, setselecteddateforval] = useState('');
  const [mobile_number, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [UserId,setUserId] = useState('')
  const videoRecorder = useRef(null)
  function startRecorder () {
    if (videoRecorder && videoRecorder.current) {
      videoRecorder.current.open({ maxLength: 30 }, (data) => {
        console.log('captured data', data);
      })
    }
  }

  // 
  // const startRecording = async () => {
  //   if (cameraRef.current) {
  //     setIsRecording(true)
  //     try {
  //       const options = { quality: RNCamera.Constants.VideoQuality['720p'] };
  //       const { uri } = await cameraRef.current.recordAsync(options);
  //       const saved = await CameraRoll.saveToCameraRoll(uri, 'video');
  //       if (saved) {
  //         alert('Video saved to gallery successfully!');
  //       } else {
  //         alert('Failed to save the video to the gallery.');
  //       }
  //     } catch (error) {
  //       console.error('Error recording video:', error);
  //     }
  //   }

  //   console.log('startRecording >>>>');
  // };
  // 

const keydata = route.params.userkeyword
console.log("getkeyworddata Update Maven Profile _____________",keydata);
const mavendata =route.params
console.log(mavendata,"...........blanck");

 // -----------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    SetMode();
}, [])

   const SetMode = async (data) => { 
   const value = await localStorage.getItemString('UserMode')
   console.log("..........", value);
    setuserMode(value)
    const userid = await localStorage.getItemString('UID')
     setUserId(userid)
 }

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };
  // --------------- Camera Function ---------------------
  const Camerapopen = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500, 
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);         // for single image  code  .../// 
 
        setProfileImage(false)
        setimage(image.path)
        UpdateUserImage(image.path, UserId)
        console.log(image.path);
      })
  }

  const Galleryopen = () => {
    launchImageLibrary('photo', (response) => {
    var ImageUri = response.assets
    console.log('--->',ImageUri)

    for (let i =0; i<ImageUri.length; i++){

      var imgeset = ImageUri[i].uri


      console.log("-------------------------==========",imgeset);

    }

    setProfileImage(false)
    // var uri = response.uri
    // let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // console.log('response..................',response);
    setimage(imgeset);
     })
   }
  //  ------------ Gallery Function -----------------------
  // const chooseFile = (type) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.base64);
  //     console.log('uri -> ', response.uri);
  //     console.log('width -> ', response.width);
  //     console.log('height -> ', response.height);
  //     console.log('fileSize -> ', response.fileSize);
  //     console.log('type -> ', response.type);
  //     console.log('fileName -> ', response.fileName);
  //     setFilePath(response);
  //   });
  // };



  // <=========================================>   V A  L I D  T I O N             <=========================>
  const _loginBtn = async () => {
  AddUser(image)

 

       //  navigation.navigate('Mprofile')
     
 if (firstname.length <= 0) {
      msgProvider.toast(msgText.emptyFirstName[config.language], 'center')
      return false
    }
    if (firstname.length <= 2) {
      msgProvider.toast(msgText.firstNameMinLength[config.language], 'center')
      return false
    }
    var namevalidation = config.namevalidation;
    if (namevalidation.test(firstname) !== true) {
      msgProvider.toast(msgText.validname[config.language], 'center')
      return false
    }
    //------------------Last name===================


    //===========email============================
    if (email.length <= 0) {
      msgProvider.toast(msgText.emptyEmail[config.language], 'center')
      return false
    }
    var reg = config.emailvalidation;
    if (reg.test(email) !== true) {
      msgProvider.toast(msgText.validEmail[config.language], 'center')
      return false
    }
    // =========================================  language =======================================

    //======================================mobile============================
    if (mobile_number.length <= 0) {
      msgProvider.toast(msgText.emptyMobile[config.language], 'center')
      return false
    }
    if (mobile_number.length < 7) {
      msgProvider.toast(msgText.mobileMinLength[config.language], 'center')
      return false
    }
    if (mobile_number.length > 15) {
      msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
      return false
    }


   

    if (selecteddate.length =='') {

      msgProvider.toast(msgText.selectStartdate[config.language], 'center')
      return false
    }
      {userMode == 'maven' ?
     ( setTimeout(() => {
 
        navigation.navigate('Expertarea')
        // navigation.navigate('UserMaven')
      }, 2000))
      : 
    (  setTimeout(() => {
            navigation.navigate('UserMaven')
      }, 2000))
    }


    // var mobilevalidation = config.mobilevalidation;
    // if (mobilevalidation.test(mobile) !== true) {
    //   msgProvider.toast(msgText.validMobile[config.language], 'center')
    //   return false
    // }

    // var mobilevalidation = config.mobilevalidation;
    // if (mobilevalidation.test(mobile) !== true) {
    //   msgProvider.toast(msgText.validMobile[config.language], 'center')
    //   return false
    // }

    //////////////////////////accept terms and condition
    //    if (shouldShow == false) {
    //     msgProvider.toast(msgText.acceptTerms[config.language], 'center')
    //     return false
    // }
    // navigation.navigate('Mprofile')
  }

  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
      
    }, 1200);
  }

  // <===========================================================================================>   V A  L I D  T I O N             <=========================>
  return (
      <View style={{ flex: 1, backgroundColor:Colors.white_color }}>
        
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/> 
      <ScrollView refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
            tintColor={Colors.themecolor}
            colors={[Colors.themecolor]}/>
        }>






        {/* ========>  Header */}
      <View style={styles.Header}>
      <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.goBack()}>
      <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
      </TouchableOpacity>
      <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.8 / 100,fontFamily:Font.FontSemiBold}}>{userMode == 'maven' ?Lang_chg.UpdateMavenTxt[config.language]   : Lang_chg.UpdateLearnerTxt[config.language] }</Text>
     <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}>
      <Image style={styles.infoicon} resizeMode='contain' source={require("./Icon/about.png")}></Image>
      </TouchableOpacity>
      </View>
      {/* ========>  Header */}

          {/* date picker-______________*/}
          {datePicker && (
          <DateTimePicker
            // style={{width: "60%"}}
            value={new Date()}
            placeholderText="Pick your Date"
            onChange={(event, date) => {
              setDatePicker(false)
              setselecteddate(Moment(date).format("DD-MM-YYYY"))
              // setselecteddateforval( (date).format("DD-MM-YYYY"))
              console.log(' Moment(date).format("YYYY-MM-DD")', Moment(date).format("YYYY-MM-DD"));
              // this.resetSOFT()
             }}/> )}

          <View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={{ flex: 1, backgroundColor: '#00000090', alignItems: 'center', justifyContent: 'center' }}>

         

          <View style={styles.Modal}>
          <View style={styles.ModalHeader}>
       
          <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontRegular }}>Help : Update Profile</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  > 
          <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
          </TouchableOpacity>
          </View>
          <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>
          <ScrollView>
          <View style={{ padding: mobileW * 3 / 100, width: mobileW * 90 / 100 }}>
          <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular}}>Kalam earned a degree in aeronautical engineering from the
          Madras Institute of Technology and in 1958 joined the Defence Research and Development
          Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
          was project director of the SLV-III, the first satellite launch vehicle that was both designed
         and produced in India. Rejoining DRDO in 1982, Kalam plich helped earn him the nickname “ich helped earn him the nickname “
        ich helped earn him the nickname “ ich helped earn him the nickname “ich helped earn him the nickname “
        ich helped earn him the nickname “anned the program that produced a number
        of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
        intermediate-range ballistic missile, which incorporated aspects of the SLV-III and was launched in 1989.</Text>
        </View>

        </ScrollView>
        </View>
        </View>
        </Modal>
        </View>
        <ScrollView>


        <View style={{ paddingLeft: mobileW * 3.5 / 100, paddingRight: mobileW * 3.5 / 100, }}>
        <View style={{ alignSelf: "center", marginTop: mobileW * 2/ 100 }}>
       <View style={{flexDirection:'row', alignItems:'center'}}>
        <View style={styles.imageCard}>
        {userMode == 'maven' ?
        <Image style={styles.mavenImage} resizeMode='contain' source={image == null ? require("./Icon/icon_maven.png") : { uri: image }}></Image>
        : 
        <Image style={styles.mavenImage} resizeMode='contain' source={image == null ? require("./Icon/icon_student.png") : { uri: image }}></Image>
        }
       
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{width:mobileW*6/100, height:mobileW*6/100, marginLeft:mobileW*-5/100, marginTop:mobileW*-5/100,   alignItems:'center', justifyContent:'center', backgroundColor:Colors.white_color,elevation:1, borderRadius:mobileW*4/100}} onPress={() => setProfileImage(true)}>
        <Image style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100,tintColor: Colors.color_orange}} resizeMode='contain'source={require("./Icon/img_10.png")}></Image>
        </TouchableOpacity>
        </View>
        </View>

             <View style={{ marginTop: mobileW * 6 / 100 }}>
            <TextInput
             placeholderTextColor={Colors.gray}
             fontSize={mobileW*3.3/100}
             placeholder ={Lang_chg.FullNameTxt[config.language] }
             paddingHorizontal={mobileW*5/100}
             fontFamily={Font.FontRegular}
             onChangeText={(txt) => setFirstname(txt)} 
             style={styles.inputContainerStyle}>
             </TextInput>
            </View>

            <View style={{ marginTop: mobileW * 3 / 100 , }}>
             <TextInput
             placeholderTextColor={Colors.gray}
             fontSize={mobileW*3.3/100}
             placeholder ={Lang_chg.EmailTxt[config.language] }
             paddingHorizontal={mobileW*5/100}
             color={Colors.gray}
             fontFamily={Font.FontRegular}
             onChangeText={(newEmail) => setEmail(newEmail)} 
             style={styles.inputContainerStyle}>
             </TextInput>


            </View>
            {/* ======================================= Phone iNPUT ===================================== */}
              <PhoneInput
                ref={phoneInput}
                defaultCode="IN"
                layout="first"
                withShadow
                containerStyle={[styles.containerstyle,{marginTop:mobileW*3/100}]}
                textContainerStyle={{
                paddingVertical: 0,
                paddingHorizontal: 0,
                backgroundColor:'#FAFAFA',
                borderRadius: mobileW * 20 / 100,fontFamily:Font.FontRegular}}
                 onChangeText={(text) => { setValue(text);}}
                onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || ''); }}/>
                

            <TouchableOpacity style={[styles.containerstyle,{marginTop:mobileW*3/100}]} title="Open"onPress={() => setDatePicker(true)}>
            <TextInput 
            value={selecteddate}
            placeholder={Lang_chg.datebirthTxt[config.language]}
            placeholderTextColor={Colors.gray}
             editable={false}
            color={Colors.gray}
            paddingHorizontal={mobileW*5/100}
            fontFamily={Font.FontRegular}
            />
            </TouchableOpacity>

            {/* ======================================= Login Button ===================================== */}
            <Text style={styles.gender_text}>{Lang_chg.GenderTxt[config.language] }</Text>

            <View style={{ flexDirection: "row", marginTop: mobileW * 1 / 100, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Maven')} style={[styles.RadioBtn, { borderColor: select === 'Maven' ? Colors.themecolor : Colors.themecolor }]}>
            <View style={{ width: mobileW * 2.5 / 100, height: mobileW * 2.5 / 100, backgroundColor: select === 'Maven' ? Colors.themecolor : Colors.white_color,borderRadius: mobileW * 10 / 100,}}>
            </View>
            </TouchableOpacity>
            <Text style={styles.Female_txt}>{Lang_chg.MaleTxt[config.language] }</Text>
            </View>
              
              <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: mobileW * 5 / 100 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Learner')} style={[styles.RadioBtn, { borderColor: select === 'Learner' ? Colors.themecolor : Colors.themecolor }]}>
              <View style={{ width: mobileW * 2.5 / 100, height: mobileW * 2.5 / 100, backgroundColor: select === 'Learner' ? Colors.themecolor : Colors.white_color, borderRadius: mobileW * 10 / 100}}>
              </View>
              </TouchableOpacity>
              <Text style={styles.Female_txt}>{Lang_chg.FemaleTxt[config.language]}</Text>
               </View>
              </View>

                                            {/* ======================================= Login Button ===================================== */}
            {userMode === 'maven' ?
            <View >
          
            <TextInput style={[styles.containerstyle,]}
            placeholderTextColor={Colors.gray}
            placeholder ={Lang_chg.videolinkTxt[config.language] }
            fontSize={mobileW*3.3/100}
             fontFamily={Font.FontRegular}
            paddingHorizontal={mobileW*5/100}
            multiline label={Lang_chg.videolinkTxt[config.language] }
  
            variant="outlined"
            trailing={props => (<Text></Text>)} />
             {/* <TouchableOpacity onPress={startRecorder} style={styles.backIcon1}> */}
              <TouchableOpacity onPress={()=>navigation.navigate('VideoRecorder')} style={styles.backIcon1}>
              <Image style={{width:mobileW*8/100, height:mobileW*8/100}} resizeMode='contain' source={require("./Icon/you_tube.png")}></Image>
              </TouchableOpacity>
            </View> :

          <View style={{marginTop:mobileW*2/100}}>
            <TextInput
             placeholderTextColor={Colors.gray}
             fontSize={mobileW*3.3/100}
             placeholder ={Lang_chg.AboutUS[config.language]}
             paddingHorizontal={mobileW*5/100}
             color={Colors.gray}
             fontFamily={Font.FontRegular}
            //  onChangeText={(newEmail) => setEmail(newEmail)} 
             style={[styles.inputContainerStyle,{height:mobileW*22/100,textAlignVertical:"top"}]}>
             </TextInput>

            {/* </TouchableOpacity> */}
             </View>}
            
            {userMode == 'maven' ?
            //  <TouchableOpacity activeOpacity={0.8} style={styles.maven_button} onPress={()=>navigation.navigate('Expertarea')}>
            <TouchableOpacity activeOpacity={0.8} style={styles.maven_button} onPress={()=> _loginBtn()}> 
             <Text style={styles.Expert_text}>{Lang_chg.LETSTALK[config.language]}</Text>
            </TouchableOpacity>
             :
            //  <TouchableOpacity activeOpacity={0.8} style={styles.maven_button} onPress={()=>navigation.navigate('UserMaven')} >
             <TouchableOpacity activeOpacity={0.8} style={styles.maven_button} onPress={()=>_loginBtn()} > 
             <Text style={styles.Expert_text}>{Lang_chg.Update[config.language] }</Text>
   
            </TouchableOpacity>
        
}
           </View>



           <View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={profileImage}>
 
          <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.Modal}>
          <View style={{ width: mobileW * 90 / 100,
          flexDirection:'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
    paddingLeft:mobileW*3/100,
    paddingRight:mobileW*3/100,
    backgroundColor: Colors.white_color}}>

          <Text style={{ color: Colors.black_color, fontSize: mobileW * 4/ 100, fontFamily:Font.FontSemiBold}}>{Lang_chg.SelectOption[config.language] }</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setProfileImage(!profileImage)}  >
            <Image style={styles.backIcon_close} resizeMode='contain'
               source={require("./Icon/close2.png")}></Image>
           </TouchableOpacity>
          </View>
          <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>

  <View style={{padding:mobileW*2/100, alignItems:'center'}}>
  <TouchableOpacity activeOpacity={0.8} onPress={()=>Camerapopen()}>
  <Text style={{fontSize:mobileW*3.5/100, color:Colors.black_color, paddingBottom:mobileW*2/100,fontFamily:Font.FontMedium}}>{Lang_chg.MediaCamera[config.language] }</Text>
  </TouchableOpacity>
  <View style={{width:mobileW*90/100, height:mobileW*0.4/100, backgroundColor:'gray', }}></View>
  <TouchableOpacity activeOpacity={0.8} onPress={()=>Galleryopen()}>
  <Text style={{fontSize:mobileW*3.5/100, color:Colors.black_color,padding:mobileW*2/100,fontFamily:Font.FontMedium}}>{Lang_chg.Mediagallery[config.language] }</Text>
  </TouchableOpacity>
  <View style={{width:mobileW*90/100, height:mobileW*0.4/100, backgroundColor:'gray', }}></View>
  <TouchableOpacity activeOpacity={0.8} onPress={() => setProfileImage(!profileImage)}>
  <Text style={{fontSize:mobileW*3.5/100, color:Colors.red,paddingTop :mobileW*2/100,fontFamily:Font.FontMedium}}>{Lang_chg.cancelmedia[config.language] }</Text>
  </TouchableOpacity>
  </View>


        </View>
        </View>
        </Modal>
        </View>
        </ScrollView>
        </ScrollView>
        </SafeAreaView>
        <VideoRecorder ref={videoRecorder} compressQuality={'medium'} />
        </View>
  )
}
export default UpdateMavenn_Profile
const styles = StyleSheet.create({
  container: {
flex:1,
  },
  Female_txt: {
    marginHorizontal: mobileW * 2 / 100,
    color:Colors.black_color,
    fontSize: mobileW * 3.2 / 100,
    fontFamily:Font.FontRegular
  },
  maven_button:{
    width:mobileW*93/100,
    height:mobileW*12/100,
    backgroundColor:Colors.themecolor,
    borderRadius:mobileW*1.5/100,
    marginTop:mobileW*4/100,
   alignItems:"center",
   justifyContent:"center"
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
  inputContainerStyle:{
    width:mobileW*92/100,
    alignSelf:'center',
    height:mobileW*12/100,
    backgroundColor:'#FAFAFA',
    borderColor:'#E7E8EA',
    borderWidth:mobileW*0.3/100,
    borderRadius:mobileW*1/100,
    color:Colors.gray
  
  //   BR =  #EFF2F1
  // BR2 =  #E7E8EA
  
    },

  Bottoom_View: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: mobileW * 2 / 100,
  },
  namevalidation_Backview: {
    backgroundColor: Colors.themecolor,
    width: mobileW * 46 / 100,
    height: mobileW * 11 / 100,
    borderRadius: mobileW * 2 / 100,
    alignItems: "center",
    justifyContent: "center"
  },
  cancel_text: {
    color: Colors.white_color,
    fontSize: mobileW * 4 / 100,
    alignSelf: 'center',
  },
  Expert_text: {
    color: Colors.white_color,
    fontSize: mobileW * 3.5/ 100,
    alignSelf: 'center',
   fontFamily:Font.FontSemiBold
  },
  login_btnView: {
    backgroundColor:
      Colors.themecolor,
    width: mobileW * 46 / 100,
    height: mobileW * 11 / 100,
    borderRadius: mobileW * 2 / 100,
    alignItems: "center",
    justifyContent: "center"
  },
    backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange,
    },
  backIcon1: {

    tintColor: Colors.gray,
    alignSelf:"flex-end",
    position:"absolute",
    marginTop:mobileW * 7 / 100,
    width:mobileW * 9 / 100,
    height:mobileW * 7 / 100,
    right:mobileW * 5 / 100
 
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
},
infoicon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor:Colors.black_color
  },
  next_Txt: {
    color: Colors.white_color,
    fontSize: mobileW * 4 / 100,
    alignSelf: 'center',
  },
  mavenowLogo: {
    width: mobileW * 70 / 100,
    height: mobileW * 18 / 100,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: mobileW * 4.5 / 100,
    color: Colors.black_color,
    fontFamily:Font.FontMedium,
    marginTop: mobileW * 1 / 100
  },
  cardView: {
    width: mobileW,
    height: "75%",
    backgroundColor: Colors.whiteColor,
    paddingLeft: mobileW * 8 / 100,
    paddingRight: mobileW * 8 / 100,
    borderTopLeftRadius: mobileW * 10 / 100
  },
  topText: {
    marginTop: mobileW * 4.50 / 100,
    fontSize: mobileW * 4 / 100,
    color: Colors.blackColor,
    fontFamily:Font.FontMedium,
  },
  phoneView: {
    justifyContent: 'center',
    height: mobileW * 13 / 100,
    backgroundColor: Colors.white_color,
    borderRadius: mobileW * 0 / 100,
    marginTop: mobileW * 10 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  containerstyle: {
    marginTop: mobileW * 5/100,  
    width:mobileW*92/100,
    height:mobileW*12/100,
    backgroundColor:'#FAFAFA',
    // backgroundColor:"red",
    alignSelf:'center',
    borderColor:'#E7E8EA',
    borderWidth:mobileW*0.3/100,
    borderRadius:mobileW*1/100,
    color:Colors.gray ,
    fontFamily:Font.FontRegular
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 3 / 100,
    marginTop: mobileW * 5 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  GIF: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  backIcon_close:{ 
    width: mobileW * 6 / 100, 
    height: mobileW * 6  / 100, 
    tintColor:Colors.color_orange
  
  },
  socialmediacardView: {
    width: mobileW * 60 / 100,
    height: mobileW * 14 / 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    padding: mobileW * 2 / 100,
    marginRight: mobileW * 5 / 100,
    marginTop: mobileW * 5 / 100,
    elevation: 2,
    backgroundColor: Colors.white_color,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  socialmediaView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: mobileW * 45 / 100,
    height: mobileW * 10 / 100,
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:mobileW*4/100,
  },
  RadioBtn: {
    width: mobileW * 4.5/ 100,
    height: mobileW * 4.5 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.40 / 100,
    justifyContent: 'center',
    alignItems: "center"
  },
  learner_icon: {
    width: mobileW * 20 / 100,
    height: mobileW * 20 / 100,
    alignSelf: "center",
    borderWidth: mobileW * 0.45 / 100,
    borderColor: Colors.themecolor,
    borderRadius: mobileW * 10 / 100,
    marginTop: mobileW * 2 / 100
  },
  imageCard: {
    width: mobileW * 17 / 100,
    height: mobileW * 17 / 100,
    borderRadius: mobileW * 13 / 100,
    borderWidth: mobileW * 0.6 / 100,
    marginTop:mobileW*4/100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mavenImage: {
    width: mobileW * 16/ 100,
    height: mobileW * 16/ 100,
    borderRadius: mobileW * 8/ 100,
  },
  datePicker: {
    width: 320,
    height: 260,

  },
  gender_text: {
    marginTop: mobileW * 3/ 100,
    color: Colors.black_color,
    fontSize: mobileW * 3.5 / 100,
    fontFamily:Font.FontMedium
  },
  help_text: {
    color: Colors.white_color,
    fontSize: mobileW * 3.50 / 100
  },
  ModalHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft:mobileW*3/100,
    paddingRight:mobileW*3/100,
    backgroundColor: Colors.white_color
  },
  Modal: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,

    backgroundColor: Colors.white_color,
    elevation: 5
  },

  
})





//  here is form data 
// const _UpdateBtn = async () => {
//   setloader(true)
//   // const currentUid1 = await AsyncStorage.getItem('UID');
//   // UpdateUserImage(imageforapi,currentUid1)
//   var data = new FormData();
//   data.append('FirstName', firstname);
//   data.append('LastName',  lastname);
//   data.append('Email',  email);
//   data.append('country', countryCode);
//   data.append('phone', phoneNumber111);
//   data.append('avatar', {
//     uri: imageforapi,
//     type: 'image/jpg', // or photo.type
//     name: 'image.jpg'
//   });
//   data.append('birthdayDate',Select_Deadline);
//   console.log('---------------->>>>',data);
//    return axios.post(
//     config.baseURL+'updateUser/' + user_id,
//     data,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     },
//   ).then( async (data)  => {
//     console.log('i am here with data',data);
//     var Message = data.data.ErrorMessage;
//     if (Message == 'successfully') {
//       var user_arr = data.data.updateUser;
//       console.log('avatar---------->',user_arr)
//       setimageforapi(user_arr.avatar)
//       await localStorage.setItemObject('user_arr', user_arr);
//       setTimeout(() => {
//         setloader(false)
//         navigation.navigate('Settings')
//       }, 300);
//       msgProvider.toast(msgText.ProfileUpdate[config.language], 'center')
//     }
//   })
//     // .catch(function (error) {
//     .catch(error=>{
//       console.log('======>', error);
//     });
// }

//  here is form data





















