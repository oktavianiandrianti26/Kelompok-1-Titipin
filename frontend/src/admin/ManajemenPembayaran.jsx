import React, { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import {HeaderManajemenPembayaran } from "../components/HeaderAdmin";

const ManajemenPembayaran = ({ showHeader = true, showSidebar = true }) => {
  const data = [
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      nama: "Andi Pratama",
      email: "andipratama@gmail.com",
      payment: "QRIS",
      total: "Rp. 20.000",
      status: "Selesai",
      foto: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
    },
    {
      nomor: "0002",
      tanggal: "12-12-2024",
      nama: "Johnatan Malik",
      email: "malikjohn@gmail.com",
      payment: "BRIVA",
      total: "Rp. 100.000",
      status: "Selesai",
      foto: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
    },
    // Data tambahan bisa ditambahkan di sini...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Menampilkan 6 item per halaman

  // Membagi data berdasarkan halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk menangani klik tombol pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Admin - Ditampilkan hanya jika showSidebar = true */}
      {showSidebar && <SidebarAdmin />}

      {/* Konten Utama */}
      <div className="flex-grow flex flex-col">
        {/* Header - Ditampilkan hanya jika showHeader = true */}
        {showHeader && (
          <div className="flex justify-between items-center p-0 bg-white">
          <HeaderManajemenPembayaran />
        </div>
        )}

        <div className="w-full max-w-full rounded-lg p-5">
          <div className="px-0">
            {/* Tabel */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-emerald-500">
                <thead className="bg-white">
                  <tr className="text-gray-600">
                    <th
                      colSpan="6"
                      className="p-3 border border-emerald-500 text-left text-xl font-semibold text-gray-900"
                    >
                      Daftar Pengguna
                    </th>
                  </tr>
                  <tr className="text-gray-800 border-b border-emerald-500">
                    <th className="p-3 text-left bg-white">Nomor</th>
                    <th className="p-3 text-left bg-white">Tanggal</th>
                    <th className="p-3 text-left bg-white">Pengguna</th>
                    <th className="p-3 text-left bg-white">Pembayaran</th>
                    <th className="p-3 text-left bg-white">Total</th>
                    <th className="p-3 text-left bg-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white text-gray-800 border-b border-emerald-500"
                    >
                      <td className="p-3 text-left">{item.nomor}</td>
                      <td className="p-3 text-left whitespace-nowrap">
                        <span className="bg-emerald-100 text-gray-800 px-3 py-1 rounded-md font-semibold">
                          {item.tanggal}
                        </span>
                      </td>
                      <td className="p-3 text-left">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.foto}
                            alt="Foto Pengguna"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.nama || "Nama tidak tersedia"}
                            </p>
                            <p className="text-gray-700">
                              {item.email || "Email tidak tersedia"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-left">
                        <span className="font-semibold text-gray-700">
                          {item.payment}
                        </span>
                      </td>
                      <td className="p-3 text-left">
                        <span className="text-gray-800 px-3 py-1 rounded-md">
                          {item.total}
                        </span>
                      </td>
                      <td className="p-3 text-left">
                        <span className="bg-emerald-500 text-slate-50 px-3 py-1 rounded-full">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6" className="p-3">
                      {/* Pagination */}
                      <div className="flex justify-end items-center space-x-2">
                        {[1, 2, 3].map((page) => (
                          <button
                            key={page}
                            className={`w-8 h-8 ${
                              currentPage === page
                                ? "bg-emerald-700"
                                : "bg-emerald-500"
                            } text-white rounded-full`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPembayaran;
