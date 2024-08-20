import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignUp from './Screeens/SignUpScreen';
import Login from './Screeens/LoginScreen';
import Dashboard from './Screeens/DashboardScreen';
import Chat from './Screeens/ChatScreen';

const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUp,
}, {
    headerMode: 'none', initialRouteName: 'Login'
});

const DashboardStack = createStackNavigator({
    Dashboard: Dashboard,
    Chat:Chat
}, {
    initialRouteName: 'Dashboard', headerMode: 'none'
});

const App = createSwitchNavigator({
    Auth: AuthStack,
    Dashboard: DashboardStack
},
    { initialRouteName: 'Auth' }
);


export default createAppContainer(App);