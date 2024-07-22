import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RegisterForm from './_components/RegisterForm'

const RegisterPagge = () => {
  return (
    <section className='bg-blue-800  w-full  flex items-center  justify-center' style={{backgroundImage :`url(/bg.jpg)`}}>
    <div className='shadow-md flex justify-center items-center w-[55rem] h-fit py-5 rounded-lg '>
        <div className='basis-1/2 bg-white text-black h-fit px-7 rounded-ss-lg rounded-es-lg py-10 '>
            <Image src={`/logo-no-background.svg`} width={120} height={100} alt=''/>
            <div className='py-5 space-y-2 pl-4'>
                {/* <h3 className='text-xl'>Hello,</h3> */}
                <h4 className='font-extrabold text-4xl' style={{fontFamily: 'cursive'}}>Sign Up</h4>
                <div className='text-muted-foreground text-xs flex gap-1'>
                    <p>Have an account?</p>
                    <Link href={`/login`} className='text-primary underline'>Login</Link>
                </div>
            </div>
            <RegisterForm/>
        </div>
        <div className='basis-1/2 h-full'>
            <Image src={`/vector5.webp`} width={500} height={100} alt='vector' className='w-full h-full rounded-se-lg rounded-ee-lg'/>
        </div>

    </div>


</section>
  )
}

export default RegisterPagge