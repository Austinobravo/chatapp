"use client"
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { UserPlus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { isEmailNotExisting } from '@/lib/helpers'

const FriendInput = () => {
    const [open, setOpen] = React.useState<boolean>(false)
    const formSchema = z.object({
        email: z.string().min(1, {message: "This field is mandatory"}).email('Please enter a valid email.').refine((value) => isEmailNotExisting(value), {message: 'User not found'}),
      })
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
      })
    
      const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            await fetch('/api/friendrequests', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((response)=> {
                if(!response.ok){
                    toast.error(response.statusText)
                    return
                }
                return response.json()
            })
            .then((message) => {
                if(message){
                    toast.success(message)
                    form.reset()
                    setOpen(!open) 
                }
            })
            .catch((error) => {
                toast.error(error)
            })

        }
        catch(error:any){
            toast.error(error)
        }
      }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger><UserPlus/></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Add A Friend
            </AlertDialogTitle>
              <AlertDialogDescription>
              </AlertDialogDescription>
          </AlertDialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem className=''>
                            <FormLabel className="text-muted-foreground text-xs">Send a friend request and start a conversation.</FormLabel>
                            <FormControl>
                                <Input placeholder='Your Email Address' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                            </FormControl>
                            <FormMessage className='text-red-500'/>
                        </FormItem>
                    )}
                />
          <AlertDialogFooter className='mt-5'>
            <AlertDialogCancel>Cancel</AlertDialogCancel> 
            <Button type='submit'>Send</Button>
          </AlertDialogFooter>
            </form>
        </Form>
        </AlertDialogContent>

    </AlertDialog>
  )
}

export default FriendInput