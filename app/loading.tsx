import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div>
        <Image src='/logo-color.svg' width={500} height={500} alt=''/>
    </div>
  )
}

export default Loading