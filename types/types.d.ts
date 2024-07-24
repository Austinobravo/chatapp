type UserType = {
    id: string
    email: string
    username: string
    image?: string

    friends: Array[]
    conversations: Array[]
    createdAt: string
}
type ConversationType = {
    id: string
    isGroup: boolean


    userId: string
    createdAt: string
}