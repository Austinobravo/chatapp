'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Facebook } from 'lucide-react'

type Props = {}

const LoginForm = (props: Props) => {
    const formSchema = z.object({
        username: z.string().min(2, {message: "Your username must have at least 2 characters"}).max(50, {message: "Your username exceeded the limit"}),
        password: z.string().min(2, {message: "Your password must have at least 2 characters"}).max(50, {message: "Your password exceeded the limit"})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }
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
                        name='password'
                        render={({field}) => (
                            <FormItem className='pt-3 !space-y-0'>
                                <FormLabel className="text-muted-foreground">Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='Your Password' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                                </FormControl>
                                <FormMessage className='text-red-500'/>
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between w-full items-center py-4'>
                        <div className="flex space-x-2">
                            <Checkbox id="terms1" className=''/>
                            <div className="leading-none">
                                <label
                                htmlFor="terms1"
                                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                Accept terms and conditions
                                </label>
                                {/* <p className="text-sm text-muted-foreground">
                                You agree to our Terms of Service and Privacy Policy.
                                </p> */}
                            </div>
                            </div>
                            <Link href={``} className='text-xs font-medium underline text-primary'>Forgot Password?</Link>
                        </div>
                    <div className='w-full'>
                        <Button type='submit' className='rounded-none px-9 py-1 w-full text-white'>Login</Button>
                        {/* <Link href={``} className='border px-7 py-2 border-green-700 text-green-700 font-semibold'>Sign Up</Link> */}
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

export default LoginForm