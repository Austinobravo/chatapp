"use client"
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { UserPlus, X } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useUserStore } from '@/hooks/store/useUserStore'

const ConversationGroupInput = () => {
    const [open, setOpen] = React.useState<boolean>(false)
    const {user, friends, setFriends, setConversation} = useUserStore()
    const userId = user?.id
    

    const formSchema = z.object({
        name: z.string().min(1, {message: "This field is mandatory"}).max(50, {message: "You exceeded the limit."}),
        members: z.string().array().min(1, {message: "You must select at least one friend."})
      })

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        members: []
    }
    })

    const members = form.watch("members", [])

    const unselectedFriends = React.useMemo(() => {
    return friends ? friends.filter((friend) => !members.includes(friend.id)) : []
    },[members.length, friends?.length])

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/friends/${userId}`, {
              method: 'GET'
            })
            if(response.ok){
              const data = await response.json()
              console.log('setfriendCard', data)
              setFriends(data)
            }
            else{
                  toast.error(response.statusText)
                  return
                }
          }
          if(userId){
              fetchData()
          }
    }, [ user])
    
      const onSubmit = async(values: z.infer<typeof formSchema>) => {
          const data = {...values, userId}
        try{
            await fetch('/api/conversations', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response)=> {
                if(!response.ok){
                    toast.error(response.statusText)
                    return
                }
                return response.json()
            })
            .then((data) => {
                if(data){
                    setConversation(data)
                    toast.success("Group created")
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
        <AlertDialogTrigger>
            <UserPlus/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Create New Group
            </AlertDialogTitle>
              <AlertDialogDescription>
                Add your friends to get started.
              </AlertDialogDescription>
          </AlertDialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}) => (
                        <FormItem className=''>
                            <FormLabel className="text-muted-foreground text-xs">Name.</FormLabel>
                            <FormControl>
                                <Input placeholder='Group Name' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                            </FormControl>
                            <FormMessage className='text-red-500'/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='members'
                    render={({field}) => (
                        <FormItem className=''>
                            <FormLabel className="text-muted-foreground text-xs">Friends.</FormLabel>
                            <FormControl>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                                        <Button className='w-full' variant={'outline'}>Select</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full border'>
                                        {unselectedFriends.map((friend, index) => (
                                            <DropdownMenuCheckboxItem className='flex justify-between gap-1 w-full' key={index} onCheckedChange={checked => {
                                                if(checked){
                                                    form.setValue("members", [...members, friend.id])
                                                    // unselectedFriends.filter((user) => user.id !== friend.isPasswordShown)
                                                }
                                            }}>
                                                <Avatar>
                                                    <AvatarImage></AvatarImage>
                                                    <AvatarFallback>{friend.username.substring(0,2)}</AvatarFallback>
                                                </Avatar>
                                                <h4 className='break-all line-clamp-1'>{friend.username}</h4>

                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </FormControl>
                            <FormMessage className='text-red-500'/>
                        </FormItem>
                    )}
                />
                {members && members.length ?
                    <Card className='flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar'>
                        {friends?.filter((friend) => members.includes(friend.id)).map((friend, index) =>(
                        <div key={index} className='flex flex-col items-center gap-1'>
                            <div className='relative'>
                            <Avatar>
                                <AvatarImage></AvatarImage>
                                <AvatarFallback>{friend.username.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <X className='w-4 h-4 top-0 absolute left-7 rounded-full cursor-pointer text-red-600' onClick={() => form.setValue("members", members.filter((id => id !== friend.id)))}/>
                            </div>
                        <p>{friend.username.split(" ")[0]}</p>
                    </div>
                        ))}
                    </Card>
                : null}
          <AlertDialogFooter className='mt-5'>
            <AlertDialogCancel>Cancel</AlertDialogCancel> 
            <Button type='submit'>Create</Button>
          </AlertDialogFooter>
            </form>
        </Form>
        </AlertDialogContent>

    </AlertDialog>
  )
}

export default ConversationGroupInput