import React from "react";

const Footer = () => {
  // Data untuk Footer
  const sections = [
    {
      title: "Titipin",
      content: <p>Penyedia Layanan Penitipan Barang Teraman dan Terbaik.</p>,
    },
    {
      title: "Menu",
      items: [
        { label: "Beranda", href: "#beranda" },
        { label: "Tentang", href: "#tentang" },
        { label: "Cara Nitipin", href: "#cara-nitipin" },
        { label: "FAQ", href: "#faq" },
        { label: "Kontak", href: "#kontak" },
      ],
    },
    {
      title: "Social Media",
      items: [
        { label: "WhatsApp", href: "https://wa.me/1234567890" },
        { label: "Instagram", href: "https://instagram.com/yourusername" },
        { label: "Email", href: "mailto:your-email@example.com" },
      ],
    },
    {
      title: "Mulai Titipin",
      items: [
        { label: "Masuk", href: "#masuk-daftar" },
        { label: "Daftar", href: "#masuk-daftar" },
        { label: "Mulai Titipin", href: "#mulai-titipin" },
      ],
    },
  ];

  return (
    <footer className="bg-white text-slate-500 py-12 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold text-slate-600">
              {section.title}
            </h3>
            {section.content ? (
              <div className="mt-2">{section.content}</div>
            ) : (
              <ul className="mt-4 space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-emerald-500">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Credit */}
      <div className="text-center mt-12 text-sm border-t border-slate-300 pt-8">
        <p>&copy; 2024 Titipin - Kelompok 1 Fullstack C Vocasia.</p>
      </div>
    </footer>
  );
};

export default Footer;
