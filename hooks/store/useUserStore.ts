import { create } from 'zustand'

interface UserState {
  user: UserType | undefined
  addUser: (value: UserType) => void

}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  addUser(loggedInUser: UserType){
    set({user:loggedInUser})
  }
  
}))