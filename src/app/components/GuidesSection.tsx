export default function GuidesSection() {
  const guides = [
    { name: "Anna", location: "Rome", rating: 4.9, image: "/guide1.jpg" },
    { name: "David", location: "Berlin", rating: 4.8, image: "/guide2.jpg" },
    { name: "Fatima", location: "Cairo", rating: 5.0, image: "/guide3.jpg" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Meet Your Local Guides
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((g, i) => (
          <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
            <img src={g.image} alt={g.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{g.name}</h3>
              <p className="text-gray-600">{g.location}</p>
              <p className="text-yellow-500">⭐ {g.rating}</p>
              <button className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
