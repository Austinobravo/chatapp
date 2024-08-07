import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { getCurrentUser } from "@/lib/serverSessionProvider";

export async function POST(request: Request, response: NextApiResponse){
    const data = await request.json()
    const accessingUser = await getCurrentUser()

    
    if(data.email === accessingUser?.email){
        return NextResponse.json('Forbidden', {status: 403})
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(!existingUser){
        return NextResponse.json('No user found', {status: 404})
    }

    const existingRequestSender = await prisma.requests.findFirst({
        where: {
            sender: accessingUser?.id,
            receiver: existingUser.id
        }
    })
    if(existingRequestSender){
        return NextResponse.json('Friends request already sent', {status: 403})
    }

    const existingRequestReceiver = await prisma.requests.findFirst({
        where: {
            sender: existingUser.id,
            receiver: accessingUser?.id
        }
    })

    if(existingRequestReceiver){
        return NextResponse.json('Friends request already sent', {status: 403})
    }
    
    const alreadyFriendsWithSender = await prisma.friends.findUnique({
        where: {
            sender: accessingUser?.id,
            receiver: existingUser.id
        }
    })
    
    if(alreadyFriendsWithSender){
        return NextResponse.json('Already friends', {status: 403})
    }
    const alreadyFriendsWithReciever = await prisma.friends.findUnique({
        where: {
            sender: existingUser.id,
            receiver: accessingUser?.id
        }

    })

    if(alreadyFriendsWithReciever){
        return NextResponse.json('Already friends', {status: 403})
    }

    try{
        await prisma.requests.create({ 
            data:{
                sender: accessingUser?.id as string,
                receiver: existingUser.id,
            }
        })
        

        return NextResponse.json('Friend request sent', {status: 201})

    }
    catch(error){
        console.log('err', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}