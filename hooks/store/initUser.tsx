'use client'
import React from 'react'
import { useUserStore } from './useUserStore'

const InitUser = ({user}: {user: any}) => { 
    const initState = React.useRef(false)
    React.useEffect(() => {
        if(!initState.current){
            useUserStore.setState({user})
        }

        initState.current = true
    },[user])
    return <></>
    
}

export default InitUser