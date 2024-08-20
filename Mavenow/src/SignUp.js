import { View, StatusBar, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './Provider/Colorsfont';


const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
  return (

     <ImageBackground style={{ flex: 1, }} imageStyle={{ flex: 1 }} resizeMode='stretch' source={require('./Icon/new_splash_back.png')}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
      <Image style={styles.mavenow_logo} resizeMode="contain" source={require('./Icon/new_logo_blue_mavenow.png')} />
      <View style={{ alignSelf: "center", marginTop: mobileW * 10 / 100 }}>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: mobileW * 4.5 / 100 }} >How do you  wish to </Text>
        <Text style={{ textAlign: "center", fontWeight: "bold", color: "black", fontSize: mobileW * 5 / 100 }} >SIGN IN?</Text>
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: mobileW * 3 / 100 }}>
        <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>You can switch your PROFILE anytime!</Text>
      </View>
      {/* //========================================================= LEARNER & MAVEN ======================== */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('QuestionPage')} style={styles.LearnerCard}>
        <View style={{ width: mobileW * 63.5 / 100, }}>
          <Text style={{ color: "black", fontWeight: "bold", fontSize: mobileW * 4 / 100 }}>LEARNER</Text>
          <Text style={{ fontSize: mobileW * 3.4 / 100, color: Colors.gray }}>
            A professional who is looking for solution, guidance or mentorship to boost their career!</Text>
        </View>
        <Image style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100, }} source={require('./Icon/img_6.png')} resizeMode="contain" />
         </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Expertisepage')} style={styles.LearnerCard}>
        <View style={{ width: mobileW * 63.5 / 100, }}>
          <Text style={{ color: "black", fontWeight: "bold", fontSize: mobileW * 4 / 100 }}>MAVEN</Text>
          <Text style={{ fontSize: mobileW * 3.4 / 100, color: Colors.gray }}>A Mentor Leader, Experienced profrssional, or Domain Expert who help
            Learners to make their career successful!</Text>
        </View>
        <Image style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100, }} source={require('./Icon/img_7.png')} resizeMode="contain"/>
      </TouchableOpacity>

      {/* //============================================================================ Button ============================================================== */}

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Login")} style={{ alignSelf: 'center', marginTop: mobileW * 20 / 100 }}>
      <Image style={{ width: mobileW * 15 / 100, height: mobileW * 15 / 100, borderRadius: mobileW * 8 / 100 }}source={require('./Icon/splash_to_login.png')}/>
      </TouchableOpacity>
      </ImageBackground>

  )
}
export default SignUp
const styles = StyleSheet.create({
  ImageBackground: {

  },
  mavenow_logo: {
    width: mobileW * 60 / 100,
    height: mobileW * 33 / 100,
    marginTop: mobileW * 25 / 100,
    alignSelf: "center"
  },
  LearnerCard: {
    width: mobileW * 85 / 100,
    marginTop: mobileW * 5 / 100,
    backgroundColor: Colors.white_color,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowColor: '#000',
    shadowOpacity: 0.1,
  }


})

