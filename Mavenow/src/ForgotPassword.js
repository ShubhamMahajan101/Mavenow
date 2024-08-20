import { View, StatusBar, TextInput, Text,StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { ScrollView } from 'react-native-gesture-handler';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const ForgotPassword = ({ navigation }) => {
  const [password, setpassword] = useState('')

  return (
        <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
              <ScrollView>
               <View style={styles.header_view}>
               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
               <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
               </TouchableOpacity>
               </View>
               <Text style={styles.loginText}>Reset Password</Text>
            
            {/* ======================================= Phone ===================================== */}

            <View style={{marginTop:mobileW*10/100, marginRight:mobileW*4/100, marginLeft:mobileW*4/100}}>
                <TextInput
             placeholderTextColor={Colors.gray}
             fontSize={mobileW*3.3/100}
            //  placeholder ={Lang_chg.Email[config.language]}
             paddingHorizontal={mobileW*5/100}
             color={Colors.gray}
             value={password}
             placeholder="Enter Password"
             fontFamily={Font.FontRegular}
             onChangeText={(text) => { setpassword(text)}}
             style={styles.inputContainerStyle}>
             </TextInput>
             </View>
            {/* ======================================= Login Button ===================================== */}
            <TouchableOpacity activeOpacity={0.8} style={styles.LoginView}>
            <Text style={styles.LOGIN_TEXT}>SEND OTP</Text>
            </TouchableOpacity>
         
               </ScrollView>
             </SafeAreaView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backIcon_: {
    width: mobileW * 6/ 100,
    height: mobileW * 6/ 100,
},
  input: {
    height: mobileW * 12 / 100,
    color: Colors.gray,
    width: mobileW * 92 / 100,
    //  backgroundColor:'#E7E8EA',
    // borderTopRightRadius: mobileW * 2 / 100,
    // borderBottomRightRadius: mobileW * 2 / 100,
    paddingRight: mobileW * 4 / 100,
    // fontFamily: Font.FontRegular,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  loginText: {
    fontSize: mobileW * 4.2/ 100,
    color: Colors.black_color,
    // fontFamily:Font.FontMedium,
    marginTop: mobileW * 5 / 100,
    alignSelf:"center"
  },
  cardView: {
    width: mobileW,
    height: mobileH * 86 / 100,
    backgroundColor: Colors.whiteColor,
    paddingLeft: mobileW * 6.5/ 100,
    paddingRight: mobileW * 6.5/ 100,
    borderTopLeftRadius: mobileW * 10 / 100,
  },
  phoneView: {
    backgroundColor: Colors.white_color,
    borderRadius: mobileW * 4 / 100,
    flexDirection: 'row',
    marginTop: mobileW * 15 / 100,
    marginLeft:mobileW*4/100,
    marginRight:mobileW*4/100,
    elevation: 2,
    shadowColor: '#000',
    // borderColor: "#e8edfb",
    borderColor: Colors.gray,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    borderWidth:mobileW*0.5/100
  },
  LoginView: {
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
    width:mobileW*92/100,
    height: mobileW * 12/ 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 1.5 / 100,
    marginTop: mobileW * 10 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  LOGIN_TEXT:{
    fontSize: mobileW * 4 / 100, 
    color: Colors.white_color,
    fontFamily:Font.FontSemiBold 
      },
  header_view:{ 
    width: mobileW, 
    backgroundColor:Colors.white_color,
    justifyContent:'center',
    height: mobileW * 15 / 100,
    paddingLeft:mobileW*4/100
    },
  SafeAreaView:{ 
    flex: 0, 
    backgroundColor: Colors.white_color 
  },
  inputContainerStyle:{
    width:mobileW*92/100,
    height:mobileW*13.2/100,
    backgroundColor:'#FAFAFA',
    borderColor:'#E7E8EA',
    borderWidth:mobileW*0.3/100,
    borderRadius:mobileW*1/100,
    color:Colors.gray
  
  //   BR =  #EFF2F1
  // BR2 =  #E7E8EA
  
    },
})

export default ForgotPassword



// import { View, StatusBar, TextInput, Text,StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors } from './Provider/Colorsfont';

// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// import { ScrollView } from 'react-native-gesture-handler';
// import { Value } from 'react-native-reanimated';

// const ForgotPassword = ({ navigation }) => {

//   const [password, setpassword] = useState('')

 

//   return (
//         <View style={{ flex: 1, backgroundColor: Colors.themecolor }}>
//         <SafeAreaView style={styles.SafeAreaView}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//               <ScrollView>
//                <View style={styles.header_view}>
//                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//                <Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/icon_back.png")}></Image>
//                </TouchableOpacity> */}
               
//                 <View style={{ alignItems: 'center' ,marginTop: mobileW * 4 / 100 }}>
//                 <Text style={styles.loginText}>Reset Password</Text>
//                 </View>
//                </View>
//                <View style={styles.cardView}>
            
//             {/* ======================================= Phone ===================================== */}
//             <View style={styles.phoneView}>
             
//               <TextInput
//                 style={styles.input}
//                 placeholderTextColor={Colors.gray}
//                 value={password}
//                 onChangeText={(text) => { setpassword(text);
//                 }}
//                 placeholder="Email"
//               />
//             </View>
//             {/* ======================================= Login Button ===================================== */}
//             <TouchableOpacity activeOpacity={0.8} style={styles.LoginView}>
//             <Text style={styles.LOGIN_TEXT}>SEND OTP</Text>
//             </TouchableOpacity>
         
//               </View>
      
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
//   backIcon: {
//     width: mobileW * 5.5 / 100,
//     height: mobileW * 5.5/ 100,
//     tintColor: Colors.white_color
//   },
//   input: {
//     height: mobileW * 12.8/ 100,
//     padding:mobileW*2/100,
//     color: Colors.black_color,
//     width: mobileW * 57 / 100,
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 4 / 100,
//     paddingRight: mobileW * 4 / 100,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   loginText: {
//     fontSize: mobileW *  7 / 100,
//     color: Colors.white_color,
//     fontWeight: '500',
//     marginTop: mobileW * 1 / 100
//   },
//   cardView: {
//     width: mobileW,
//     height: mobileH * 86 / 100,
//     backgroundColor: Colors.whiteColor,
//     paddingLeft: mobileW * 6.5/ 100,
//     paddingRight: mobileW * 6.5/ 100,
//     borderTopLeftRadius: mobileW * 10 / 100,
//   },
//   phoneView: {
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 4 / 100,
//     flexDirection: 'row',
//     marginTop: mobileW * 15 / 100,
//     elevation: 2,
//     shadowColor: '#000',
//     // borderColor: "#e8edfb",
//     borderColor: Colors.gray,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     borderWidth:mobileW*0.20/100
//   },
//   LoginView: {
//     justifyContent: 'center',
//     alignItems: 'center',
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
//   LOGIN_TEXT:{
//      fontSize: mobileW * 3.5 / 100,
//       color: Colors.white_color,
//        fontWeight: "500" },
//   header_view:{ 
//     width: mobileW, 
//     height: mobileH * 16 / 100,
//      padding: mobileW * 3 / 100 
//     },
//   SafeAreaView:{ 
//     flex: 0, 
//     backgroundColor: Colors.themecolor 
//   },
// })

// export default ForgotPassword
