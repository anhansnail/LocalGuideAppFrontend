import { useState } from "react";

export default function LocationSearch({ onSelect }: { onSelect: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const locations = [
    "Hanoi, Vietnam",
    "Ho Chi Minh City, Vietnam",
    "Da Nang, Vietnam",
    "Hoi An, Vietnam",
    "Bangkok, Thailand",
    "Singapore",
    "Tokyo, Japan",
  ];

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
    } else {
      const results = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
      setShowDropdown(true);
    }
  };

  const handleSelect = (loc: string) => {
    setQuery(loc);
    setShowDropdown(false);
    onSelect(loc);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Select a location"
        className="w-full px-4 py-3 border rounded-lg outline-none"
        onFocus={() => query && setShowDropdown(true)}
      />
      {showDropdown && filtered.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto z-20">
          {filtered.map((loc, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(loc)}
              className="px-4 py-2 cursor-pointer hover:bg-emerald-100"
            >
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
