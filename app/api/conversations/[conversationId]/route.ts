import { getCurrentUser } from "@/lib/serverSessionProvider"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
export async function GET(request:NextRequest, {params}: {params:{conversationId: string}}) {
    const conversationId = params.conversationId
    const accessingUser = await getCurrentUser()

    // if(userId !== accessingUser?.id){
    //     return NextResponse.json("Forbidden",{status: 403})
    // }

    const existingConversation = await prisma.conversations.findUnique({
        where:{
            id:conversationId
        }
    })
    if(!existingConversation){
        return NextResponse.json("Not Found", {status: 404})
    }

    const userInConversationMembers = await prisma.conversationsMembers.findUnique({
        where:{
            id: conversationId,
            userId: accessingUser?.id
        },

    })
    // if(!userInConversationMembers){
    //     return NextResponse.json('Forbidden', {status: 403})
    // }

    try{
        const conversation =await prisma.conversations.findUnique({
            where: {
                id: conversationId
            },
            include: {
                conversationMembers: {
                    include: {
                        user: true 
                    }
                },
                message: true
            }
        });

        return NextResponse.json(conversation, {status: 200})

    }
    catch(error){
        console.log("error", error)
        return NextResponse.json({status: 505})
    }
}