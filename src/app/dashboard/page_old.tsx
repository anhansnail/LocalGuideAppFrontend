"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile { userId: number; email: string; }
interface Tour { id: number; title: string; description: string; price: number; location: string; }

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTour, setNewTour] = useState({ title: "", description: "", price: "", location: "" });
  const [editingTourId, setEditingTourId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/profile", { headers: { Authorization: `Bearer ${token}` }});
      if (!res.ok) throw new Error("Unauthorized");
      setProfile(await res.json());
    } catch (err) { router.push("/login"); }
  };

  const fetchTours = async () => {
    try { const res = await fetch("http://localhost:4000/tours"); setTours(await res.json()); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { if (!token) { router.push("/login"); return; } fetchProfile(); fetchTours(); }, [token]);

  const handleAddOrEditTour = async (e: React.FormEvent) => {
    e.preventDefault(); setMessage("");
    const url = editingTourId ? `http://localhost:4000/tours/${editingTourId}` : "http://localhost:4000/tours";
    const method = editingTourId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: newTour.title, description: newTour.description, price: Number(newTour.price), location: newTour.location }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      if (editingTourId) {
        setTours(tours.map(t => t.id === editingTourId ? updated : t));
        setEditingTourId(null);
        setMessage("Tour updated successfully!");
      } else {
        setTours([...tours, updated]);
        setMessage("Tour added successfully!");
      }
      setNewTour({ title: "", description: "", price: "", location: "" });
    } catch (err: any) { setMessage("Error: " + err.message); }
  };

  const handleEditClick = (tour: Tour) => {
    setEditingTourId(tour.id);
    setNewTour({ title: tour.title, description: tour.description, price: tour.price.toString(), location: tour.location });
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa tour này?")) return;
    try {
      const res = await fetch(`http://localhost:4000/tours/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Delete failed");
      setTours(tours.filter(t => t.id !== id));
      setMessage("Tour deleted successfully!");
    } catch (err: any) { setMessage("Error: " + err.message); }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      {profile && (<div className="mb-6 p-4 border rounded shadow"><h2 className="text-xl font-bold">Profile</h2><p>Email: {profile.email}</p><p>UserId: {profile.userId}</p></div>)}

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{editingTourId ? "Edit Tour" : "Add New Tour"}</h2>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        <form onSubmit={handleAddOrEditTour} className="space-y-4">
          <input type="text" placeholder="Title" className="w-full border p-2 rounded"
            value={newTour.title} onChange={e => setNewTour({ ...newTour, title: e.target.value })} required />
          <input type="text" placeholder="Description" className="w-full border p-2 rounded"
            value={newTour.description} onChange={e => setNewTour({ ...newTour, description: e.target.value })} required />
          <input type="number" placeholder="Price" className="w-full border p-2 rounded"
            value={newTour.price} onChange={e => setNewTour({ ...newTour, price: e.target.value })} required />
          <input type="text" placeholder="Location" className="w-full border p-2 rounded"
            value={newTour.location} onChange={e => setNewTour({ ...newTour, location: e.target.value })} required />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">{editingTourId ? "Update Tour" : "Add Tour"}</button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Danh sách Tours</h2>
        {tours.length === 0 ? <p>Chưa có tour nào.</p> :
          <ul className="space-y-4">
            {tours.map(t => (
              <li key={t.id} className="p-4 border rounded shadow flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{t.title}</h3>
                  <p>{t.description}</p>
                  <p>{t.location} - ${t.price}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEditClick(t)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDeleteClick(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}
