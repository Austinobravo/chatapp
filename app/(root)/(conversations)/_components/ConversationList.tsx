import ItemsList from '@/components/itemsList'
import React from 'react'
import ConversationCard from './ConversationCard'
import ConversationGroupInput from './ConversationGroupInput'

const ConversationList = () => {
  return (
    <ItemsList title='Conversations' action={<ConversationGroupInput/>}>
            <p className='text-center text-primary '>Conversations</p>
            <ConversationCard/>
    </ItemsList>
  )
}

export default ConversationList