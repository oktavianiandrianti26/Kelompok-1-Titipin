import React from "react";
import SidebarAdmin from "../components/SidebarAdmin"; // Gunakan SidebarAdmin agar konsisten
import { HeaderManajemenPenitipanBarang } from "../components/HeaderAdmin";

const ManajemenPenitipanBarang = () => {
  const dataPenitipan = [
    {
      nama: "Andi Pratama",
      email: "andipratama@gmail.com",
      noHp: "08123456789",
      jumlahBarang: 3,
      deskripsi: "Barang adalah Vas Bunga, Koper, dan Bola Basket",
      alamat: "maps.com/jl-alam-no-1",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderManajemenPenitipanBarang />

        <div className="p-4 sm:p-6 bg-gray-100 flex-1">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Penitipan Masuk", "Penjemputan", "Sedang Dititipkan", "Pengembalian"].map((kategori, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col justify-between"
                >
                  <h2 className="text-lg font-medium text-gray-600 mb-4">
                    {kategori}
                  </h2>
                  {dataPenitipan.map((data, idx) => (
                    <div
                      key={idx}
                      className="border-b pb-4 mb-4 last:mb-0 last:border-b-0"
                    >
                      <p className="font-medium">{data.nama}</p>
                      <p className="text-gray-500 text-sm">{data.email}</p>
                      <p className="text-gray-500 text-sm">{data.noHp}</p>
                      <p className="text-gray-500 text-sm">
                        Jumlah Barang: {data.jumlahBarang}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Deskripsi: {data.deskripsi}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Alamat: {data.alamat}
                      </p>
                      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 w-full">
                        {index === 0
                          ? "Proses Penjemputan"
                          : index === 1
                          ? "Proses Penitipan"
                          : index === 2
                          ? "Proses Pengembalian"
                          : "Selesai"}
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPenitipanBarang;
