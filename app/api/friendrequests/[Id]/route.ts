import { getCurrentUser } from '../../../../lib/serverSessionProvider';
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { Session } from 'next-auth';
export async function GET(request:NextRequest,{params}: {params:{Id: string}}) {
    console.log("no userId", params.Id)
    if(!params.Id){
        return NextResponse.json("Forbidden",{status: 403})
    }
    const userId = params.Id
    const accessingUser = await getCurrentUser()


    if(userId !== accessingUser?.id){
        return NextResponse.json("Forbidden",{status: 403})
    }
    console.log("userId", userId)

    try{
        const foundRequest = await prisma.requests.findMany({
            where: {
                OR: [
                    {
                        sender: userId
                    },
                    {
                        receiver: userId
                    }
                ]
                
            },
            include:{
                userSender: true,
                userReceiver: true
            }    
        })
        if(!foundRequest){
            return NextResponse.json("Not Found",{status: 404})
        }
        const conversation = await prisma.conversations.findFirst({
            where:{
                requestId: foundRequest[0].id
            }
        })
        const updatedRequest = foundRequest.map((request) => {
            const userDetails = request.sender === userId ? request.userReceiver : request.userSender
            return {...request, user:userDetails, conversation: conversation}
        })
        console.log("updated", updatedRequest)

        return NextResponse.json(updatedRequest, {status: 200})
    }
    catch(error){
        console.log('error', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}

export async function PATCH(request:NextRequest,{params}: {params:{Id: string}}) {
    const requestId = params.Id
    const accessingUser = await getCurrentUser()

    if(!accessingUser){
        return NextResponse.json("Forbidden",{status: 403})
    }
    const foundRequest = await prisma.requests.findFirst({
        where: {
            id: requestId
            
        },
        
    })

    if(!foundRequest){
        return NextResponse.json("Not Found",{status: 404})
    }

    const userFoundRequest = await prisma.requests.findUnique({
        where: {
            id: requestId,
            OR: [
                {
                    sender: accessingUser?.id
                },
                {
                    receiver: accessingUser?.id
                }
            ]
            
        },    
    })
    if(!userFoundRequest){
        return NextResponse.json("Forbidden",{status: 403})
    }


    try{
        const updatedRequest = await prisma.$transaction( async (newPrisma) => {
            const updatedRequests = await newPrisma.requests.update({
                where:{
                    id: requestId
                },
                data:{
                    isaccepted: true
                }
            })
            
            const newConversation = await newPrisma.conversations.create({
                data: {
                    isGroup: false,
                    requestId: requestId,
                    userId: accessingUser?.id!
                }
                
            })

            await newPrisma.friends.create({
                data:{
                    conversationId: newConversation.id,
                    sender: updatedRequests.sender,
                    receiver: updatedRequests.receiver,
                    isaccepted: true
                }
            }) 

            await newPrisma.conversationsMembers.create({
                data:{
                    conversationId: newConversation.id,
                    userId: updatedRequests.receiver
                }
            })
            await newPrisma.conversationsMembers.create({
                data:{
                    conversationId: newConversation.id,
                    userId: updatedRequests.sender
                }
            })

            console.log('all created',)
            
            return updatedRequests
        })
        console.log('all created',updatedRequest)
        
        return NextResponse.json(updatedRequest, {status: 200})
    }
    catch(error){
        console.log('error', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}
export async function DELETE(request:NextRequest, {params}: {params:{Id: string}}) {
    const requestId = params.Id
    const accessingUser = await getCurrentUser()

    // if(userId !== accessingUser?.id){
    //     return NextResponse.json("Forbidden",{status: 403})
    // }
    const foundRequest = await prisma.requests.findUnique({
        where: {
            id: requestId
            
        },
        
    })

    if(!foundRequest){
        return NextResponse.json("Not Found",{status: 404})
    }

    const userFoundRequest = await prisma.requests.findUnique({
        where: {
            id: requestId,
            OR: [
                {
                    sender: accessingUser?.id
                },
                {
                    receiver: accessingUser?.id
                }
            ]
            
        },    
    })
    if(!userFoundRequest){
        return NextResponse.json("Forbidden",{status: 403})
    }


    try{
        await prisma.requests.delete({
            where:{
                id: requestId
            },
        })
        
        
        return NextResponse.json('Success', {status: 200})
    }
    catch(error){
        console.log('error', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}