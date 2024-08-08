"use client"
import { useSession } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import LogoutModal from '@/components/LogoutModal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
type Props = PropsWithChildren<{}>
const AuthLayout = ({children}: Props) => {
    const [open, setOpen] = React.useState<boolean>(true)
    const router = useRouter()
    const {data:session} = useSession()
    console.log("session", session)
    if(session){
        router.push("/conversations")
        // <>
        //     <AlertDialog open={open} onOpenChange={setOpen}>
        //         <AlertDialogTrigger onClick={}>
        //     <Image src={`/avatar.webp`} width={50} height={100} alt=''/>
        //     </AlertDialogTrigger>
        //     <AlertDialogContent>
        //         <AlertDialogHeader>
        //         <AlertDialogTitle>
        //         Are you sure?
        //         </AlertDialogTitle>
        //         <AlertDialogDescription>
        //             You'll be logged out.
        //         </AlertDialogDescription>
        //         </AlertDialogHeader>
        //             <LogoutModal toggle={() => setOpen(!open)}/>
        //         </AlertDialogContent>

        //     </AlertDialog>
        // </>
        // return 
        //     <>
        //     </>

        
    }

  return (
    <div>
        
        {children}
    </div>
  )
}

export default AuthLayout