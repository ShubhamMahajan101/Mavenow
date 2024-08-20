import React, { Component, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, ScrollView, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import Splash from './Splash';
import Login from '../Login';
//  import Login from '../App/Screeens/LoginScreen'
import SignUp from '../App/Screeens/SignUpScreen'
import Dashboard from '../App/Screeens/DashboardScreen'
// import Chat from '../App/Screeens/ChatScreen'
// import SignUp from '../SignUp';
import Chat from '../Chat';
import ForgotPassword from '../ForgotPassword';
import Expertisepage from '../Expertisepage';
import QuestionPage from '../QuestionPage'
import Onbording from '../Onbording';
import SliderDot from '../SliderDot';
import Mprofile from '../Mprofile';
import UserMaven from '../UserMaven';
import VerificationCode from '../VerificationCode';
import Msignup from '../Msignup'
import UMavenProfile from '../UMavenProfile';
import MyMavenProfile from '../MyMavenProfile';
import Notification from '../Notification';
import Search from '../Search';
import Testing from '../Testing';
import UserSliderDot from '../UserSliderDot';
import SessionRequest from '../SessionRequest';
import MyLearners from '../MyLearners';
import Language from '../Language';
import TestingBasic from '../TestingBasic';
import CustomDrawer from '../CustomDrawer';
import WriteQuestion from '../WriteQuestion';
import Schedule from '../Schedule';
import QuestionEdit from '../QuestionEdit';
import Noti from '../Noti';
import Badges from '../Badges';
import LearnerBadges from '../LearnerBadges';
import SessionRequestBasic from '../SessionRequestBasic';
import Wallet from '../Wallet';
import AutomationTesting from '../AutomationTesting';
import LearnerRequestMaven from '../LearnerRequestMaven';
import History from '../History';
import AutomationTesingScreen from '../AutomationTesingScreen';
import LearnerList from '../LearnerList';
import Request from '../Request';
import Feedback from '../Feedback';
import Feedback1 from '../Feedback1';
import QRScanner from '../QRCodeScanner';
import AnimatedLoader from '../AnimatedLoader';
import DemoPage from '../DemoPage';
import AddCourse from '../AddCourse';
// import Dashboard from '../Dashboard';
import Header from '../Header';
import LearnersDetail from '../LearnersDetail';
import Sharefile from '../Sharefile'
import UpskillingCourses from '../UpskillingCourses'
import Support from '../Support';
import Refund from '../Refund';
import MyMavens from '../MyMavens';
import UserLearner from '../UserLearner';
import LearnerRequest from '../LearningRequest';
import LearnerNotification from '../LearnerNotification';
import LearnerSearch from '../LearnerSearch';
import LearnerSuport from '../LearnerSuport';
import MyLearnerProfile from '../MyLearnerProfile'
import UPdateLearnerProfile from '../UPdateLearnerProfile';
import UpdateMavenn_Profile from '../UpdateMavenn_Profile';
import Help from '../Help'
import Logout from '../Logout';
import Scanner from '../Scanner'
import feedbackwebview from '../feedbackwebview'
import YouTubePlayer from '../YouTubePlayer'
import Chatbots from '../Chatbots';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Terms from '../Terms'
import Chatt from '../Chatt'
import ChatBoats1 from '../Chatboats1';
import CreateSyllabus from '../CreateSyllabus';
import Syllabus from '../Syllabus'
import CreateTopic from '../CreateTopic'
import FirebaseTutorial from '../FirebaseTutorial';
import CourseDetails from '../CourseDetails';
import Expertarea from '../Expertarea';
import ReletedKeyword from '../ReletedKeyword';
import Chatboatskills from '../chatboatskills';
import Viewall from '../Viewall';
import Apply from '../Apply';
import Succefullyjob from '../Succefullyjob';
import Job from '../Job';
import Jobapply from '../Jobapply';
import VideoRecorder from '../VideoRecorder';
import QrCode from '../QrCode';

// import UserMaven from '../Homepage';
// import Homepage from '../Homepage';
//  import { createDrawerNavigator } from '@react-navigation/drawer';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator({ navigation }) {

    return (


        <Drawer.Navigator drawerPosition="left"
            screenOptions={{
                drawerStyle: {
                    width: mobileW * 80 / 100,
                },
            }}
            drawerContent={() => <CustomDrawer navigation={navigation} />}>
            <Drawer.Screen name='UserMaven' component={UserMaven} options={{ headerShown: false }}>
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}



const Stacknav = (navigation) => {
    return (
            <Stack.Navigator
            initialRouteName={'Splash'}
            screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
            <Stack.Screen name="UserMaven" component={DrawerNavigator} options={{ headerShown: false, gestureEnabled: false }} />
            {/* <Stack.Screen name="UserMaven" component={DrawerNavigator} options={{ headerShown: false, gestureEnabled: false }} /> */}
            <Stack.Screen name="CustomDrawer" component={CustomDrawer} options={{ headerShown: false }}/>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AddCourse" component={AddCourse} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Apply" component={Apply} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AutomationTesingScreen" component={AutomationTesingScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AutomationTesting" component={AutomationTesting} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AnimatedLoader" component={AnimatedLoader} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Badges" component={Badges} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Chatbots" component={Chatbots} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ChatBoats1" component={ChatBoats1} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="FirebaseTutorial" component={FirebaseTutorial} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} options={{ headerShown: false, gestureEnabled: false }} />
            {/* <Stack.Screen name="Chatboatskills" component={Chatboatskills} options={{ headerShown: false, gestureEnabled: false }}/> */}
            <Stack.Screen name="Chatboatskills" component={Chatboatskills} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CreateSyllabus" component={CreateSyllabus} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CreateTopic" component={CreateTopic} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="DemoPage" component={DemoPage} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Expertisepage" component={Expertisepage} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Expertarea" component={Expertarea} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Feedback1" component={Feedback1} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Help" component={Help} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="feedbackwebview" component={feedbackwebview} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="History" component={History} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Header" component={Header} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Job" component={Job} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Jobapply" component={Jobapply} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="YouTubePlayer" component={YouTubePlayer} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ReletedKeyword" component={ReletedKeyword} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Language" component={Language} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerRequestMaven" component={LearnerRequestMaven} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerList" component={LearnerList} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnersDetail" component={LearnersDetail} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerRequest" component={LearnerRequest} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerNotification" component={LearnerNotification} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerSearch" component={LearnerSearch} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerSuport" component={LearnerSuport} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="LearnerBadges" component={LearnerBadges} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyMavens" component={MyMavens} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyLearners" component={MyLearners} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Mprofile" component={Mprofile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyMavenProfile" component={MyMavenProfile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyLearnerProfile" component={MyLearnerProfile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Msignup" component={Msignup} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Noti" component={Noti} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Onbording" component={Onbording} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="QuestionPage" component={QuestionPage} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="QuestionEdit" component={QuestionEdit} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Request" component={Request} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Refund" component={Refund} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Sharefile" component={Sharefile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="SessionRequest" component={SessionRequest} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Support" component={Support} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="SliderDot" component={SliderDot} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="SessionRequestBasic" component={SessionRequestBasic} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Syllabus" component={Syllabus} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Succefullyjob" component={Succefullyjob} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="TestingBasic" component={TestingBasic} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Testing" component={Testing} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="UMavenProfile" component={UMavenProfile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="UserLearner" component={UserLearner} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="UserSliderDot" component={UserSliderDot} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Chatt" component={Chatt} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="UPdateLearnerProfile" component={UPdateLearnerProfile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="UpdateMavenn_Profile" component={UpdateMavenn_Profile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="UpskillingCourses" component={UpskillingCourses} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="VerificationCode" component={VerificationCode} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="VideoRecorder" component={VideoRecorder} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WriteQuestion" component={WriteQuestion} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Viewall" component={Viewall} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="QrCode" component={QrCode} options={{ headerShown: false, gestureEnabled: false }} />
            {/* <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, gestureEnabled: false }} /> */}
        </Stack.Navigator>
    );
}
export default Stacknav