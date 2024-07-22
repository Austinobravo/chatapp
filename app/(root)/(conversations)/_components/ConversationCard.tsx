import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import React from 'react'

const ConversationCard = () => {
  return (
    <Card className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2'>
        <div className='flex items-center gap-1'>
            <Avatar>
            <AvatarImage/>
            <AvatarFallback className='bg-primary text-white'>JN</AvatarFallback>
            </Avatar>
            <div className='text-black dark:text-white'>
            <h3 className='truncate text-sm'>James Smith</h3>
            <p className='text-xs text-wrap break-all line-clamp-1 text-black dark:text-white/90 opacity-40'>Start a conversation</p>
            </div>
        </div>

    </Card>
  )
}

export default ConversationCard