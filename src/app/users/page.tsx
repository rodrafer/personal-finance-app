import AddUserForm from '@/components/AddUserForm';

export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const users = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <AddUserForm />
      <ul className="mt-6 space-y-2">
        {users.map((user: { _id: string; username: string; email: string }) => (
          <li key={user._id} className="border p-2 rounded">
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </main>
  );
}
