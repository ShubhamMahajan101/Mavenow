
import { View, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Button, Alert, Modal, } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
import { Stack, TextInput, } from "@react-native-material/core";
import ImagePicker from 'react-native-image-crop-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { RadioButton } from 'react-native-paper'; 0
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
import { set } from 'react-native-reanimated';


const UpdateMavenn_Profile = ({ navigation }) => {
  const [select, SetSelect] = useState('Maven')
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_gif, setModalVisible_gif] = useState(false);
  const [shouldShow, setShouldShow] = useState(0)
  const [checked, setChecked] = React.useState('first');
  //  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(true)

  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [imagePath, setimagePath] = useState();
  const phoneInput = useRef(null);
  const [image, setimage] = useState();
  const [firstname, setFirstname] = useState('');
  const [mobile, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [selecteddate, setselecteddate] = useState('Date of birth *');
  // -----------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // setTimeout(() => {
    //   setModalVisible_gif(false)
    // }, 1000);


  }, [])

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
        console.log('received image', image);         /////     for single image  code  .../// 
        setimagePath(image.path)
        setimage(image.path)
        console.log(image.path);
      })
      .catch((e) => alert(e));
  }
  //  ------------ Gallery Function -----------------------


  // <===========================================================================================>   V A  L I D  T I O N             <=========================>
  const _loginBtn = () => {
    navigation.navigate('Mprofile')
    return false
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
    if (mobile.length <= 0) {
      msgProvider.toast(msgText.emptyMobile[config.language], 'center')
      return false
    }
    if (mobile.length < 7) {
      msgProvider.toast(msgText.mobileMinLength[config.language], 'center')
      return false
    }
    if (mobile.length > 15) {
      msgProvider.toast(msgText.mobileMaxLength[config.language], 'center')
      return false
    }
    var mobilevalidation = config.mobilevalidation;
    if (mobilevalidation.test(mobile) !== true) {
      msgProvider.toast(msgText.validMobile[config.language], 'center')
      return false
    }
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
    navigation.navigate('Mprofile')
  }

  // <===========================================================================================>   V A  L I D  T I O N             <=========================>
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        {/* <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} /> */}
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 5 / 100 }} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_back.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 5 / 100, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>Update Learner Profile</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} onPress={() => setModalVisible(true)}>
            <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_info.png")}></Image>
          </TouchableOpacity>
        </View>
        {/* ----------- date picker-----------------*/}
        {datePicker && (
          <DateTimePicker
            // style={{width: "60%"}}
            value={new Date()}
            placeholderText="Pick your Date"
            onChange={(event, date) => {
              setDatePicker(false)
              setselecteddate(Moment(date).format("DD-MM-YYYY"))
              console.log(' Moment(date).format("YYYY-MM-DD")', Moment(date).format("YYYY-MM-DD"));
              // this.resetSOFT()

            }}
          />
        )}

        {/* ------------------ MODAL -------------- */}
        <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}>
            <View style={{ flex: 1, alignSelf: "center", marginTop: mobileW * 20 / 100, padding: mobileW * 8 / 100 }}>
              <View style={{ backgroundColor: Colors.themecolor, height: mobileW * 9 / 100, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100 }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", justifyContent: "space-around" }} >
                  <Text></Text>
                  <Text style={{ color: Colors.white_color, marginTop: mobileW * 2 / 100, fontSize: mobileW * 3.50 / 100 }}>Help : Update Profile</Text>
                  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <Image style={{ width: mobileW * 5.20 / 100, height: mobileW * 5.20 / 100, tintColor: Colors.whiteColor, marginTop: mobileW * 2 / 100, }} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ backgroundColor: Colors.whiteColor, elevation: mobileW * 3 / 100, padding: mobileW * 3 / 100, borderBottomRightRadius: mobileW * 2 / 100, borderBottomLeftRadius: mobileW * 2 / 100, height: mobileW * 100 / 100, }}>

                <Text style={{ textAlign: "center", color: Colors.gray }} >Kalam earned a degree in aeronautical engineering from the
                  Madras Institute of Technology and in 1958 joined the Defence Research and Development
                  Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                  was project director of the SLV-III, the first satellite launch vehicle that was both designed
                  and produced in India. Rejoining DRDO in 1982, Kalam plich helped earn him the nickname “ich helped earn him the nickname “
                  ich helped earn him the nickname “ ich helped earn him the nickname “ich helped earn him the nickname “
                  ich helped earn him the nickname “anned the program that produced a number
                  of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
                  intermediate-range ballistic missile, which incorporated aspects of the
                  SLV-III and was launched in 1989.</Text>
              </View>
            </View>
          </Modal>
        </View>
        {/* ------------------ gif model ------------ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_gif}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible_gif(!modalVisible_gif);
          }}>
          {/* <View style={{ flex: 1, width: mobileW * 88 / 100, height: mobileW * 18 / 100, justifyContent: "center", alignSelf: "center" }}> */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000060' }}>
            {/* <Image style={{width:mobileW*25/100, height:mobileW*12/100}}
         source={require("./Icon/neighcoach_loader.gif")}></Image> */}

          </View>
        </Modal>
        {/* ------------------------------- gif  */}

        <ScrollView>
          <View style={{ paddingLeft: mobileW * 3.5 / 100, paddingRight: mobileW * 3.5 / 100, }}>


            <View style={{ alignSelf: "center", marginTop: mobileW * 4 / 100 }}>
              <View style={styles.imageCard}>
                <Image style={styles.mavenImage} resizeMode="stretch" source={image == null ? require("./Icon/icon_maven.png") : { uri: image }}></Image>
                <TouchableOpacity onPress={() => Camerapopen()}>
                  <Image style={{ width: mobileW * 6.2 / 100, height: mobileW * 6.2 / 100, marginTop: mobileW * -7 / 100, marginLeft: mobileW * 15 / 100, tintColor: Colors.blackColor }} resizeMode='contain'
                    source={require("./Icon/img_10.png")}></Image>

                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: mobileW * 2 / 100 }}>
              <TextInput
                onChangeText={(txt) => setFirstname(txt)}
                color={Colors.themecolor}
                label="Full Name*" variant="outlined" trailing={props => (<Text></Text>)} />
            </View>
            <View style={{ marginTop: mobileW * 1 / 100 }}>
              <TextInput
                onChangeText={(newEmail) => { setEmail(newEmail) }}
                color={Colors.themecolor} label="Email" variant="outlined" trailing={props => (<Text></Text>)} />
            </View>


            {/* ======================================= Phone iNPUT ===================================== */}
            <PhoneInput
              ref={phoneInput}

              defaultCode="IN"
              layout="first"
              withShadow

              containerStyle={styles.containerstyle}
              textContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0, backgroundColor: Colors.white_color, borderRadius: mobileW * 20 / 100, }}
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
              }}
            />



            <TouchableOpacity style={{ marginTop: mobileW * 2 / 100 }} title="Open" onPress={() => setDatePicker(true)} >
              <TextInput value={selecteddate}

                editable={false} color={Colors.themecolor} variant="outlined" trailing={props => (<Text></Text>)} />

            </TouchableOpacity>

            {/* ======================================= Login Button ===================================== */}
            <Text style={styles.gender_text}>Gender</Text>

            <View style={{ flexDirection: "row", marginTop: mobileW * 1.4 / 100, alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Maven')}>
                  <View style={[styles.RadioBtn, { borderColor: select === 'Maven' ? Colors.themecolor : Colors.themecolor }]}>
                    <View style={{
                      width: mobileW * 3 / 100, height: mobileW * 3 / 100,
                      backgroundColor: select === 'Maven' ? Colors.themecolor : Colors.white_color,
                      borderRadius: mobileW * 10 / 100,
                    }}>

                    </View>
                  </View>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 3 / 100, fontWeight: "500" }}>Male</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: mobileW * 5 / 100 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Learner')}>
                  <View style={[styles.RadioBtn, { borderColor: select === 'Learner' ? Colors.themecolor : Colors.themecolor }]}>
                    <View style={{
                      width: mobileW * 3 / 100, height: mobileW * 3 / 100,
                      backgroundColor: select === 'Learner' ? Colors.themecolor : Colors.white_color,
                      borderRadius: mobileW * 10 / 100
                    }}>
                    </View>
                  </View>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 3 / 100, fontWeight: "500" }}>Female</Text>
              </View>
            </View>
            {/* ======================================= Login Button ===================================== */}
            <View style={{ marginTop: mobileW * 3 / 100, width: mobileW * 93 / 100, height: mobileH * 10 / 100 }}>
              <TextInput color={Colors.themecolor} multiline label="Profile youtube video link" variant="outlined" trailing={props => (<Text></Text>)} />
              {/* <WebView source = {{ uri:'https://www.google.com/?gws_rd=cr,ssl&ei=SICcV9_EFqqk6ASA3ZaABA#q=tutorialspoint' }}/> */}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: mobileW * 2 / 100, }}>
              <View style={{ backgroundColor: Colors.themecolor, width: mobileW * 45 / 100, height: mobileW * 11 / 100, borderRadius: mobileW * 2 / 100, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, alignSelf: 'center', }}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: Colors.themecolor, width: mobileW * 45 / 100, height: mobileW * 11 / 100, borderRadius: mobileW * 2 / 100, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => _loginBtn()}>
                  <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, alignSelf: 'center', }}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>



          </View>

        </ScrollView>

      </SafeAreaView>
    </View>

  )
}
export default UpdateMavenn_Profile
const styles = StyleSheet.create({
  container: {

  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color,
    marginTop: mobileW * 2 / 100

  },
  mavenowLogo: {
    width: mobileW * 70 / 100,
    height: mobileW * 18 / 100,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: mobileW * 4.5 / 100,
    color: Colors.black_color,
    fontWeight: '500',
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

    fontWeight: 'bold'
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
    width: mobileW * 93 / 100,
    height: mobileW * 15 / 100,
    backgroundColor: Colors.white_color,
    // backgroundColor:"red",
    marginTop: mobileW * 1 / 100,
    borderRadius: mobileW * 1 / 100,

    elevation: 1,
    shadowColor: '#000',
    borderColor: Colors.gray,
    borderWidth: mobileW * 0.23 / 100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    // borderRadius: mobileW * 20 / 100
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
    // backgroundColor:'red',
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
    backgroundColor: Colors.themecolor,
    width: mobileW, height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  RadioBtn: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.40 / 100,
    justifyContent: 'center',
    alignItems: "center"
  },

  learner_icon: {
    width: mobileW * 20 / 100,
    height: mobileW * 20 / 100,
    // tintColor: Colors.themecolor,
    alignSelf: "center",
    borderWidth: mobileW * 0.45 / 100,
    borderColor: Colors.themecolor,
    borderRadius: mobileW * 10 / 100,
    marginTop: mobileW * 2 / 100


  },
  imageCard: {
    width: mobileW * 24 / 100,
    height: mobileW * 24 / 100,
    borderRadius: mobileW * 12 / 100,
    borderWidth: mobileW * 0.6 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:mobileW*-2/100
  },
  mavenImage: {
    width: mobileW * 23 / 100,
    height: mobileW * 23 / 100,
    borderRadius: mobileW * 12 / 100,
    // tintColor:Colors.themecolor
  },
  datePicker: {
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    width: 320,
    height: 260,

  },
  gender_text: { marginTop: mobileW * 2 / 100, color: Colors.gray, fontSize: mobileW * 3 / 100, fontWeight: "500" }
})