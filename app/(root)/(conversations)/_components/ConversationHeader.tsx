import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CircleArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ConversationHeader = ({conversation}: {conversation:any}) => {
  return (
    <>
        <Card className='flex justify-between gap-2 items-center ml-16 lg:!ml-[24rem] lg:w-[calc(100%_-_26rem)] bg-gray-200 dark:bg-black p-2 px-3 fixed top-0 w-[calc(100%_-_6rem)] mt-16'>
            <div className='flex items-center gap-1'>
                <Link href="/conversations" className='lg:hidden'><CircleArrowLeft className=''/></Link>
                <Avatar>
                <AvatarImage/>
                <AvatarFallback className='bg-primary text-white'>{conversation.existingConversation.isGroup ? conversation.existingConversation.name.substring(0,2) : conversation.otherMember.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div className='text-black dark:text-white'>
                    <h3 className='truncate text-sm font-bold shadow-none'>{conversation.existingConversation.isGroup ? conversation.existingConversation.name: conversation.otherMember.username}</h3>
                </div>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className='border-0'>
                        <Settings className='border-0'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Leave Group</DropdownMenuItem>
                        <DropdownMenuItem>Leave Group</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

    </Card>
    </>
  )
}

export default ConversationHeader