import { formSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import { hashedPassword } from "@/lib/helpers"

export async function POST(request: Request, response: Response){
    const data = await request.json()
    const {email, username, password} = data


    const parsedForm = formSchema.safeParse(data)

    if(!parsedForm.success){
        return NextResponse.json(parsedForm.error, {status: 403})
    }

   try{

    await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword(password), 
        }
    })
    return NextResponse.json('Success', {status: 201})


   }
   catch(error){
    return NextResponse.error()
   }
}