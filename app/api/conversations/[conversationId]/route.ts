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
        },
        include:{
            message: true
        }
    })
   
    if(!existingConversation){
        return NextResponse.json("Not Found", {status: 404})
    }

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

        let response;

        if(existingConversation.isGroup){
            const conversationMember = await prisma.user.findMany({
                where: {
                    id:{
                        in: conversationMembers.map((member) => member.userId)
                    } 
                }
            });
            if (!conversationMember) {
                return NextResponse.json("Not Found", {status: 404});
            }
            response = {conversationMember,existingConversation}
        }else{
            const otherMember = conversationMembers.find((member)=> member?.id !== accessingUser?.id)

            if(!otherMember){
                return NextResponse.json("Not Found", {status: 404})
            }

            const otherMemberDetails = await prisma.user.findUnique({
                where:{
                    id: otherMember.userId
                }
            })

            if(!otherMemberDetails){
                return NextResponse.json("Not Found", {status: 404})
            }
            
            response =  {existingConversation, otherMemberDetails}
        }

        return NextResponse.json(response, {status: 200})

    }
    catch(error){
        console.log("error", error)
        return NextResponse.json({status: 505})
    }
}

