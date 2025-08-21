"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
}

export default function TourDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.id;

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "", location: "" });
  const [booking, setBooking] = useState({ guests: 1, date: "" });
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:4000/tours/${tourId}`);
        const data = await res.json();
        setTour(data);
        setForm({ title: data.title, description: data.description, price: data.price.toString(), location: data.location });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchTour();
  }, [tourId]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !tour) return;
    try {
      const res = await fetch(`http://localhost:4000/tours/${tour.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: Number(form.price),
          location: form.location,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setTour(updated);
      setEditMode(false);
      setMessage("Tour updated successfully!");
    } catch (err: any) { setMessage("Error: " + err.message); }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !tour) return;
    try {
      const res = await fetch("http://localhost:4000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          tourId: tour.id,
          guests: Number(booking.guests),
          date: booking.date,
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setMessage("Booking successful!");
      setBooking({ guests: 1, date: "" });
    } catch (err: any) { setMessage("Error: " + err.message); }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!tour) return <p className="p-6">Tour not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-2">{tour.title}</h1>
      <p className="mb-2">{tour.description}</p>
      <p className="mb-2">{tour.location} - ${tour.price}</p>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* Edit tour */}
      <button
        className="mb-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Cancel Edit" : "Edit Tour"}
      </button>

      {editMode && (
        <form onSubmit={handleEditSubmit} className="mb-6 space-y-4 border p-4 rounded shadow">
          <input type="text" className="w-full border p-2 rounded" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input type="text" className="w-full border p-2 rounded" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <input type="number" className="w-full border p-2 rounded" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
          <input type="text" className="w-full border p-2 rounded" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Tour</button>
        </form>
      )}

      {/* Booking */}
      <form onSubmit={handleBookingSubmit} className="mb-6 space-y-4 border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Book This Tour</h2>
        <input type="number" className="w-full border p-2 rounded" min={1} value={booking.guests} onChange={e => setBooking({ ...booking, guests: Number(e.target.value) })} required placeholder="Number of guests" />
        <input type="date" className="w-full border p-2 rounded" value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Book Tour</button>
      </form>
    </div>
  );
}
