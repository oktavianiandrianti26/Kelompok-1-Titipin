import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin"; // Gunakan SidebarAdmin agar konsisten
import { HeaderManajemenPenitipanBarang } from "../components/HeaderAdmin";
import axios from "axios";

const ManajemenPenitipanBarang = () => {
  const [dataPenitipan, setDataPenitipan] = useState([]); // State untuk menyimpan data transaksi
  const [error, setError] = useState(null); // State untuk menangani error
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Tidak ada token, silakan login terlebih dahulu.");
        return;
      }
      try {
        // Mengambil data transaksi dari API
        const response = await axios.get(
          "http://localhost:3000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Menyimpan data transaksi ke dalam state
        setDataPenitipan(response.data);
      } catch (error) {
        // Menangani error jika ada masalah dalam pengambilan data
        setError("Terjadi kesalahan saat mengambil data transaksi.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Memanggil fungsi untuk mengambil data
  }, []); // Efek hanya dijalankan sekali saat komponen pertama kali dipasang

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderManajemenPenitipanBarang />

        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          <div className="bg-white rounded-lg shadow p-4">
            {/* Memeriksa apakah ada error */}
            {error ? (
              <div className="text-red-600 text-center">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dataPenitipan.map((data, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 flex flex-col justify-between"
                  >
                    <h2 className="text-lg font-medium text-gray-600 mb-4"></h2>
                    <div className="border-b pb-4 mb-4 last:mb-0 last:border-b-0">
                      <p className="font-medium">{data.nama}</p>
                      <p className="text-gray-500 text-sm">{data.email}</p>
                      <p className="text-gray-500 text-sm">{data.noHp}</p>
                      <p className="text-gray-500 text-sm">
                        kontak: {data.kontak}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Durasi : {data.duration.startDate} -{" "}
                        {data.duration.endDate}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Alamat: {data.alamatPenjemputan}
                      </p>
                      <p className="text-gray-500 text-sm">
                        total biaya: {data.total_biaya_jemput}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPenitipanBarang;
