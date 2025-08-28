export default function TrustMetricsSection() {
  const stats = [
    { label: "Travelers Served", value: "3,004,222" },
    { label: "Guides", value: "5,065" },
    { label: "Countries", value: "200+" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-4xl font-bold text-emerald-600">{s.value}</h3>
            <p className="mt-2 text-gray-700">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
