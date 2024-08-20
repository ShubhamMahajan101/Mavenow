
import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, SafeAreaView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, Keyboard, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, } from './Provider/Colorsfont';
import axios from 'axios';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


export default function Search({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState([])
  const [Searchtext, setSearchtext] = useState('')
  const [ModalVisible_GifModal , setModalVisible_GifModal] =useState(false)


  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
 
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
     }, 2000);
  }, []);



  useEffect(() => {
    setModalVisible_GifModal(false)
  }, 1000)
  
  // ================ refresh controller 

  console.log('search------', search);
  // useEffect(() => {
  //   apiCalling();
  //   // recommendedApi();
  // }, [])

  const apiCalling = () => {
    Keyboard.dismiss()
    axios.get('https://mavenow.com:8001/search/global?keyword=' + Searchtext + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI&userType=1&lat=31.5491667&lng=-97.1463889&userId=848', {
    })
      .then(function (data) {
        console.log(data, '....................');
        var GetData = data.data.response
        var StatusCode = data.data.StatusCode
        if (StatusCode == 200) {
          var masterList = GetData.masterList
          if (masterList != "") {
            console.log("data=========", GetData.masterList);

            setSearch(masterList)
            setModalVisible_GifModal(false)
          } else {
            alert('no data found')
          }

        } else {
          alert('no data found')
        }

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
          <View>
             <Modal animationType="slide" transparent={true}
              visible={ModalVisible_GifModal}
              onRequestClose={() => { setModalVisible_GifModal(!ModalVisible_GifModal); }} >
              <View style={[styles.GIF_modal,]}>
              <Image style={{width:mobileW*30/100,height:mobileW*20/100,alignSelf:"center"}} resizeMode='contain'source={require("./Icon/neighcoach_loader.gif")}></Image>
              </View>
              </Modal>
              </View>



          <View style={styles.Header}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon_arrow} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={styles.searchText}>{Lang_chg.Search[config.language]}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/about.png")}></Image>
            </TouchableOpacity>


          </View>

          {/* ===========> Search Bar  */}
          <View style={styles.searchBarView}>
            <TextInput
              style={styles.input}
              onChangeText={text => setSearchtext(text)}
              paddingLeft={mobileW * 5 / 100}
              // value={search.detail}
              mode="outlined"
              placeholderTextColor={Colors.gray}
              fontSize={mobileW * 3 / 100}
              placeholder={Lang_chg.SearchMavenandSkills[config.language]}
            />
            {Searchtext != '' &&
              <TouchableOpacity onPress={() => (apiCalling(),setModalVisible_GifModal(false))} activeOpacity={0.8} style={{ marginRight: mobileW * 4 / 100 }}>
                <Image style={styles.SearchIcon} resizeMode='contain'
                  source={require("./Icon/icon_search.png")}></Image>
              </TouchableOpacity>}
          </View>

          {/* =================================================================FlatList================================================================ */}

          <ScrollView showsVerticalScrollIndicator={false} 
           refreshControl={
            <RefreshControl
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>

            <FlatList
              data={search}
              renderItem={({ item, index }) =>
                <View >
                  <TouchableOpacity activeOpacity={0.8} style={styles.Card} onPress={() => navigation.navigate('LearnerRequestMaven', { item: item })}>
                  {/* <TouchableOpacity activeOpacity={0.8} style={styles.Card} > */}
                    <View style={{ width: mobileW * 23 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
                      <View style={styles.imageCard}>
                        <Image resizeMode='contain' style={{ width: mobileW * 13 / 100, height: mobileW * 13 / 100, borderRadius: mobileW * 10 / 100, }}
                          source={require('./Icon/icon_student.png')}></Image>
                      </View>
                    </View>

                    <View>
                      <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginTop: mobileW * 2 / 100 }}>{item.userDetail.FullName}</Text>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular, marginTop: mobileW * -1 / 100 }}>{item.name}</Text>

                      <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
                        <View>
                          <View style={{ width: mobileW * 34 / 100, flexDirection: "row" }}>
                            <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                            <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{item.name}</Text>
                          </View>
                          <View style={{ width: mobileW * 34 / 100, flexDirection: "row" }}>
                            <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.LevelTxt[config.language]} </Text>
                            <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>Advance</Text>
                          </View>
                        </View>

                        <View style={{ width: mobileW * 34 / 100, alignItems: 'center', }}>
                          <View>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{Lang_chg.SessionTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>5</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                              <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{Lang_chg.followersTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>500</Text>
                            </View>
                          </View>
                          <TouchableOpacity activeOpacity={0.8} style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
                            <Text style={{ color: Colors.white_color, fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.ChatTxt[config.language]}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>


                  </TouchableOpacity>
                  <View style={{ width: mobileW, height: mobileW * 0.5 / 100, backgroundColor: '#E7E8EA' }}></View>
                </View>
              }
              keyExtractor={item => item.id} />
          </ScrollView>



          {/* =================================================================Model================================================================ */}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.ModelView}>
                  <View style={styles.ModelHeader}>
                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : Search</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
                      <Image style={styles.backIcon_CLOse} resizeMode='contain'
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

                      </Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        {/* </ScrollView> */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: mobileW * 4 / 100,
    alignItems: "center"
  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.black_color
  },
  backIcon_CLOse: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  backIcon_arrow: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  SearchIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.themecolor,
    left: mobileW * 2 / 100
  },
  searchText: {
    color: Colors.black_color,
    marginHorizontal: mobileW * 3 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontSemiBold
  },
  input: {
    width: mobileW * 80 / 100,
    height: mobileW * 11 / 100,
    fontFamily: Font.FontRegular,
    borderColor: Colors.themecolor,
    color: Colors.gray,

  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: mobileW * 92 / 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#E7E8EA",
    justifyContent: 'space-between',
    borderRadius: mobileW * 1 / 100,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 7 / 100,
    backgroundColor: Colors.bgcolor
  },
  ModelView: {
    width: mobileW * 85 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5,
  },
  ModelHeader: {
    width: mobileW * 85 / 100,
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
  GIF_modal: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: "center"
  },
  Card: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    flexDirection: 'row',
    marginTop: mobileW * 3 / 100,
  },
  imageCard: {
    width: mobileW * 14 / 100,
    height: mobileW * 14 / 100,
    borderRadius: mobileW * 10 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.green,
    backgroundColor: Colors.white_color
  },
  chatButton: {
    width: mobileW * 17 / 100,
    borderRadius: mobileW * 1 / 100,
    marginTop: mobileW * 2 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 6.5 / 100,
    backgroundColor: Colors.themecolor,
    marginBottom: mobileW * 2 / 100,
    left: mobileW * 10 / 100
  }
}
)








// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, SafeAreaView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, Keyboard } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Colors, } from './Provider/Colorsfont';
// import axios from 'axios';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;


// export default function Search({ navigation }) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [search , setSearch] = useState([])
//   const [Searchtext, setSearchtext] = useState('')

//   console.log('search------',search);
//   // useEffect(() => {
//   //   apiCalling();
//   //   // recommendedApi();
//   // }, [])

//   const apiCalling = () => {
//     Keyboard.dismiss()
//     axios.get('https://mavenow.com:8001/search/global?keyword='+Searchtext+'&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI&userType=1&lat=31.5491667&lng=-97.1463889&userId=848', {
//     })
//         .then(function (data) {
//           console.log(data,'....................');
//           var GetData = data.data.response
//           var StatusCode = data.data.StatusCode
//           if(StatusCode==200){
//             var masterList =GetData.masterList
//             if(masterList!=""){
//               console.log("data=========",GetData.masterList);

//               setSearch(masterList)
//             }else{
//               alert('no data found')
//             }

//           }else{
//           }

//         })
//         .catch(function (error) {
//           console.log('======>',error);
//         });
//   }

//   return (
//     <View style={{ flex: 1, }}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//         {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
//         <View style={styles.Header}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 2 / 100 }} onPress={() => navigation.goBack()}>
//               <Image style={styles.backIcon_} resizeMode='contain'
//                 source={require("./Icon/bk.png")}></Image>
//             </TouchableOpacity>
//             <Text style={styles.searchText}>{Lang_chg.Search[config.language]}</Text>
//           </View>
//           <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginRight: mobileW * 2 / 100 }} >
//             <Image style={styles.backIcon} resizeMode='contain'
//               source={require("./Icon/icon_info.png")}></Image>
//           </TouchableOpacity>
//         </View>

//         {/* ++++++++++++++++++++++++++++++++++++++ Search Bar ++++++++++++++++++++++++++++++++++++++++ */}
//         <View style={styles.searchBarView}>
//         <TextInput
//           style={styles.input}
//           onChangeText={text=>setSearchtext(text)}
//           // value={search.detail}
//           mode="outlined"
//           placeholderTextColor={Colors.gray}
//           fontSize={mobileW * 4 / 100}
//           placeholder={Lang_chg.SearchMavenandSkills[config.language]}
//           // placeholder="Search Maven and Skills"
//         // keyboardType="numeric"
//         />
//         {Searchtext!=''&&
//        <TouchableOpacity onPress={() =>apiCalling()} activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }}>
//             <Image style={styles.SearchIcon} resizeMode='contain'
//               source={require("./Icon/icon_search.png")}></Image>
//           </TouchableOpacity>}
//         </View>


//         {/* =================================================================FlatList================================================================ */}

//         <ScrollView >

//           <FlatList
//             data={search}
//             renderItem={({ item, index }) =>
//               <View>
//                 <TouchableOpacity activeOpacity={0.8} style={styles.Card} onPress={()=>navigation.navigate('LearnerRequestMaven', {item:item})}>
//                   <View style={{ width: mobileW * 32 / 100, alignItems: 'center', padding: mobileW * 2 / 100,  }}>
//                     <View style={styles.imageCard}>
//                       <Image resizeMode='contain' style={{ width: mobileW * 15 / 100, height: mobileW * 15 / 100, borderRadius: mobileW * 10 / 100, }}
//                         // source={item.image}></Image>
//                         source={require('./Icon/icon_student.png')}></Image>
//                     </View>
//                     <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium, textAlign:'center' }}>{item.userDetail.FullName}</Text>
//                     <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray_dark, fontFamily:Font.FontRegular, }}>{item.name}</Text>
//                   </View>

//                   <View style={{ width: mobileW * 32 / 100, padding: mobileW * 2 / 100 }}>
//                   <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray,fontFamily:Font.FontRegular }}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                   <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color,fontFamily:Font.FontMedium }}>{item.name}</Text>
//                   <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color,fontFamily:Font.FontMedium }}>(Advance)</Text>
//                   </View>

//                   <View style={{ width: mobileW * 32 / 100, padding: mobileW * 3 / 100, alignItems: 'center' }}>
//                   <View>
//                        <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular}}>{Lang_chg.SessionTxt[config.language]}</Text>
//                        <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontRegular}}>5</Text>
//                        </View>
//                       <View style={{ marginTop: mobileW * 2 / 100, }}>
//                       <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{Lang_chg.followersTxt[config.language]}</Text>
//                       <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontRegular}}>500</Text>
//                       </View>
//                       <TouchableOpacity activeOpacity={0.8} style={styles.chatButton} onPress={()=>navigation.navigate('Chat')}>
//                       <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.ChatTxt[config.language]}</Text>
//                       </TouchableOpacity>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             }
//             keyExtractor={item => item.id} />
//         </ScrollView>



//         {/* =================================================================Model================================================================ */}
//         <View >
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               Alert.alert("Modal has been closed.");
//               setModalVisible(!modalVisible);
//             }}
//           >
//             <View style={{ flex: 1, backgroundColor: '#00000060', alignItems:'center', justifyContent:'center' }}>
//               <View style={styles.ModelView}>
//                 <View style={styles.ModelHeader}>
//                   <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontFamily:Font.FontMedium }}></Text>
//                   <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>Help : Search</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 2 / 100 }} >
//                     <Image style={styles.backIcon} resizeMode='contain'
//                       source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                 </View>
//                 <ScrollView>
//                   <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

//                     <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular }}>
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
//       </SafeAreaView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   Header: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW, height: mobileW * 13 /100,
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
//     width: mobileW * 9.5 / 100,
//     height: mobileW * 9.5 / 100,
//     tintColor: Colors.white_color
//   },
//   SearchIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.themecolor
//   },
//   searchText: {
//     color: Colors.white_color,
//     marginHorizontal: mobileW * 3 / 100,
//     fontSize: mobileW * 4.5 / 100,
//     fontFamily:Font.FontMedium
//   },
//   input: {
//     width:mobileW*80/100,
//     height: mobileW * 12 / 100,
//     // paddingLeft: mobileW * 5 / 100,
//     fontFamily:Font.FontRegular,
//     borderColor: Colors.themecolor,
//     color:Colors.gray
//   },
//   searchBarView:{
//     flexDirection:'row', 
//     alignItems:'center', 
//     backgroundColor:'white', 
//     width:mobileW*96/100, 
//     alignSelf:'center',borderWidth: 1,    
//     borderColor: Colors.themecolor,
//   justifyContent:'space-between',   
//    borderRadius: mobileW * 1 / 100,
//   margin:mobileW*2/100
// },
//   ModelView: {
//     width: mobileW * 85 / 100,
//     borderRadius: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 5,
//   },
//   ModelHeader: {
//     width: mobileW * 85 / 100,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   Card: {
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 1 / 100,
//     elevation: 1,
//     width: mobileW * 98 / 100,
//     margin: mobileW * 1 / 100,
//     flexDirection: 'row',
//   },
//   imageCard: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     borderRadius: mobileW * 10 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: Colors.green,
//     backgroundColor: Colors.white_color
//   },
//   chatButton: {
//     width: mobileW * 25 / 100,
//     borderRadius: mobileW * 1.5 / 100,
//     marginTop: mobileW * 2 / 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 7 / 100,
//     backgroundColor: Colors.themecolor
//   }
// }
// )



