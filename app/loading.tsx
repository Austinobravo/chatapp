import { getCurrentUser } from '@/lib/serverSessionProvider'
import Image from 'next/image'
import React from 'react'

const Loading = async () => {
  const session = await getCurrentUser()
  return (
    <div>
      {session ? 
      <Image src='/logo-color.svg' width={500} height={500} alt=''/>
      
      :
      <p>Loading</p>}
    </div>
  )
}

export default Loading