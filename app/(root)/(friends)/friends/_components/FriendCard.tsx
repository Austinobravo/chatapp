'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, X } from 'lucide-react'
import React from 'react'

const FriendCard = () => {
  
  React.useEffect(() => {
    
  },[])
  return (
    <Card className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2'>
        <div className='flex items-center gap-1'>
            <Avatar>
            <AvatarImage/>
            <AvatarFallback className='bg-primary text-white'>JN</AvatarFallback>
            </Avatar>
            <div className='text-black dark:text-white'>
            <h3 className='truncate text-sm'>James Smith</h3>
            <p className='text-xs text-wrap break-all line-clamp-1  text-black dark:text-white/90 opacity-40'>JamesSmithggjjkkjjj@gmail.com</p>
            </div>
        </div>
        <div className='flex gap-1'>
            <Button size={'sm'} className='bg-emerald-500 text-white'><Check className='h-4 w-4'/></Button>
            <Button size={'sm'} variant={'destructive'} className='bg-red-500 text-white'><X className='h-4 w-4'/></Button>

        </div>

    </Card>
  )
}

export default FriendCard