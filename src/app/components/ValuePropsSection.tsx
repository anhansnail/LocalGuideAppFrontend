export default function ValuePropsSection() {
  const values = [
    { title: "100% Private Tours", desc: "Enjoy fully personalized experiences" },
    { title: "Customizable Itineraries", desc: "Flexibility to match your needs" },
    { title: "24/7 Support", desc: "Always here to help you, anytime" },
    { title: "Flexible Cancellation", desc: "Easily adjust your plans" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {values.map((v, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">{v.title}</h3>
            <p className="text-gray-600">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
