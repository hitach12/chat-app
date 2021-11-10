import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign , FontAwesome , Ionicons} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { db ,auth } from '../firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage'; 

const ChatScreen = ({navigation ,route}) => {

    
    const [input , setInput] = useState('')
    const [messages , setMessages] =useState([])



    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Chat',
            headerTitleAlign:'left',
            headerTitle:() => (
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                    <Avatar rounded source={{
                        uri:messages[0]?.data.photoURl 
                        }} />
                    <Text style={{color:'white', fontWeight:'700' , marginLeft:10}}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View 
                style= {{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:65,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation,messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timesTamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURl : auth.currentUser.photoURL
        })

        setInput('')
    }

    useLayoutEffect(()=> {
        const unscubscribe = db.collection("chats").doc(route.params.id).collection('messages').orderBy('timesTamp',"asc").onSnapshot(snapshopt => {
            setMessages(snapshopt.docs.map((doc) => ({
                id : doc.id,
                data:doc.data(),
            })))
        })
        return unscubscribe
    },[route])
    return (
        <SafeAreaView style={{flex:1 , backgroundColor:"white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            behavior={Platform.OS=="ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={140}
            >
            <>
            <ScrollView contentContainerStyle={{paddingTop:15}}>
                {messages.map(({id , data}) => (
                    data.email == auth.currentUser.email? 
                    (<View key={id} style={styles.receiver}>
                        <Avatar 
                        source={{uri: data.photoURl}} 
                        rounded size={30} 
                        position='absolute' 
                        right ={-5} 
                        bottom={-15}
                        containerStyle={{
                            position:"absolute",
                            bottom:-15,
                            right:-5
                        }}/>
                        <Text style={styles.receiverText}>{data.message}</Text>
                        
                    </View>)
                    :
                    (<View  key={id} style={styles.sender}>
                        <Avatar
                        source={{uri: data.photoURl}} 
                        rounded size={30} 
                        position='absolute' 
                        right ={-5} 
                        bottom={-15}
                        containerStyle={{
                            position:"absolute",
                            bottom:-15,
                            right:-5
                        }}/>
                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                        )
                ))}
            </ScrollView>
                <View style={styles.footer}>
                <TextInput 
                placeholder="Message" 
                style={styles.textInput} 
                value={input} 
                onChangeText={(text)=> setInput(text)}/>
                <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}>
                    <Ionicons name="send" size={24} color="#2B68E6"/>
                </TouchableOpacity>
                </View>
            
            </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container :{
        flex: 1,

    },
    footer :{
        alignItems:'center',
        flexDirection:'row',
        width:"100%",
        padding:15
    },
    textInput : {
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:'#ECECEC',
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30
    },
    receiver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:'flex-end',
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:'relative',
        borderRadius:20
    
    },
    sender:{
        padding:15,
        backgroundColor:'#2B6BE6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:'relative'

    },


    senderName :{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15
    },
    receiverText:{
        color:'black',
        fontWeight:'500',
        marginLeft:10
    },

   



})
