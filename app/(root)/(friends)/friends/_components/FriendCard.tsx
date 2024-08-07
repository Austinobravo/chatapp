'use client'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUserStore } from '@/hooks/store/useUserStore'

import { Check, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const FriendCard = () => {
  // const [requests, setRequests] = React.useState<RequestType[] | undefined>(undefined)
  const [open, setOpen] = React.useState<boolean>(false)
  const {user, requests, setRequests} = useUserStore()
  const Id = user?.id

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/friendrequests/${Id}`, {
        method: 'GET'
    })
    .then((response) => {
        if(!response.ok){
            toast.error(response.statusText)
            return
            }
            return response.json()
            
        })
        .then((data: RequestType[]) => {
            setRequests(data)
        })
    
    }
    if(Id){
      fetchData()
    }
  },[user, Id])

  const handleAccept = async (requestId: string) => {
    await fetch(`/api/friendrequests/${requestId}`, 
      {
        method: 'PATCH'
      }
    )
    .then((response) => {
      if(!response.ok){
        toast.error(response.statusText)
        return
      }
       return response.json()
      }
    )
    .then((updatedRequests) => {
      // setRequests((prevRequests) => prevRequests?.map(request => request.id === requestId
      //   ?
      //   {
      //     ...request, isaccepted: true
      //   }
      //   :
      //   request
      // ) || null)
  
      setRequests(updatedRequests)

      toast.success('Friend request accepted')
    })
    .catch(error => {
      console.error('Error accepting friend request:', error);
      toast.error('Error accepting friend request')
    })
  }

  const handleReject = async (requestId: string) => {
    await fetch(`/api/friendrequests/${requestId}`, 
      {
        method: 'DELETE'
      }
    )
    .then((response) => response.json())
    .then((updatedRequests) => {
      // setRequests((prevRequests) => prevRequests?.filter(request => request.id !== requestId) || null)
      setRequests(updatedRequests)
      setOpen(!open)
      toast.success('Friend request rejected')
    })
    .catch(error => {
      console.error('Error accepting friend request:', error);
      toast.error('Error rejecting friend request')
    })
  }
  
  return (
    <>
    { requests === undefined ?
    [1,2,3,4].map((_, index) => (
      <div key={index} className='flex justify-center items-center w-full'>
        <Card className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2 w-full'>
              <div className='flex items-center gap-1 animate-pulse'>
                  <Avatar>
                  <AvatarImage/>
                  <AvatarFallback className='bg-primary text-white'></AvatarFallback>
                  </Avatar>
                  <div className='text-black dark:text-white'>
                  <h3 className='truncate text-sm animate-pulse'></h3>
                  <p className='text-xs text-wrap break-all line-clamp-1  text-black dark:text-white/90 opacity-40 animate-pulse'></p>
                  </div>
              </div>
              <div>
                <p className='text-xs font-bold shadow-0 animate-pulse '></p>
              </div>
          </Card>
      </div>
    ))
    :
    requests.length > 0 ?
      requests.map((request, index) => (
        <Card key={index} className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2'>
            <Link href={`/conversations/${request.conversation.id}`} className='flex items-center gap-1 w-full'>
                <Avatar>
                <AvatarImage/>
                <AvatarFallback className='bg-primary text-white'>{request.user.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div className='text-black dark:text-white'>
                <h3 className='truncate text-sm'>{request.user.username}</h3>
                <p className='text-xs text-wrap break-all line-clamp-1  text-black dark:text-white/90 opacity-40'>{request.user.email}</p>
                </div>
            </Link>
            {request.sender === Id && !request.isaccepted ?
            <div>
              <p className='text-xs font-bold shadow-0'>Pending...</p>
            </div>
            :
            request.isaccepted ?
            <div>
              <p className='text-xs font-bold shadow-0'>Friends</p>
            </div>
            :
            <div className='flex gap-1'>
              <Button size={'sm'} className='bg-emerald-500 text-white' onClick={() => handleAccept(request.id)}><Check className='h-4 w-4'/></Button>
              <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger>
                      <Button size={'sm'} variant={'destructive'} className='bg-red-500 text-white'><X className='h-4 w-4'/></Button>
                        </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you Sure?
                          </AlertDialogTitle>
                            <AlertDialogDescription>
                              This is a permanent action.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='mt-5'>
                          <AlertDialogCancel>No</AlertDialogCancel> 
                          <Button onClick={() => handleReject(request.id)}>Yes</Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>

              </AlertDialog>       
                

            </div>
            }

        </Card>

      ))
      :
      <p className='text-center h-full'>No Pending friend request</p>
    }

    </>
  )
}

export default FriendCard