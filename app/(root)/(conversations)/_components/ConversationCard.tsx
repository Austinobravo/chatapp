"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useConversationStore } from '@/hooks/store/useMessagesStore'
import { useUserStore } from '@/hooks/store/useUserStore'
import { getCurrentUser } from '@/lib/serverSessionProvider'
import { useSession } from 'next-auth/react'
import React from 'react'

const ConversationCard = async () => {
  const {user} = useUserStore()
    console.log('UserRe', user)
  const conversations = useConversationStore((state) => state.message)
  const {data:session} = useSession()
  // const user = session?.user
  return (
    <>
    {conversations === undefined ?
    <p>Skeleton</p>
      :
      conversations.length > 0 ?
        conversations.map((conversation, index) => (
          <Card key={index} className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2'>
              <div className='flex items-center gap-1'>
                  <Avatar>
                  <AvatarImage/>
                  <AvatarFallback className='bg-primary text-white'>{conversation.isGroup ? conversation.name : conversation.conversationMembers.find((user) => user.user.id !== user.id ?  user.user.username.substring(0, 2) : "JD")}</AvatarFallback>
                  </Avatar>
                  <div className='text-black dark:text-white'>
                  <h3 className='truncate text-sm'>{conversation.isGroup ? conversation.name : conversation.conversationMembers.find((user) => user.user.id !== user.id ?  user.user.email : "")}</h3>
                  <p className='text-xs text-wrap break-all line-clamp-1 text-black dark:text-white/90 opacity-40'>Start a conversation</p>
                  </div>
              </div>

          </Card>

        ))

      :
      <p>No Conversations</p>
    }
    </>
  )
}

export default ConversationCard