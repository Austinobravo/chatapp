import ConversationFallback from '@/components/ConversationFallback'
import ItemsList from '@/components/itemsList'
import React from 'react'
import FriendCard from './_components/FriendCard'
import FriendInput from './_components/FriendInput'


const page = () => {
  
  return (
    <div className='h-full w-full flex'>
        <ItemsList title='Friends' action={<FriendInput/>}>
              <p className='text-center text-primary'>Friends</p>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
        </ItemsList>
        <ConversationFallback/>
    </div>
  )
}

export default page