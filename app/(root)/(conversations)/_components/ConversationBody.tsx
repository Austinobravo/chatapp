"use client"
import { Card } from '@/components/ui/card'
import React from 'react'
import { format } from "date-fns";
import { useUserStore } from '@/hooks/store/useUserStore';
import { useSession } from 'next-auth/react';

const data = [
    {
        id: 1,
        message: 'Hi James',
        userId: 1
    },
    {
        id: 2,
        message: 'Hi Jane',
        userId: 2
    },
    {
        id: 3,
        message: 'How Are you doing?',
        userId: 1
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 5,
        message: 'Hi John',
        userId: 1
    },
    {
        id: 6,
        message: 'Hi, How are you doing',
        userId: 1
    },
    {
        id: 2,
        message: 'Hi Jane',
        userId: 2
    },
    {
        id: 3,
        message: 'How Are you doing?',
        userId: 1
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 5,
        message: 'Hi John',
        userId: 1
    },
    {
        id: 6,
        message: 'Hi, How are you doing',
        userId: 1
    },
    {
        id: 1,
        message: 'Hi James',
        userId: 1
    },
    {
        id: 2,
        message: 'Hi Jane',
        userId: 2
    },
    {
        id: 3,
        message: 'How Are you doing?',
        userId: 1
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 5,
        message: 'Hi John',
        userId: 1
    },
    {
        id: 6,
        message: 'Hi, How are you doing',
        userId: 1
    },
    {
        id: 2,
        message: 'Hi Jane',
        userId: 2
    },
    {
        id: 3,
        message: 'How Are you doing?',
        userId: 1
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 4,
        message: 'Hi James',
        userId: 3
    },
    {
        id: 5,
        message: 'Hi John',
        userId: 1
    },
    {
        id: 6,
        message: 'Hi, How are you doing',
        userId: 1
    },
]


const ConversationBody = ({messages}: {messages:any}) => {
    // const conversations = useConversationStore((state) => state.message)
    // const user = await getCurrentUser()
    const {user} = useUserStore()
    const {data:session} = useSession()
    const userId = session?.user.id
    const formatTime = (timestamp: number) => {
        return format(timestamp, 'HH:mm')
    }
    console.log('converssa', messages)
   
  return (

    <Card className='no-scrollbar overflow-y-scroll flex flex-col-reverse flex-1  gap-2 p-3 ml-16 w-[calc(100%_-_4rem)] lg:!ml-[24rem] lg:w-[calc(100%_-_24rem)] bg-transparent dark:bg-black mt-20 mb-24 shadow-none border-0'>
        <div className='space-y-1 '>
            {messages?.existingConversation?.message.map((conversation: any, index:number) => (
                <div key={index} className={`${conversation.userId === userId ? ' ml-auto bg-primary order-1 items-end' : 'order-2 items-start bg-emerald-500'} ${messages?.existingConversation?.message.length -1 === index ? messages?.existingConversation?.message[length].userId !== userId && 'rounded-br-none':'rounded-bl-none '} ${conversation.message.length > 30 ? 'w-80' : 'w-fit'} rounded-lg  text-white p-2 break-all`}>
                    <span>{conversation.message} </span>
                    <p className={`${conversation.userId === userId ? 'ml-auto': 'mr-auto'} text-primary-foreground text-xs  w-fit`}>{formatTime(conversation.createdAt)}</p>
                </div>
            ))}
        </div>
    </Card>
  )
}

export default ConversationBody