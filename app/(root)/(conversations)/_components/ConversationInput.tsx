'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SendHorizonal } from 'lucide-react'
import React, { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
const ConversationInput = () => {
    const textAreaReef = useRef<HTMLTextAreaElement | null>(null)
  return (
    <Card className=' bg-gray-200 dark:bg-black p-2 w-[calc(100%_-_6rem)] ml-16 lg:!ml-[24rem] lg:w-[calc(100%_-_25rem)] rounded-lg flex gap-2 fixed bottom-0'>
        <TextareaAutosize rows={1} maxRows={4} placeholder='Type your message..' className='outline-none no-scrollbar border-0 bg-transparent dark:bg-black p-1 text-black dark:text-white resize-none w-full'/>
        <div className='flex items-end'>
            <Button size={'icon'} type='submit' className='bottom-0 right-0 '><SendHorizonal color='white'/></Button>

        </div>
    </Card>
  )
}

export default ConversationInput