import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import firebase from './App/Firebase/firebaseConfig';
import Spinner from 'react-native-loading-spinner-overlay';
import { Switch, FlatList, Text, Alert, BackHandler, ScrollView, Modal, StatusBar, View, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, RefreshControl } from 'react-native'
import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font, Colors, mobileH, mobileW, localimag, SocialLogin } from './Provider/utilslib/Utils';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blockedUser } from './App/Firebase/Users';
import { UpdateBlockUser } from './App/Firebase/Users';
import { tr } from 'date-fns/locale';
import { log } from 'react-native-reanimated';

const Chat = ({ navigation,itemId, onToggle }) => {
  const [allUsers, setallUsers] = useState('')
  const [refresh, setrefresh] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState('Add')
  const [searchQuery, setSearchQuery] = useState('');
  const [blockstatus, setblockstatus] = useState(false)
  const [uid, setgetid] = useState()
  useEffect(() => {
    toGetuserList()
    block_Status()
    unblock_Status()
  }, [])

  const block_Status = async (item) => {
  var get_ID = await localStorage.getItemString('UID')
  var otherUser_ID = item.uuid
  blockedUser(get_ID, otherUser_ID);
  toGetuserList()
     }


const unblock_Status = async (item) => {
   
  var get_ID = await localStorage.getItemString('UID')
  var otherUser_ID = item.uuid
    UpdateBlockUser(get_ID,otherUser_ID);
    toGetuserList()
  }


  const searchLearner = (text) => {
    setSearchQuery(text);
    console.log("allUsers===>",allUsers);
    const searchusername = allUsers.filter((item) =>
    item.userName.toLowerCase().includes(text.toLowerCase())
    // console.log("item===>",item)
    );
    setallUsers(searchusername);
    };

    const _onRefresh = async () => {
      setrefresh(true)
      setTimeout(() => {
        setrefresh(false)
      }, 1200);
    }
  

  const toGetuserList = async () => {
    try {
      await firebase.database().ref('users')
        .on("value", async (datasnapshot) => {
          const uuid = await AsyncStorage.getItem('UID');

          new Promise((resolve, reject) => {
            let users = [];
            let lastMessage = '';
            let lastDate = '';
            let lastTime = '';
            let properDate = '';
            datasnapshot.forEach((child) => {
              let newUser = {
                userId: '',
                userName: '',
                lastMessage: '',
                lastDate: '',
                lastTime: '',
                properDate: '',
                email: '',
               user_block: false
              }

              newUser.userId = child.val().uuid;
              newUser.email = child.val().email;
              newUser.userName = child.val().name;

              new Promise((resolve, reject) => {
                firebase.database().ref('messages').
                  child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on('value', (dataSnapshots) => {
                    if (dataSnapshots.val()) {
                      
                      dataSnapshots.forEach((child) => {
                        // console.log(child.val().messege.msg);
                        newUser.lastMessage = child.val().messege.msg;
                        newUser.lastDate = child.val().messege.date;
                        newUser.lastTime = child.val().messege.time;

                      });
                    }

                    return resolve(newUser);
                  })
              })

              new Promise((resolve, reject) => {
                firebase.database().ref('blockFriendList').
                  child(uuid).on('value', (dataSnapshots) => {
                    if (dataSnapshots.val()) {
                      dataSnapshots.forEach((child) => {
                        console.log(newUser.userId, "===>>");
                        if (child.val().blockBy == newUser.userId) {
                          newUser.user_block = child.val().blockedStatus;
                          console.log(' __block friend list data ====>', child.val().blockedStatus);


                        }

                      });
                    }

                    return resolve(newUser);
                  })
              })
              // 1  user  hidee functionality 

              if (uuid != child.val().uuid) {
                users.push({
                  userName: newUser.userName,
                  email: newUser.email,
                  uuid: newUser.userId,
                  lastTime: newUser.lastTime,
                  lastMessage: newUser.lastMessage,
                  user_block: newUser.user_block
                });
              }
console.log(users,"...................users");
              // first user hide functionaliy
              return resolve(users);
            });
            setallUsers(users)
          
          }).then((users) => {
            setallUsers(users)
           
          })

        })
    } catch (error) {
      alert(error);

    }
  }



// const openGallery = () => {
  //     launchImageLibrary('photo', (response) => {
  //        setState({ loader: true });
  //         ImgToBase64.getBase64String(response.uri)
  //             .then(async (base64String) => {
  //                 const uid = await AsyncStorage.getItem('UID');
  //                 let source = "data:image/jpeg;base64," + base64String;
  //                 UpdateUserImage(source, uid).
  //                     then(() => {
  //                        setState({ imageUrl: response.uri, loader: false });
  //                     })
  //             })
  //             .catch(err =>setState({ loader: false }));
  //     })
  // }

  


  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themecolor }} />
      <StatusBar hidden={false} backgroundColor={Colors.themecolor} translucent={false} networkActivityIndicatorVisible={true} />

      {/* ============ header================== */}
      <View style={styles.Header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} resizeMode='contain'
            source={require("./Icon/back(1).png")}></Image>
        </TouchableOpacity>

        <Text style={styles.HeaderText}>{Lang_chg.ChatTxt[config.language]}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('search')} style={{ marginRight: mobileW * 5 / 100 }} >
            <Image style={styles.SearchIcon} resizeMode='contain'
              source={require("./Icon/icon_search.png")}></Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}>
            <Image style={styles.SearchIcon_} resizeMode='contain'
              source={require("./Icon/about.png")}></Image>
          </TouchableOpacity>
        </View>
      </View>


      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={{ flex: 1, backgroundColor: '#00000060' }}>
            <View style={styles.ModelCard}>
              <View style={styles.ModelHeader}>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : Chat</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}   >
                  <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
                    source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
              <ScrollView>
                <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>
                  <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>
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




      {show != 'Add' &&
        <View style={styles.searchView}>
          <View style={styles.TextInputView}>
            <TextInput style={styles.TextInput}
              onChangeText={(txt) => searchLearner(txt)}
              paddingLeft={mobileW * 2 / 100}
              value={searchQuery}
              placeholder={Lang_chg.SearchEngine[config.language]}
              placeholderTextColor={Colors.gray} />
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
              <Image resizeMode='contain' style={styles.croseImage} source={require('./Icon/close2.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>}

      <ScrollView refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
          tintColor={Colors.themecolor}
          colors={[Colors.themecolor]} />
      }>
        {/* ============ header================== */}

        <FlatList
          alwaysBounceVertical={false}
          data={allUsers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{}}>
                { item.user_block == false ?
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Chatt', { userName: item.userName, guestUid: item.uuid, token: item.token ,user_block:item.user_block })}
                style={{
                  backgroundColor: '#FAFAFA',
                  flexDirection: 'row',
                  margin: mobileW * 2 / 100,
                  padding: mobileW * 2 / 100
                }}>
                  { item.user_block == false ?
                <View style={{ width: mobileW * 22 / 100, }}>
                  <View style={styles.imageCard}>
                    <Image resizeMode='contain' style={[styles.mavenImage, ]}
                      source={require('./Icon/icon_student.png')}></Image>
                  </View>
                </View>
                :
                 <View style={{ width: mobileW * 22 / 100, }}>
                 <View style={[styles.imageCard, {opacity:0.3}]}>
                   <Image resizeMode='contain' style={[styles.mavenImage,  ]}
                     source={require('./Icon/icon_student.png')}></Image>
                 </View>
               </View>}
                
  { item.user_block == false ?
  <View style={{ width: mobileW * 48 / 100, }}>
  <Text style={{fontSize: mobileW * 3.5 / 100, color: Colors.blackColor, fontFamily:Font.FontSemiBold, marginTop: mobileW * 3 / 100 }}>{item.userName}</Text>
  <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{item.lastMessage}</Text>
   </View>
   :
      <View style={{ width: mobileW * 48 / 100, }}>
      <Text style={{fontSize: mobileW * 3.5 / 100, color: Colors.light_grey, fontFamily:Font.FontSemiBold, marginTop: mobileW * 3 / 100 }}>{item.userName}</Text>
      <Text style={{fontSize:mobileW*3.5/100,color:Colors.lightgray,fontFamily:Font.FontMedium}}> You blocked this  contact</Text>
     </View>
     }

                <View style={{ width: mobileW * 22 / 100, justifyContent: 'space-between' }}>
                  <Text style={{ color: Colors.border_color2, fontFamily:Font.FontRegular, fontSize: mobileW * 3 / 100, alignSelf: 'flex-end' }}>{item.lastTime}</Text>
                  <View style={{ width: mobileW * 13 / 100, height: mobileW * 6 / 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                    



                  { item.user_block ?
                   <TouchableOpacity  
                   onPress={() => {unblock_Status(item)}} 
                   style={[styles.toggelBtnView ,{  borderColor: Colors.gray,borderWidth:mobileW*0.3/100 }]}>
                    <View activeOpacity={0.8} 
                    style={{backgroundColor:Colors.themecolor,width:mobileW*5/100,height:mobileW*5/100,left:mobileW*5/100, borderRadius:mobileW*2.5/100 }}/>
                    </TouchableOpacity>
                  :
                  <TouchableOpacity 
                  onPress={() => {block_Status(item)}} 
                   style={[styles.toggelBtnView ,{  borderColor: Colors.gray,borderWidth:mobileW*0.3/100 }]}>
                    <View activeOpacity={0.8} 
                     style={{backgroundColor:Colors.lightgray,width:mobileW*4.5/100,height:mobileW*4.5/100,borderRadius:mobileW*2.5/100 }}/>
                    </TouchableOpacity>
                  }

                  </View>
                </View>

              </TouchableOpacity>:
              <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => navigation.navigate('Chatt', { userName: item.userName, guestUid: item.uuid, token: item.token ,user_block:item.user_block })}
              style={{
                backgroundColor: '#FAFAFA',
                flexDirection: 'row',
                margin: mobileW * 2 / 100,
                padding: mobileW * 2 / 100
              }}>
                { item.user_block == false ?
              <View style={{ width: mobileW * 22 / 100, }}>
                <View style={styles.imageCard}>
                  <Image resizeMode='contain' style={[styles.mavenImage, ]}
                    source={require('./Icon/icon_student.png')}></Image>
                </View>
              </View>
              :
               <View style={{ width: mobileW * 22 / 100, }}>
               <View style={[styles.imageCard, {opacity:0.3}]}>
                 <Image resizeMode='contain' style={[styles.mavenImage,  ]}
                   source={require('./Icon/icon_student.png')}></Image>
               </View>
             </View>}
              
{ item.user_block == false ?
<View style={{ width: mobileW * 48 / 100, }}>
<Text style={{fontSize: mobileW * 3.5 / 100, color: Colors.blackColor, fontFamily:Font.FontSemiBold, marginTop: mobileW * 3 / 100 }}>{item.userName}</Text>
<Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{item.lastMessage}</Text>
 </View>
 :
    <View style={{ width: mobileW * 48 / 100, }}>
    <Text style={{fontSize: mobileW * 3.5 / 100, color: Colors.light_grey, fontFamily:Font.FontSemiBold, marginTop: mobileW * 3 / 100 }}>{item.userName}</Text>
    <Text style={{fontSize:mobileW*3.5/100,color:Colors.lightgray,fontFamily:Font.FontMedium}}> You blocked this  contact</Text>
   </View>
   }

              <View style={{ width: mobileW * 22 / 100, justifyContent: 'space-between' }}>
                <Text style={{ color: Colors.border_color2, fontFamily:Font.FontRegular, fontSize: mobileW * 3 / 100, alignSelf: 'flex-end' }}>{item.lastTime}</Text>
                <View style={{ width: mobileW * 13 / 100, height: mobileW * 6 / 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                  



                { item.user_block ?
                 <TouchableOpacity  
                 onPress={() => {unblock_Status(item)}} 
                 style={[styles.toggelBtnView ,{  borderColor: Colors.gray,borderWidth:mobileW*0.3/100 }]}>
                  <View activeOpacity={0.8} 
                  style={{backgroundColor:Colors.themecolor,width:mobileW*5/100,height:mobileW*5/100,left:mobileW*5/100, borderRadius:mobileW*2.5/100 }}/>
                  </TouchableOpacity>
                :
                <TouchableOpacity 
                onPress={() => {block_Status(item)}} 
                 style={[styles.toggelBtnView ,{  borderColor: Colors.gray,borderWidth:mobileW*0.3/100 }]}>
                  <View activeOpacity={0.8} 
                   style={{backgroundColor:Colors.lightgray,width:mobileW*4.5/100,height:mobileW*4.5/100,borderRadius:mobileW*2.5/100 }}/>
                  </TouchableOpacity>
                }

                </View>
              </View>

            </TouchableOpacity>}

              <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />
            </View>)} />

        {/* <FlatList
          alwaysBounceVertical={false}
          data={allUsers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{}}>
               
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Chatt', { userName: item.userName, guestUid: item.uuid, token: item.token ,user_block:item.user_block })}
                style={{
                  backgroundColor: '#FAFAFA',
                  flexDirection: 'row',
                  margin: mobileW * 2 / 100,
                  padding: mobileW * 2 / 100
                }}>
                  { item.user_block == false ?
                <View style={{ width: mobileW * 22 / 100, }}>
                  <View style={styles.imageCard}>
                    <Image resizeMode='contain' style={[styles.mavenImage, ]}
                      source={require('./Icon/icon_student.png')}></Image>
                  </View>
                </View>
                :
                 <View style={{ width: mobileW * 22 / 100, }}>
                 <View style={[styles.imageCard, {opacity:0.3}]}>
                   <Image resizeMode='contain' style={[styles.mavenImage,  ]}
                     source={require('./Icon/icon_student.png')}></Image>
                 </View>
               </View>}
                
  { item.user_block == false ?
  <View style={{ width: mobileW * 48 / 100, }}>
  <Text style={{fontSize: mobileW * 3.5 / 100, color: Colors.blackColor, fontFamily:Font.FontSemiBold, marginTop: mobileW * 3 / 100 }}>{item.userName}</Text>
  <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{item.lastMessage}</Text>
   </View>
   :
      <View style={{ width: mobileW * 48 / 100, }}>
      <Text style={{fontSize: mobileW * 3.5 / 100, color: Colors.light_grey, fontFamily:Font.FontSemiBold, marginTop: mobileW * 3 / 100 }}>{item.userName}</Text>
      <Text style={{fontSize:mobileW*3.5/100,color:Colors.lightgray,fontFamily:Font.FontMedium}}> You blocked this  contact</Text>
     </View>
     }

                <View style={{ width: mobileW * 22 / 100, justifyContent: 'space-between' }}>
                  <Text style={{ color: Colors.border_color2, fontFamily:Font.FontRegular, fontSize: mobileW * 3 / 100, alignSelf: 'flex-end' }}>{item.lastTime}</Text>
                  <View style={{ width: mobileW * 13 / 100, height: mobileW * 6 / 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                    



                  { item.user_block ?
                   <TouchableOpacity  
                   onPress={() => {unblock_Status(item)}} 
                   style={[styles.toggelBtnView ,{  borderColor: Colors.gray,borderWidth:mobileW*0.3/100 }]}>
                    <View activeOpacity={0.8} 
                    style={{backgroundColor:Colors.themecolor,width:mobileW*5/100,height:mobileW*5/100,left:mobileW*5/100, borderRadius:mobileW*2.5/100 }}/>
                    </TouchableOpacity>
                  :
                  <TouchableOpacity 
                  onPress={() => {block_Status(item)}} 
                   style={[styles.toggelBtnView ,{  borderColor: Colors.gray,borderWidth:mobileW*0.3/100 }]}>
                    <View activeOpacity={0.8} 
                     style={{backgroundColor:Colors.lightgray,width:mobileW*4.5/100,height:mobileW*4.5/100,borderRadius:mobileW*2.5/100 }}/>
                    </TouchableOpacity>
                  }

                  </View>
                </View>

              </TouchableOpacity>

              <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />
            </View>)} /> */}
      </ScrollView>
    </View>
  )
}

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  ModelCard: {
    alignSelf: 'center',
    elevation: 5,
    width: mobileW * 90 / 100,
    marginTop: mobileH * 25 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
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
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
    marginHorizontal: mobileW * 3 / 100
  },
  HeaderText: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
    marginLeft: mobileW * 4 / 100,
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color
  },
  SearchIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    marginRight: mobileW * 3 / 100,
    tintColor: Colors.black_color,
  },
  Header: {
    width: mobileW,
    flexDirection: 'row',
    alignItems: 'center',
    height: mobileW * 15 / 100,
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    backgroundColor: Colors.white_color,
  },
  searchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  croseImage: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.color_orange
  },
  TextInputView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.gray,
    backgroundColor: Colors.white_color,
    width: mobileW * 92 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
  },
  TextInput: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    width: mobileW * 82 / 100,
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.3 / 100,
    borderRadius: mobileW * 1 / 100,
  },
  mavenImage: {
    tintColor: Colors.themecolor,
    width: mobileW * 16 / 100,
    height: mobileW * 16 / 100,
    borderRadius: mobileW * 3 / 100,
  },
  imageCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    width: mobileW * 18 / 100,
    height: mobileW * 18 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.6 / 100,
  },
  Onbutton: {
    width: mobileW * 4.3 / 100,
    height: mobileW * 4.4 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0 / 100
  },
  toggelBtnView: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    width: mobileW * 10 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.27 / 100,
  }
})


