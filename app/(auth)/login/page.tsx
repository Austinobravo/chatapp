
import Image from 'next/image'
import React from 'react'
import LoginForm from './_components/LoginForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <section className='bg-blue-800  w-full h-screen flex items-center justify-center ' style={{backgroundImage :`url(/bg.jpg)`}}>
            <div className='shadow-md flex justify-center items-center w-[55rem] h-auto py-7 rounded-lg '>
                <div className='basis-1/2 bg-white text-black h-full px-7 rounded-ss-lg rounded-es-lg py-10 '>
                    <Image src={`/logo-no-background.svg`} width={120} height={100} alt=''/>
                    <div className='py-5 space-y-2 pl-4'>
                        {/* <h3 className='text-xl'>Hello,</h3> */}
                        <h4 className='font-extrabold text-4xl' style={{fontFamily: 'cursive'}}>Sign In</h4>
                        <div className='text-muted-foreground text-xs flex gap-1'>
                            <p>Don't have an account?</p>
                            <Link href={`/register`} className='text-primary underline'>Create now</Link>
                        </div>
                    </div>
                    <LoginForm/>
                </div>
                <div className='basis-1/2 h-full'>
                    <Image src={`/vector5.webp`} width={500} height={100} alt='vector' className='w-full h-full rounded-se-lg rounded-ee-lg'/>
                </div>

            </div>

        
    </section>
  )
}

export default LoginPage