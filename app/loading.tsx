import { getCurrentUser } from '@/lib/serverSessionProvider'
import Image from 'next/image'
import React from 'react'

const Loading = async () => {
  const session = await getCurrentUser()
  return (
    <div className='flex justify-center items-center animate-pulse h-screen w-full my-auto'>
      {session ? 
      <Image src='/logo-color.svg' width={100} height={100} alt='Loading...' className='w-20 h-20 flex justify-center items-center'/>
      
      :
      <p>Loading</p>}
    </div>
  )
}

export default Loading