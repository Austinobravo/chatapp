"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useConversationStore } from '@/hooks/store/useMessagesStore'
import { useUserStore } from '@/hooks/store/useUserStore'
import { getCurrentUser } from '@/lib/serverSessionProvider'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const ConversationCard = async () => {
  const [conversations, setConversations] = React.useState<any[] | undefined>(undefined)
  // const {user} = useUserStore()
  //   console.log('UserCard', user)
  // const conversations = useConversationStore((state) => state.message)
  const {user} = useUserStore()
  const {data:session} = useSession()
  const userId = session?.user.id

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/conversations/`, {
        method: 'GET'
    })
    .then((response) => {
        if(!response.ok){
            // toast.error(response.statusText)
            return
            }
            return response.json()
            
        })
        .then((data) => {
            console.log("data",data)
            setConversations(data)
        })
    
    }
    fetchData()
  },[user, userId])
  return (
    <>
    {conversations === undefined ?
    <p>Skeleton</p>
      :
      conversations.length > 0 ?
        conversations.map((conversation, index) => (
          <Card key={index} className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2'>
              <Link href={`/conversations/${conversation.conversation.id}`} className='flex items-center gap-1'>
                  <Avatar>
                  <AvatarImage/>
                  <AvatarFallback className='bg-primary text-white'>{conversation.conversation.isGroup ? conversation.name : conversation.otherMember.username.substring(0,2)}</AvatarFallback>
                  </Avatar>
                  <div className='text-black dark:text-white'>
                  <h3 className='truncate text-sm'>{conversation.conversation.isGroup ? conversation.name : conversation.otherMember.username}</h3>
                  <p className='text-xs text-wrap break-all line-clamp-1 text-black dark:text-white/90 opacity-40'>Start a conversation</p>
                  </div>
              </Link>

          </Card>

        ))

      :
      <p>No Conversations</p>
    }
    </>
  )
}

export default ConversationCard