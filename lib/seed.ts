import { PrismaClient } from "@prisma/client";
import { hashedPassword } from "./helpers";

const prisma = new PrismaClient()
async function main() {
    const newUser = await prisma.user.create({
        data:{
            username: "Cynthia",
            email: 'austinobravo1@gmail.comm',
            password: await hashedPassword('!Password1')
        }
    })

    console.log('newUser', newUser)
    

}
main()
.then(async() =>{
    await prisma.$disconnect()
})
.catch(async(error) => {
    console.error("error", error)
    await prisma.$disconnect()
    process.exit(1)
})