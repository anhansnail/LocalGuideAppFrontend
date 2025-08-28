export default function DestinationsSection() {
  const destinations = [
    { name: "Naples", tours: 120, image: "/napoli.jpg" },
    { name: "Berlin", tours: 80, image: "/berlin.jpg" },
    { name: "Cairo", tours: 95, image: "/cairo.jpg" },
    { name: "Lisbon", tours: 110, image: "/lisbon.jpg" },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Top Destinations</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {destinations.map((d, i) => (
          <div
            key={i}
            className="relative h-60 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img
              src={d.image}
              alt={d.name}
              className="w-full h-full object-cover group-hover:scale-110 transition"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
              <h3 className="text-xl font-bold">{d.name}</h3>
              <p>{d.tours} tours</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
