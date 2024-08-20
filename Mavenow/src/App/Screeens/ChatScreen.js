import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Dimensions,ScrollView ,AppState,StyleSheet } from 'react-native';
import AppHeader from '../Components/AppHeader';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { SendMessage, RecieveMessage } from '../Firebase/Message';
import firebase from '../Firebase/firebaseConfig';
import ImgToBase64 from 'react-native-image-base64';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import axios from 'axios'; 
import { NativeModules } from 'react-native';


import { topNotificationChanged, logOut } from '../actions';
class Chat extends Component {
    state = {
        message: '',
        allMessages: [],
        image: '',
        fcmToken1:this.props.route.params.token,
        guestUid:this.props.route.params.guestUid,
        UserName:this.props.route.params.UserName,
    }

    async componentDidMount() {
    const currentUid = await AsyncStorage.getItem('UID');
         this.setState({ currentUid: currentUid });
        try {  
                ref('messages').
                child(currentUid).
                child(this.state.guestUid).
                on("value", (dataSnapshot) => {
                console.log('dataSnapshot',dataSnapshot.val());
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
                        });
                    })
                    this.setState({ allMessages: message.reverse() });
                    console.log('allMessages is here =============+++++++++++++++++++++++++++++', this.state.allMessages)
                    
                })
        } catch (error) {
            alert(error);
        }
    }
 
                        

  //  =========================================== ============================== API Calling ==================================================================

   selectedItems = item => {
    if(this.selectedMsg.includes(item)){
        const newListItems=selectedMsg.filter(
            ListItem=>ListItem!==item,
        );
         this.setSelectedMsg(newListItems)
    }
    this.selectedItems(selectedMsg)
  }

  ApiCalling=async()=>{
    // var token22=this.props.navigation.getParam('token')


    // console.log('token22',token22);
    // return false
    var data = JSON.stringify({
        data: {
          "message": this.state.message,
          "messageType": this.state.fcmToken1,
          "title": "Gmail",
          
        },
        notification: {
          "body": this.state.message,
          "image": '',
          "tag": "hey",
          "title": "123456"
        },
        to:this.state.fcmToken1
      });
      
      var config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: { 
          'Authorization': 'key=AAAA9A4Ejc8:APA91bFMn8fSYcmRqE1nwNA2H-vZq4wbg4Uzp67P7wx900PyZfe6yMnmzyAoI5u9E5kJusueFLuCp5h_MUJgONxnOcrbJXEpFJlSh7Z-Qhd0OXlboeConQkKMeuK-AieqcC1RseX9Ixr', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      console.log(">>>>>>>>>>>>",data)
      axios(config)
      .then(function (response) {
      console.log("Api Data======",response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

        }  


//========================================================================SendMessage================================================================//
 sendMessage = async() => {

       const currentUid = await AsyncStorage.getItem('UID');
        console.log( currentUid,'======================================>>>>crrentUid  ..,.,.,');
        console.log(this.state.guestUid,'======================================>>>>guestUid,..,.,.');
        console.log(this.state.fcmToken1,'======================================>>>>fcmToken1.,.,.,.,.');
        console.log(this.state.UserName,'======================================>>>>UserName.,.,.,.,.,,.,.,,.,.,.,');
 
    //    this.ApiCalling();
    //   console.log(' here is api calling data chatting screen  =============>',this.ApiCalling())
        //   let fcmToken1 = await AsyncStorage.getItem('fcmToken')
        //    console.log(fcmToken1 , "This is FCMToken*- Chatting screen")
    
        if (this.state.message) {
            // console.log('i am here on message screen !!!!!!!!!!!!!!!!!!!!!!!!!!');
            SendMessage(currentUid, this.state.guestUid, this.state.message,'',"this.state.fcmToken1").
            console.log('i am here on message screen !!!!!!!!!!!!!!!!!!!!!!!!!!');
                then((res) => {
                    console.log(' iam error',res);
                    this.setState({ message: '------------------->>  message is here!!!!!!!!!!!!!!!!'})
                }).catch((err) => {
                    alert(err)
                })

            RecieveMessage(currentUid, this.state.guestUid, this.state.message,'',"this.state.fcmToken1")
                .then((res) => {
                    console.log(res,"..................................... message coming soon ------------->");
                    this.setState({ message:''})
                }).catch((err) => {
                    alert(err)
                })
        }
        // this.renderTicks()
    }

    // ============================================================================== Delete and Copy Messages ==============================================================================================

  
    render() 
    {
        return (
            <View style={{ flex: 1, backgroundColor: 'green' }}>
              

                <View>
                <AppHeader title={('UserName')} navigation={this.props.navigation} onPress={() => this.logOut()} />
                {/* <AppHeader title={this.props.navigation.getParam('UserName')} navigation={this.props.navigation} onPress={() => this.logOut()} /> */}
                </View>

                
                
                   <FlatList 
                    inverted
                    style={{ marginBottom: 60,padding:8 }}
                    data={this.state.allMessages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity   onLongPress={() =>this.selectedItems(item)} >
                        <View style={{ marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start',  }}>
                           
                               <View  style={{ borderRadius: 20, backgroundColor: this.state.currentUid === item.sendBy ? '#075E54' : '#343434' }}>
                                {item.image === "" ? <Text  selectable  style={{ padding: 10, fontSize: 16, fontWeight: 'bold', color:'#fff', }}>
                                    {item.msg} {"   "} <Text style={{ fontSize: 12, color:'#fff' }}>{item.time}</Text>
                                </Text> :
                                       <View style={{backgroundColor:"#fff"}}>
                                        <Image  source={{ uri: item.image }} style={{ width: Dimensions.get('window').width / 2 + 20, height: 140, resizeMode: 'stretch', borderRadius: 20,borderWidth:2,borderColor:"white",alignItems:"center",alignSelf:"center",marginRight:65 }} />
                                        <Text  style={{ fontSize: 12,position:'absolute',bottom:5,right:35 }}>{item.time}</Text>
                                        </View>
                                }
                        </View>
                        </View>
                        </TouchableOpacity>
                           )} />
                   <View style={{ bottom: 0, height: 50, width: '100%', position: 'absolute', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 10 }} 
                    // onPress={() => this.openGallery()}
                    >
                    <Image resizeMode='contain'  style={{width:25, height:25,}}source={require('./assests/gg.png')}></Image> 
                    </TouchableOpacity>

                    <View style={{ width: '75%', justifyContent: 'center' }}>
                    <TextInput value={this.state.message} onChangeText={(text) => this.setState({ message: text })} placeholder="Enter Message" placeholderTextColor="#000" style={{ height: 40, borderRadius: 20, backgroundColor: '#ccc' }} />
                    </View>

                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={() => this.sendMessage()}>
                    <Image resizeMode='contain'  style={{width:100,height:55}} source={require('./assests/savee.jpg')}/> 
                    </TouchableOpacity>
                    </View>
                    </View>
                   )
                       }
                  }




export default Chat;  









