import React ,{useEffect,useState} from 'react';
import {AppState} from 'react-native'
import Stacknav from './src/Provider/Routenavigation';
import { NavigationContainer } from '@react-navigation/native';
import {notificationListener,requestUserPermission} from './src/App/Firebase/NotificationPermission'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import GlobalState from './src/Components/GlobalState'; 
import { UpdateOnlineStatus } from './src/App/Firebase/Users';

const  App=()=> {
  const [appState, setAppState] = useState(AppState.currentState);

  const onlinStatusOff =async () =>{
    const uuid =await AsyncStorage.getItem('UID');
    UpdateOnlineStatus(uuid,false)
       }
  const onlinStatusTrue =async () =>{
    const uuid =await AsyncStorage.getItem('UID');
    UpdateOnlineStatus(uuid,true)
       }

  useEffect(() => {
    requestUserPermission();
    console.log( requestUserPermission," requestUserPermission   ------------------------>");
    notificationListener();
    console.log(notificationListener,"  notificationListener    APP ...js >---------------------------------------- >");
    getFcmToken();
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage.notification,
    //       );
    //       setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //     }
    //     setLoading(false);
    //   });
      // -------------- here is add code today----------

      const handleAppStateChange = nextAppState => {
        setAppState(nextAppState);
        if (nextAppState === 'background') {
          onlinStatusOff()
          console.log('App is in the background');
          // Additional logic when the app is in the background
        } else {
          onlinStatusTrue()
          console.log('App is in the foreground');
        }
      };

      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        // unsubscribeNetInfo();
        AppState.removeEventListener('change', handleAppStateChange);
      };
    
  },[]);

  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

    const getFcmToken= async()=>{
    let checkTocken = await AsyncStorage.getItem('fcmTocken')
    
    if(!checkTocken) {
      try {
        var  FcmToken = await messaging().getToken()
        if (!! FcmToken) {
        console.log('------>',FcmToken);
        await AsyncStorage.setItem('fcmTocken',FcmToken)
      }
      } 
      catch (error) {
          console.log('-------->',error);
          alert(error?.message)
      }
  }
  }
  return (
    <GlobalState>
    <NavigationContainer>
        <Stacknav/>
  </NavigationContainer>
  </GlobalState>
  )
}
export default App
