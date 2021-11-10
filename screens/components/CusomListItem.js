import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar , ListItem } from 'react-native-elements'
import { db } from '../../firebase'

const CusomListItem = ({id , chatName , enterChat}) => {
    const [chatMessages,setChatMessages] = useState([])

    useEffect(()=>{
        const unsubscribe= db.collection('chats').doc(id).collection('messages').orderBy('timesTamp','desc').onSnapshot(snapshot => {
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        })
        return unsubscribe;
    }, [])
    return (
        <ListItem 
        key={id} 
        bottomDivider 
        onPress={() => enterChat(id,chatName)}>
            <Avatar rounded  source={{uri : chatMessages?.[0]?.photoURl ||
                'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320166578424287581.png'}}/>
        
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
            </ListItem.Subtitle>

        </ListItem.Content>
        </ListItem>
    )
}

export default CusomListItem

const styles = StyleSheet.create({})
