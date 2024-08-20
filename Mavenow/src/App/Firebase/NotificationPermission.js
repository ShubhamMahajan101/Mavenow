// import messaging from '@react-native-firebase/messaging'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';


// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken= async()=>{
//   let checkTocken = await AsyncStorage.getItem('fcmTocken')
//   // console.log(" notification Permission screen the old tocken",checkTocken);
//   if(!checkTocken) {
//     try {
//       var  FcmToken = await messaging().getToken()
//       await AsyncStorage.setItem('fcmTocken',FcmToken)
//       if (! FcmToken) {
//       console.log('------>',FcmToken);
//       await AsyncStorage.setItem('fcmTocken',FcmToken)
//     }
//     } catch (error) {
//         console.log('-------->',error);
//         alert(error?.message)
//     }
// }
// }

// export const notificationListener = async() => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//     console.log("background state",remoteMessage.notification)
//   });

//   //Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//         console.log("remote message",remoteMessage.notification)
//       }
//     });
//   messaging().onMessage(async remoteMessage => {
//     console.log('[FCMService] A new FCM message arrived', remoteMessage);
//     if (remoteMessage) {
//       PushNotificationIOS.addNotificationRequest({
//         id:'notificationWithSound',
//         title:remoteMessage.notification.title,
//         body:remoteMessage.notification.body,
//         // badge: 1,
//         // userInfo:data
//     });
//     }
//   });

// }









// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import React ,{useEffect,useState} from 'react';
// import messaging from '@react-native-firebase/messaging'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// //  import messaging from '@react-native-firebase/messaging';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import notifee from '@notifee/react-native'

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken= async()=>{
//   let checkTocken = await AsyncStorage.getItem('fcmTocken')
//   console.log("the old tocken",checkTocken);
//   if(!checkTocken) {
//     try {
//       var  FcmToken = await messaging().getToken()
//       await AsyncStorage.setItem('fcmTocken',FcmToken)
//       if (! FcmToken) {
//       console.log('------>',FcmToken);
//       await AsyncStorage.setItem('fcmTocken',FcmToken)
//     }
//     } catch (error) {
//         console.log('-------->',error);
//         alert(error?.message)
//     }
// }
// }

// export const notificationListener = async() => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//     console.log("background state",remoteMessage.notification)
//   });

//   //Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//         console.log("remote message",remoteMessage.notification)
//       }
//     });
//   messaging().onMessage(async remoteMessage => {
//      console.log('[FCMService] A new FCM message arrived', remoteMessage);
//     if (remoteMessage) {
//       PushNotificationIOS.addNotificationRequest({
//         // id:'notificationWithSound',
//         id:'538397310158',
//         title:remoteMessage.notification.title,
//         body:remoteMessage.notification.body,
//         // badge: 1,
//         // userInfo:data
//     });
//     }
//   });

// }


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native'

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}
const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(fcmToken, "the old token")
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken, "the new generate token");
                await AsyncStorage.setItem('fcmToken', fcmToken)

            }

        } catch (error) {
            console.log(error, "error resaid in fcmToken")
            //  ShowError(error.message)
        }
    }

}
export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:', remoteMessage.notification);
    });
    messaging().onMessage(async remoteMessage => {
        console.log("received in foreground", remoteMessage)
        onDisplayNotification( remoteMessage.notification.body);
    });
    messaging().onMessage(async remoteMessage => {
        console.log("received in foreground", remoteMessage)
        onDisplayNotification( remoteMessage.notification.title);
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );

            }

        });
}

async function onDisplayNotification(body,title) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            // smallIcon: require('./assets/amazon.png'), // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
            },
        },
    });
}



