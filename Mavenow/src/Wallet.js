import { Modal, Alert, ScrollView, TextInput, StatusBar, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, RefreshControl, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Colors, Font } from './Provider/Colorsfont';
import { SafeAreaView } from 'react-native-safe-area-context';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

import moment from 'moment';
import LearnerList from './LearnerList';
import axios from 'axios';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
// const DATA_top = [
//   {
//     id: 1,

//     name_Available:'Total Available Balance',


//     price_Available:'  Rs 500',
//     name_Withdrawable:"Total Withdrawable Amount",
//     price_Withdrawable:'   Rs 5000',
//     PaymentProcess:"Withdraw Payment is progress"

//   },
// ]



export default function Wallet({ navigation }) {
  const [checked, setChecked] = useState('Current')
  const [show, setShow] = useState('Add')
  const [number, onChangeNumber] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [complete, setComplete] = useState([]);
  const [active, setActive] = useState([]);
  const [history, setHistory] = useState([]);
  const [topdata, setTopdata] = useState({});
  const [refresh, setrefresh] = useState(false)

  // -------------------------- refresh --------------------
  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1000);
  }
  // -----------------------refresh-------------------


  useEffect(() => {
    apiCalling();

  }, [])

  const apiCalling = () => {
    axios.get('https://mavenow.com:8001/wallet?id=848&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI', {

    })
      .then(function (data) {
        var GetData = data.data
        // console.log('jsdsssss',GetData);

        if (GetData.StatusCode == 200) {
          var GetData1 = GetData.result
          console.log("Header", GetData1);
          var DataToSet = GetData1.classes
          // console.log('All classes ==>', DataToSet);
          setTopdata(GetData1)
          setComplete(DataToSet.complete)
          setActive(DataToSet.current)
          setHistory(DataToSet.history)
         

        } else {
          console.log("I am in nor found")
        }

        console.log("dfdfsfs", GetData);

      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }


  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

        {/*Header  */}

        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.HeaderName}>{Lang_chg.WalletTxt[config.language]}</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => setModalVisible(true)}>
            <Image style={styles.backicon} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
          </TouchableOpacity>
        </View>

        {/* =================================================================Model================================================================ */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center' }}>
              <View style={{ width: mobileW * 90 / 100, borderRadius: mobileW * 3 / 100, alignSelf: 'center', backgroundColor: Colors.white_color, elevation: 5 }}>
                <View style={styles.ModalHeader}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : Wallet</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
                    <Image style={styles.backIcon_I} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium }}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>


        {/* 
<View style={{backgroundColor:Colors.light_cyan,margin:mobileW*1/100, borderRadius:mobileW*1/100}}>
 
<View style={{margin:mobileW*4/100, }}>
  <View style={{alignItems:'center', }}>
  <Text style={{fontSize:mobileW*5/100, color:Colors.themecolor, fontFamily:Font.FontBold,}}>Rs {topdata.walletAmount}</Text>
    <Text style={{fontSize:mobileW*3.2/100, color:Colors.gray, marginTop:mobileW*1/100,fontFamily:Font.FontRegular}}>{Lang_chg.AvailableBalanceTxt[config.language]}</Text>
</View>

<View style={{flexDirection:'row', alignItems:'center',  }}>
<View style={{marginTop:mobileW*3/100,width:mobileW*43/100, }} >
  <Text style={{fontSize:mobileW*4/100, color:Colors.themecolor,fontFamily:Font.FontMedium,textAlign:'center'}}>Rs {topdata.retrievalAmount}</Text>
  <Text style={{fontSize:mobileW*3.2/100, marginTop:mobileW*1/100, color:Colors.gray,fontFamily:Font.FontRegular }}>{Lang_chg.withdrawableAmounTxt[config.language]}</Text>
</View>
<View style={{width:mobileW*47/100,}}>
  <Text style={{fontSize:mobileW*3.2/100, color:Colors.gray, textAlign:'center',fontFamily:Font.FontRegular}}>{Lang_chg.FundsprogressTxt[config.language]}</Text>
</View>
</View>
</View>
</View> */}

        {/* ===========> Thuraday */}
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, }}>
          <ImageBackground
            imageStyle={{ width: mobileW * 16.3 / 100, height: mobileW * 16.5 / 100, tintColor: "#E7E8EA", marginTop: mobileW * 8.5 / 100, left: mobileW * 27 / 100 }}
            style={{
              width: mobileW * 45 / 100,
              height: mobileW * 30 / 100,
              borderRadius: mobileW * 3 / 100,
              marginTop: mobileW * 5 / 100,
              backgroundColor: Colors.bgcolor,
              borderColor: "#E7E8EA",
              borderWidth: mobileW * 0.3 / 100,
              alignItems: "center", justifyContent: 'center'
            }}
            source={require('./Icon/wallet.png')}>


            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: mobileW * 4.5 / 100, color: Colors.black_color, fontFamily: Font.FontSemiBold, }}>Rs {topdata.walletAmount}</Text>
              <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.AvailableBalanceTxt[config.language]}</Text>
            </View>
          </ImageBackground>
          <ImageBackground
            imageStyle={{ width: mobileW * 16.3 / 100, height: mobileW * 16.5 / 100, tintColor: "#E7E8EA", marginTop: mobileW * 8.5 / 100, left: mobileW * 27 / 100 }}
            style={{
              width: mobileW * 45 / 100,
              height: mobileW * 30 / 100,
              borderRadius: mobileW * 3 / 100,
              marginTop: mobileW * 5 / 100,
              backgroundColor: Colors.bgcolor,
              borderColor: "#E7E8EA",
              borderWidth: mobileW * 0.3 / 100,
              alignItems: "center", justifyContent: 'center'
            }}
            source={require('./Icon/wallet.png')}>


            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: mobileW * 4.5 / 100, color: Colors.black_color, fontFamily: Font.FontSemiBold, }}>Rs {topdata.walletAmount}</Text>
              <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.AvailableBalanceTxt[config.language]}</Text>
            </View>
          </ImageBackground>
        </View>

        {/* ===========> Thuraday */}


        {/* <View style={styles.buttonCard}>
            <TouchableOpacity activeOpacity={0.8}onPress={()=>setChecked('Current')}
              style={[{ backgroundColor: checked === 'Current' ? Colors.white_color : Colors.themecolor, }, styles.activeButton]}>
              <Text style={{ color: checked === 'Current' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.ActiveTxt[config.language]}</Text>
            </TouchableOpacity >
            <TouchableOpacity activeOpacity={0.8} onPress={()=>setChecked('Old')}
              style={[{ backgroundColor: checked === 'Old' ? Colors.white_color : Colors.themecolor, }, styles.activeButton]}>
              <Text style={{ color: checked === 'Old' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3.5/ 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.CompletedTxt[config.language]}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>setChecked('History')}
              style={[{ backgroundColor: checked === 'History' ? Colors.white_color : Colors.themecolor }, styles.activeButton]}>
              <Text style={{ color: checked === 'History' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3.5/ 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.HistoryTxt[config.language]}</Text>
            </TouchableOpacity>
          </View> */}

        <View style={{ flexDirection: 'row', marginTop: mobileW * 5 / 100 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Current')}>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 10 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: checked === 'Current' ? Colors.themecolor : Colors.gray }}>{Lang_chg.ActiveTxt[config.language]}</Text>

            </View>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 0.3 / 100, backgroundColor: checked === 'Current' ? Colors.themecolor : '#E7E8EA' }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Old')}>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 10 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: checked === 'Old' ? Colors.themecolor : Colors.gray }}>{Lang_chg.CompletedTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 0.3 / 100, backgroundColor: checked === 'Old' ? Colors.themecolor : '#E7E8EA' }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('History')}>
            <View style={{ width: mobileW * 33.4 / 100, height: mobileW * 10 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: checked === 'History' ? Colors.themecolor : Colors.gray }}>{Lang_chg.HistoryTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 33.4 / 100, height: mobileW * 0.3 / 100, backgroundColor: checked === 'History' ? Colors.themecolor : '#E7E8EA' }}></View>
          </TouchableOpacity>
        </View>


        {/* =====================================       active dataa  */}

        {checked == 'Current' &&
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={_onRefresh}
                tintColor={Colors.themecolor}
                colors={[Colors.themecolor]} />}>
            {active != "" ?
              <View>
                <FlatList
                  data={active}
                  renderItem={({ item, index }) =>
                    <View style={styles.flatlistCard}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerList')} style={{ flexDirection: 'row', }}>
                        <View style={{ width: mobileW * 31 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
                          <View style={styles.imageCard}>
                            <Image resizeMode='contain' style={styles.mavenImage}
                              source={item.teacherImage}></Image>
                          </View>
                          <Text style={{ fontSize: mobileW * 3.4 / 100, color: Colors.black_color, marginTop: mobileW * 1 / 100, fontFamily: Font.FontMedium }}>{item.teacherName} </Text>
                          <Text style={{ fontSize: mobileW * 3.4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.MavenTxt[config.language]}</Text>
                          <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.light_grey }}
                                source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.light_grey }}
                                source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.light_grey }}
                                source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.light_grey }}
                                source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.light_grey }}
                                source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View>
                          <Text style={{ color: Colors.black_color, fontFamily: Font.FontMedium, fontSize: mobileW * 3.5 / 100 }}>{item.Skills}</Text>
                          <View style={{ flexDirection: 'row', }}>

                            <View style={{ width: mobileW * 31 / 100, }}>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.Statictxt}>Start Date</Text>
                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.Statictxt}>End Date</Text>
                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.Statictxt}>All Student</Text>
                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{item.AllStudentCount}</Text>
                              </View>
                            </View>
                            <View style={{ width: mobileW * 31 / 100, }}>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.Statictxt}>Charges</Text>
                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.themecolor, fontFamily: Font.FontRegular }}>Rs {item.Charges}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.Statictxt}>Your Earning*</Text>
                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium }}>Rs {item.earningAmount}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.Statictxt}>Paid Students</Text>
                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{item.PaidStudentCount}</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                      </TouchableOpacity>

                    </View>
                  }
                  keyExtractor={item => item.id} />
              </View>
              :
              <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, alignSelf: "center", marginTop: mobileH * 30 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.DataNotFoundTxt[config.language]}</Text>
            }
          </ScrollView>
        }

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++ Complete data +++++++++++++++++++++++++++++++++++++++++++ */}


        {checked == 'Old' &&
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={_onRefresh}
                tintColor={Colors.themecolor}
                colors={[Colors.themecolor]} />}>
            {complete != "" ?
              <View style={{ marginBottom: mobileW * 5 / 100 }}>
                <FlatList
                  // contentContainerStyle={{ backgroundColor:'red'}}
                  data={complete}
                  renderItem={({ item, index }) =>
                    <View style={styles.flatlistCard}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerList', { item: item })} style={{ flexDirection: 'row', }}>
                        <View style={{ width: mobileW * 22 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
                          <View style={styles.imageCard}>
                            <Image resizeMode='contain' style={styles.mavenImage}
                              source={item.teacherImage}></Image>
                          </View>

                        </View>
                        <View>
                          <Text style={styles.maven_Text}>{item.teacherName} ({Lang_chg.MavenTxt[config.language]}) </Text>
                          <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, marginTop: mobileW * -1 / 100 }}>{item.Skills}</Text>
                          <View style={{ flexDirection: 'row',}}>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: mobileW * 40.6 / 100, }}>
                              <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center', flexDirection: 'row' }} >
                                <Text style={styles.dynamic_Text}>{Lang_chg.StartDateTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center', marginTop: mobileW * 0.1 / 100, flexDirection: 'row' }} >
                                <Text style={styles.dynamic_Text}>{Lang_chg.EndDateTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }}> {moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center', marginTop: mobileW * 0.1 / 100, flexDirection: 'row' }} >
                                <Text style={styles.dynamic_Text}>{Lang_chg.AllStudentTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }}> {item.AllStudentCount}</Text>
                              </View>
                            </View>
                            <View style={{ width: mobileW * 39 / 100, }}>
                              <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center', flexDirection: 'row' }} >
                                <Text style={styles.dynamic_Text}>{Lang_chg.ChargesTxt[config.language]} </Text>
                                <Text style={styles.Dynamiccharges_Text}>Rs {item.Charges}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center', marginTop: mobileW * 0.1 / 100, flexDirection: 'row' }} >
                                <Text style={styles.dynamic_Text}>{Lang_chg.YourEarningTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium, width: mobileW * 15 / 100, }}>Rs {item.earningAmount}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center', marginTop: mobileW * 0.1 / 100, flexDirection: 'row' }} >
                                <Text style={styles.dynamic_Text}>{Lang_chg.PaidStudentsTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, color: Colors.gray, fontFamily: Font.FontRegular, width: mobileW * 13 / 100, }}>{item.PaidStudentCount}</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                      </TouchableOpacity>
                      <View style={{ width: mobileW, height: mobileW * 0.1 / 100, marginTop: mobileW * 2 / 100, backgroundColor: Colors.gray }}></View>

                    </View>
                  }
                  keyExtractor={item => item.id} />
              </View>
              :
              <Text style={styles.dataNotFound}>{Lang_chg.DataNotFoundTxt[config.language]}</Text>
            }
          </ScrollView>
        }


        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  history  data  ++++++++++++++++++++++++++++++++++++++++++++++ */}
        {checked == 'History' &&
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={_onRefresh}
                tintColor={Colors.themecolor}
                colors={[Colors.themecolor]} />}>
            {history != "" ?
              <View>
                <FlatList
                  data={history}
                  renderItem={({ item, index }) =>
                    <View style={styles.flatlistCard}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerList')} style={{ flexDirection: 'row', }}>
                        <View style={{ width: mobileW * 31 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
                          <View style={styles.imageCard}>
                            <Image resizeMode='contain' style={styles.mavenImage}
                              source={item.teacherImage}></Image>
                          </View>
                          <Text style={styles.teacher_Name}>{item.teacherName} </Text>
                          <Text style={{ fontSize: mobileW * 3.7 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>(Maven)</Text>
                          <View style={styles.startImage_View}>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                              <Image resizeMode='contain' style={styles.starImage} source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View>
                          <Text style={{ color: Colors.black_color, fontFamily: Font.FontMedium, fontSize: mobileW * 3.5 / 100 }}>{item.Skills}</Text>
                          <View style={{ flexDirection: 'row', }}>

                            <View style={{ width: mobileW * 31 / 100, }}>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.static_Text}>Start Date</Text>
                                <Text style={styles.dynamic_Text}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.static_Text}>End Date</Text>
                                <Text style={styles.dynamic_Text}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                              <Text style={styles.static_Text}>All Student</Text>
                                <Text style={styles.dynamic_Text}>{item.AllStudentCount}</Text>
                              </View>
                            </View>
                            <View style={{ width: mobileW * 31 / 100, }}>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                              <Text style={styles.static_Text}>Charges</Text>
                                <Text style={styles.charges_Text}>Rs {item.Charges}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.static_Text}>Your Earning*</Text>
                                <Text style={styles.charges_Text}>Rs {item.earningAmount}</Text>
                              </View>
                              <View style={{ marginTop: mobileW * 2 / 100 }} >
                                <Text style={styles.static_Text}>Paid Students</Text>
                                <Text style={styles.dynamic_Text}>{item.PaidStudentCount}</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                      </TouchableOpacity>
                    </View>
                  }
                  keyExtractor={item => item.id} />
              </View>
              :
              <Text style={styles.dataNotFound}>{Lang_chg.DataNotFoundTxt[config.language]}</Text>
            }
          </ScrollView>
        }
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dynamic_Text:{ 
    fontSize: mobileW * 2.8 / 100, 
  color: Colors.black_color,
   fontFamily: Font.FontRegular
 },
 startImage_View:{ 
  flexDirection: 'row', 
 marginTop: mobileW * 1 / 100
 },
 maven_Text:{ 
  fontSize: mobileW * 3.4 / 100,
  color: Colors.black_color,
  marginTop: mobileW * 1 / 100, 
 fontFamily: Font.FontMedium
 },

  static_Text:{ 
    fontSize: mobileW * 2.8 / 100,
   color: Colors.gray, 
  fontFamily: Font.FontRegular 
},
charges_Text:{
   fontSize: mobileW * 2.8 / 100,
 color: Colors.themecolor,
fontFamily: Font.FontRegular
 },
 Statictxt:{
  fontSize: mobileW * 2.6 / 100,
  color: Colors.gray,
  fontFamily: Font.FontRegular 
},


teacher_Name:{
   fontSize: mobileW * 3.5 / 100, 
color: Colors.black_color,
 marginTop: mobileW * 1 / 100, 
fontFamily: Font.FontRegular
 },

  backicon:{ 
    width: mobileW * 5 / 100, 
  height: mobileW * 5 / 100,
   tintColor: 'black',
 },
 Dynamiccharges_Text:{ 
  fontSize: mobileW * 2.6 / 100,
   color: Colors.gray,
    fontFamily: Font.FontRegular,
     width: mobileW * 21 / 100
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
  starImage: {
    width: mobileW * 4 / 100,
    height: mobileW * 4 / 100,
    tintColor: Colors.light_grey
  },
  backIcon_I: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  flatlistCard: {
    width: mobileW,
    alignSelf: 'center',
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.white_color,
  },
  withdrawBtn: {
    backgroundColor: Colors.themecolor,
    width: mobileW * 26 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 2 / 100,
    marginHorizontal: mobileW * 5 / 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCard: {
    width: mobileW * 15 / 100,
    height: mobileW * 15 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.4 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mavenImage: {
    width: mobileW * 15 / 100,
    height: mobileW * 15 / 100,
    borderRadius: mobileW * 5 / 100,
    tintColor: Colors.themecolor
  },
  flatlistFootar: {
    backgroundColor: Colors.themecolor,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: mobileW * 0 / 100,
    marginTop: mobileW * 2 / 100,
    height: mobileW * 7 / 100
  },
  dataNotFound: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    alignSelf: "center",
    marginTop: mobileH * 30 / 100,
    fontFamily: Font.FontMedium
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  buttonCard: {
    flexDirection: 'row',
    backgroundColor: Colors.themecolor,
    width: mobileW * 100 / 100,
    height: mobileW * 12.5 / 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  activeButton: {
    width: mobileW * 32 / 100,
    height: mobileW * 10 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
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
})