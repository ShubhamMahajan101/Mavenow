import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


const userList1 = [
  {
    id: 1,
    image: require('./Icon/icon_student.png'),
    name: 'dixit',
    title: 'hello',
    date: '2022-06-01',
    isEnabled: false
  },
  {
    id: 2,
    image: require('./Icon/icon_student.png'),
    name: 'pritesh',
    title: 'hello',
    date: '20-07-2022',
    isEnabled: true
  },

]

export default function Badges({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [badge, setBadges] = useState([]);

  useEffect(() => {
    apiCalling();
    // recommendedApi();
  }, [])

  const apiCalling = () => {
    axios.get('https://mavenow.com:8001/bedges?type=1&token=6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI', {

    })
      .then(function (data) {
        var GetData = data.data.result
        console.log("data=========", GetData);
        setBadges(GetData)
        // var ErrorMessage = data.data.ErrorMessage   https://mavenow.com:8001/badges/848
        // console.log("all data",ErrorMessage)
        // console.log('Current Data ==>',GetData.current);
        // console.log('Old Data ==>',GetData.old);
        // setCurrentData(GetData.current)
        // setOldData(GetData.old)

        // if(ErrorMessage=="successfuly") {
        //   setResult(GetData)
        //   // navigation.navigate('Home')
        //   // navigation.navigate('Testing')
        //   console.log('=============>',result.old);
        // }else{

        // }

      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.HeaderName}>{Lang_chg.Badges[config.language]}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >
            <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black', }} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
          </TouchableOpacity>
        </View>
        {/* ++++++++++++++++++++++++++++++++++++++ Header close ++++++++++++++++++++++++++++++++++++++++ */}

        {/* .........................................................model................................................... */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.Modal}>
                <View style={styles.ModalHeader}>

                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : Badges</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} >
                    <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange, }} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <ScrollView>
                  <View style={{ padding: mobileW * 3 / 100, flexDirection: "row" }}>

                    <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular }}>
                      Badges :
                    </Text>
                    <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100, width: mobileW * 70 / 100, fontFamily: Font.FontRegular }}> Under the Badges section,you  can view the list of all the
                      badges that you  have entered</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>


        {/* model..........................*/}
        {/*Flatlist=========================*/}
        <ScrollView >
          <FlatList
            data={userList1}
            renderItem={({ item, index }) =>
              <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.CardView}>
                  <View style={{ width: mobileW * 30 / 100, alignItems: 'center', justifyContent: 'center', }}>
                    <Image resizeMode='contain' style={{ width: mobileW * 30 / 100, height: mobileW * 20 / 100 }}
                      // source={{ uri:item.BedgeIconFileNameFull}}
                      source={require('./Icon/galley_placeholder.png')}
                    >

                    </Image>
                  </View>
                  <View style={{ width: mobileW * 70 / 100, padding: mobileW * 2 / 100 }}>
                    {/* <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontMedium, }}>{item.BedgeName}</Text> */}
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, }}>ABC</Text>
                    {/* <Text style={styles.description}>{item.Description}</Text> */}
                    <Text style={styles.description}>get silver badge on complete success teaching class</Text>
                    {/* <Text style={style={styles.awardsText}}>{item.awards}</Text> */}
                    <Text style={styles.awardsText}>Awarded on : 30, Dec 2022</Text>

                  </View>
                </TouchableOpacity>
                <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>

              </View>
            }
            keyExtractor={item => item.id} />
          {/* ======================================= =======================Flatlist================================================================= */}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  HeaderName: {
    color: Colors.blackColor,
    fontSize: mobileW * 4 / 100,
    marginHorizontal: mobileW * 3 / 100,
    fontFamily: Font.FontSemiBold
  },
  CardView: {
    backgroundColor: ' #FAFAFA',
    padding: mobileW * 2 / 100,
    width: mobileW,
    // margin: mobileW * 1 / 100, 
    // borderRadius:mobileW*2/100,
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 2,
    // shadowColor: '#000',
    // borderColor: "#e8edfb",
    // borderWidth: 1,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, },
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
  },
  BadgesText: {
    color: Colors.white_color,
    marginHorizontal: mobileW * 3 / 100,
    fontSize: mobileW * 4.5 / 100,
    fontFamily: Font.FontMedium,

  },
  description: {
    fontSize: mobileW * 3 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    width: mobileW * 60 / 100,
    marginTop: mobileW * 2 / 100
  },
  awardsText: {
    fontSize: mobileW * 3 / 100,
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    marginTop: mobileW * 1 / 100
  },
  ModalHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    backgroundColor: Colors.white_color
  },
  Modal: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  // backIcon: {
  //   width: mobileW * 6/ 100,
  //   height: mobileW * 6 / 100,
  //   tintColor: Colors.white_color
  // },
  // backIcon_: {
  //   width: mobileW * 9.5 / 100,
  //   height: mobileW * 9.5 / 100,
  //   tintColor: Colors.white_color
  // },
}
)