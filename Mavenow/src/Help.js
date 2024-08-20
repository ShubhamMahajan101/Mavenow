
import {   Alert, ScrollView, TextInput, StatusBar, Modal, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet,RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import AnimatedLoader from 'react-native-animated-loader';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import axios from 'axios';

const DATA = [
  {
    id: 1,
    mavenow_text: "The CEO of renowned IT company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional learners  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional  company, Inwizards  Software  Technology -  Anuj Singh, identified a crucial problem in the market during the times of pandemic. He observed that in current times skill upgradation is important to survive and grow in the corporate world but there are no such opportunities for professionals to acquire new skills. Moreover, expert guidance is yet amiss for the ones who lack contacts, sources, reach and affordability. And expert guidance is still a privilege for many of the professional.",
  },
]

export default function Help({ navigation }) {
  const [checked, setChecked] = useState('Current')
  const [contentpage, setcontentpage] = useState("");
  const [datafound, setdatafound] = useState("NA");
  const [refresh ,set_refresh]=useState(false)
  const [modalVisible_loadergif, setModalVisible_loadergif] = useState(false);

  const [contentpage1, setcontentpage1] = useState("");
  const [datafound1, setdatafound1] = useState("NA");

  const [contentpage2, setcontentpage2] = useState("");
  const [datafound2, setdatafound2] = useState("NA");
  /////////////////////////// aniamted 
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000000000);
  }, []);
const toShowGif=()=>{
  setModalVisible_loadergif(true) 
  setTimeout(() => {
    setModalVisible_loadergif(false) 
  }, 1000);
}
  // ..................................................................... FIRST API_DATA

    useEffect(() => {
    apiCalling();
    apiCalling1();
    apiCalling11();
  }, []) 

  const apiCalling = () => {
    console.log('--------- data arriwal learners $$$$$$$$$$ details......... ->')

    axios.get('https://mavenow.com:8001/pageContent?pageKey=faqhelp&token=%2522eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDEyNzQ1N30.zqWCkVDbh-1a2zUBpOpZg-4_8b2QvdB_AmJeXEdf95Q')
      .then(res => {

        var StatusCode = res.data.StatusCode

        if(StatusCode==200 ){
          const nameList = res.data.result
        // const imageArray = nameList.result;
        console.log('----------------Hello I am Helpfaq ........ ->', nameList)
       
        setcontentpage(nameList)

    
        setdatafound(nameList)
      //   setTimeout(() => {
      // setModalVisible_loadergif(false) 
      // }, 3000);
       

        }
       
      })
      .catch(function (error) {
        console.log('---------->', error);
      });
  }
  //  ........................................................................................................... SECOND API DATA
  // useEffect(() => {
  //   setTimeout(() => {
  //  setModalVisible_loadergif(false)
  //       }, 2000)
  //     // apiCalling1();
  //   },[])
   
  const apiCalling1 = () => {
    // setModalVisible_loadergif(true)
    console.log('--------- data arriwal learners $$$$$$$$$$ details......... ->')

    axios.get('https://mavenow.com:8001/pageContent?pageKey=aboutus&token=%2522eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDEyNzQ1N30.zqWCkVDbh-1a2zUBpOpZg-4_8b2QvdB_AmJeXEdf95Q')
      .then(res => {

        var StatusCode = res.data.StatusCode

        if(StatusCode==200 ){
          // setModalVisible_loadergif(false)
        const nameList = res.data.result
        // const imageArray = nameList.result;
        console.log('----------------Hello I am About As ........ ->', nameList)
        setcontentpage1(nameList)
        setdatafound1(nameList)
        // setTimeout(() => {
        //   setModalVisible_loadergif(false) 
        //   }, 3000);
           

        }
      })
      .catch(function (error) {
        console.log('---------->', error);
      });
  }

  // .............................................................................................THIRD API DATA
  // useEffect(() => {
  //   setTimeout(() => {
  //     setModalVisible_loadergif(false)
  //   }, 1000)
  //   // apiCalling11();
  // }, [])

  const apiCalling11 = () => {
    // setModalVisible_loadergif(true)
    console.log('--------- data arriwal learners $$$$$$$$$$ details......... ->')

    axios.get('https://mavenow.com:8001/pageContent?pageKey=contactus&token=%2522eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDEyNzQ1N30.zqWCkVDbh-1a2zUBpOpZg-4_8b2QvdB_AmJeXEdf95Q')
      .then(res => {

        var StatusCode = res.data.StatusCode

        if(StatusCode==200 ){
          // setModalVisible_loadergif(false)
        const nameList = res.data.result
        // const imageArray = nameList.result;
        console.log('----------------Hello I am Contactus ........ ->', nameList)
        setcontentpage2(nameList)
        setdatafound2(nameList)

      //   setTimeout(() => {
      //  }, 3000);
           }
      })
      .catch(function (error) {
        console.log('---------->', error);
      });
  }

  // -------->>
  const refreshControl=()=>{
    set_refresh(true)
    setTimeout(() => {
      set_refresh(false)
      
    }, 1000);

  }
  // ----------->>
  return (
    <View style={{ flex: 1, backgroundColor:Colors.white_color }}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

              <View style={styles.Header}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}  >
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
              </TouchableOpacity>
              <Text style={{ color: Colors.black_color, fontSize: mobileW *4/ 100,fontFamily:Font.FontSemiBold,}}>{Lang_chg.HelpTxt[config.language] }</Text>
              <Text></Text>
              </View>
         {/* ........................................................................................................................................... */}
        <AnimatedLoader
          visible={!visible}
          overlayColor="green"
          animationStyle={styles.lottie}
          speed={1}>
          <Text>Doing something...</Text>
        </AnimatedLoader>

        {/* ........................................................................................................................................... */}

        <View style={{ backgroundColor: Colors.white_color }}>
          {checked == 'Current' &&
            <View>
              <Text  style={{ color: Colors.black_color, fontSize: mobileW *7/ 100,fontFamily:Font.FontMedium, alignSelf: "center", textAlign: "center" }}>{ Lang_chg.About[config.language] }</Text>
              <Text style={{ color: Colors.black_color, fontSize: mobileW *7/ 100,fontFamily:Font.FontMedium, alignSelf: "center", textAlign: "center" }}>{Lang_chg.Mavenow[config.language]}</Text>
            </View>
          }
          {checked == 'Old' &&
            <View>
              <Text style={{ color: Colors.black_color, textAlign: "center",fontSize: mobileW *7/ 100,fontFamily:Font.FontMedium,}}>{Lang_chg.Howcanwehelp[config.language]}</Text>
              <Text style={{ color: Colors.black_color, textAlign: "center",fontSize: mobileW *7/ 100,fontFamily:Font.FontMedium,}}>{Lang_chg.you[config.language]}</Text>
            </View>
          }
          {/* <View style={{ flexDirection: 'row', justifyContent: "space-around", }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {setChecked('Current'),toShowGif()}} style={[{ backgroundColor: checked === 'Current' ? Colors.white_color : Colors.themecolor }, styles.aboutButton]} >
              <Text style={{ color: checked === 'Current' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3 / 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.AboutMeTxt[config.language] }</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {setChecked('Old'),toShowGif()}} style={[{ backgroundColor: checked === 'Old' ? Colors.white_color : Colors.themecolor }, styles.aboutButton]}>
              <Text style={{ color: checked === 'Old' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3/ 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.HelpFAQSTxt[config.language] }</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() =>{ setChecked('History'),toShowGif()}} style={[{ backgroundColor: checked === 'History' ? Colors.white_color : Colors.themecolor }, styles.aboutButton]}>
              <Text style={{ color: checked === 'History' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 3 / 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.ContactUsTxt[config.language] }</Text>
            </TouchableOpacity>
          </View> */}
                 <View style={{flexDirection:'row', }}>
  <TouchableOpacity activeOpacity={0.8} onPress={() => {setChecked('Current'),toShowGif()}}>
  <View  style={{width:mobileW*33.3/100, height:mobileW*10/100,   alignItems:'center',justifyContent:'center', }}>
    <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.FontMedium,color:checked === 'Current' ? Colors.themecolor : Colors.gray}}>{Lang_chg.AboutMeTxt[config.language] }</Text>
 
  </View>
  <View style={{width:mobileW*33.3/100, height:mobileW*0.3/100, backgroundColor:checked === 'Current' ? Colors.themecolor :"#E7E8EA"}}></View>
  </TouchableOpacity>
  <TouchableOpacity activeOpacity={0.8} onPress={() => {setChecked('Old'),toShowGif()}}>
  <View  style={{width:mobileW*33.3/100, height:mobileW*10/100, alignItems:'center',justifyContent:'center',}}>
    <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.FontMedium,color:checked === 'Old' ? Colors.themecolor : Colors.gray}}>{Lang_chg.HelpFAQSTxt[config.language] }</Text>
  </View>
  <View style={{width:mobileW*33.3/100, height:mobileW*0.3/100, backgroundColor:checked === 'Old' ? Colors.themecolor :"#E7E8EA"}}></View>
  </TouchableOpacity>
  <TouchableOpacity  activeOpacity={0.8} onPress={() =>{ setChecked('History'),toShowGif()}}>
  <View  style={{width:mobileW*33.4/100, height:mobileW*10/100, alignItems:'center',justifyContent:'center',}}>
    <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.FontMedium,color:checked === 'History' ? Colors.themecolor : Colors.gray}}>{Lang_chg.ContactUsTxt[config.language] }</Text>
  </View>
  <View style={{width:mobileW*33.4/100, height:mobileW*0.3/100, backgroundColor:checked === 'History' ? Colors.themecolor : "#E7E8EA"}}></View>
  </TouchableOpacity>
</View>
        </View>
 
<ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={refreshControl}
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
            />
          }>
          {checked == 'Current' && modalVisible_loadergif ==false &&
            <View>

              <FlatList
                data={DATA}
                renderItem={({ item, index }) =>
                  <View style={{ marginLeft: mobileW * 5 / 100, marginRight:mobileW*5/100 }}>
                    <View>
                      {
                        (datafound1 != 'NA')
                          ?
                          datafound1.map((item, index) => (
                            <HTMLView
                              value={item.description.replace(/\n\n/g, " ")}
                             
                              stylesheet={styles} />
                          ))
                          :
                          // <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 19,color:'red' }}>{data_not_found}</Text>
                          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={styles.noDataFound}>No Data Found</Text>
                          </View>
                      }
                    </View>
                    {/* <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100, marginTop: mobileW * 3 / 100, fontWeight: "bold", }}>{item.mavenow_text}</Text> */}
                  </View>
                }
                keyExtractor={item => item.id}/>
            </View>
          }
          {/* --------------+++++++++++++++++++--Help  data ============ */}
          {checked == 'Old' && modalVisible_loadergif ==false &&
            <View>
              <FlatList
                data={contentpage}
                renderItem={({ item, index }) =>
                  <View style={{ margin:mobileW*5/100 }}>
                    <View>

                      {
                        (datafound != 'NA')
                          ?
                          datafound.map((item, index) => (

                            <HTMLView
                              value={item.description.replace(/\n\n/g, " ")}
                              
                              
                              stylesheet={styles} />
                          ))

                          :
                          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={styles.noDataFound}>No Data Found</Text>
                          </View>
                      }


                    </View>
                  </View>
                }
                keyExtractor={item => item.id} />
            </View>
          }
          {/* ====================================================================================================contact us data */}
          {checked == 'History' && modalVisible_loadergif ==false &&
            <View >
              <FlatList
                data={datafound}
                renderItem={({ item, index }) =>
                  <View style={styles.contactusCard}>
                    {
                      (datafound2 != 'NA')
                        ?
                        datafound2.map((item, index) => (

                          <HTMLView
                            // value={   item.description}
                            value={item.description.replace(/\n\n/g, " ")} 
                            // replace(/\&nbsp;/g, '')
                            // item.title.replaceAll(' ', '\u00a0'
                            // detaildescription.replace(/(\r\n|\n|\r)/gm, '')
                            stylesheet={styles} />
                        ))
                        :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                          <Text style={styles.noDataFound}>No Data Found</Text>
                        </View>
                    }
                  </View>
                }
                keyExtractor={item => item.id} />
            </View>
          }

                <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible_loadergif}
                onRequestClose={() => {
                setModalVisible_loadergif(!modalVisible_loadergif)}}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000060'}}>
                <Image style={styles.GIF} source={require("./Icon/neighcoach_loader.gif")}></Image>
                </View>
                </Modal>


        </ScrollView>


        {/* ======================================================= */}
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft:mobileW*4/100,
    paddingRight:mobileW*4/100,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row', 
  },
  GIF: { 
    width: mobileW * 25 / 100, 
  height: mobileW * 12 / 100 
},
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
    // marginHorizontal:mobileW*-3/100
  },
  flatlistCard: {
    width: mobileW * 96 / 100,
    alignSelf: 'center',
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 5 / 100,
    backgroundColor: Colors.white_color,

    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  imageCard: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.6 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mavenImage: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.themecolor
  },
  contactusCard:{  
    backgroundColor: Colors.white_color,
    height:mobileW*40/100, 
    marginTop:mobileW*-15/100,  
    padding: mobileW * 4 / 100,   
    elevation: 2,
  shadowColor: '#000',
  borderColor: "#e8edfb",
  borderWidth: 1,
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, },
  shadowOpacity: 0.1, 
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
  SafeAreaView: {
    flex: 1, 
    backgroundColor: Colors.white_color
  },
  aboutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mobileW * 31 / 100,
    marginTop: mobileW * 2 / 100,
    height: mobileW * 10 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  p: {
    fontWeight: "bold",
    marginBottom: -50,
    lineHeight: 24,
    letterSpacing: 0.8,
    fontSize: mobileW * 4 / 100,
    color: Colors.blackColor
  },
  textfont:
  {
    fontSize: mobileW * 25 / 100,
    color: Colors.red
  },
  lottie: {
    width: 10,
    height: 10,
  },
  noDataFound:{ 
    fontSize: mobileW * 5 / 100, 
    color: Colors.black_color, 
    fontFamily:Font.FontMedium, 
    marginTop:mobileH*20/100 
  }


})