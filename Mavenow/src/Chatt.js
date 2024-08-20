import React, { Component, useEffect, useState, } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { SendMessage, RecieveMessage } from './App/Firebase/Message'
import firebase from './App/Firebase/firebaseConfig';
import moment from 'moment';
import axios from 'axios';
import { NativeModules } from 'react-native';
import { Modal, Alert, ScrollView, RefreshControl, Switch, Clipboard, TextInput, StatusBar, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';

import { topNotificationChanged, logOut } from '../actions';
import { el } from 'date-fns/locale';
import { log } from 'react-native-reanimated';
import { Lang_chg } from './Provider/Language_provider';
import { config } from './Provider/configProvider';
const Chat = ({ navigation, route }) => {


  useEffect(() => {
    _togetGuestFcmToken()
    sendMessage()
    check_online()
    if (isFocused) {
      userChatList()
      sendMessage()
    }
  }, [isFocused])

  const guestUid = route.params.guestUid
  const UserName = route.params.userName
  const  user_block  =route.params.user_block
  console.log(user_block,'_________>');
const isFocused = useIsFocused();
  const [allMessages, setallMessages] = useState('')
  console.log(allMessages, "____________________>>>>>>>",);
  const [message, setmessage] = useState('')
  const [Statereceivemessage, setStatereceivemessage] = useState()
  const [Statesendmessage, setStatesendmessage] = useState()
  const [currentUid, setcurrentid] = useState()
  const [selectedItems, setSelectedItems] = useState([]);
  const [useronline, setuseronline] = useState(false);
  const [messageIds, setMessageIds] = useState('');
  const [selectedMesssages, setSelectedMesssages] = useState([]);
  const [msgIds, setMsgIds] = useState('');
  console.log(msgIds,"msgIds====> msgIds =====> =================================================== ");
  const [guestToken, setGuestToken] = useState('')
  const [copiedTexts, setCopiedTexts] = useState([]);
  const [copiedmessages, setCopiedmessages] = useState({});


  console.log("your copiedText messages ", copiedTexts);
  // console.log("copiedmessages", copiedmessages);
  // for (let i = 0 ; i < copiedTexts.length ; i++){
  //   var allMessagess = copiedTexts[i]
  //   console.log("react native developer",allMessagess);
  //   setCopiedmessages(allMessagess)
  // }
  console.log("messages id here....", messageIds);
  console.log("your Selected messages here...", selectedMesssages);

  const copyToClipboard = () => {
    // var copiedTexts = []
    // console.log("copiData ++++++++ copiData", copiedTexts);
    for (let i = 0; i < selectedMesssages.length; i++) {
      Clipboard.setString(selectedMesssages[i].msg)
      copiedTexts.push(selectedMesssages[i].msg)
    };
    alert('Text copied to clipboard!')

  };

  const handleOnPress = contact => {
    if (selectedItems.length) {
      return selectItems(contact);
    }

    // here you can add you code what do you want if user just do single tap
    console.log('pressed');
  };

  const getSelected = contact => selectedItems.includes(contact.id);

  const deSelectItems = () => setSelectedItems([]);

  const selectItems = item => {

    for (let i = 0; i < messageIds.length; i++) {
      var selectId = messageIds[0]
      console.log("YOu press id+++", selectId);
    }

    //  Selected messages Add and Remove in this Array 
    console.log("You Press Massage", item);
    if (!selectedMesssages.includes(item)) {
      // setSelectedMesssages((history) => [...history, item]);
      selectedMesssages.push(item)

    } else {
      var index = selectedMesssages.indexOf(item);
      if (index > -1) {
        selectedMesssages.splice(index, 1);
      }
    }

    // messages selected and deselected

    if (selectedItems.includes(item.id)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.id,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.id]);

  };


  // user chat list.......................................................
  

  const check_online = () => {
    try {
      firebase.database().
        ref('users').
        child(route.params.guestUid).
        on("value", (dataSnapshot) => {

          console.log('dataSnapshot', dataSnapshot.val());
          let message = [];
          var online_status = dataSnapshot.val().onlineStatus
          setuseronline(online_status)


        })
    } catch (error) {
      alert(error);
    }
  }

  const userChatList = async () => {
    const currentUid = await AsyncStorage.getItem('UID');
    setcurrentid(currentUid)
    console.log(currentUid, 'currentUid........  guestUid==========>', guestUid);
    try {
      firebase.database().
        ref('messages').
        child(currentUid).
        child(route.params.guestUid).
        on("value", (dataSnapshot) => {

          console.log('dataSnapshot++', dataSnapshot.val());

          if (dataSnapshot.val() != null || undefined || '') {
            let message = [];
            dataSnapshot.forEach((data) => {
              message.push({
                sendBy: data.val().messege.sender,
                recieveBy: data.val().messege.reciever,
                msg: data.val().messege.msg,
                image: data.val().messege.image,
                date: data.val().messege.date,
                time: data.val().messege.time,
                fcmToken1: data.val().messege.token,
                id: Math.floor(100000 + Math.random() * 900000),
                messageid: data.val().messege.selectId
                // messageid:Object.keys(data.val())

              });
            })


            const messageIds = Object.keys(dataSnapshot.val());
            for (let i = 0; i < messageIds.length; i++) {
              var selectId = messageIds[i]
              console.log("YOu press id+++0000000000000000000000", message);
              setMsgIds(selectId)
            }


            console.log("messageIds", messageIds);
            setMessageIds(selectId);
            setallMessages(message.reverse());
             } else {
            setallMessages([]);

             }


          // console.log('allMessages is here =============+++++++++++++++++++++++++++++', allMessages)

        })
    } catch (error) {
      alert(error);
    }
  }


  const getMessageDay = (LastDate) => {
    // return false
    // console.log('LastDate======',LastDate);
    const diff = moment(moment(LastDate)).diff(moment(), 'days');
    // console.log('LastDate======',diff);
    let time = "";
    if (diff == -1) {
      time += "Yesterday";
    } else if (diff < -1) {
      time += moment(LastDate).locale('en').format('DD MMMM YYYY') + "";
    } else {
      time += "Today";
    }
    return time;
  }


  const _togetGuestFcmToken = async () => {
    // const guestUid111 = this.state.guestUid;
    try {
      firebase.database().
        ref('users').
        // child(currentUid).
        child(guestUid).
        // child("messages").
        on("value", (dataSnapshot) => {

          // let message = [];
          // console.log('GuestUser=555=====/////////////////////////////////////////////////////////////////////', dataSnapshot.val());
          console.log('====> Token ', dataSnapshot.val().token);
          setGuestToken(dataSnapshot.val().token)

        })
    } catch (error) {
      alert(error);
    }
  }

  //  ========  API Calling 

  //  const selectedItems = item => {
  //   if(this.selectedMsg.includes(item)){
  //       const newListItems=selectedMsg.filter(
  //           ListItem=>ListItem!==item,
  //       );
  //        this.setSelectedMsg(newListItems)
  //   }
  //   this.selectedItems(selectedMsg)
  // }

  const ApiCalling = async () => {
    var data = JSON.stringify({
      data: {
        "message": message,
        "messageType": '',
        "title": "Gmail",

      },
      notification: {
        "body": message,
        "image": '',
        "tag": "hey",
        "title": "123456"
      },
      to: guestToken
    });


    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Authorization':'key=AAAAfVr6_M4:APA91bEGIpjY66RWDVKQ8JTZKVUQ_z0Mn7p-lINMKMedtDDjz6XDKFAw2f5lCTbM9okXEXiNEfKHAv8LzDIb2wyaksZgM-BdtUDPVLUsrHBrvb5RdEvWuXAQS4x1xLOUPxRZWpcb8iTH',
        'Content-Type': 'application/json'
      },
      data: data
    };
    console.log(">>>>>>>>>>>>", data)
    axios(config)
      .then(function (response) {
        console.log("Api Data======", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  //  message send functionality.................................//
  const sendMessage = async () => {



 



    console.log('msg=============>msg');
    _togetGuestFcmToken()
    // ApiCalling()
    const currentUid = await AsyncStorage.getItem('UID');
  console.log(currentUid, '======================================>>>>crrentUid  chatttttt screen ');
    // console.log(guestUid, '======================================>>>>guestUid,..,.,.');
    // console.log(fcmToken1, '======================================>>>>fcmToken1.,.,.,.,.');
    console.log(UserName, '======================================messageIds.,.,.,.,.,,.,.,,.,.,.,',messageIds);

    // var checkTocken = await AsyncStorage.getItem('fcmTocken')

    // for( let i=0; i <= messageIds.length; i++){
    //   var messageIdsss = messageIds[i]
    //   console.log("messageIds+++++++++++",messageIdsss);

    // }



    if (message) {
      SendMessage(currentUid, guestUid, message, '', id, msgIds).
        then((res) => {
          setStatereceivemessage({ message: 'message' })
        }).catch((err) => {
          alert(err)
        })

      RecieveMessage(currentUid, guestUid, message, '', id, msgIds)
        .then((res) => {
          setStatesendmessage({ message: '' })
        }).catch((err) => {
          alert(err) 
        })
    }
    setmessage('')
  }
  //  message send functionality ..........................................//



  // Function to delete a message by its unique key
  const deleteMessage = (item) => {

    if (selectedMesssages != '') {

      console.log(selectedMesssages, "selectedMesssagesselectedMesssages");

      let myArray = selectedMesssages;
      // // // Using splice to remove all elements from the array
      myArray.splice(0, myArray.length);
      console.log("Remove Array+++++++++++++++++++++++", myArray);
      console.log("id find out", item);
      try {
        // const messageIdToRemove = selectId;
        if (msgIds == msgIds)
          firebase.database().ref('messages');

        firebase.database().
          ref('messages').
          child(currentUid).
          child(guestUid).
          child(msgIds).
          remove()
      } catch (error) {
        alert(error);
      }
    }
  };


  const [isTyping, setIsTyping] = useState(false);

  // Function to set the typing state
  const setTyping = (typing) => {
    setIsTyping(typing);
    // Optionally, send a signal to the server to inform others that you're typing

    // const user = firebase.auth().currentUser;
    // console.log("messages//////////////////////////////////////////////////////////////////////////////////////",user);
    // const messageRef = firebase.database().ref("messages").child(currentUid).child(guestUid).child(msgIds);
    // messageRef.update({ isTyping: true });

    // // Set "isTyping" to false after a timeout (e.g., 5 seconds)
    // setTimeout(() => {
    //   messageRef.update({ isTyping: false });
    // }, 5000);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "white", }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={{ width: mobileW, height: mobileW * 15 / 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

          <View style={{ flexDirection: 'row', padding: mobileW * 4 / 100, alignItems: "center" }}>

            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => fetchCopiedText()}> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image resizeMode='contain' style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100 }} source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyMavenProfile')} style={{ flexDirection: 'row', alignItems: 'center', left: mobileW * 2 / 100 }}>
              <Image resizeMode='contain' style={styles.profileImage}
                source={require("./Icon/11.jpg")}></Image>

              <View style={{ marginHorizontal: mobileW * 2 / 100 }}>
                <Text style={[styles.usernameText, { fontSize: mobileW * 3.5 / 100 }]}>{UserName}</Text>
                {useronline ?
                  <Text style={styles.usernameText}>{Lang_chg.onlineTxt[config.language]}</Text>
                  :
                  <Text style={styles.usernameText}>{Lang_chg.offlineTxt[config.language]}</Text>
                }

                {/* <Text style={{ fontSize: mobileW * 2.5 / 100, marginTop: mobileW * -1 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }}>Good to see you Maven</Text> */}
              </View>
            </TouchableOpacity>

          </View>

          {selectedMesssages != '' ?
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => copyToClipboard()} activeOpacity={0.8} style={{ marginRight: mobileW * 3 / 100, }}>
                <Image style={{ width: mobileW * 5.5 / 100, height: mobileW * 5.5 / 100, tintColor: Colors.blackColor }}
                  source={require("./Icon/copyPast.png")}></Image>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => deleteMessage()} style={{ marginRight: mobileW * 5 / 100, }}>
                <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.blackColor }}
                  source={require("./Icon/delete.png")}></Image>
              </TouchableOpacity></View>
            : null}


        </View>
<View><Text style={{color:Colors.red}}>,{copiedTexts}</Text></View>
        {/* FlatList chat code..................... */}
        <FlatList
          inverted
          style={{ marginBottom: 5, padding: 8 }}
          data={allMessages}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>

              {
                index == allMessages.length - 1 || (index != allMessages.length - 1 && !moment(allMessages[index + 1].date).isSame(item.date, 'day')) ?
                  <View style={{ paddingBottom: mobileH * 1.5 / 100, paddingTop: mobileH * 1.5 / 100 }}>
                    <Text style={styles.messageDayandDate}>
                      {getMessageDay(item.date)}</Text>
                  </View>
                  : <></>
              }

              {/* <Text style={{ fontSize:mobileW*2.5/100,color: Colors.gray,margin:mobileW*1/100,right:mobileW*2/100 }}>{item.date}</Text> */}
              <TouchableOpacity activeOpacity={0.8} onPress={deSelectItems} style={{ backgroundColor: getSelected(item) ? '#00000060' : null, marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: currentUid === item.sendBy ? 'flex-end' : 'flex-start' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleOnPress(item)}
                  onLongPress={() => selectItems(item)} style={currentUid === item.sendBy ? {
                    backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1',
                    borderTopLeftRadius: mobileW*2.5/100, borderBottomRightRadius: mobileW*5/100, borderBottomLeftRadius: mobileW*2.5/100
                  }
                    : {
                      backgroundColor: currentUid === item.sendBy ? '#E5F4F5' : '#EFF2F1',
                      borderTopRightRadius: mobileW*2.5/100, borderBottomRightRadius: mobileW*2.5/100, borderBottomLeftRadius: mobileW*2.5/100
                    }}>

                  <View onPress={() => handleOnPress(item)}
                    onLongPress={() => selectItems(item)}>
                    {/* <Text style={{ fontSize:mobileW*2.5/100,color: Colors.gray,margin:mobileW*1/100,right:mobileW*2/100 }}>{item.date}</Text> */}
                    <Text style={{ padding: 10, fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.blackColor }}>
                      {item.msg} {"..   "}
                    </Text>
                  </View>

                  <View style={{ marginTop: mobileW * -2 / 100, alignSelf: "flex-end", }}>
                    <Text style={{ fontSize: mobileW * 2.5 / 100, color: Colors.gray, margin: mobileW * 1 / 100, right: mobileW * 2 / 100 }}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>

            </View>)} />
        {/* {isTyping && <View style={{ marginBottom: mobileW * 5 / 100, marginLeft: mobileW * 3 / 100 }} >
          {message.length === 0 ? null : <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100 }}>Typing...</Text>}
        </View>
        } */}

        {/* FlatList chat code ........................... */}

        <View
          style={styles.messageInputView}>
          <TextInput 
            maxLength={1000}
            placeholderTextColor={Colors.border_color}
            multiline={true}
            placeholder='Enter message'
            value={message}
            fontFamily={Font.FontRegular}
            onChangeText={(text) => {
              setmessage(text)
              if (text.length > 0 && !isTyping) {
                setTyping(true);
              } else if (text.length === 0 && isTyping) {
                setTyping(false);
              }
            }}
            style={styles.messageInput}></TextInput>
           {user_block  == ''?
          <TouchableOpacity onPress={() => sendMessage()}  activeOpacity={0.8} style={styles.sendMessageIcon}>
    <Image resizeMode='contain' style={{ tintColor: Colors.whiteColor, height: mobileW * 5 / 100, width: mobileW * 5 / 100}}
    source={require('./Icon/SendMessage.png')} />
          </TouchableOpacity>
           :
             <TouchableOpacity   activeOpacity={0.8} style={styles.sendMessageIcon}>
             <Image resizeMode='contain' style={{ tintColor: Colors.whiteColor, height: mobileW * 5 / 100, width: mobileW * 5 / 100}}
               source={require('./Icon/SendMessage.png')}/>
           </TouchableOpacity>
}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 5 / 100,
    backgroundColor: Colors.themecolor,
  },
  usernameText: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3.2 / 100,
    marginTop: mobileW * -2 / 100,
  },
  messageDayandDate: {
    overflow: 'hidden',
    color: Colors.gray,
    alignSelf: "center",
    backgroundColor: '#EFF2F1',
    fontFamily: Font.FontRegular,
    paddingEnd: 5,
    paddingStart: 5,
    marginVertical: 2.5,
    fontSize: mobileW * 3 / 100,
    paddingTop: mobileW * 1.5 / 100,
    borderRadius: mobileW * 2 / 100,
    paddingBottom: mobileW * 1.5 / 100,
  },
  messageInputView: {
    bottom: '3%',
    alignSelf: 'center',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: mobileW * 93 / 100,
    backgroundColor: '#EFF2F1',
    height: mobileW * 11 / 100,
    borderRadius: mobileW * 2 / 100,
    borderRadius: mobileW * 10 / 100,
  },
  messageInput: {
    backgroundColor: '#EFF2F1',
    color:Colors.black_color,
    fontFamily: Font.FontRegular,
    width: mobileW * 68 / 100,
    height: mobileW * 11 / 100,
    paddingLeft: mobileW * 2 / 100,
    borderRadius: mobileW * 5 / 100,
    marginHorizontal: mobileW * 2.7 / 100, 
  },
  sendMessageIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FB4C00',
    right: mobileW * 2 / 100,
    width: mobileW * 8.6 / 100,
    height: mobileW * 8.6 / 100,
    borderRadius: mobileW * 5.5 / 100,
  }
})










// ======================= second .................. message send  screen  _____________________________________


















//         {show != 'Add' &&
//           <View style={styles.searchView}>
//             <View style={styles.TextInputView}>
//               <TextInput style={styles.TextInput}
//                 onChangeText={(txt) => _searchLearner(txt)}
//                 paddingLeft={mobileW * 2 / 100}
//                 value={searchQuery}
//                 placeholder={Lang_chg.SearchEngine[config.language]}
//                 placeholderTextColor={Colors.gray} />
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
//                 <Image resizeMode='contain' style={styles.croseImage} source={require('./Icon/close2.png')}></Image>
//               </TouchableOpacity>
//             </View>
//           </View>}

//         {/* ============================================================================= Page Refresh ============================================================================== */}
//         <ScrollView refreshControl={
//           <RefreshControl
//             refreshing={refresh}
//             onRefresh={_onRefresh}
//             tintColor={Colors.themecolor}
//             colors={[Colors.themecolor]}
//           />
//         }>
//           <FlatList
//             data={userList}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   onPress={() => { navigation.navigate('Chat') }}
//                   style={{
//                     backgroundColor: '#FAFAFA',
//                     flexDirection: 'row',
//                     margin: mobileW * 2 / 100,
//                     padding: mobileW * 2 / 100
//                   }}>
//                   <View style={{ width: mobileW * 22 / 100, }}>
//                     <View style={styles.imageCard}>
//                       <Image resizeMode='contain' style={styles.mavenImage}
//                         source={item.image}></Image>
//                     </View>
//                   </View>
//                   <View style={{ width: mobileW * 48 / 100, }}>
//                     <Text style={{
//                       fontSize: mobileW * 3.5 / 100, color: Colors.blackColor, fontWeight: 'bold', marginTop: mobileW * 3 / 100
//                     }}>{item.name}</Text>
//                     <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, fontWeight: '500' }}>{item.title}</Text>
//                   </View>
//                   <View style={{ width: mobileW * 22 / 100, justifyContent: 'space-between' }}>
//                     <Text style={{ color: Colors.border_color2, fontSize: mobileW * 3 / 100, alignSelf: 'flex-end' }}>{item.date}</Text>
//                     <View style={{ width: mobileW * 13 / 100, height: mobileW * 6 / 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
//                       <Switch
//                         trackColor={{ false: '#767577', true: '#81b0ff' }}
//                         thumbColor={item.isEnabled ? Colors.themecolor : '#f4f3f4'}
//                         value={item.isEnabled}
//                         onChange={() => {
//                           setuserList(userList.map(index =>
//                             item.id === index.id
//                               ? ({ ...index, isEnabled: !index.isEnabled })
//                               : index
//                           ))
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )
//             }
//             }
//           />



//           {/* =================================================================Model================================================================ */}
//           <View  >
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//             >
//               <View style={{ flex: 1, backgroundColor: '#00000060' }}>
//                 <View style={styles.ModelCard}>
//                   <View style={styles.ModelHeader}>
//                     <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : Chat</Text>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}   >
//                       <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
//                         source={require("./Icon/close2.png")}></Image>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
//                   <ScrollView>
//                     <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>
//                       <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//                         when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
//                         and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//                       </Text>
//                     </View>
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>
//           </View>
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
//     backgroundColor: Colors.white_color,
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     paddingLeft: mobileW * 4 / 100,
//     paddingRight: mobileW * 4 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.black_color
//   },
//   SearchIcon: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.black_color
//   },
//   ModelCard: {
//     width: mobileW * 90 / 100,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileH * 25 / 100,
//     alignSelf: 'center',
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
//     paddingLeft: mobileW * 3 / 100,
//     paddingRight: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color
//   },
//   lottie: {
//     width: 50,
//     height: 50
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
//   searchView: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   TextInputView: {
//     backgroundColor: Colors.white_color,
//     width: mobileW * 92 / 100,
//     flexDirection: 'row',
//     borderRadius: mobileW * 2 / 100,
//     alignItems: 'center',
//     borderWidth: mobileW * 0.3 / 100,
//     borderColor: Colors.gray
//   },
//   TextInput: {
//     width: mobileW * 82 / 100,
//     borderRadius: mobileW * 1 / 100,
//     height: mobileW * 10 / 100,
//     fontSize: mobileW * 3.3 / 100,
//     fontFamily: Font.FontMedium,
//     color: Colors.black_color
//   },
//   croseImage: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     borderRadius: mobileW * 2 / 100,
//     tintColor: Colors.color_orange
//   },
//   mavenImage: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     borderRadius: mobileW * 3 / 100,
//     tintColor: Colors.themecolor
//   },
// }
// )

