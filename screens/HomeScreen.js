import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import CusomListItem from './components/CusomListItem'
import {AntDesign , SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({navigation}) => {

    const [chats , setChats]=useState([])

    useEffect(()=> {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))
        })
        return unsubscribe;
    },[])

    const signOut =() => {
        auth.signOut().then(()=> {
            navigation.replace('Login')
        })
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            title:'Chat App (React Native)',
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'black', fontSize:15},
            headerTintColor:"black",
            headerTitleAlign: 'center',
            headerLeft: () =>(
                    <View style={{marginLeft:5}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                        <Avatar rounded source={{uri:auth?.currentUser?.photoURL}}/>
                        </TouchableOpacity>
                    </View>

            ),
            headerRight: () => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80,
                    marginRight:5

                }
                }>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black"/>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {navigation.navigate('AddChat')}} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="black"/>

                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])

    const enterChat  = (id , chatName) => {
        navigation.navigate("Chat",{
            id ,
            chatName,
        })

    }


    return (
        
        <SafeAreaView>
            
            <ScrollView style={styles.container}>
            {chats.map(({id , data: {chatName}}) => (
                <CusomListItem 
                key={id} 
                id={id} 
                chatName={chatName} 
                enterChat={enterChat}/>
            ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
