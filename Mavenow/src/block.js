import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
// import firebase from './App/Firebase/firebaseConfig'
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

const Chat = ({ navigation }) => {
  const [allUsers, setallUsers] = useState([])
   
  const [refresh, setrefresh] = useState(false);
  // const [isEnabled1, setIsEnabled1] = useState('');

  // const [isEnabled1, setIsEnabled1] = useState('active1');
  const [isEnabled1, setIsEnabled1] = useState('active1');
  console.log(isEnabled1,"isEnabled1......",isEnabled1);
  console.log(setIsEnabled1,".........setIsEnabled1..........",setIsEnabled1);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState('Add')
  const [searchQuery, setSearchQuery] = useState(''); 
  console.log(searchQuery,"....searchQuery.....searchQuery");
  const [blockstatus,setblockstatus] = useState(false)
  const [uid,setgetid] = useState()


 
  
  useEffect(() => {
    toGetuserList()
  }, [])




    const block_Status =async(item)=>{
    var get_ID = await localStorage.getItemString('UID')
    var otherUser_ID = item.uuid
    console.log(get_ID,"==============item,id=================",otherUser_ID);
    blockedUser(get_ID,otherUser_ID,blockstatus);

    match_ID()
  }

  const match_ID = () => {
    if( get_ID != otherUser_ID){
      setblockstatus(true)
    }else{
      setblockstatus(false)
    }
   }


  const ToGetBlockStatus = async() =>{
    let result = await localStorage.getItemObject('user_arr');
    var LogInUser  = result.id;
    // console.log(LogInUser,'<<--------LogInUser','guestUserId-------->>',guestUserId);
    axios.post(config.baseURL+'getAllBlockUser',{
      blockBy:LogInUser,
      blockTo:guestUserId
    })
      .then(data => {
        var ErrorCode = data.data.ErrorCode
        if(ErrorCode==300){
          setisblocked(false)
          // console.log('data==========>>>>',data.data);
        }else if(ErrorCode==200){
          setisblocked(true)
          // console.log('data==========>>>>',data.data.getAllBlockUser);
          var BlockByArr = data.data.getAllBlockUser;
          for(let i=0; i<BlockByArr.length;i++){
            // console.log('blockBy=====',BlockByArr[i].blockBy);
            setBlockByStatus(BlockByArr[i].blockBy)
          }
        }
        })
        .catch(function (error) {
          console.log('======>',error);
        });
  }

  const toGetuserList = async () => {
    try {
      // this.setState({ loader: true })
      await firebase.database().ref('users')
        .on("value", async (datasnapshot) => {
          console.log('datasnapshot------', datasnapshot.val());
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
                user_block:false
              }

              newUser.userId = child.val().uuid;
              newUser.email = child.val().email;
              newUser.userName = child.val().name;

              new Promise((resolve, reject) => {
              firebase.database().ref('messages').
                child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on('value', (dataSnapshots) => {
                  if (dataSnapshots.val()) {
                    // 
                    dataSnapshots.forEach((child) => {
                      console.log(child.val().messege.msg);
                      newUser.lastMessage = child.val().messege.msg;
                      newUser.lastDate = child.val().messege.date;
                      newUser.lastTime = child.val().messege.time;

                    });
                  }

                  return resolve(newUser);
                })
              })

              // await firebase.database().ref('blockFriendList')
              // .on("value", async (datasnapshot) => {
              //   console.log('datasnapshot------ get firebase data ', datasnapshot.val());
                 
              // })

              new Promise((resolve, reject) => {
                firebase.database().ref('blockFriendList').
                 child(uuid).child(child.val().uuid).on('value', (dataSnapshots) => {
                    console.log(dataSnapshots.val(),);
                    if (dataSnapshots.val()) {
                      // 
                      dataSnapshots.forEach((child) => {
                        newUser.user_block = child.val().blockedStatus;
                        console.log( '--------------------.........dataSnapshots.val().........>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',child.val().blockedStatus);
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

              // first user hide functionaliy
              return resolve(users);
              setallUsers(users)
              console.log('newUser------->>>>', newUser);
              console.log('newUser------->>>>', users);
            });
            setallUsers(users)
            // setallUsers1(users)
            console.log('users===========', users);
          }).then((users) => {
            setallUsers(users)
            // setallUsers1(users)
            console.log('users===========', users);
            // setTimeout(() => {
            //   console.log('AllUsers --------------', allUsers);
            // }, 1000);
          
          })
          // this.setState({ loader: false })
        })
    } catch (error) {
      alert(error);
      // this.setState({ loader: false })
    }
  }

  const searchLearner = (text) => {
    setSearchQuery(text);
    const userData = allUsers.filter((item) =>
    item.userName.toLowerCase().includes(text.toLowerCase())
    );
    setallUsers(userData);
    };

  // const _searchLearner = (text) => {
  //   setSearchQuery(text);
  //   const filteredResults = jobdata.filter((item) =>
  //   item.company.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setcompanyList(filteredResults);
  // };







//    const _searchLearner = (textToSearch) => {

//     var textToSearch = textToSearch.toString().toLowerCase();
//     let data1 = allUsers1;
//     if (data1 != 'NA') {
//         console.log(data1,"<!....!>",textToSearch);
//         // return false
//         if (data1 != 'NA') {
//             var text_data = textToSearch.trim();
//             let newData = data1.filter(function (item) {
//                 return (
//                     // item.userName>= 0
//                     item.userName.toString().toLowerCase().indexOf(text_data) >= -1
//                 )
//             });

//             if (newData.length > 0) {
//               setallUsers(newData)
//                 // this.setState({ business_arr: newData })
//             } else if (newData.length <= 0) {
//                 // this.setState({ business_arr: 'NA' })
//                 setallUsers([])
//             }
//         }
//     }
// }



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

  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }

  // const { selectedItems } = this.state;
  // if (selectedItems.includes(item.id)) {
  //     const newListItems = selectedItems.filter(
  //         (listItem) => listItem !== item.id
  //     );

  //     //   console.log("newListItems",selectedItems);
  //     this.setState({ selectedItems: [...newListItems] });
  // } else {
  //     this.setState({ selectedItems: [...selectedItems, item.id] });
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Chatt', { UserName: item.userName, guestUid: item.uuid, token: item.token })}
                style={{
                  backgroundColor: '#FAFAFA',
                  // backgroundColor: 'lightgray',
                  flexDirection: 'row',
                  margin: mobileW * 2 / 100,
                  padding: mobileW * 2 / 100 }}>
                    <View style={{ width: mobileW * 22 / 100, }}>
                    <View style={styles.imageCard}>
                    <Image resizeMode='contain' style={styles.mavenImage}
                      source={require('./Icon/icon_student.png')}></Image>
                  </View>
                </View>

                <View style={{ width: mobileW * 48 / 100, }}>
                 <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.blackColor, fontWeight: 'bold', marginTop: mobileW * 3 / 100
                  }}>{item.userName}</Text>
                  <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, fontWeight: '500' }}>{item.lastMessage}</Text>
                  {/* <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, fontWeight: '500' }}>{item.uuid}</Text> */}

                  {/* <Text>{item.uuid}</Text>  */}
                </View>
  
                <View style={{ width: mobileW * 22 / 100, justifyContent: 'space-between' }}>
                  <Text style={{ color: Colors.border_color2, fontSize: mobileW * 3 / 100, alignSelf: 'flex-end' }}>{item.lastTime}</Text>
                  <View style={{ width: mobileW * 13 / 100, height: mobileW * 6 / 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <View style={[styles.toggelBtnView ,{  borderColor: isEnabled1 != item.user_block ? Colors.gray : Colors.green}]}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => {setIsEnabled1(item.user_block),block_Status(item)}} style={[styles.Onbutton, {backgroundColor: isEnabled1 === item.user_block ? Colors.themecolor : "#FAFAFA", borderColor: isEnabled1 == item.user_block ? Colors.white_color : Colors.gray }]} />
                      <TouchableOpacity activeOpacity={0.8} onPress={() =>{ setIsEnabled1(item.user_block),block_Status(item)}} style={[styles.Onbutton, {backgroundColor: isEnabled1 === item.user_block ? "#FAFAFA" : Colors.themecolor, borderColor: isEnabled1 == item.user_block ? Colors.gray : Colors.white_color }]} />
                  </View>
                    {/* <View style={[styles.toggelBtnView ,{  borderColor: blockstatus != false ? Colors.gray : Colors.green}]}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => {setblockstatus(false),block_Status(item)}} style={[styles.Onbutton, {backgroundColor: blockstatus === false? Colors.themecolor : "#FAFAFA", borderColor: blockstatus == false ? Colors.white_color : Colors.gray }]} />
                      <TouchableOpacity activeOpacity={0.8} onPress={() =>{ setblockstatus(false),block_Status(item)}} style={[styles.Onbutton, {backgroundColor: blockstatus === false ? "#FAFAFA" : Colors.themecolor, borderColor: blockstatus == false ? Colors.gray : Colors.white_color }]} />
                  </View> */}
                </View>
                </View>
                
              </TouchableOpacity>
              <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />
            </View>)} />
      </ScrollView>
    </View>
  )
}

export default Chat;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  ModelCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    marginTop: mobileH * 25 / 100,
    alignSelf: 'center',
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  ModelHeader: {
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
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
    marginHorizontal: mobileW * 3 / 100
  },
  HeaderText:{ 
    color: Colors.black_color, 
    fontFamily: Font.FontMedium, 
    marginLeft: mobileW * 4 / 100, 
    fontSize: mobileW * 4 / 100 
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color
  },
  SearchIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
    marginRight: mobileW * 3 / 100
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW, 
    height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    backgroundColor: Colors.white_color,
    width: mobileW * 92 / 100,
    flexDirection: 'row',
    borderRadius: mobileW * 2 / 100,
    alignItems: 'center',
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.gray
  },
  TextInput: {
    width: mobileW * 82 / 100,
    borderRadius: mobileW * 1 / 100,
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.3 / 100,
    fontFamily: Font.FontMedium,
    color: Colors.black_color
  },
  mavenImage: {
    width: mobileW * 16 / 100,
    height: mobileW * 16 / 100,
    borderRadius: mobileW * 3 / 100,
    tintColor: Colors.themecolor
  },
  imageCard: {
    width: mobileW * 18 / 100,
    height: mobileW * 18 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.6 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Onbutton:{ 
    width: mobileW * 4.3 / 100, 
    height: mobileW * 4.4 / 100, 
    borderRadius: mobileW * 3 / 100, 
    borderWidth: mobileW * 0 / 100
  },
  toggelBtnView:{
    width: mobileW * 9 / 100, 
    height: mobileW * 5 / 100, 
    alignItems: 'center', 
    borderRadius: mobileW * 3 / 100, 
    borderWidth: mobileW * 0.25 / 100, 
    flexDirection: "row", 
    justifyContent: "space-between",
  }
})



// import React, { useState, useEffect } from 'react';
// import { FlatList, Text, Alert, BackHandler, ScrollView, Modal, StatusBar, View, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
// import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font, Colors, mobileH, mobileW, localimag, SocialLogin } from './Provider/utilslib/Utils';
// import axios from 'axios';
// import { useIsFocused } from '@react-navigation/native';
// import moment from 'moment';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
 
//  const data = [{ sendBy: 1, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 3, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 3, msg: 'work in inwizards', date: '2023-03-17', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-11', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-11', time: '04:47 PM' },
//   { sendBy: 1, msg: 'work in inwizards', date: '2023-03-11', time: '04:47 PM' },
//   { sendBy: 3, msg: 'i am in indore now', date: '2023-02-15', time: '04:47 PM' },
//   { sendBy: 1, msg: 'now where are you', date: '2023-02-15', time: '04:47 PM' },
//   { sendBy: 3, msg: 'i am fine', date: '2023-02-15', time: '04:47 PM' },
//   { sendBy: 1, msg: 'i am fine & whats about you ?', date: '2023-01-02', time: '04:47 PM' },
//   { sendBy: 3, msg: 'How  are You ?', date: '2023-01-02', time: '04:47 PM' },
//   { sendBy: 1, msg: 'hii', date: '2023-01-02', time: '04:47 PM' },
//   { sendBy: 3, msg: 'Hello', date: '2023-01-02', time: '04:47 PM' }]

// export default function Chat({ navigation, route }) {

//   const [message, setmessage] = useState(data)
//   const [currentUid, setcurrentUid] = useState(1)

//   // const [allMessages, setallMessages] = useState(data)
//  const [inboxmessages, setallMessages] = useState()

//   const [modalVisible, setModalVisible] = useState(false);
//   const [ImageForShow, setImageForShow] = useState('');
//   const [LoginUserId, setLoginUserId] = useState('');
//   const [inputHeight, setInputHeight] = useState(0);
//   const [isblocked, setisblocked] = useState(false);
//   const [BlockByStatus, setBlockByStatus] = useState(false);
//   const [blockedby, setblockedby] = useState("");
//   const [GuestToken, setGuestToken] = useState("");
//   const isFocused = useIsFocused();
//   const insets = useSafeAreaInsets();



// //   BL =  #121A23
// // White =  #FFFFFF
// // Gray =  #9B9B9B
// // BR =  #EFF2F1
// // BR2 =  #E7E8EA
// // Blue=  #00959E
// // BG =  #FAFAFA

//   console.log();

//   useEffect(() => {
//     if (isFocused) {
//     }
//   }, [isFocused]);

//   // ------------ To Send Message --------------------
//   const sendMessagesss = async () => {
//     setmessage('')
//      allMessages.push({
//         msg:message,
//         sendBy:1,
//         date:moment(new Date()).format('YYYY-MM-DD'),
//         time:'07:45 PM'
//     })
//     console.log({
//         msg:message,
//         sendBy:1,
//         date:moment(new Date()).format('YYYY-MM-DD'),
//         time:'07:45 PM'
//     });
//     console.log('allMessages-----------------------------------',allMessages);
//     setallMessages(inboxmessages)
//     Keyboard.dismiss()
//     // ApiCalling();
//     // return false
//     const currentUid111 = await AsyncStorage.getItem('UID');
//     const guestUid111 = route.params.guestuuid;
//     var blockStatus = false;
//     console.log(currentUid111, '============', guestUid1);
//     if (message) {
//       SendMessage(currentUid111, guestUid1, message, "", blockStatus).
//         then((res) => {
//           // console.log(res);
//           setmessage('')
//         }).catch((err) => {
//           alert(err)
//         })
//       // ------------ To Receive Messages -----------------
//       RecieveMessage(currentUid111, guestUid1, message, "", blockStatus).
//         then((res) => {
//           // console.log(res);
//           setmessage('')
//         }).catch((err) => {
//           alert(err)
//         })
//     }
//   }

//   // --------------------------------------------------
//   const ApiCallingforImage = async () => {
//     var checkTocken = message.fcmToken1
//     // console.log("the old tocken-----------",checkTocken);
//     var data = JSON.stringify({
//       data: {
//         "message": "Card",
//         "messageType": '',
//       },
//       notification: {
//         "body": "Card",
//         "image": 'https://reactnative.dev/img/tiny_logo.png',
//         "tag": "hey",
//         "title": UserName
//       },
//       to: GuestToken
//     });

//     var configuration = {
//       method: 'post',
//       url: 'https://fcm.googleapis.com/fcm/send',
//       headers: {
//         'Authorization': 'key=AAAAeuTzlQI:APA91bGdBRTLA97sb7g0vngLm3pXh82ZqPEFNpDW3oUN_aCHqNjEIvJaLDHr7yEzIkf0gcg7la98Lff0Ciotp9A_wWMCgd6m-1mvK2pc3y-XmXDubF29trhzIxcwLJwjo8zVL1XIgRtx',
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };
//     axios(configuration)
//       .then(function (response) {
//         // console.log("Api Data======",response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   // --------------------------------------------------
//   const ApiCalling = async (UserUUid12) => {
//     // console.log('GuestToken',GuestToken);
//     axios.post(config.baseURL + 'sendNotifiction', {
//       receiverDeviceToken: GuestToken,
//       title: UserName,
//       body: message
//     })
//       .then(data => {
//         // console.log(data);
//         var Succeess = data.data.Succeeded
//         var Message = data.data.ErrorMessage
//         // console.log('data.data------>>>',data.data)

//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });

//   }

//   const getMessageDay = (LastDate) => {
//     // return false
//     // console.log('LastDate======',LastDate);
//     const diff = moment(moment(LastDate)).diff(moment(), 'days');
//     // console.log('LastDate======',diff);
//     let time = "";
//     if (diff == -1) {
//       time += "Yesterday";
//     } else if (diff < -1) {
//       time += moment(LastDate).locale('en').format('DD MMMM YYYY') + "";
//     } else {
//       time += "Today";
//     }
//     return time;
//   }


//   // =======================================================================

//   const openGallery = async () => {
//     // ApiCallingforImage();
//     const currentUid111 = await AsyncStorage.getItem('UID');
//     const guestUid111 = route.params.guestuuid;
//     ImgToBase64.getBase64String(route.params.image)
//       .then(async (base64String) => {
//         let source = "data:image/jpeg;base64," + base64String;
//         SendMessage(currentUid111, guestUid1, "", source).
//           then((res) => {
//             this.setState({ loader: false })
//             // console.log(res);
//           }).catch((err) => {
//             alert(err)
//           })

//         RecieveMessage(currentUid111, guestUid1, "", source).
//           then((res) => {
//             // this.setState({ loader: false })
//             // console.log(res);
//           }).catch((err) => {
//             alert(err)
//           })
//       })
//       .catch(err => this.setState({ loader: false }));
//   }

//   const ToShowImage = (item) => {
//     var imageData = item.image
//     setImageForShow(imageData)
//     // console.log(ImageForShow);
//     setModalVisible(!modalVisible)
//   }

//   return (
//     <View style={styles.container}>
//       {/* ---------------Modal To show Image End-------------  */}
//       <SafeAreaView
//         style={{ flex: 0, backgroundColor: Colors.themecolor }} />
//       <StatusBar
//         hidden={false}
//         backgroundColor={Colors.themecolor}
//         translucent={false}
//         networkActivityIndicatorVisible={true}
//       />
//    <View style={{width:mobileW, height:mobileW*15/100,  justifyContent:'center',  }}>
  
//   <View style={{flexDirection:'row',padding:mobileW*4/100,alignItems:"center"}}>
//   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//   <Image resizeMode='contain' style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100}} source={require("./Icon/back(1).png")}></Image>
//   </TouchableOpacity>

//   <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('MyMavenProfile')} style={{flexDirection:'row', alignItems:'center',left:mobileW*2/100}}>
//     <Image resizeMode='contain' style={{width:mobileW*10/100, height:mobileW*10/100, backgroundColor:Colors.themecolor, borderRadius:mobileW*5/100}}
//     source={require("./Icon/11.jpg")}></Image>

//     <View style={{marginHorizontal:mobileW*2/100}}>
//       <Text style={{fontSize:mobileW*3.2/100, color:Colors.black_color, fontFamily:Font.FontMedium}}>Hi Arman</Text>
//       <Text style={{fontSize:mobileW*2.5/100, marginTop:mobileW*-1/100, color:Colors.gray, fontFamily:Font.FontRegular, }}>Good to see you Maven</Text>
//     </View>
//   </TouchableOpacity>

//   </View>
// </View>



//       <KeyboardAvoidingView
//         style={[styles.messageList, { marginBottom: inputHeight + hp('12%') }]}
//         behavior={Platform.OS === 'android' ? null : 'padding'}
//         keyboardVerticalOffset={Platform.OS === 'android' ? 0 : inputHeight + hp('7%')}>
//         <FlatList
//           style={{ width: mobileW, paddingHorizontal: mobileW * 3 / 100, flex: 1 }}
//           inverted
//           data={message}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item, index }) => (
//             <View>
//               {
//                 index == message.length - 1 || (index != message.length - 1 && !moment(message[index + 1].date).isSame(item.date, 'day')) ?
//                   <View style={{ paddingBottom: mobileH * 1.5 / 100, paddingTop: mobileH * 1.5 / 100}}>
//                     <Text style={{ alignSelf: "center", paddingStart: 5, paddingEnd: 5, paddingTop: mobileW*1.5/100, paddingBottom: mobileW*1.5/100, marginVertical: 2.5,   backgroundColor:'#EFF2F1',
//                     color: Colors.gray, borderRadius:mobileW*2/100, overflow: 'hidden',fontSize:mobileW*3/100,fontFamily:Font.FontRegular,}}>
//                       {getMessageDay(item.date)}</Text>
//                       </View>
//                   : <></>
//               }

//       <View style={{marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10,alignSelf: currentUid === item.sendBy ? 'flex-end' : 'flex-start'  }}>
                 
//                 <View style={currentUid === item.sendBy ? {
//                   backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1',
//                   borderTopLeftRadius: 10, borderBottomRightRadius: 20, borderBottomLeftRadius: 10}
//                   :{
//                     backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1' ,
//                     borderTopRightRadius: 10, borderBottomRightRadius:10, borderBottomLeftRadius: 10  }}>
//                   <Text style={{ padding: 10, fontSize:mobileW*3/100,fontFamily:Font.FontMedium, color: Colors.blackColor }}>
//                     {item.msg} {"..   "} 
//                     {/* <Text>.....</Text> */}
//                     {/* <Text style={{ fontSize: 0.5,color: Colors.blackColor }}>{getMessageDay(item.date)}</Text> */}
//                 </Text>
//                 <View style={{marginTop:mobileW*-2/100,alignSelf:"flex-end"}}>
//                 <Text style={{ fontSize:mobileW*2.5/100,color: Colors.gray,margin:mobileW*1/100,right:mobileW*2/100 }}>{item.time}</Text>
//                 </View>

//                   {/* {item.image === "" ? <Text 
//               style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}>
//                 {item.msg} {"   "} <Text 
//                 style={{ fontSize: 0.5 }}>{getMessageDay(item.date)}</Text>
//                 <Text 
//                 style={{ fontSize: 12 }}>{item.time}</Text>
//               </Text> :
//                 <TouchableOpacity
//                 activeOpacity={0.8}
//                 // onPress={() => ToShowImage(item)}
//                 >
//                   <Image source={{ uri: item.image }} style={{
//                     width: mobileW*45/100 ,
//                     height: mobileH*33/100 , resizeMode:'contain', borderRadius: 30
//                   }} />
//                   <Text 
//                   style={{ 
//                   fontSize: 12, 
//                   position: 'absolute', 
//                   bottom: 5, 
//                   right: 5 
//                   }}>{item.time}</Text>
//                 </TouchableOpacity>
//               } */}
//                 </View>




//               </View>
//             </View>
//           )}
//         />
//       </KeyboardAvoidingView>
//       <KeyboardAvoidingView
//         style={{
//           position: 'absolute',
//           bottom: wp('1.2%'),
//           width: '97.5%',
//           marginHorizontal: wp('1.2%')
//         }}
//         behavior={Platform.OS === 'android' ? null : 'position'}
//         // keyboardVerticalOffset={Platform.OS === 'android' ? 0 : insets.top + hp('0.8%')}
//         keyboardVerticalOffset={Platform.OS === 'android' ? 0 : mobileH * 5 / 100}
//         enabled>
//         <View style={{
//           flexDirection: 'row',
//           alignSelf: 'center', bottom: 3,
//           width: mobileW * 95 / 100,
//           alignItems: 'center',
//           // height:mobileH*20/100,
//           justifyContent: 'space-around',
//         }}>
//           <View
//             onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               width: mobileW * 86.2 / 100,
//               borderRadius: mobileW * 2 / 100,
//               // borderWidth: mobileW * 0.5 / 100,
//               // borderColor: Colors.themecolor,
//                height: mobileW * 10 / 100,
//               backgroundColor:'#EFF2F1',
//               borderRadius:mobileW*10/100
//             }}>

//             <TextInput
//               maxLength={1000}
//               placeholderTextColor={Colors.border_color}
//               multiline={true}
//               // numberOfLines={6}
//               value={message}
//               placeholder='Message'
//               fontFamily={Font.FontRegular}
//               // onChangeText={(text) => setmessage(text)}
//               style={{
//                 width: mobileW * 68 / 100, fontFamily: Font.FontRegular,
//                 fontSize: mobileW * 3 / 100, marginLeft: mobileW * 3 / 100
//               }}></TextInput>
//                  <TouchableOpacity
//             activeOpacity={0.8}
//             style={{
//               width: mobileW * 8.3 / 100, height: mobileW * 8.3 / 100,
//               backgroundColor:'#FB4C00', borderRadius: mobileW * 5.5 / 100, alignItems: 'center', justifyContent: 'center',left:mobileW*5.5/100}}
//             // onPress={() => sendMessagesss()}
//           >
//             <Image
//               resizeMode='contain'
//               style={{
//                 tintColor: Colors.whiteColor,
//                 height: mobileW * 5 / 100,
//                 width: mobileW * 5 / 100,
//               }}
//               source={require('./Icon/SendMessage.png')}
//             />
//           </TouchableOpacity>

//           </View>
       
//         </View>
//       </KeyboardAvoidingView>

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:
//   {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: Colors.whiteColor
//   },
//   header_View: {
//     width: mobileW,
//     paddingHorizontal: mobileW * 4 / 100,
//     height: mobileW * 15 / 100,
//     alignItems: 'center',
//     flexDirection: "row",
//     backgroundColor: Colors.themecolor,
//     justifyContent: 'space-between'
//   },
//   back_Icon: {
//     width: mobileW * 8 / 100,
//     height: mobileW * 8 / 100,
//     alignItems: "center",
//     justifyContent: 'center',
//     borderRadius: mobileW * 4 / 100,
//   },
//   backIcon_: {
//     width: mobileW * 6/ 100,
//     height: mobileW * 6 / 100,
// },
// infoicon: {
//     width: mobileW * 6/ 100,
//     height: mobileW * 6 / 100,
//     tintColor:Colors.black_color
//   },
//   header_text: {
//     fontSize: mobileW * 5 / 100,
//     color: 'black',
//     fontWeight: '500'
//   },
//   arrayback:
//   {
//     width: mobileW,
//     height: mobileH * 10 / 100,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: mobileW * 4 / 100,
//     borderBottomColor: Colors.border_color,
//     borderBottomWidth: mobileW * 0.2 / 100,
//     justifyContent: 'space-between',
//   },
//   activeicon:
//   {
//     tintColor: Colors.green_color,
//     height: mobileW * 1.8 / 100,
//     width: mobileW * 1.8 / 100,
//   },
//   backname:
//   {
//     width: mobileW * 65 / 100,
//     height: '90%',
//   },
//   personname:
//   {
//     marginTop: mobileW * 1 / 100,
//     fontSize: mobileW * 3.5 / 100,
//     fontFamily: Font.FontSemiBold,
//     color: Colors.whiteColor
//   },
//   Header: {
//     backgroundColor: Colors.white_color,
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding:mobileW*4/100,
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   status: {
//     fontSize: mobileW * 2.8 / 100,
//     fontFamily: Font.FontRegular,
//     color: Colors.whiteColor,
//     marginTop: mobileW * 1 / 100
//   },

//   arrayback11:
//   {
//     width: mobileW,
//     paddingVertical: mobileW * 2 / 100,
//     alignItems: "center",
//     flexDirection: 'row',
//     width: mobileW,
//     position: 'absolute',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1
//     , shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.4,
//     shadowColor: 'black',
//     bottom: 0,
//     justifyContent: 'space-around',
//   }
// })


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MultiSelected Code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// import React, { useState } from 'react';
// import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const MultiSelectList = () => {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const data = [
//     { id: '1', name: 'Item 1' },
//     { id: '2', name: 'Item 2' },
//     { id: '3', name: 'Item 3' },
//     // Add more items as needed
//   ];

//   const renderItem = ({ item }) => {
//     const isSelected = selectedItems.includes(item.id);

//     return (
//       <TouchableOpacity onPress={() => handleItemPress(item.id)}>
//         <View style={[styles.item, isSelected && styles.selectedItem]}>
//           <Text>{item.name}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleItemPress = (itemId) => {
//     // Check if the item is already selected
//     if (selectedItems.includes(itemId)) {
//       // If selected, remove it from the selected items
//       setSelectedItems((prevSelectedItems) =>
//         prevSelectedItems.filter((id) => id !== itemId)
//       );
//     } else {
//       // If not selected, add it to the selected items
//       setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedItems} // Re-render when selectedItems change
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   item: {
//     padding: 16,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   selectedItem: {
//     backgroundColor: 'lightblue',
//   },
// });

// export default MultiSelectList;