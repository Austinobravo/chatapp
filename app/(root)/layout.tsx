import Sidebar from '@/components/sidebar'
import Image from 'next/image'
import React from 'react'
type Props = React.PropsWithChildren<{}>
const Layout = ({children}: Props) => {
  return (
    <div className='bg-gray-300 h-full p-5 '>
      <div className='fixed w-full z-30 bg-gray-300 py-5 top-0'>
        <Image src={`/logo-no-background.svg`} width={120} height={100} alt=''/>
      </div>
      <div className='flex flex-row pt-6 w-full h-full'>
        <div>
            <Sidebar/>
        </div>
        <div className='w-full'>
          {children}
        </div>

      </div>
    </div>
  )
}

export default Layout