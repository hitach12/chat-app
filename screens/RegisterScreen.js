import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View ,Platform,Keyboard,TouchableWithoutFeedback } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {Button , Input , Image ,Text} from "react-native-elements"
import { auth } from '../firebase'


const RegisterScreen = ({navigation}) => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [imageUrl,setImageUrl]=useState('')

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackTitle:'back',
            
        })
    }, [navigation])
    const register =() => {
        auth.createUserWithEmailAndPassword(email,password).then( authUser =>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl
            })
                
            })
        .catch(error => alert(error))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
            <StatusBar style='light'/>
            
            <Text h3 style={{marginBottom:50}}>Create an account</Text>
            <View style={styles.inputContainer}>
            <Input placeholder="Full name" 
            autoFocus
            value={name}
            onChangeText={text => {setName(text)}}/>
            <Input placeholder="Email" 
            value={email}
            type="email"
            onChangeText={text => {setEmail(text)}}/>
            <Input placeholder="Password" 
            value={password}
            type="password"
            secureTextEntry
            onChangeText={text => {setPassword(text)}}/>
            <Input placeholder="ImageUrl" 
            value={imageUrl}
            onChangeText={text => {setImageUrl(text)}}
            onSubmitEditing={register}/>
            </View>
            <Button raised title='Register' onPress={register} style={styles.button}/>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white',

    },
    inputContainer:{   
        width:300,

    },
    button:{
        width:200,
        marginTop:10,
    },

})
