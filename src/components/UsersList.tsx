'use client'

import { User } from '@/app/users/page'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'

export default function UsersList({ initialUsers }: { initialUsers: User[] }) {
  const { users, fetchUsers } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const usersList = users.length > 0 ? users : initialUsers

  return (
    <ul className="mt-6 space-y-2">
      {usersList.map((user: User) => (
        <li key={user._id} className="border p-2 rounded">
          {user.username} ({user.email})
        </li>
      ))}
    </ul>
  )
}
