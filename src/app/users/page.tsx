"use client";
import { useEffect, useState } from "react";

interface User { id: number; email: string; }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:4000/users"); // backend: GET /users
    setUsers(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách Users</h1>
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.id} className="border p-2 rounded">{u.email}</li>
        ))}
      </ul>
    </div>
  );
}
