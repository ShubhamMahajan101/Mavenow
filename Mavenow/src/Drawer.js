import { Button, View ,Image,Dimensions,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import Notification from './Notification';
import Wallet from './Wallet';
import Help from './Help';
import Sharefile from './Sharefile';
import Language from './Language';
import History from './History';
import SessionRequest from './SessionRequest';
import Chat from './Chat';
import Request from './Request';
import UserMaven from './UserMaven';
import { Colors } from './Provider/Colorsfont';
import Logout from './Logout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import feedbackwebview from './feedbackwebview';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


const Drawer = createDrawerNavigator();

 const DrawerScreen =({navigation}) =>{

  return (


                  <NavigationContainer independent={true}>
                 
            
                  <Drawer.Navigator  drawerContent ={ props => <CustomDrawer {...props}/>}  initialRouteName="UserMaven" screenOptions={{headerShown:false}}>
                  <Drawer.Screen  name="Msignup"  component={Chat} options = {{drawerIcon :({color})=> (<Image resizeMode='contain' style={{width:mobileW*6/100, height:mobileW*6/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/home.png')}></Image>)}}/>

<Drawer.Screen name="Request" component={Request}options= {{drawerIcon :({color})=> (
<Image resizeMode='contain' style={{width:mobileW*6/100, height:mobileW*6/100, alignSelf:'center'}}
  source={require('./Icon/icon_session_request_border.png')}></Image>
  )}} />

<Drawer.Screen name="Chat" component={Chat}options= {{drawerIcon :({color})=> (<Image resizeMode="cover" style={{width:mobileW*7/100, height:mobileW*7/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/chat-bubble.png')}></Image>)}} />

  
                  <Drawer.Screen name="Notification" component={Notification} options= {{drawerIcon :({color})=> (<Image resizeMode='contain' style={{width:mobileW*8/100, height:mobileW*8/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/icon_notification.png')}></Image>)}} />


                  <Drawer.Screen name="Wallet" component={Wallet} options= {{drawerIcon :({color})=> (<Image resizeMode='contain' style={{width:mobileW*7/100, height:mobileW*7/100, alignSelf:'center', tintColor:Colors.light_grey}}
  source={require('./Icon/wallet.png')}></Image>)}}/>


                  <Drawer.Screen name="Help" component={Help} options= {{drawerIcon :({color})=> (<Image resizeMode='contain' style={{width:mobileW*7/100, height:mobileW*7/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/icon_faq.png')}></Image>)}}/>

     <Drawer.Screen name="History" component={History} options= {{drawerIcon :({color})=> (
     
      <Image resizeMode='contain' style={{width:mobileW*6/100, height:mobileW*6/100, alignSelf:'center',tintColor:Colors.gray}}
      source={require('./Icon/icons8-time-machine-50.png')}></Image> 
    //  {/* </View> */}
      )}}/>

<Drawer.Screen name="Feedback" component={feedbackwebview} options= {{drawerIcon :({color})=> (<Image resizeMode="stretch" style={{width:mobileW*6/100, height:mobileW*6/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/share.png')}></Image>)}} />



<Drawer.Screen name="Sharefile" component={Sharefile} options= {{drawerIcon :({color})=> (<Image resizeMode="stretch" style={{width:mobileW*6/100, height:mobileW*6/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/share.png')}></Image>)}} />


                  <Drawer.Screen name="Language" component={Language} options= {{drawerIcon :({color})=> (<Image resizeMode="stretch" style={{width:mobileW*6/100, height:mobileW*6/100, alignSelf:'center',tintColor:Colors.light_grey}}
  source={require('./Icon/settings.png')}></Image>)}} />




               



   

      


                  </Drawer.Navigator>
   </NavigationContainer>

      
  );
}
export default DrawerScreen; 