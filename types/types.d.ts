

type UserType = {
    id: string
    email: string
    username: string
    image?: string

    friends: Array[]
    requests: Array[]
    conversations: Array[]
    requests: RequestType[]
    createdAt: string
}
type ConversationType = {
    id: string
    name: string
  
    requestId: string
    request: RequestType
    friends: Array[]
    lastMessage: string
    isGroup: boolean
    message: Array[]
    conversationMembers: Array[]
  
}

type RequestType = {
    id:string

    isaccepted: boolean
    sender: string
    receiver: string
    user: UserType

}