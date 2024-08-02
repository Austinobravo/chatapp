import { getCurrentUser } from "@/lib/serverSessionProvider"
import {   NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request:NextRequest, {params}: {params:{conversationId: string}}) {
    const conversationId = params.conversationId
    const accessingUser = await getCurrentUser()

    if(!accessingUser?.id){
        return NextResponse.json("Forbidden",{status: 403})
    }

    const existingConversation = await prisma.conversations.findUnique({
        where:{
            id:conversationId
        }
    })
    if(!existingConversation){
        return NextResponse.json("Not Found", {status: 404})
    }

    // const userInConversationMembers = await prisma.conversationsMembers.findUnique({
    //     where:{
    //         id: conversationId,
    //         userId: accessingUser?.id
    //     },

    // })
    // if(!userInConversationMembers){
    //     return NextResponse.json('Forbidden', {status: 403})
    // }

    try{

        const conversationMembers = await prisma.conversationsMembers.findMany({
            where:{
                conversationId: conversationId
            }
        })
        const userInConversation = conversationMembers.find((member)=> member.userId === accessingUser?.id)

        if(!userInConversation){
            return NextResponse.json("Forbidden", {status: 403})
        }

        const allConversationMembersDetails = await Promise.all(conversationMembers?.map(async (members) => {
            const conversationMember = await prisma.user.findMany({
                where: {
                    id: members.userId
                }
            });
            if (!conversationMember) {
                return null;
            }
            if(existingConversation?.isGroup){
                return {conversationMember,existingConversation}
            }else{
                const otherMember = conversationMember.find((member)=> member?.id !== accessingUser?.id)
                return {existingConversation, otherMember}
            }
        }))
        const filteredConversationsMembersDetails = allConversationMembersDetails.filter(convo => convo !== null);
        console.log("filtered", filteredConversationsMembersDetails)
        return NextResponse.json(filteredConversationsMembersDetails, {status: 200})

    }
    catch(error){
        console.log("error", error)
        return NextResponse.json({status: 505})
    }
}