'use client'
import React from 'react'
import { useConversationStore } from './useMessagesStore'

const InitMessage = ({message}: {message: ConversationType[]}) => { 
    const initState = React.useRef(false)
    React.useEffect(() => {
        if(!initState.current){
            useConversationStore.setState({message})
        }

        initState.current = true
    },[message])
    return <></>
    
}

export default InitMessage