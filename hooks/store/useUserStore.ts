import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  user: UserType | null
  setUser: (value: UserType) => void

}

export const useUserStore = create(persist<UserState>((set) => ({
  user: null,
  // setUser: (user:) => set({user}),
  setUser(loggedInUser: UserType){
    set({user:loggedInUser})
  }
  
}),
{
  name: "user",
  storage: createJSONStorage(()=> localStorage),
}
))