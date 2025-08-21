"use client";
import { useEffect, useState } from "react";

interface Booking {
  id: number;
  guests: number;
  date: string;
  tour: { title: string; location: string; price: number };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchBookings = async () => {
    if (!token) return;
    const res = await fetch("http://localhost:4000/bookings/my", { headers: { Authorization: `Bearer ${token}` } });
    setBookings(await res.json());
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? <p>No bookings yet.</p> :
        <ul className="space-y-4">
          {bookings.map(b => (
            <li key={b.id} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{b.tour.title}</h2>
              <p>{b.tour.location} - ${b.tour.price}</p>
              <p>Guests: {b.guests}</p>
              <p>Date: {b.date}</p>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
