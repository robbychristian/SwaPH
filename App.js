// In App.js in a new project
import {Provider as PaperProvider} from 'react-native-paper';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

//USER PROVIDER
import {UserProvider, UserContext} from './provider/UserProvider';

//REGISTER PROVIDER
import {RegisterContext, RegisterProvider} from './provider/RegisterProvider';

import Welcome from './components/Welcome';

//ACCOUNTS MODULE
import Login from './components/Accounts/Login';
import Register from './components/Accounts/Register';
import Register2 from './components/Accounts/Register2';
import Register3 from './components/Accounts/Register3';
import Register4 from './components/Accounts/Register4';
import Register5 from './components/Accounts/Register5';
import Profile from './components/BottomNav/Profile';

//HOME SCREEN
import Home from './components/Home';

//SHOP SCREENS
import IndividualTrade from './components/BottomNav/Shop/IndividualTrade';
import IndividualAuction from './components/BottomNav/Shop/IndividualAuction';
import CreateAuction from './components/BottomNav/Shop/CreateAuction';
import CreateTrade from './components/BottomNav/Shop/CreateTrade';

//LIVESTREAM
import LiveStream from './components/Livestream/LiveStream';
import LiveStreamRoom from './components/Livestream/LiveStreamRoom';
import CreateLiveStream from './components/Livestream/CreateLiveStream';

//BOTTOM NAVIGATION
import MyAccount from './components/BottomNav/Profile/MyAccount';
import Report from './components/BottomNav/Profile/Report';
import ChatRoom from './components/BottomNav/Chat/ChatRoom';
import Chat from './components/BottomNav/Chat/Chat';
import CustomerService from './components/BottomNav/Profile/CustomerService';
import Payment from './components/BottomNav/Profile/Payment';

import {LogBox} from 'react-native';

const WelcomeScreen = () => {
  return <Welcome />;
};

const LoginScreen = () => {
  return <Login />;
};

//ACCOUNTS MODULE SCREEN

const RegisterScreen = () => {
  return <Register />;
};

const SecondRegisterScreen = () => {
  return <Register2 />;
};

const ThirdRegisterScreen = () => {
  return <Register3 />;
};

const FourthRegisterScreen = () => {
  return <Register4 />;
};

const FifthRegisterScreen = () => {
  return <Register5 />;
};

//HOME STACK TABS
const HomeScreen = () => {
  return <Home />;
};

const ProfileScreen = () => {
  return <Profile />;
};

const LiveStreamScreen = () => {
  return <LiveStream />;
};

const LiveStreamRoomScreen = () => {
  return <LiveStreamRoom />;
};

const CreateLiveStreamScreen = () => {
  return <CreateLiveStream />;
};

const ChatRoomScreen = () => {
  return <ChatRoom />;
};

const ChatScreen = () => {
  return <Chat />;
};

//PROFILE STACK
const MyAccountScreen = () => {
  return <MyAccount />;
};

const ReportScreen = () => {
  return <Report />;
};

const CustomerServiceScreen = () => {
  return <CustomerService />;
};

const PaymentScreen = () => {
  return <Payment />;
};

//TRADE STACK
const IndividualTradeScreen = () => {
  return <IndividualTrade />;
};

const IndividualAuctionScreen = () => {
  return <IndividualAuction />;
};

const CreateAuctionScreen = () => {
  return <CreateAuction />;
};

const CreateTradeScreen = () => {
  return <CreateTrade />;
};

const WelcomeStack = createNativeStackNavigator();
const RegisterStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{headerShown: false}}></ProfileStack.Navigator>
  );
};

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="HomeStack" component={Home} options />
      <LoginStack.Screen name="MyAccount" component={MyAccountScreen} />
      <LoginStack.Screen name="Report" component={ReportScreen} />
      <LoginStack.Screen
        name="CustomerService"
        component={CustomerServiceScreen}
      />
      <LoginStack.Screen name="Payment" component={PaymentScreen} />
      <LoginStack.Screen name="LiveStream" component={LiveStreamScreen} />
      <LoginStack.Screen name="LiveStreamRoom" component={LiveStreamRoom} />
      <LoginStack.Screen
        name="CreateLiveStream"
        component={CreateLiveStreamScreen}
      />
      <LoginStack.Screen
        name="IndividualTrade"
        component={IndividualTradeScreen}
      />
      <LoginStack.Screen
        name="IndividualAuction"
        component={IndividualAuctionScreen}
      />
      <LoginStack.Screen name="CreateAuction" component={CreateAuctionScreen} />
      <LoginStack.Screen name="CreateTrade" component={CreateTradeScreen} />
      <LoginStack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <LoginStack.Screen name="Chat" component={ChatScreen} />
    </LoginStack.Navigator>
  );
};

const RegisterStackScreen = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <RegisterStack.Navigator screenOptions={{headerShown: false}}>
      <RegisterStack.Screen name="FirstRegister" component={RegisterScreen} />
      <RegisterStack.Screen
        name="SecondRegister"
        component={SecondRegisterScreen}
      />
      <RegisterStack.Screen
        name="ThirdRegister"
        component={ThirdRegisterScreen}
      />
      <RegisterStack.Screen
        name="FourthRegister"
        component={FourthRegisterScreen}
      />
      <RegisterStack.Screen
        name="FifthRegister"
        component={FifthRegisterScreen}
      />
    </RegisterStack.Navigator>
  );
};

const WelcomeStackScreen = () => {
  return (
    <RegisterProvider>
      <WelcomeStack.Navigator screenOptions={{headerShown: false}}>
        <WelcomeStack.Screen name="Home" component={WelcomeScreen} />
        <WelcomeStack.Screen name="LoginStack" component={LoginStackScreen} />
        <WelcomeStack.Screen name="Register" component={RegisterStackScreen} />
      </WelcomeStack.Navigator>
    </RegisterProvider>
  );
};

function App() {
  return (
    <UserProvider>
      <PaperProvider>
        <NavigationContainer>
          <WelcomeStackScreen />
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
  AppRegistry.registerComponent(appName, () => Main);
}

export default App;
