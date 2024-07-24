import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

import prisma from '@/lib/prisma'
import { comparePassword } from "@/lib/helpers";
export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    placeholder: 'Your Email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    placeholder: 'Your Password',
                    type: 'password'
                },
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials.password) throw new Error('Invalid credentials')

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if (!user) throw new Error("Invalid credentials")

                const isCorrectPassword = await comparePassword(credentials.password, user.password)
                if(!isCorrectPassword) throw new Error("Invalid credentials")

                const {password, ...UserWithoutPassword} = user
                return UserWithoutPassword
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    callbacks: {
        session: async ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    username: token.username,

                }
            }
        },
        async jwt ({token, user}) {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    username: (user as UserType).username,
                    email: user.email,
                    // conversations: (user as UserType).conversations,
                    // friends: (user as UserType).friends
                }
            }
            return token
            
        },
    }
}