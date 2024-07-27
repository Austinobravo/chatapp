'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from '@/lib/validation'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Facebook, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/hooks/store/useUserStore'

const RegisterForm = () => {
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = React.useState<boolean>(false)
    const [isAcceptedTerms, setIsAcceptedTerms] = React.useState<boolean>(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            confirm_password: ""
        }
    })
    const isSubmitting = form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try{
            if(isAcceptedTerms){
                await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                .then((response)=> {
                    if(!response.ok) return
                    return response.json()
                })
                .then((message) => {
                    toast.success(message)
                    form.reset()
                    router.push('/conversations')
                })

            }else{
                toast.error('Please check the accept box.')
            }

        }
        catch(error){
            console.error("error", error)
        }
    }
    const {user} = useUserStore()
    console.log('UserRegistrartion', user)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='pl-4'>
        <FormField
            control={form.control}
            name='username'
            render={({field}) => (
                <FormItem className='!space-y-0'>
                    <FormLabel className="text-muted-foreground">Username</FormLabel>
                    <FormControl>
                        <Input placeholder='Your Username' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                    </FormControl>
                    <FormMessage className='text-red-500'/>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='email'
            render={({field}) => (
                <FormItem className='!space-y-0'>
                    <FormLabel className="text-muted-foreground">Email</FormLabel>
                    <FormControl>
                        <Input placeholder='Your Email' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                    </FormControl>
                    <FormMessage className='text-red-500'/>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='password'
            render={({field}) => (
                <FormItem className='pt-3 !space-y-0 relative'>
                    <FormLabel className="text-muted-foreground">Password<span className='text-[0.5rem] ml-1 text-blue-500 font-bold'>Alphanumeric</span></FormLabel>
                    <FormControl>
                        <Input type={isPasswordShown ? 'text' : 'password'} placeholder='Your Password' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                    </FormControl>
                        <span className='absolute right-5 top-[44px] cursor-pointer' onClick={()=> setIsPasswordShown(!isPasswordShown)}>
                            {isPasswordShown 
                            ?
                            <EyeOff/>
                        :
                            <Eye/>
                        }
                        </span>
                    <FormMessage className='text-red-500'/>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='confirm_password'
            render={({field}) => (
                <FormItem className='pt-3 !space-y-0 relative'>
                    <FormLabel className="text-muted-foreground">Confirm Password</FormLabel>
                    <FormControl>
                        <Input type={isConfirmPasswordShown ? 'text' : 'password'} placeholder='Confirm your password' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                    </FormControl>
                    <span className='absolute right-5 top-[44px] cursor-pointer' onClick={()=> setIsConfirmPasswordShown(!isConfirmPasswordShown)}>
                            {isConfirmPasswordShown 
                            ?
                            <EyeOff/>
                        :
                            <Eye/>
                        }
                        </span>
                    <FormMessage className='text-red-500'/>
                </FormItem>
            )}
        />
        <div className='flex justify-between w-full items-center py-4'>
            <div className="flex space-x-2">
                <Checkbox id="terms1" className='' onClick={()=> setIsAcceptedTerms(!isAcceptedTerms)}/>
                <div className="leading-none">
                    <label
                    htmlFor="terms1"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Accept terms and conditions
                    </label>
                </div>
                </div>
                
            </div>
        <div className='w-full'>
            <Button type='submit' className='rounded-none px-9 py-1 w-full text-white' disabled={isSubmitting}>{isSubmitting ? <span className='flex justify-center items-center'><Loader2 className='animate-spin'/></span> : 'Register'}</Button>
        </div>

    </form>
    <div className='w-full py-3'>
        <div className='flex items-center gap-2'>
            <hr className='w-40 border'/>
            <span className='text-xs'>OR</span>
            <hr className='w-40 border'/>
        </div>
    </div>
    <div>
        <Link href={``} className='border p-2 rounded-md flex items-center text-xs'>
            <Facebook fill='blue' color='transparent'/>
            <span className='mx-auto text-muted-foreground'> Continue with Facebook</span>
        </Link>
    </div>

</Form>
  )
}

export default RegisterForm