import { Modal, Alert, ScrollView, TextInput, StatusBar, Animated, FlatList, RefreshControl, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { localStorage } from './Provider/localStorageProvider';
import axios from 'axios';
import moment from 'moment';
import { log } from 'react-native-reanimated';
import { getDate, set } from 'date-fns';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

// const Current_Data = [
//   {
//     id:1,
//     name:'Jointh Smith',
//     skills:'Kotlin (Basic)',
//     startDate:'Jul 31, 2023',
//     endDate:'Jul 31, 2023',
//     fee:'Rs 500',
//     paymentStatus:'Unpaid'
//   },
//   {
//     id:2,
//     name:'Tom Smith',
//     skills:'Kotlin (Basic)',
//     startDate:'Jul 31, 2023',
//     endDate:'Jul 31, 2023',
//     fee:'Rs 500',
//     paymentStatus:'Unpaid'
//   }
// ]
const Current_Data = [
  {
    "userId": 891,
    "fullname": "vindi",
    "profileImage": "",
    "rating": 0,
    "timezone": "Asia/Kolkata",
    "classes": [
      {
        "StartDate": "2022-09-13T18:30:00.000Z",
        "Enddate": "2022-09-16T18:29:00.000Z",
        "skill": "Automation testing",
        "level": "Basic",
        "isPaid": 1,
        "userskillid": 798,
        "requestId": 1555,
        "charges": 500,
        "retrievalAmount": 500,
        "Charges": 500,
        "showRefund": 0,
        "showrefundstatus": ""
      }
    ]
  },
  {
    "userId": 881,
    "fullname": "Vinay",
    "profileImage": "",
    "rating": 0,
    "timezone": "Asia/Kolkata",
    "classes": [
      {
        "StartDate": "2022-09-14T18:30:00.000Z",
        "Enddate": "2022-09-17T18:29:00.000Z",
        "skill": "Automation testing",
        "level": "Basic",
        "isPaid": 0,
        "userskillid": 798,
        "requestId": 1555,
        "charges": 500,
        "retrievalAmount": 500,
        "Charges": 500,
        "showRefund": 0,
        "showrefundstatus": ""
      }
    ]
  },
]



export default function MyLearners({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldShow1, setShouldShow1] = useState("Current")
  const [CurrentData, setCurrentData] = useState()
  const [oldData, setOldData] = useState()
  const [oldClasses, setoldClasses] = useState('')
  const [show, setShow] = useState('Add')
  const [textmodal, settextmodal] = useState(false)
  console.log("oldData", oldData);
  console.log("CurrentData", CurrentData);
  console.log("setoldClasses", oldClasses);
  const [userMode, setuserMode] = useState();
  const [paymentmodal, setPaymentmodal] = useState(false);
  const [select, SetSelect] = useState('Maven')
  const [refresh, setrefresh] = useState(false);


  useEffect(() => {
    apiCalling();
    SetMode();
    // recommendedApi();
  }, [])

  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }

  const SetMode = async (data) => {
    const value = await localStorage.getItemString('UserMode')
    console.log("..........", value);
    setuserMode(value)
  }

  const apiCalling = () => {
    axios.post('https://mavenow.com:8001/user/discipleOrMaster?userId=848&for=disciple&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI', {
      "currentdate": "21/02/2022"
    })
      .then(function (data) {
        var GetData = data.data.result
        console.log('-------- discipleOrMaster >', GetData)
        var ErrorMessage = data.data.ErrorMessage
        console.log("data ------------------------------->", ErrorMessage)
        console.log('Current Data------------>', GetData.current);
        console.log('Old Data------------------->', GetData.old);

        var olddataa = GetData.old

        console.log("DATA Hermes Internal", olddataa);
        for (let i = 0; i < olddataa.length; i++) {
          console.log('Old Daa Classes ------------------->', olddataa[i].classes);
          setoldClasses(olddataa[i].classes)
        }

        setCurrentData(GetData.current)
        setOldData(GetData.old)
        // setCurrentDataForSearch(GetData.current)
        // setOldDataForSearch(GetData.old)

      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }

  // const _searchLearner = (textToSearch) => {

  //   var textToSearch = textToSearch.toString().toLowerCase();
  //   if (shouldShow1 == 'Old') {
  //     var data1 = oldData
  //   }  else if (shouldShow1 == 'Current') {
  //     var data1 = CurrentData
  //   } 
  //   // else if (shouldShow1 == 'Completed') {
  //   //   var data1 = completedForSearch
  //   // }

  //   if (data1 != 'NA') {
  //     console.log('data1', data1);
  //     if (data1 != 'NA') {
  //       var text_data = textToSearch.trim();
  //       let newData = data1.filter(function (item) {
  //         var name = item.fullname
  //         return (
  //           name.toString().toLowerCase().indexOf(text_data) > - 1
  //           // name.toString().toLowerCase().indexOf(text_data) >= 0
  //         )
  //       });

  //       console.log('newData------- before set', newData);
  //       if (shouldShow1 == 'Old') {
  //         if (newData.length > 0) {
  //           setOldData(newData)
  //         } else if (newData.length <= 0) {
  //           setOldData('')
  //         }
  //       }
  //       else if (shouldShow1 == 'Current') {
  //         if (newData.length > 0) {
  //           setCurrentData(newData)
  //         } else if (newData.length <= 0) {
  //           setCurrentData('')
  //         }
  //       } 
  //       // else if (shouldShow1 == 'Completed') {
  //       //   if (newData.length > 0) {
  //       //     setCompleted(newData)
  //       //   } else if (newData.length <= 0) {
  //       //     // name.toString().toLowerCase().indexOf(text_data) >= 0
  //       //     setCompleted('')
  //       //   }
  //       // }
  //     }
  //   }
  // }





  const _searchLearner = (text) => {
    setSearchQuery(text);
    const filteredResults = oldData.filter((item) =>
      item.fullname.toLowerCase().includes(text.toLowerCase())
    );
    setOldData(filteredResults);
  };


  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />

        {/* ==============>  Header */}

        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>

          </View>
          <Text style={styles.HeaderName}>{userMode == 'maven' ? Lang_chg.MyLearnerTxt[config.language] : Lang_chg.MyMavenTxt[config.language]}</Text>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>

            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 2 / 100 }} onPress={() => setShow('search')}>
              <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black' }} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => settextmodal(true)}>
              <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black', }} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
            </TouchableOpacity>
          </View>
        </View>


        {show != 'Add' &&
          <View style={styles.searchView}>
            <View style={styles.TextInputView}>
              <TextInput style={styles.TextInput}
                paddingLeft={mobileW * 2 / 100}
                value={searchQuery}
                onChangeText={(txt) => _searchLearner(txt)}
                placeholder={Lang_chg.SearchEngine[config.language]}
                placeholderTextColor={Colors.gray} />
              <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
                <Image resizeMode='contain' style={styles.croseImage} source={require('./Icon/close2.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>}


        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Current/Old Button +++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow1('Current')}>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Current' ? Colors.themecolor : Colors.gray }}>{userMode == 'maven' ? Lang_chg.CurrentLearnerTxt[config.language] : Lang_chg.CurrentMavenTxt[config.language]}</Text>

            </View>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Current' ? Colors.themecolor : Colors.light_grey }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow1('Old')}>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Current' ? Colors.gray : Colors.themecolor }}>{userMode == 'maven' ? Lang_chg.OldLearnerTxt[config.language] : Lang_chg.OldMavenTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Current' ? Colors.light_grey : Colors.themecolor }}></View>
          </TouchableOpacity>
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Current Maven Data +++++++++++++++++++++++++++++++++++++++++++++++ */}


        <View  >
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]} />
          }>
    {shouldShow1 == 'Current' &&
    <View style={{ paddingBottom: mobileH * 12 / 100 }}>
      {CurrentData != '' ? <View>
        <FlatList
          data={CurrentData}
          renderItem={({ item }) =>
            <View>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnersDetail')} style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, padding: mobileW * 4 / 100, }}>
                <View style={{ width: mobileW * 18 / 100, }}>
                  <View>
                    <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }}
                      source={require('./Icon/12.jpg')}></Image>
                  </View>
                </View>
      <View style={{ width: mobileW * 74 / 100, }}>
        <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{item.fullname}</Text>
        <Text style={{ fontSize: mobileW * 3 / 100, marginTop: mobileW * -1 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>{item.skill}</Text>


        <FlatList
          data={item.classes}
          renderItem={({ item }) =>
            <View>
              <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>

                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]} </Text>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 19 / 100 }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                </View>
                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.FeeTxt[config.language]} </Text>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 28 / 100 }}>{item.charges}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]} </Text>
                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 19 / 100 }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                </View>
                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.PaymentStatusTxt[config.language]} </Text>
                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 17 / 100 }}>{item.isPaid === 1 ? "paid" : 'unpaid'}</Text>
                </View> 
              </View>
              <View style={{ width: mobileW * 74 / 100, height: mobileW * 0.2 / 100, marginTop: mobileW * 3 / 100, backgroundColor: '#E7E8EA' }}></View>

            </View>} /> 
      </View>

      </TouchableOpacity>

      <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>
    </View>}

        />
      </View> :
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 35 / 100 }}>
          <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
        </View>
      }
    </View>
            }
          </ScrollView>
        </View>


        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Maven Data +++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={{ marginBottom: mobileH * 12 / 100 }}>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]} />
          }>
            {shouldShow1 == 'Old' &&

              <View style={{ paddingBottom: mobileH * 2 / 100 }}>
        {oldData != '' ? <View>
          <FlatList
            data={oldData}
            renderItem={({ item }) => {
              const classesData = item.classes;

              return (
                <View>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnersDetail')} style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, padding: mobileW * 4 / 100, }}>
                    <View style={{ width: mobileW * 18 / 100, }}>
                      <View>
                        <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }}
                          source={require('./Icon/12.jpg')}></Image>
                      </View>
                    </View>

                    <View>
                      <View style={{ width: mobileW * 74 / 100, }}>
                        <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{item.fullname}</Text>
                        <Text style={{ fontSize: mobileW * 3 / 100, marginTop: mobileW * -1 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>{item.skills}</Text>
        <FlatList
          data={classesData}
          renderItem={({ item }) => {
            const ArrayLength = classesData.length;
            return (

              <View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                  <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100,  fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 18.2 / 100, }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                  </View>
                  <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.FeeTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 17 / 100 }}>Rs {item.charges}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                  <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 19 / 100 }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                  </View>
                  <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}> {Lang_chg.PaymentStatusTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 10.5 / 100, }}>{item.isPaid === 1 ? "paid" : 'unpaid'}</Text>
                  </View>
                </View>
                {ArrayLength > 1 &&
                  <View style={{ width: mobileW * 74 / 100, height: mobileW * 0.2 / 100, marginTop: mobileW * 3 / 100, backgroundColor: '#E7E8EA' }}></View>}

              </View>
            )
          }
          } />

                      </View>


                    </View>
                    {/* <View style={{width:mobileW*36/100, height:mobileW*10/100, backgroundColor:'blue'}}></View> */}
                  </TouchableOpacity>
                  <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>
                </View>)
            }  //

            }

          />
        </View> :
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 10 / 100 }}>
            <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
          </View>}
              </View>
            }
          </ScrollView>
        </View>


        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Payment Modal ++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={paymentmodal}
          >
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.papymentModelCard}>
                <View style={styles.setpaymentmodal}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Payment Option</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setPaymentmodal(!paymentmodal)}  >
                    <Image style={styles.paymentmodalclose} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: mobileW * 3 / 100 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: mobileW * 12 / 100, height: mobileW * 12 / 100, borderRadius: mobileW * 6 / 100, }}
                      source={require('./Icon/12.jpg')}></Image>
                    <View style={{ marginHorizontal: mobileW * 2 / 100 }}>
                      <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>Jointh Smith</Text>
                      <Text style={{ fontSize: mobileW * 3.2 / 100, marginTop: mobileW * -1 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}> Join Date Mar 21 2023</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.themecolor, fontFamily: Font.FontMedium }}>Fee: </Text>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.themecolor, fontFamily: Font.FontRegular }}>450Rs</Text>
                  </View>
                </View>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, paddingLeft: mobileW * 3 / 100, fontFamily: Font.FontMedium }}>Select Payment Option</Text>

                <View style={{ padding: mobileW * 3 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Maven')}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={[styles.RadioBtn, { borderColor: select === 'Maven' ? Colors.themecolor : Colors.themecolor }]}>
                        <View style={{ width: mobileW * 2.5 / 100, height: mobileW * 2.5 / 100, backgroundColor: select === 'Maven' ? Colors.themecolor : '#F5F5F5', borderRadius: mobileW * 3 / 100, }}>
                        </View>
                      </View>
                      {/*<Text style={styles.maven_txt}>Maven</Text>*/}
                      <Text style={styles.maven_txt}>Paypal</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => SetSelect('Learner')}>
                    <View style={styles.learner_view}>
                      <View style={[styles.RadioBtn, { borderColor: select === 'Learner' ? Colors.themecolor : Colors.themecolor }]}>
                        <View style={{ width: mobileW * 2.5 / 100, height: mobileW * 2.5 / 100, backgroundColor: select === 'Learner' ? Colors.themecolor : '#F5F5F5', borderRadius: mobileW * 3 / 100 }}>
                        </View>
                      </View>
                      <Text style={styles.maven_txt}>Razorpay</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: mobileW * 3 / 100, justifyContent: 'center' }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setPaymentmodal(!paymentmodal)} style={styles.CancelBtn}>
                    <Text style={{ color: Colors.white_color, fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={[styles.CancelBtn, { marginHorizontal: mobileW * 2 / 100, backgroundColor: Colors.white_color }]}>
                    <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>



        {/* ====> about text modal */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={textmodal}
            onRequestClose={() => {
              settextmodal(!textmodal);
            }}>
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.ModelCard}>
                <View style={styles.ModelHeader}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : profile</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => settextmodal(!textmodal)} >
                    <Image style={styles.backIcon_edit} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular }}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
        {/* // =======>  about text modal  */}

      </SafeAreaView>
    </View>
  )
}



const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  croseImage: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.color_orange
  },
  searchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon_edit: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    tintColor: Colors.color_orange,
  },
  paymentmodalclose: {
    tintColor: Colors.red,
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  ModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  setpaymentmodal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    height: mobileW * 12 / 100,
    padding: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
  },
  CancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.themecolor,
    width: mobileW * 20 / 100,
    height: mobileW * 7 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  ModelCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  papymentModelCard: {
    elevation: 5,
    width: mobileW * 92 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  RadioBtn: {
    justifyContent: 'center',
    alignItems: "center",
    width: mobileW * 4.5 / 100,
    height: mobileW * 4.5 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.40 / 100,
  },
  maven_txt: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.2 / 100,
    marginHorizontal: mobileW * 2 / 100,
  },
  learner_view: {
    flexDirection: "row",
    marginTop: mobileW * 2 / 100
  },
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray,
    backgroundColor: Colors.white_color,
    width: mobileW * 92 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  TextInput: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    backgroundColor: Colors.white_color,
    width: mobileW * 82 / 100,
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.1 / 100,
    borderRadius: mobileW * 2 / 100,
    
  },
  HeaderName: {
    color: Colors.blackColor,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 4 / 100,
    marginHorizontal: mobileW * 3 / 100,

  },
})











// import { Modal, Alert, ScrollView, TextInput, StatusBar, Animated, FlatList, RefreshControl, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors, Font } from './Provider/Colorsfont';
// import { config, msgProvider, msgText, consolepro, Lang_chg,  msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import { localStorage } from './Provider/localStorageProvider';
// import axios from 'axios';
// import moment from 'moment';
// import { log } from 'react-native-reanimated';
// import { getDate, set } from 'date-fns';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// export default function MyLearners({ navigation }) {
//   const [checked, setChecked] = useState('Current')
//   const [show, setShow] = useState('Add')
//   const [modalVisible, setModalVisible] = useState(false);
//   const [oldData, setOldData] = useState('')
//   const [CurrentData, setCurrentData] = useState('')
//   const [Searchtext, setSearchtext] = useState('')
//   const [CurrentDataForSearch, setCurrentDataForSearch] = useState('')
//   const [OldDataForSearch, setOldDataForSearch] = useState('')
//   const [refresh, setrefresh] = useState(false)
//   const [userMode, setuserMode] = useState();

//   const _onRefresh = async () => {
//     console.log('_onRefresh', '_onRefresh')
//     setrefresh(true)
//     setTimeout(() => {
//       setrefresh(false)
//     }, 1000);
//   }

//   useEffect(() => {
//     apiCalling();
//     SetMode();
//     // recommendedApi();
//   }, [])

//   const SetMode = async (data) => {
//   const value = await localStorage.getItemString('UserMode')
//   console.log("..........", value);
//   setuserMode(value)}

//     const apiCalling = () => {
//     axios.post('https://mavenow.com:8001/user/discipleOrMaster?userId=848&for=disciple&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI', {
//       "currentdate": "21/02/2022"
//     })
//        .then(function (data) {
//         var GetData = data.data.result
//         console.log('-------- discipleOrMaster >', GetData)
//         var ErrorMessage = data.data.ErrorMessage
//         console.log("data ------------------------------->", ErrorMessage)
//         console.log('Current Data------------>', GetData.current);
//         console.log('Old Data------------------->', GetData.old);
        
//         var olddataa = GetData.old
//         for(let i=0; i<olddataa.length; i++){
//           console.log('Old Daa Classes ------------------->', olddataa[i].classes);
//            }

//         setCurrentData(GetData.current)
//         setOldData(GetData.old)
//         setCurrentDataForSearch(GetData.current)
//         setOldDataForSearch(GetData.old)

//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }

//   //--------function for subject local search-------//

//   const _searchLearner = (textToSearch) => {
//     var textToSearch = textToSearch.toString().toLowerCase();
//     let data1 = OldDataForSearch
//     if (data1 != 'NA') {
//       console.log('data1', data1);
//       if (data1 != 'NA') {
//         var text_data = textToSearch.trim();
//         let newData = data1.filter(function (item) {
//           // var name = item.fullname 
//           if (checked == 'Current') {
//             var name = item.fullname
//           } else {
//             var name = item.fullname
//           }
//           return (
//             name.toString().toLowerCase().indexOf(text_data) >= 0
//           )
//         });

//         if (newData.length > 0) {
//           setOldData(newData)
//         } else if (newData.length <= 0) {
//           setOldData('')
//         }
//       }
//     }
//   }

//   return (
//     <View style={{ flex: 1, }}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>

//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
        



//         <View style={styles.Header}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ marginHorizontal: mobileW * 2 / 100 }} >
//               <Image style={styles.backIcon_} resizeMode='contain'
//                 source={require("./Icon/bk.png")}></Image>
//             </TouchableOpacity>
//             <Text style={{ color: Colors.white_color, fontFamily:Font.FontMedium, fontSize: mobileW * 4.5 / 100, marginHorizontal: mobileW * 5 / 100 }}>{userMode == 'maven' ?Lang_chg.MyLearnerTxt[config.language]   : Lang_chg.MyMavenTxt[config.language]  }</Text>

//             {/* <Text style={{ color: Colors.white_color,fontSize: mobileW * 4.5 / 100, marginHorizontal:mobileW*4.5/100,fontFamily:Font.FontMedium }}>{userMode == 'maven' ? "My Learner(s)" : "My Maven(s)"}</Text> */}
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('search')} style={{}}>
//               <Image style={styles.SearchIcon} resizeMode='contain' 
//                 source={require("./Icon/icon_search.png")}></Image>
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginHorizontal: mobileW * 4 / 100 }}  >
//               <Image style={styles.SearchIcon} resizeMode='contain'
//                 source={require("./Icon/icon_info.png")}></Image>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* =================================================================Model================================================================ */}
//         <View  >
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//           >
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
//               <View style={styles.ModelCard}>
//                 <View style={styles.ModelHeader}>
//                   <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontFamily:Font.FontMedium, }}></Text>
//                   <Text style={{ color: Colors.white_color, fontSize: mobileW * 4.5 / 100, fontFamily:Font.FontMedium, }}>      Help : My Learner(s)</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 4 / 100 }} >
//                     <Image style={styles.backIcon} resizeMode='contain'
//                       source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView>
//                   <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>
//                     <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium, }}>
//                       Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//                       when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                       It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                       It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
//                       and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//                     </Text>
//                   </View>
//                 </ScrollView>

//               </View>
//             </View>
//           </Modal>
//         </View>
//         {show != 'Add' &&
//           <View style={{ width: mobileW, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>
//             <View style={{ backgroundColor: Colors.white_color, width: mobileW * 95 / 100, flexDirection: 'row', borderRadius: mobileW * 1 / 100, alignItems: 'center' }}>
//               <TextInput
//                 style={styles.searchInput}
//                 // onChangeText={text => setSearchtext(text)}
//                 fontFamily={Font.FontMedium}
//                 onChangeText={(txt) => _searchLearner(txt)}
//                 placeholder={Lang_chg.search[config.language]}
//                 placeholderTextColor={Colors.gray}
//               />
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
//                 <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, borderRadius: mobileW * 2 / 100, tintColor: Colors.themecolor }}
//                   source={require('./Icon/close2.png')}></Image>
//               </TouchableOpacity>
//             </View>
//           </View>}

//         <View style={{ backgroundColor: Colors.themecolor, flexDirection: 'row', justifyContent: 'center' }}>
//           <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Current')} style={[{ backgroundColor: checked === 'Current' ? Colors.white_color : Colors.themecolor }, styles.CurrentLearner]} >
//             <Text style={{ color: checked === 'Current' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3/ 100, fontFamily:Font.FontSemiBold }}>{userMode == 'maven' ?Lang_chg.CurrentLearnerTxt[config.language]  :Lang_chg.CurrentMavenTxt[config.language] }</Text>
//           </TouchableOpacity>
//           <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Old')} style={[{ backgroundColor: checked === 'Old' ? Colors.white_color : Colors.themecolor }, styles.CurrentLearner]} >
//             <Text style={{ color: checked === 'Old' ? Colors.themecolor : Colors.white_color, fontSize: mobileW *3 / 100, fontFamily:Font.FontSemiBold }}>{userMode == 'maven' ?Lang_chg.OldLearnerTxt[config.language] :Lang_chg.OldMavenTxt[config.language] }</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={{ marginVertical: mobileW * 5 / 100 }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refresh}
//               onRefresh={_onRefresh}
//               tintColor={Colors.themecolor}
//               colors={[Colors.themecolor]}
//             />
//           }>
//           {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Current Data +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}

//           {checked == 'Current' &&
//             <View>
//               {CurrentData != '' ?
//                 <FlatList
//                   data={CurrentData}
//                   renderItem={({ item, index }) =>
//                     <View style={styles.flatlistCard}>
//                       <TouchableOpacity
//                         activeOpacity={0.8}
//                         onPress={() => navigation.navigate('LearnersDetail')}
//                         style={{ flexDirection: 'row', paddingTop: mobileW * 6 / 100, }}>
//                         <View style={{ width: mobileW * 24 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
//                           <View style={styles.imageCard}>
//                             <Image resizeMode='contain' style={styles.mavenImage}
//                               source={item.profileImage}></Image>
//                           </View>
//                           <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontMedium, }}>{item.fullname} </Text>

//                         </View>
//                         <View style={{ width: mobileW * 72 / 100, }}>
//                           <FlatList
//                             // data={checked=='Current'? DATA:DATA1 }
//                             data={item.classes}
//                             renderItem={({ item, index }) =>
//                               <View>
//                                 <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, }}>{item.skill} (Basic)</Text>
//                                 <View style={{ flexDirection: 'row' }}>
//                                   <View style={{ width: mobileW * 36 / 100, }}>
//                                     <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                       <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray }}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                                       <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>{item.StartDate}</Text>
//                                     </View>
//                                     <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                       <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray }}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                                       <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>{item.Enddate}</Text>
//                                     </View>
//                                   </View>
//                                   <View style={{ width: mobileW * 36 / 100, }}>
//                                     <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                       <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray }}>{Lang_chg.FeeTxt[config.language]}</Text>
//                                       <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.themecolor }}>{item.charges}</Text>
//                                     </View>
//                                     <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                       <Text style={{ fontSize: mobileW * 3 / 100, color: "#777" }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                                       <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>{item.status}</Text>
//                                     </View>
//                                   </View>
//                                 </View>

//                                 <View style={styles.underLine}></View>

//                               </View>
//                             } />
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   }
//                   keyExtractor={item => item.id} />
//                 :
//                 <View style={{ mobileH: mobileH, mobileW: mobileW, justifyContent: 'center', alignItems: 'center' }}>
//                   <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.blackColor, marginTop: mobileW * 20 / 100,fontFamily:Font.FontSemiBold }}>{Lang_chg.notMavenTxt[config.language]}</Text>

//                 </View>
//               }
//             </View>
//           }

//           {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Data +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
//           {checked === 'Old' &&

//             <View>
//               {oldData != '' ?
//                 <FlatList
//                   // data={checked=='Current'? DATA:DATA1 }   
//                   data={oldData}
//                   renderItem={({ item, index }) =>
//                   {
//                     const classesData =  item.classes ;
//                     return (
//                     <View style={styles.flatlistCard}>
//                       <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('LearnersDetail', { item: item })}
//                         style={{ flexDirection: 'row', paddingTop: mobileW * 6 / 100, }}>
//                         <View style={{ width: mobileW * 24 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
//                           <View style={styles.imageCard}>
//                             <Image resizeMode='contain' style={styles.mavenImage}
//                               source={item.profileImage != null ? require("./Icon/icon_student.png") : item.profileImage}></Image>
//                           </View>
//                           <Text style={{ fontSize: mobileW * 3.5 / 100, marginTop: mobileW * 1 / 100, color: Colors.black_color, fontFamily:Font.FontMedium  }}>{item.fullname} </Text>
//                         </View>

//                         <View style={{ width: mobileW * 72 / 100, }}>
//                           <FlatList
//                             data={classesData}
//                             renderItem={({ item, index }) => {
//                               const ArrayLength =   classesData.length ;
//                               return (
//                                 <View >
//                                   <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, marginTop: mobileW * 2 / 100, fontFamily:Font.FontRegular }}
//                                   >{item.skill} (Basic)</Text>
//                                   <View style={{ flexDirection: 'row', paddingBottom: mobileW * 5 / 100 }}>
//                                     <View style={{ width: mobileW * 36 / 100, }}>
//                                       <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}
//                                         >{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
//                                       </View>
//                                       <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}
//                                         >{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
//                                       </View>
//                                     </View>
//                                     <View style={{ width: mobileW * 36 / 100, }}>
//                                       <View style={{ marginTop: mobileW * 2 / 100, marginHorizontal: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color:Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.FeeTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.themecolor,fontFamily:Font.FontRegular }}>Rs : {item.charges}</Text>
//                                       </View>
//                                       <View style={{ marginTop: mobileW * 2 / 100 }} >
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color,fontFamily:Font.FontMedium }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray,fontFamily:Font.FontRegular }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                                       </View>
//                                     </View>
//                                   </View>
//                                       { 
//                                        ArrayLength > 1 &&
//                                         <View style={styles.underLine}></View> 
//                                        }
                                          

//                                   {/* {index == 0 ? null :
//                                     <View>
//                                       {index != 0 ?
//                                         <View style={styles.underLine}></View> : null}
//                                     </View>} */}

//                                 </View>
//                               )
//                             }} />
//                         </View>
//                       </TouchableOpacity>
//                     </View>)}
//                   }
//                   keyExtractor={item => item.id} />
//                 :
//                 <View style={{ mobileH: mobileH, mobileW: mobileW, justifyContent: 'center', alignItems: 'center' }}>
//                   <Text style={{ fontSize: mobileW * 4.5 / 100,fontFamily:Font.FontMedium, color: Colors.blackColor, marginTop: mobileW * 20 / 100 }}> {userMode == 'maven' ? "You do not have rave any Learner." : "You do not have rave any Maven."}</Text>
                 
//                 </View>}
//             </View>
//           }
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   Header: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW, height: mobileW * 13/ 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_: {
//     width: mobileW * 9.5/ 100,
//     height: mobileW * 9.5 / 100,
//     tintColor: Colors.white_color
//   },
//   SearchIcon: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.white_color
//   },
//   searchInput: {
//     width: mobileW * 85 / 100,
//     borderRadius: mobileW * 1 / 100,
//     color: Colors.gray,
//     height: mobileW * 10 / 100,
//     backgroundColor: Colors.white_color,
//     fontSize: mobileW * 3.3 / 100,
//     color: Colors.blackColor
//   },
//   flatlistCard: {
//     width: mobileW * 96 / 100,
//     alignSelf: 'center',
//     marginTop: mobileW * 1 / 100,
//     marginBottom: mobileW * 2 / 100,
//     paddingBottom: mobileW * 2 / 100,
//     borderRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 2,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//   },
//   underLine: {
//     width: mobileW * 70 / 100,
//     height: mobileW * 0.3 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   imageCard: {
//     width: mobileW * 18 / 100,
//     height: mobileW * 18 / 100,
//     borderRadius: mobileW * 10 / 100,
//     borderWidth: mobileW * 0.6 / 100,
//     borderColor: Colors.themecolor,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   mavenImage: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     borderRadius: mobileW * 7 / 100,
//     tintColor: Colors.themecolor
//   },
//   ModelCard: {
//     width: mobileW * 90 / 100,
//     borderRadius: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },
//   ModelHeader: {
//     width: mobileW * 90 / 100,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   CurrentLearner: {
//     width: mobileW * 47 / 100,
//     height: mobileW * 10 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })













