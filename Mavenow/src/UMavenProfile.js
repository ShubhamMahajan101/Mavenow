
import { View, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState, useRef } from 'react'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
import { Stack, TextInput, } from "@react-native-material/core";

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { RadioButton } from 'react-native-paper'; 

import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'

// import {mobileH,mobileW} from './Provider/utilslib/Utils'

const UMavenProfile = ({ navigation }) => {
  const [shouldShow, setShouldShow] = useState(0)
  const [checked, setChecked] = React.useState('first');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [mobile, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* Header */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 5 / 100 }} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain'
                source={require("./Icon/icon_back.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 5 / 100, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>Update Maven Profile</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} >
            <Image style={styles.backIcon} resizeMode='contain'
              source={require("./Icon/icon_info.png")}></Image>
          </TouchableOpacity>
        </View>



        {/* <ScrollView> */}
        <View style={{ paddingLeft: mobileW * 2 / 100, paddingRight: mobileW * 2 / 100 }}>



          <View>
            <Image style={styles.learner_icon} resizeMode='contain'
              source={require("./Icon/icon_maven.png")}></Image>
            <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, alignSelf: "center", marginTop: mobileW * -7 / 100, marginLeft: mobileW * 10 / 100 }} resizeMode='contain'
              source={require("./Icon/icon_back.png")}></Image>
          </View>





          <View style={{ marginTop: mobileW * 2 / 100 }}>
            <TextInput color={Colors.themecolor} label="Full Name" variant="outlined" trailing={props => (<Text></Text>)} />

          </View>

          <View style={{ marginTop: mobileW * 1 / 100 }}>
            <TextInput color={Colors.themecolor} label="Email" variant="outlined" trailing={props => (<Text></Text>)} />

          </View>



          {/*  Phone =================*/}
          {/* <View style={styles.phoneView}> */}
          <PhoneInput
            ref={phoneInput}
            //  defaultValue={phoneNumber}
            defaultCode="IN"
            layout="first"
            withShadow
            // autoFocus
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
          {/* </View> */}


          <TouchableOpacity style={{ marginTop: mobileW * 2 / 100 }} title="Open" onPress={() => setOpen(true)}>

            <TextInput color={Colors.themecolor} editable={false} label="Date of birth *" variant="outlined" trailing={props => (<Text></Text>)} />



          </TouchableOpacity>

          {/*  Login Button ===================================== */}
          <Text>Gender</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: mobileW * 0.50 / 100 }}>
            <RadioButton
              value="first"
              color={Colors.themecolor}
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')} />
            <Text style={{ fontSize: mobileW * 3.45 / 100, color: Colors.black_color }}>Male</Text>
            <View style={{ marginHorizontal: mobileW * 5 / 100 }}></View>
            <RadioButton
              value="second"
              color={Colors.themecolor}
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')} />
            <Text style={{ fontSize: mobileW * 3.45 / 100, color: Colors.black_color }}>Female</Text>
          </View>
          {/* Login Button ===================================== */}
          <View style={{ marginTop: mobileW * 3 / 100, width: mobileW * 95.45 / 100 }}>
            <TextInput color={Colors.themecolor} multiline label="About Us" variant="outlined" trailing={props => (<Text></Text>)} />

          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: mobileW * 2 / 100, }}>
            <View style={{ backgroundColor: Colors.themecolor, width: mobileW * 45 / 100, height: mobileW * 11 / 100, borderRadius: mobileW * 2 / 100 }}>
              <TouchableOpacity><Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, alignSelf: 'center', marginTop: mobileW * 2 / 100 }}>Cancel</Text></TouchableOpacity></View>
            <View style={{ backgroundColor: Colors.themecolor, width: mobileW * 45 / 100, height: mobileW * 11 / 100, borderRadius: mobileW * 2 / 100 }}><TouchableOpacity onPress={() => navigation.navigate('Language')}><Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, alignSelf: 'center', marginTop: mobileW * 2 / 100 }}>Next</Text></TouchableOpacity></View>
          </View>



          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(true)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(true)
            }}
          />
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </View>

  )
}
export default UMavenProfile
const styles = StyleSheet.create({
  container: {

  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 7 / 100,
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
    width: mobileW * 96 / 100,
    height: mobileW * 13 / 100,
    backgroundColor: Colors.white_color,
    // backgroundColor:"red",
    marginTop: mobileW * 1 / 100,
    borderRadius: mobileW * 0 / 100,

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
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 8 / 100,
    tintColor: Colors.white_color
  },
  learner_icon: {
    width: mobileW * 20 / 100,
    height: mobileW * 20 / 100,
    tintColor: Colors.themecolor,
    alignSelf: "center",
    borderWidth: mobileW * 0.45 / 100,
    borderColor: Colors.themecolor,
    borderRadius: mobileW * 10 / 100,
    marginTop: mobileW * 2 / 100


  },
})