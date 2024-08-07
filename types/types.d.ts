

type UserType = {
    id: string
    email: string
    username: string
    image?: string

    friends: Array[]
    requests: RequestType[]
    conversations: ConversationType[]
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
    message: MessageType[]
    conversationMembers: ConversationMemberType[]
  
}

type RequestType = {
    id:string

    isaccepted: boolean
    sender: string
    receiver: string
    user: UserType
    conversation: ConversationType

}

type FriendType = {
    id:string

    isaccepted: boolean
    sender: string
    receiver: string
    user: UserType
    conversation: ConversationType

}

type MessageType = {
        id: string
        conversationId: string
        conversation: ConversationType[]
        userId: string
        user: UserType[]
        message: string
        createdAt: number
}

type ConversationMemberType = {
    id: string
    userId: string
    user:UserType
    conversationId: string
    conversation: ConversationType

}

type UpdatedConversationType = {
    conversationMember: ConversationMemberType
    existingConversation: ConversationType
    otherMemberDetails: UserType
   
}