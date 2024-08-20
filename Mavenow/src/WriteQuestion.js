import { View, ScrollView, StatusBar, Text,  TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const WriteQuestion = () => {
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 5 / 100 }} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain'
                source={require("./Icon/icon_back.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 5 / 100, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>Write your Question</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100, backgroundColor: Colors.white_color, borderRadius: mobileW * 1 / 100, width: mobileW * 13 / 100, height: mobileW * 6 / 100 }} >
            <View style={{ flexDirection: "row", }}>
              <Image style={{ width: mobileW * 5 / 100, height: mobileW * 4 / 100, marginTop: mobileW * 0.55 / 100 }} resizeMode='contain'
                source={require("./Icon/icon_back.png")}></Image>
              <Text style={{ color: Colors.themecolor, marginTop: mobileW * 0.40 / 100 }}>Edit</Text>
            </View>

          </TouchableOpacity>
        </View>
        {/* ===================================================================================================================== */}

        <View style={{ margin: mobileW * 7 / 100 }}>
          <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.50 / 100 }}>Please post problem below,you will get istant solution soon!</Text>
          <View style={{ marginTop: mobileW * 2 / 100 }}>
            <Text>Question</Text>
            <Text style={{ color: Colors.blackColor, marginTop: mobileW * 0.42 / 100 }}>TESTING</Text>
          </View>
          <View style={{ marginTop: mobileW * 2 / 100 }}>
            <Text>Main category</Text>
            <Text style={{ color: Colors.blackColor, marginTop: mobileW * 0.42 / 100 }}>TESTING</Text>
          </View>
          <View style={{ marginTop: mobileW * 2 / 100 }}>
            <Text>Main Skill</Text>
            <Text style={{ color: Colors.blackColor, marginTop: mobileW * 0.42 / 100 }}> Automation testing</Text>
          </View>
          <View style={{ marginTop: mobileW * 2 / 100, }}>
            <Text >Level</Text>
            <Text style={{ color: Colors.blackColor, marginTop: mobileW * 0.42 / 100 }}>Basic</Text>
          </View>

          <Text style={{ marginTop: mobileW * 2 / 100 }}>PleaseS elect your Main Skill</Text>
          <View style={{ marginTop: mobileW * 1 / 100 }}>
            <TouchableOpacity>
              <View style={{ width: mobileW * 39 / 100, height: mobileW * 5 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: Colors.themecolor, marginTop: mobileW * 2 / 100, height: mobileW * 7 / 100 }}>
                <View style={{ flexDirection: "row", marginTop: mobileW * 1 / 100 }}>
                  <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 2 / 100, }}>Automation testing</Text>
                  <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, }} resizeMode='contain'
                    source={require("./Icon/icon_back.png")}></Image>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <View style={{ width: mobileW * 92 / 100, height: mobileW * 10 / 100, backgroundColor: Colors.themecolor, borderRadius: mobileW * 1 / 100, alignSelf: "center", marginTop: mobileW * 4 / 100 }}>

          <View style={{ alignSelf: "center" }}>
            <Text style={{ color: Colors.white_color, marginTop: mobileW * 2 / 100, fontSize: mobileW * 4 / 100 }}>SUBMIT</Text>
          </View>





        </View>
      </SafeAreaView>
    </View>
  )
}
export default WriteQuestion
const styles = StyleSheet.create({
  Header: {
    backgroundColor: Colors.themecolor,
    width: mobileW, height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: mobileW * 8 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },

})