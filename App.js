import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';



const Stack = createNativeStackNavigator();
export default function App() {

  const globalScreenOptions = {
    headerStyle : {backgroundColor:'#2C68ED'},
    headetTitleStyle : {color :'white'},
    headerTintColor:'white'
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName='Login'>
      <Stack.Screen options={{title:'Login'}} name='Login' component={LoginScreen} />
      <Stack.Screen options={{title:'Register'}} name='Register' component={RegisterScreen} />
      <Stack.Screen options={{title:'Home'}} name='Home' component={HomeScreen} />
      <Stack.Screen options={{title:'AddChat'}} name='AddChat' component={AddChatScreen} />
      <Stack.Screen options={{title:'Chat'}} name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
