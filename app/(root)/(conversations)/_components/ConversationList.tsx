import ItemsList from '@/components/itemsList'
import React from 'react'
import ConversationCard from './ConversationCard'

const ConversationList = () => {
  return (
    <ItemsList title='Conversations'>
            <p className='text-center text-primary '>Conversations</p>
            <ConversationCard/>
    </ItemsList>
  )
}

export default ConversationList