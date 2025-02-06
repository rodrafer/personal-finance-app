export default async function UsersPage() {
    // Fetch users from the backend API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: 'no-store', // Ensures fresh data on each request
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
  
    const users = await res.json();
  
    return (
      <main>
        <h1>Users List</h1>
        <ul>
          {users.map((user: { _id: string; username: string; email: string }) => (
            <li key={user._id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      </main>
    );
  }
  