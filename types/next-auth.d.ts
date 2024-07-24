import type { User } from "next-auth";

declare module 'next-auth'{
    interface User{
        id: string
    }
}

declare module 'next-auth'{
    interface Session{
        user:{
            username: string
            email: string
            id: string
            friends: Array[]
            conversations: Array[]
            createdAt: string
        }
    }
}