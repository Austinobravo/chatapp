

type UserType = {
    id: string
    email: string
    username: string
    image?: string

    friends: Array[]
    requests: Array[]
    conversations: Array[]
    createdAt: string
}
type ConversationType = {
    id: string
    isGroup: boolean


    userId: string
    createdAt: string
}

type RequestType = {
    id:string

    isaccepted: boolean
    sender: string
    receiver: string
    user: UserType

}