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
import { Eye, EyeOff, Facebook, Loader2 } from 'lucide-react'
import { passwordSchema } from '@/lib/validation'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import {signIn} from 'next-auth/react'

type Props = {}

const LoginForm = (props: Props) => {
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)
    const callbackUrl = useSearchParams().get('callbackUrl') || '/conversations'
    const router = useRouter()
    const formSchema = z.object({
        email: z.string().min(1, {message: "This field is mandatory"}).email('Please enter a valid email.'),
        password: passwordSchema
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const isSubmitting = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const {email, password} = values
        try{
            const response = await signIn('credentials',{
                redirect:false,
                email: email,
                password: password,
                callbackUrl: callbackUrl
            })

            if(response?.error) return toast.error(response.error)
            if(response?.ok){
                toast.success('Login Successful')
                return router.push('/conversations')
            }

        }catch(error){
            toast.error(`${error}`)
        }
    }
  return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='pl-4'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem className='!space-y-0'>
                                <FormLabel className="text-muted-foreground">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Your Email Address' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
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
                                <FormLabel className="text-muted-foreground">Password</FormLabel>
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
                    <div className='flex justify-between w-full items-center py-4'>
                        <div className="flex space-x-2">
                            <Checkbox id="terms1" className=''/>
                            <div className="leading-none">
                                <label
                                htmlFor="terms1"
                                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                Remember me
                                </label>
                            </div>
                            </div>
                            <Link href={``} className='text-xs font-medium underline text-primary'>Forgot Password?</Link>
                        </div>
                    <div className='w-full'>
                        <Button type='submit' className='rounded-none px-9 py-1 w-full text-white'disabled={isSubmitting}>{isSubmitting ? <span className='flex justify-center items-center'><Loader2 className='animate-spin'/></span> : 'Login'}</Button>
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