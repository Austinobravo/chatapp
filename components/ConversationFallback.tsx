import React from 'react'
import { Card } from './ui/card'
import { useUserStore } from '@/hooks/store/useUserStore'

const ConversationFallback = () => {
  
  return (
    <Card className='lg:flex hidden justify-center items-center h-full w-full !ml-[24rem] lg:w-[calc(100%_-_24rem)]  text-sm bg-gray-200 dark:bg-black rounded-ss-none rounded-es-none border-l fixed text-black/60 dark:text-white'>Select/Start a conservation to get started.</Card>
  )
}

export default ConversationFallback