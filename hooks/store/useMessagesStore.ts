import { create } from 'zustand'

interface MessageState {
  message: ConversationType[]
  add : (message: any) => void

}

export const useConversationStore = create<MessageState>()((set) => ({
  message: [],
  add(message:any){
    set((state)=>({message: [...state.message, message]}))
  }
}))