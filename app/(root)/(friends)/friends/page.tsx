import ConversationFallback from '@/components/ConversationFallback'
import ItemsList from '@/components/itemsList'
import React from 'react'
import FriendCard from './_components/FriendCard'
import FriendInput from './_components/FriendInput'
import { useUserStore } from '@/hooks/store/useUserStore'


const page = () => {
  const {user} = useUserStore()
    console.log('UserRe', user)
  
  return (
    <div className='h-full w-full flex'>
        <ItemsList title='Friends' action={<FriendInput/>}>
              <p className='text-center text-primary'>Friends</p>
              <FriendCard/>
        </ItemsList>
        <ConversationFallback/>
    </div>
  )
}

export default page