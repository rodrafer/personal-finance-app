/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUserStore } from '@/store/userStore';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddUserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   const router = useRouter();

  const { addUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        await addUser(username, email);
        setUsername('');
        setEmail('');
        setLoading(false);
        alert('User created!');
        // router.refresh();
    } catch (errorData: any) {
        setError(errorData.error || 'Failed to create user');
        setLoading(false);
        return;
    }

    // const res = await fetch('/api/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, email }),
    // });

    // if (!res.ok) {
    //   const errorData = await res.json();
    //   setError(errorData.error || 'Failed to create user');
    //   setLoading(false);
    //   return;
    // }

    // setUsername('');
    // setEmail('');
    // setLoading(false);
    // alert('User created!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add User'}
      </button>
    </form>
  );
}
