import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { getCurrentUser } from "@/lib/serverSessionProvider";
export async function POST(request: Request, response: NextApiResponse){
    const data = await request.json()
    const accessingUser = await getCurrentUser()



    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(!existingUser){
        return NextResponse.json('No user found', {status: 404})
    }

    const existingRequestSender = await prisma.requests.findUnique({
        where: {
            sender: accessingUser?.id,
            receiver: data.email
        }
    })
    if(existingRequestSender){
        return NextResponse.json('Already friends', {status: 403})
    }

    const existingRequestReceiver = await prisma.user.findUnique({
        where: {
            email: data.email,
            requests:{
                some:{
                    sender: accessingUser?.id
                }
            }
        },

    })

    if(existingRequestReceiver){
        return NextResponse.json('Already friends', {status: 403})
    }
    
    const alreadyFriendsWithSender = await prisma.friends.findUnique({
        where: {
            sender: accessingUser?.id,
            receiver: data.email
        }
    })
    
    if(alreadyFriendsWithSender){
        return NextResponse.json('Already friends', {status: 403})
    }
    const alreadyFriendsWithReciever = await prisma.user.findUnique({
        where: {
            email: data.email,
            friends:{
                some:{
                    sender: accessingUser?.id
                }
            }
        },

    })

    if(alreadyFriendsWithReciever){
        return NextResponse.json('Already friends', {status: 403})
    }

    try{
        await prisma.requests.create({
            data:{
                sender: accessingUser?.id as string,
                receiver: data.email,
            }
        })
        
        // const newConversation = await prisma.conversations.create({
        //     data:{
        //         userId: accessingUser?.id as string,
        //         isGroup: false
        //     }
        // })
        
        // await prisma.friends.create({
        //     data:{
        //         isaccepted: true,
        //         sender: accessingUser?.id as string,
        //         receiver: data.email,
        //         conversationId: newConversation.id
        //     }
        // }) 
        // await prisma.conversationsMembers.create({
        //     data:{
        //         userId: accessingUser?.id as string,
        //         conversationId: newConversation.id
        //     }
        // }) 

        return NextResponse.json('Friend request sent', {status: 201})

    }
    catch(error){
        return NextResponse.json('An error occured', {status: 505})
    }
    
}