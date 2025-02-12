import { User } from '@/app/users/page'
import { create } from 'zustand'

// Define the type for our state
type UserState = {
  users: User[]
  fetchUsers: () => Promise<void>
  addUser: (username: string, email: string) => Promise<void>
}

// Create the Zustand store
export const useUserStore = create<UserState>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      set({ users: data })
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  },

  addUser: async (username, email) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      })

      if (!response.ok) {
        throw new Error('Failed to add user')
      }

      const newUser = await response.json()
      set((state) => ({ users: [...state.users, newUser] }))
    } catch (error) {
      console.error('Error adding user:', error)
      return Promise.reject(error)
    }
  },
}))
