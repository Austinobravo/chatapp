import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  user: UserType | undefined
  requests: RequestType[] | undefined
  friends: UserType[] | undefined
  messages: UpdatedConversationType | undefined
  conversations: any | undefined
  setUser: (value: UserType) => void
  setConversation: (value: any) => void
  setRequests: (value: RequestType[]) => void
  setFriends: (value: UserType[]) => void
  setMessages: (value: UpdatedConversationType) => void

}

export const useUserStore = create(persist<UserState>((set) => ({
  user: undefined,
  requests: undefined,
  friends: undefined,
  messages: undefined,
  conversations: undefined,
  setUser(loggedInUser: UserType){
    set({user:loggedInUser})
  },
  setConversation(convo: any){
    set({conversations:convo})
  },
  setRequests(request: RequestType[]){
    set({requests:request})
  },
  setFriends(friend: UserType[]){
    set({friends:friend})
  },
  setMessages(message: UpdatedConversationType){
    set({messages:message})
  },

  
}),
{
  name: "user",
  storage: createJSONStorage(()=> localStorage),
}
))