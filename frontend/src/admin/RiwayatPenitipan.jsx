import React, { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderRiwayatPenitipan } from "../components/HeaderAdmin";

const RiwayatPenitipan = () => {
  const data = [
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      deskripsi:
        "Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nAlamat: maps.com/jl-alam-no-1",
      total: "Rp. 20.000",
      pengguna: {
        nama: "Andi Pratama",
        email: "andipratama@gmail.com",
        foto: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
      },
    },
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      deskripsi:
        "Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nAlamat: maps.com/jl-alam-no-1",
      total: "Rp. 20.000",
      pengguna: {
        nama: "Andi Pratama",
        email: "andipratama@gmail.com",
        foto: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
      },
    },
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      deskripsi:
        "Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nAlamat: maps.com/jl-alam-no-1",
      total: "Rp. 20.000",
      pengguna: {
        nama: "Andi Pratama",
        email: "andipratama@gmail.com",
        foto: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
      },
    },
    // Data lainnya dapat ditambahkan di sini
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-0 bg-white">
          <HeaderRiwayatPenitipan />
        </div>

        {/* Konten */}
        <div className="bg-white rounded-lg p-5 flex-grow">
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
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.pengguna?.foto || "https://via.placeholder.com/40"}
                          alt="Foto Pengguna"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-black-800">
                            {item.pengguna?.nama || "Nama tidak tersedia"}
                          </p>
                          <p className="text-gray-700">
                            {item.pengguna?.email || "Email tidak tersedia"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-pre-line">
                      <span className="font-semibold text-gray-800">Jumlah Barang:</span>{" "}
                      {item.deskripsi.split("\n")[0].split(": ")[1]}
                      <br />
                      <span className="font-semibold text-gray-800">Deskripsi:</span>{" "}
                      {item.deskripsi.split("\n")[1]}
                      <br />
                      <span className="font-semibold text-gray-800">Alamat:</span>{" "}
                      {item.deskripsi.split("\n")[2]}
                    </td>
                    <td className="p-3 border-r border-emerald-500 whitespace-nowrap">
                      <span className="text-gray-800 px-3 py-1 rounded-md">
                        {item.total}
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
  );
};

export default RiwayatPenitipan;


