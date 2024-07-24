import { formSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import { hashedPassword } from "@/lib/helpers"

export async function POST(request: Request, response: Response){
    const data = await request.json()
    const {email, username, password} = data


    const parsedForm = await formSchema.safeParseAsync(data)
    if(!parsedForm.success){
        return NextResponse.json(parsedForm.error, {status: 403})
    }
    const newPassword = await hashedPassword(password)

    const existingEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(existingEmail){
        return NextResponse.json('Email already used', {status: 403})
    }

   try{

    await prisma.user.create({
        data: {
            email,
            username,
            password:newPassword , 
        }
    })
    return NextResponse.json('Success', {status: 201})


   }
   catch(error){
    return NextResponse.error()
   }
}