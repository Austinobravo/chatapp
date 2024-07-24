import { create } from 'zustand'

interface UserState {
  user: UserType | undefined

}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  
}))