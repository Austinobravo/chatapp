import { getCurrentUser } from "@/lib/serverSessionProvider";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { NextApiResponse } from "next";

export async function GET(request:Request) {
    const user = await getCurrentUser()

    if(!user){
        return NextResponse.json('Not found', {status: 404})
    }
    
    const currentUser = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })
    
    if(currentUser?.id !== user.id){
        return NextResponse.json('Forbidden', {status: 403})
    }
    
    
    try{
        const getUserConversations = await prisma.conversationsMembers.findMany({
            orderBy:{
                createdAt: 'asc'
            },
            where: {
                userId: user.id
            }
        })

        const conversations =  await Promise.all(getUserConversations?.map(async (members) => {
            const conversation = await prisma.conversations.findUnique({
                where: {
                    id: members.conversationId
                }
            });
            if (!conversation) {
                return null;
            }
            return conversation;
        }))

        // Filter out any null values that might have been returned for non-existent conversations
        const filteredConversations = conversations.filter(convo => convo !== null);


        const conversationsWithDetails =  await Promise.all( filteredConversations?.map(async(conversation) => {
            const conversationMembers = await prisma.conversationsMembers.findMany({
                where:{
                    conversationId: conversation.id
                }
            })
            if(!conversation){
                return null
            }
            const otherConversationMembers = conversationMembers.find((members) => members.userId !== currentUser.id)
            if (!otherConversationMembers) {
                return null;
            }
            const otherMember = await prisma.user.findUnique({
                where:{
                    id: otherConversationMembers.userId
                }
            })

            return {conversation, otherMember}
            // if(conversation.isGroup){
            //     return conversation
            // }else{
            // }
            
        }))
        // Filter out any null values
        const filteredConversationsWithDetails = conversationsWithDetails.filter(convo => convo !== null);

        return NextResponse.json(filteredConversationsWithDetails, { status: 200 });
        
    }
    catch(error){
        console.error("Error", error)
        return NextResponse.error()

    }
    
}

export async function POST(request: Request, response: NextApiResponse){
    const data = await request.json()
    const accessingUser = await getCurrentUser()

    if(!accessingUser){
        return NextResponse.json('Forbidden', {status: 403})
    }

    const {members, name, userId} = data

    if(userId !== accessingUser?.id){
        return NextResponse.json('Forbidden', {status: 403})
    }

    try{
        await prisma.$transaction(async(newPrisma) => {
            const conversation = await newPrisma.conversations.create({
                data: {
                    name: name,
                    createdBy: userId,
                    isGroup: true,
                }
    
            })
            const otherMember = await Promise.all([...members, userId].map(async (member) => {
                await newPrisma.conversationsMembers.create({
                   data:{
                       userId:member,
                       conversationId: conversation.id
                   }
               })

               const userDetails = await newPrisma.user.findUnique({
                where: {
                    id: member
                }
               })

               return userDetails
    
            }))
            return {conversation, otherMember}

        })

        const getUserConversations = await prisma.conversationsMembers.findMany({
            orderBy:{
                createdAt: 'asc'
            },
            where: {
                userId: userId
            }
        })

        const conversations =  await Promise.all(getUserConversations?.map(async (members) => {
            const conversation = await prisma.conversations.findUnique({
                where: {
                    id: members.conversationId
                }
            });
            if (!conversation) {
                return null;
            }
            return conversation;
        }))

        // Filter out any null values that might have been returned for non-existent conversations
        const filteredConversations = conversations.filter(convo => convo !== null);


        const conversationsWithDetails =  await Promise.all( filteredConversations?.map(async(conversation) => {
            const conversationMembers = await prisma.conversationsMembers.findMany({
                where:{
                    conversationId: conversation.id
                }
            })
            if(!conversation){
                return null
            }
            const otherConversationMembers = conversationMembers.find((members) => members.userId !== accessingUser?.id)
            if (!otherConversationMembers) {
                return null;
            }
            const otherMember = await prisma.user.findUnique({
                where:{
                    id: otherConversationMembers.userId
                }
            })

            return {conversation, otherMember}
            
        }))
        // Filter out any null values
        const filteredConversationsWithDetails = conversationsWithDetails.filter(convo => convo !== null);

        return NextResponse.json(filteredConversationsWithDetails, { status: 200 });
       
    }
    catch(error){
        console.log('err', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}