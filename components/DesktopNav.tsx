'use client'
import useNavigation from '@/hooks/useNavigation'
import React from 'react'
import { Card } from './ui/card'
import { Settings } from 'lucide-react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { useUserStore } from '@/hooks/store/useUserStore'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import LogoutModal from './LogoutModal'

const DesktopNav = () => {
    const paths = useNavigation()
    const {user, setUser} = useUserStore()
    const {data:session} = useSession()
    const userId = session?.user.id
    const [open, setOpen] = React.useState<boolean>(false)
    
    
    React.useEffect(()=> {
        const fetchData = async () => {
            await fetch(`/api/users/${userId}`, {
                        method: 'GET'
                    })
                    .then((response) => {
                    if(!response.ok){
                        toast.error(response.statusText)
                        return
                    }
                    return response.json()
                        
                })
                .then((data: UserType) => {
                    setUser(data)
                    })
                }
                if(userId){
                    fetchData()
                }

            }, [setUser,session])
            
  return (
    <div>
        <Card className='w-16 flex flex-col justify-between h-full bg-gray-300 dark:bg-black border-0 py-3 mt-10 fixed top-5 pb-20'>
            <nav>
                <ul className='flex flex-col gap-4 items-center'>
                    {paths.map((path, index) => {
                        const Icon = path.icon
                        return (
                            <li className='relative' key={index}>
                                <Link href={path.href}>
                                    <Tooltip>
                                        <TooltipTrigger className={`${path.active ? 'border-l-4 border-l-blue-700 bg-gray-200 hover:bg-none text-primary underline-offset-4 hover:underline': 'text-primary underline-offset-4 hover:text-white hover:bg-gray-200 dark:bg-white'} p-3 rounded-md`}>
                                                <Icon color={`black`} size={20} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{path.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>

                            </li>

                        )

                    })}
                        
                </ul>
            </nav>
            <div className='flex flex-col items-center gap-4'>
                <ModeToggle/>
                <Tooltip>
                    <TooltipTrigger>
                        <Settings/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Settings</p>
                    </TooltipContent>
                </Tooltip>
                    <Tooltip >
                        <TooltipTrigger>
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogTrigger asChild>
                            <Image src={`/avatar.webp`} width={50} height={100} alt=''/>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>
                                Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    You'll be logged out.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                    <LogoutModal toggle={() => setOpen(!open)}/>
                                </AlertDialogContent>

                        </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Profile</p>
                        </TooltipContent>
                    </Tooltip>
            </div>
        </Card>
    </div>
  )
}

export default DesktopNav