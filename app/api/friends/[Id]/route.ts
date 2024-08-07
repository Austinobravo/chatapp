
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { getCurrentUser } from "@/lib/serverSessionProvider";
export async function GET(request:NextRequest,{params}: {params:{Id: string}}) {
    
    if(!params.Id){
        return NextResponse.json("Forbidden",{status: 403})
    }
    const userId = params.Id
    const accessingUser = await getCurrentUser()

    if(userId !== accessingUser?.id){
        return NextResponse.json("Forbidden",{status: 403})
    }

    try{
        
        const friends = await prisma.friends.findMany({
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
        })

        if(!friends){
            return NextResponse.json("No friends", {status: 404})

        }

        const friendsDetails = await prisma.user.findMany({
            where: {
                id:{
                    in: friends.map((member) => member.sender === userId ? member.receiver : member.sender)
                } 
            }
        });

        return NextResponse.json(friendsDetails, {status: 200})
    }
    catch(error){
        console.log('error', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}