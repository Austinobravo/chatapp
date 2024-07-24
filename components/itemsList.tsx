'use client'
import React from 'react'
import { Card } from './ui/card'
import useConversations from '@/hooks/useConversations'

type Props = React.PropsWithChildren<{
    title: string
    action?: React.ReactNode
}>

const ItemsList = ({children, title, action: Action}: Props) => {
    const {isActive} = useConversations()
  return <Card className={`${isActive ? 'hidden lg:block ': ''} no-scrollbar overflow-y-scroll h-full ml-16 lg:w-80 w-full lg:fixed top-16 bg-gray-200 dark:bg-black border-2 border-gray-100 p-3 pt-0 rounded-se-none rounded-ee-none pb-20`}>
            <div className='mb-4 flex py-2 pt-10 z-10 justify-between items-center text-black dark:text-white font-bold shadow-none sticky top-0  w-full bg-gray-200 dark:bg-black dark:px-1'>
                <h2>{title}</h2>
                <div>{Action ? Action : null}</div>
            </div>
            <div className='w-full text-muted-foreground'>
                {children}
            </div>
        </Card>
}

export default ItemsList