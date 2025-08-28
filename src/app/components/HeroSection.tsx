"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState("");

  const categories = [
    { icon: "🏥", label: "Health Buddy" },
    { icon: "👔", label: "Business Buddy" },
    { icon: "🍹", label: "Local Buddy" },
    { icon: "📷", label: "Photo Buddy" },
  ];

  const handleSearch = () => {
    console.log({ location, date, category });
    // TODO: call API search
  };

  return (
    <section className="relative h-[90vh] bg-[url('/hero.jpg')] bg-cover bg-center flex items-center justify-center text-white">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center max-w-3xl px-4">
        {/* title + desc */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Make Your Trip Easy <br /> With a Local Buddy
        </h1>
        <p className="mb-8 text-lg text-gray-200">
          Choose the most suitable Local Buddy who will accompany you throughout your trip
        </p>

        {/* search form */}
        <div className="bg-white text-black rounded-2xl shadow-xl p-6 space-y-4">
          {/* location + date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Select a location"
              className="w-full px-4 py-3 border rounded-lg outline-none"
            />

            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              placeholderText="Select date..."
              className="w-full px-4 py-3 border rounded-lg outline-none"
            />
          </div>

          {/* categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setCategory(c.label)}
                className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition ${
                  category === c.label
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>

          {/* buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-2">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700"
            >
              Find a Buddy
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300">
              Request a Buddy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
