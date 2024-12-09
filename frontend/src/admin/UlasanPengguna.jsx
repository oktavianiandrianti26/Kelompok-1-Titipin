import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderUlasanPengguna } from "../components/HeaderAdmin";

const UlasanPengguna = () => {
  const chatData = [
    { id: 1, name: "Andi Pratama", email: "andipratama@gmail.com", message: "Pengiriman Tepat waktu dan aman" },
    { id: 2, name: "Rina Saraswati", email: "rinasaraswati@gmail.com", message: "Pengiriman Tepat waktu dan aman" },
    { id: 3, name: "Budi Santoso", email: "budisantoso@gmail.com", message: "Pengiriman Tepat waktu dan aman" },
    { id: 4, name: "Siti Aminah", email: "sitiaminah@gmail.com", message: "Pengiriman Tepat waktu dan aman" },
    { id: 5, name: "Joko Widodo", email: "jokowidodo@gmail.com", message: "Pengiriman Tepat waktu dan aman" },
    { id: 6, name: "Dewi Lestari", email: "dewilestari@gmail.com", message: "Pengiriman Tepat waktu dan aman" },
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
        <HeaderUlasanPengguna/>
        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chatData.map((chat) => (
              <div
                key={chat.id}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
              >
                <div className="mb-2">
                  <p className="font-medium text-gray-700">{chat.name}</p>
                  <p className="text-sm text-gray-500">{chat.email}</p>
                </div>
                <p className="mb-4 text-gray-600">{chat.message}</p>
                <textarea
                  placeholder="Ketik balasan Anda di sini"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-green-500"
                  style={{ backgroundColor: "#d1fae5" }}
                />
                <div className="flex justify-between space-x-2">
                  <button
                    onClick={() => handleIgnore(chat.id)}
                    className="flex-1 bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Abaikan
                  </button>
                  <button
                    onClick={() => handleReply(chat.id)}
                    className="flex-1 bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition"
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

export default UlasanPengguna;
