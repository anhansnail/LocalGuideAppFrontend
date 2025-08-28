"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null; // TODO: lấy token từ cookies / localStorage client side

  useEffect(() => {
    if (!token) { router.push("/login"); return; }
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:4000/auth/profile", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {profile && <p>Welcome, {profile.email}</p>}
      <div className="mt-4 space-x-4">
        <button className="bg-blue-600 text-white p-2 rounded" onClick={() => router.push("/tours")}>Manage Tours</button>
        <button className="bg-green-600 text-white p-2 rounded" onClick={() => router.push("/users")}>Manage Users</button>
      </div>
    </div>
  );
}
