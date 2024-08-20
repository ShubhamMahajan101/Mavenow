// import React, { Component } from 'react';
// import { View, Image } from 'react-native';
// import TextInputComponent from '../Components/TextInputComponent';
// import ButtonComponent from '../Components/ButtonComponent';
// import { SignUpUser } from '../Firebase/SignUp';
// import { AddUser } from '../Firebase/Users';
// import Firebase from '../Firebase/firebaseConfig';
// import Spinner from 'react-native-loading-spinner-overlay';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { messaging } from 'firebase';

// class SignUp extends Component {
//     state = {
//         name: "",
//         email: "",
//         password: "",
//         fcmToken:"",     
//         loader: false
//     }
//       componentDidMount(){
//        this.checkToken()
//            this.getFcmToken()
//             console.log('getFcmToken===========>>>>',this.getFcmToken())
// }

//              getFcmToken = async () => {
              
       
//             let fcmToken = await AsyncStorage.getItem('fcmToken')
//             console.log(fcmToken, "the old token sign up screen here  ************")
//             this.setState({fcmToken:fcmToken})
//             if (fcmToken) {
//              try {
//                     const fcmToken = await messaging().getToken();
//                     if (fcmToken) {
//                         console.log("the new generate token",fcmToken );
//                         await AsyncStorage.setItem('fcmToken', fcmToken)
//                         this.setState({fcmToken:fcmToken})
//             }
//                } catch (error) {
//                     console.log("error resaid in fcmToken......",error)
//                     //  ShowError(error.message)
//                 }
//                }
//                }
//             checkToken = async () => {
//             const fcmToken = await messaging().getToken();
//             if (fcmToken) {
         
//             } 
//             else
    
//                console(' check token',this.state.fcmToken)

    
//            }
//             // ==============================   token get  code =====================




// //  ========================================= here is create a json    =================

//         //    JsonData =()=>{
//         //     console.log('i am here json data')
//         //        console.log({
//         //             "data":{
//         //                 "message": this.state.name ,
//         //                 "messageType":"telegram",
//         //                 "title":this.state.name 
//         //             },
//         //             "notification":{
//         //                 "body": this.state.email,
//         //                 "image":'',
//         //                  "tag":"hey",
//         //                 "title":this.state.password
//         //             },

//         //             "to":this.state.fcmToken
//         //             })
            
//         // }
    








        
// //  =========================================    here is create a json                     =================

//     SignUPtoFIrebase = async () => {
//         // this.JsonData();
//         // console.log('=========button  JsonData******* presss .......>>>>>')
      
//         if(!this.state.name)
//         {
//             return alert('Please Enter Name');
//         }
//         if(!this.state.email)
//         {
//             return alert('Please Enter Email');
//         }
//         if(!this.state.password)
//         {
//             return alert('Please Enter Password');
//         }
//         this.setState({ loader: true })
//         SignUpUser(this.state.email, this.state.password,this.state.fcmToken).
//             then(async (res) => {
//               console.log('res  =====*********', res);
//                 var userUID = Firebase.auth().currentUser.uid;
//                 // var userfcmToken = Firebase.auth().currentUser.Token;
//                 AddUser(this.state.name, this.state.email, userUID,this.state.fcmToken).
//                     then(async () => {
//                         this.setState({ loader: false });
//                         await AsyncStorage.setItem('UID', userUID);
                   
//                         this.props.navigation.navigate('Dashboard');
//                     }).
//                     catch((error) => {
//                         this.setState({ loader: false });
//                         alert(error);
//                     })
//                 console.log(userUID);
//             }).
//             catch((err) => {
//                 this.setState({ loader: false });
//                 alert(err);
//             })
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
//                 {/* <Image source={require('../Assets/codehunger.png')} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} /> */}
//                 <TextInputComponent placeholder="Enter Name" updateFields={(text) => this.setState({ name: text })} />
//                 <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })} />
//                 <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })} />
//                 <ButtonComponent title="Sign Up" onPress={() => { this.SignUPtoFIrebase() }} />
//                 <Spinner
//                     visible={this.state.loader}
//                 />
//             </View>
//         )
//     }
// }




// export default SignUp;



import React, { Component } from 'react';
import { View, Image } from 'react-native';
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { SignUpUser } from '../Firebase/SignUp';
import { AddUser } from '../Firebase/Users';
import Firebase from '../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { messaging } from 'firebase';

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        fcmToken:"", 
        online:"",  
        BLockstatus:""  ,
        loader: false
    }
      componentDidMount(){
       this.checkToken()
           this.getFcmToken()
            console.log('getFcmToken===========>>>>',this.getFcmToken())
}

             getFcmToken = async () => {
            let fcmToken = await AsyncStorage.getItem('fcmToken')
            console.log(fcmToken, "the old token sign up screen here  ************")
            this.setState({fcmToken:fcmToken})
            if (fcmToken) {
             try {
                    const fcmToken = await messaging().getToken();
                    if (fcmToken) {
                        console.log("the new generate token",fcmToken );
                        await AsyncStorage.setItem('fcmToken', fcmToken)
                        this.setState({fcmToken:fcmToken})
            }
               } catch (error) {
                    console.log("error resaid in fcmToken......",error)
                    //  ShowError(error.message)
                }
               }
               }
            checkToken = async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                      } 
            else
             console(' check token',this.state.fcmToken)
            }

            // ==============================   token get  code =====================




//  ========================================= here is create a json    =================

        //    JsonData =()=>{
        //     console.log('i am here json data')
        //        console.log({
        //             "data":{
        //                 "message": this.state.name ,
        //                 "messageType":"telegram",
        //                 "title":this.state.name 
        //             },
        //             "notification":{
        //                 "body": this.state.email,
        //                 "image":'',
        //                  "tag":"hey",
        //                 "title":this.state.password
        //             },

        //             "to":this.state.fcmToken
        //             })
            
        // }
    








        
//  =========================================    here is create a json                     =================

    SignUPtoFIrebase = async () => {
        // this.JsonData();
        // console.log('=========button  JsonData******* presss .......>>>>>')
      
        if(!this.state.name)
        {
            return alert('Please Enter Name');
        }
        if(!this.state.email)
        {
            return alert('Please Enter Email');
        }
        if(!this.state.password)
        {
            return alert('Please Enter Password');
        }
        this.setState({ loader: true })
        SignUpUser(this.state.email, this.state.password,this.state.fcmToken)
            .then(async (res) => {
              console.log('res  =====*********', res);
                var userUID = Firebase.auth().currentUser.uid;
                // var userfcmToken = Firebase.auth().currentUser.Token;
                // AddUser(this.state.name, this.state.email, '', userUID,this.state.fcmToken).
                AddUser(this.state.name, this.state.email, userUID,this.state.fcmToken,this.state.online,this.status.BLockstatus).
                    then(async () => {
                        this.setState({ loader: false });
                        // await AsyncStorage.setItem('UID', userUID);
                        this.props.navigation.navigate('Dashboard');
                    }).
                    catch((error) => {
                        this.setState({ loader: false });
                        alert(error);
                    })
                console.log(userUID);
               }).
            catch((err) => {
                this.setState({ loader: false });
                alert(err);
            })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source={require('../Assets/codehunger.png')} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} /> */}
                <TextInputComponent placeholder="Enter Name" updateFields={(text) => this.setState({ name: text })} />
                <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })} />
                <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })} />
                <ButtonComponent title="Sign Up" onPress={() => { this.SignUPtoFIrebase() }}/>
                
            </View>
        )
    }
}




export default SignUp;















