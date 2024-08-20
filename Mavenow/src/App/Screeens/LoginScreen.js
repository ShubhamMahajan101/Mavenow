// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, Imag, AppState,ScrollView } from 'react-native';
// import TextInputComponent from '../Components/TextInputComponent';
// import ButtonComponent from '../Components/ButtonComponent';
// import { LoginUser } from '../Firebase/LoginUser';
// import Firebase from '../Firebase/firebaseConfig';
// import Spinner from 'react-native-loading-spinner-overlay';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { messaging } from 'firebase';

// class Login extends Component {
//         state = {
//         email: "",
//         password: "",
//         loader: false  
//     }   
   
//     async componentDidMount() {
        
//    this.setState({ loader: true })
//         const uid = await AsyncStorage.getItem('UID');
//         const token = await AsyncStorage.getItem('Token');
//         if (uid) {
//             this.props.navigation.navigate('MainScreen');
//             this.setState({ loader: false })
//                  }
//             this.setState({ loader: false })
//     }
//     getFcmToken = async () => {
        
           
//                 try {
//                     const fcmToken = await messaging().getToken();
//                     if (fcmToken)
//                     {
//                         console.log("the new generate token",fcmToken );
//                         await AsyncStorage.setItem('fcmToken', fcmToken);
//         }
//         } catch (error) {
//             console.log("error resaid in fcmToken......",error )}
// }

    
    
//     checkToken = async () => {
//             const fcmToken = await messaging().getToken();
//             if (fcmToken) {
            
//             } 
//             else
//             console('check token console',)
//             }


// //               ==========  > fire base ti login
//     LogintoFirebase = async () => {
//                      this.getFcmToken()   
//         if(!this.state.email)
//         {
//             return alert('Please Enter Email');
//         }
//                   if(!this.state.password)
//         {
//             return alert('Please Enter Password');
//         }
//         this.setState({ loader: true })
//         LoginUser(this.state.email, this.state.password).
//             then(async (res) => {
//                 // const uid = Firebase.auth().currentUser.uid;
//                 const fcmToken = Firebase.auth().currentUser.fcmToken;
//                 // await AsyncStorage.setItem('UID', uid);
                   
//                  await AsyncStorage.setItem('Token', fcmToken);

                                     
//                 // this.setState({ loader: false })
//                 // this.props.navigation.navigate('UserMaven');
//             }).
//             catch((err) => {
//                 this.setState({ loader: false })
//                 alert(err);
//             })
//     } 
//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
//                 {/* <Image source={require('../Assets/codehunger.png')} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} /> */}
//                 <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })} />
//                 <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })} />
//                 <ButtonComponent title="Login" onPress={() => { this.LogintoFirebase() }} />
//                 <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
//                     <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>New User? Click Here</Text>
//                 </TouchableOpacity>

      





// {/* 

//                 <Spinner
//                     visible={this.state.loader}
//                 /> */}
//             </View>
//         )
//     }
// }




// export default Login;







import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Imag, AppState,ScrollView } from 'react-native';
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { messaging } from 'firebase';

class Login extends Component {
        state = {
        email: "",
        password: "",
        loader: false  
    }   
   
    async componentDidMount() {
        
   this.setState({ loader: true })
        const uid = await AsyncStorage.getItem('UID');
        const token = await AsyncStorage.getItem('Token');
        if (uid) {
            this.props.navigation.navigate('Dashboard');
            this.setState({ loader: false })
                 }
            this.setState({ loader: false })
    }
    getFcmToken = async () => {
        
           
                try {
                    const fcmToken = await messaging().getToken();
                    if (fcmToken)
                    {
                        console.log("the new generate token",fcmToken );
                        await AsyncStorage.setItem('fcmToken', fcmToken);
        }
        } catch (error) {
            console.log("error resaid in fcmToken......",error )}
}

    
    
    checkToken = async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
            
            } 
            else
            console('check token console',)
            }



    LogintoFirebase = async () => {
                    //  this.getFcmToken()   
        if(!this.state.email)
        {
            return alert('Please Enter Email');
        }
                  if(!this.state.password)
        {
            return alert('Please Enter Password');
        }
        this.setState({ loader: true })
        LoginUser(this.state.email, this.state.password).
            then(async (res) => {
                console.log('----->',res);
                const uid = Firebase.auth().currentUser.uid;
                // const fcmToken = Firebase.auth().currentUser.fcmToken;

                console.log('==================',uid);
                await AsyncStorage.setItem('UID', uid);
                   
                //  await AsyncStorage.setItem('Token', fcmToken);

                                     
                this.setState({ loader: false })
                this.props.navigation.navigate('Dashboard');
            }).
            catch((err) => {
                this.setState({ loader: false })
                alert(err);
            })
    } 
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source={require('../Assets/codehunger.png')} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 30 }} /> */}
                <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })} />
                <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })} />
                <ButtonComponent title="Login" onPress={() => { this.LogintoFirebase() }} />
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>New User? Click Here</Text>
                </TouchableOpacity>

      







                <Spinner
                    visible={this.state.loader}
                />
            </View>
        )
    }
}




export default Login;



