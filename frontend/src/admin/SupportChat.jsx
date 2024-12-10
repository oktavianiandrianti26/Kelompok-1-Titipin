import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderSupportChat } from "../components/HeaderAdmin";

const SupportChat = () => {
  const chatData = [
    {
      id: 1,
      name: "Andi Pratama",
      email: "andipratama@gmail.com",
      message: "Apakah di Titipin bisa menitip barang yang berukuran besar?",
    },
    {
      id: 2,
      name: "Rina Saraswati",
      email: "rinasaraswati@gmail.com",
      message: "Berapa biaya untuk penitipan barang per hari?",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budisantoso@gmail.com",
      message: "Apakah ada diskon untuk penitipan jangka panjang?",
    },
    {
      id: 4,
      name: "Siti Aminah",
      email: "sitiaminah@gmail.com",
      message: "Bagaimana prosedur pengambilan barang setelah penitipan?",
    },
    {
      id: 5,
      name: "Joko Widodo",
      email: "jokowidodo@gmail.com",
      message: "Berapa batas waktu maksimal penitipan barang?",
    },
    {
      id: 6,
      name: "Dewi Lestari",
      email: "dewilestari@gmail.com",
      message: "Apakah penitipan barang aman dan terjamin?",
    },
  ];

  const handleReply = (id) => {
    console.log(`Reply sent for chat ID: ${id}`);
  };

  const handleIgnore = (id) => {
    console.log(`Chat ID: ${id} ignored.`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <HeaderSupportChat title="Support Chat" />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Anda dapat membalas pesan yang dikirimkan pengguna.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatData.map((chat) => (
              <div
                key={chat.id}
                className="border border-emerald-500 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2">
                  <p className="font-medium">{chat.name}</p>
                  <p className="text-sm text-gray-500">{chat.email}</p>
                </div>
                <p className="mb-4">{chat.message}</p>
                <textarea
                  placeholder="Ketik balasan Anda di sini"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-green-500"
                  style={{ backgroundColor: "#d1fae5" }} // Mengatur warna latar
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => handleIgnore(chat.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Abaikan
                  </button>
                  <button
                    onClick={() => handleReply(chat.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
