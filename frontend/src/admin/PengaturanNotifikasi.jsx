import React, { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderPengirimanNotifikasi } from "../components/HeaderAdmin";
import { Buttons } from "../components/Button";

const PengaturanNotifikasi = () => {
  const [pengguna, setPengguna] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pengguna || !pesan) {
      alert("Pengguna dan Pesan harus diisi!");
      return;
    }

    try {
      const response = await fetch(
        "https://api-titipin.vocasia-fsjs-c.fun/api/notifications/send-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Menambahkan token di header
          },
          body: JSON.stringify({
            senderEmail: "titipin.services@gmail.com",
            senderPassword: "cucl oxfi mgsn rsaq",
            recipients: pengguna,
            message: pesan,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Notifikasi berhasil dikirim!");
        setPengguna("");
        setPesan("");
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim notifikasi.");
    }
  };

  const handleBatal = () => {
    setPengguna("");
    setPesan("");
  };

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <main className="flex-1 p-6">
        <HeaderPengirimanNotifikasi />
        <div className="border border-emerald-500 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Pengiriman Notifikasi
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pengguna
              </label>
              <input
                type="text"
                value={pengguna}
                onChange={(e) => setPengguna(e.target.value)}
                className="w-full p-2 rounded-lg bg-green-100 border border-green-200"
                placeholder="Email penerima"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Pesan
              </label>
              <textarea
                rows="3"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="w-full p-2 rounded-lg bg-green-100 border border-green-200"
                placeholder="Pesan yang akan dikirim"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              {Buttons.batal(handleBatal)}
              {Buttons.kirimNotifikasi(handleSubmit)}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PengaturanNotifikasi;
