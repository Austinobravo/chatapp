import ConversationFallback from '@/components/ConversationFallback'
import React from 'react'
import ConversationCard from '../_components/ConversationCard'
import ItemsList from '@/components/itemsList'
import ConversationList from '../_components/ConversationList'

const ConversationsPage = () => {
  return (
    <div className='flex h-full w-full items-center '>
        <ConversationList/>
        <div className='w-full lg:block hidden h-full'>
          <ConversationFallback/>
        </div>
    </div>
  )
}

export default ConversationsPage