import { create } from 'zustand'

interface MessageState {
  message: ConversationType[]

}

export const useConversationStore = create<MessageState>()((set) => ({
  message: [],
  
}))