import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View ,Platform , Keyboard , TouchableWithoutFeedback} from 'react-native'
import {Button , Input , Image} from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'


const LoginScreen = ({ navigation }) => {

    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    useEffect(()=> {
        const unscubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if(authUser){
                navigation.replace('Home')
            }
        })
                return unscubscribe;
    },[])

    const signIn =(
        
    ) => {
        auth.signInWithEmailAndPassword(email,password)
    }
    return (
        // TODO : fix avoiding viw keyboard

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
            <StatusBar style='light'/>
            <Image source={{
                
                uri:"https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png"
            }}
            style={{width:200 , height: 200}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' 
                autoFocus type="email" 
                value={email} 
                onChangeText={text => {setEmail(text)}}
                />
                <Input 
                placeholder='Password' 
                type="password" 
                secureTextEntry  
                value={password} 
                onChangeText={text => {setPassword(text)}}
                />
            </View>
                <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
                <Button containerStyle={styles.button} title="register" onPress={()=> navigation.navigate('Register')} type='outline'/>
                
            
            
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,

    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    
    
    },

})
