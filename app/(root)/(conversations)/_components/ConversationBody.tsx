import { Card } from '@/components/ui/card'
import React from 'react'
import { format } from "date-fns";

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
const ConversationBody = () => {
    // const conversations = useConversationStore((state) => state.message)
    // const user = await getCurrentUser()
    const formatTime = (timestamp: number) => {
        return format(timestamp, 'HH:mm')
    }
  return (
    <Card className='no-scrollbar overflow-y-scroll flex flex-col-reverse flex-1  gap-2 p-3 ml-16 w-[calc(100%_-_4rem)] lg:!ml-[24rem] lg:w-[calc(100%_-_24rem)] bg-transparent dark:bg-black mt-20 mb-10'>
        <div className='space-y-1 '>
            {data.map((conversation, index) => (
                <div key={index} className={`${conversation.userId === 1 ? ' ml-auto  bg-primary' : 'order-2 items-start bg-emerald-500'} ${data.length -1 === index && conversation.userId === 1 && 'rounded-br-none'} ${ data.length -1 === index && conversation.userId !== 1 && 'rounded-bl-none'} rounded-lg w-fit text-white p-2 break-all`}>
                    <span>{conversation.message}</span>
                    <p className={`${conversation.userId === 1 ? 'ml-auto': 'mr-auto'} text-primary-foreground text-xs  w-fit`}>{formatTime(new Date().getTime())}</p>
                </div>
            ))}
        </div>
    </Card>
  )
}

export default ConversationBody